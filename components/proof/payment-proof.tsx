"use client";

import { useCallback, useEffect, useState } from "react";
import { BrowserProvider, Contract, JsonRpcProvider, type Eip1193Provider } from "ethers";
import type { Transaction } from "@/lib/data";
import { paymentProofAbi, paymentProofAddress, sepoliaRpc } from "@/lib/payment-proof-contract";
import { money } from "@/lib/utils";

const SEPOLIA_CHAIN_ID = BigInt(11155111);
const SEPOLIA_HEX = "0xaa36a7";

const NETWORK_NAMES: Record<string, string> = {
  "1": "Ethereum",
  "11155111": "Sepolia",
  "137": "Polygon",
  "8453": "Base",
  "10": "Optimism",
  "42161": "Arbitrum",
};

type MetaMaskProvider = Eip1193Provider & {
  isMetaMask?: boolean;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, listener: (...args: unknown[]) => void) => void;
};

type WalletState = {
  address: string;
  chainId: bigint;
};

type ChainProof = {
  paymentId: string;
  amount: string;
  recordedBy: string;
  recordedAt: number;
  txHash: string;
};

function browserWallet(): MetaMaskProvider | null {
  if (typeof window === "undefined") return null;
  const injected = (window as Window & { ethereum?: MetaMaskProvider }).ethereum;
  return injected ?? null;
}

function networkLabel(chainId: bigint) {
  return NETWORK_NAMES[chainId.toString()] ?? `Chain ${chainId.toString()}`;
}

function explorerTx(hash: string) {
  return `https://sepolia.etherscan.io/tx/${hash}`;
}

function shortAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function when(seconds: number) {
  return new Date(seconds * 1000).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function explorerAddress(address: string) {
  return `https://sepolia.etherscan.io/address/${address}`;
}

function errorText(error: unknown) {
  const details =
    typeof error === "object" && error
      ? (error as { code?: number | string; shortMessage?: string; message?: string; reason?: string })
      : {};
  if (details.code === 4001 || details.code === "ACTION_REJECTED") return "The request was declined in the wallet.";
  const message = `${details.shortMessage ?? ""} ${details.message ?? ""} ${details.reason ?? ""}`.toLowerCase();
  if (message.includes("insufficient funds")) {
    return "This wallet needs a little Sepolia test ETH for the network fee. A Sepolia faucet can send it for free. It is not real money.";
  }
  if (details.shortMessage) return details.shortMessage;
  if (details.message) return details.message;
  return "The wallet request did not finish.";
}

async function readWallet(wallet: MetaMaskProvider): Promise<WalletState | null> {
  const accounts = (await wallet.request({ method: "eth_accounts" })) as string[];
  if (!accounts[0]) return null;
  const provider = new BrowserProvider(wallet);
  const network = await provider.getNetwork();
  return { address: accounts[0], chainId: network.chainId };
}

async function loadProofs(): Promise<ChainProof[]> {
  const provider = new JsonRpcProvider(sepoliaRpc);
  const contract = new Contract(paymentProofAddress, paymentProofAbi, provider);
  const latest = await provider.getBlockNumber();
  const logs = await contract.queryFilter(contract.filters.PaymentRecorded(), Math.max(0, latest - 49000), latest);
  return logs
    .map((log) => {
      const parsed = contract.interface.parseLog(log);
      if (!parsed) return null;
      return {
        paymentId: String(parsed.args.paymentId),
        amount: parsed.args.amount.toString(),
        recordedBy: String(parsed.args.recordedBy),
        recordedAt: Number(parsed.args.recordedAt),
        txHash: log.transactionHash,
      };
    })
    .filter((item): item is ChainProof => item !== null)
    .reverse();
}

export function PaymentProof({ payment }: { payment: Transaction }) {
  const [wallet, setWallet] = useState<WalletState | null>(null);
  const [hasMetaMask, setHasMetaMask] = useState<boolean | null>(null);
  const [isMetaMask, setIsMetaMask] = useState(false);
  const [busy, setBusy] = useState<"connect" | "switch" | "record" | null>(null);
  const [notice, setNotice] = useState("");
  const [noticeError, setNoticeError] = useState(false);
  const [proofs, setProofs] = useState<ChainProof[]>([]);
  const [proofsReady, setProofsReady] = useState(false);
  const [query, setQuery] = useState(payment.id);
  const [amount, setAmount] = useState(String(payment.amount));

  const refreshWallet = useCallback(async () => {
    const injected = browserWallet();
    if (!injected) {
      setHasMetaMask(false);
      setWallet(null);
      return;
    }
    setHasMetaMask(true);
    setIsMetaMask(Boolean(injected.isMetaMask));
    try {
      setWallet(await readWallet(injected));
    } catch (error) {
      setNotice(errorText(error));
      setNoticeError(true);
    }
  }, []);

  const refreshProofs = useCallback(async () => {
    try {
      setProofs(await loadProofs());
    } catch {
      setNotice("The public record could not be loaded just now. Refresh the page to try again.");
      setNoticeError(true);
    } finally {
      setProofsReady(true);
    }
  }, []);

  useEffect(() => {
    const injected = browserWallet();
    void refreshWallet();
    void refreshProofs();
    if (!injected?.on || !injected.removeListener) return;
    const onChange = () => {
      void refreshWallet();
    };
    injected.on("accountsChanged", onChange);
    injected.on("chainChanged", onChange);
    return () => {
      injected.removeListener?.("accountsChanged", onChange);
      injected.removeListener?.("chainChanged", onChange);
    };
  }, [refreshProofs, refreshWallet]);

  async function connect() {
    const injected = browserWallet();
    if (!injected) {
      setHasMetaMask(false);
      setNotice("MetaMask is not installed in this browser.");
      setNoticeError(true);
      return;
    }
    setBusy("connect");
    setNotice("");
    setNoticeError(false);
    try {
      await injected.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(injected);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      setWallet({ address: await signer.getAddress(), chainId: network.chainId });
      setIsMetaMask(Boolean(injected.isMetaMask));
    } catch (error) {
      setNotice(errorText(error));
      setNoticeError(true);
    } finally {
      setBusy(null);
    }
  }

  async function switchToSepolia() {
    const injected = browserWallet();
    if (!injected) {
      setNotice("MetaMask is not installed in this browser.");
      setNoticeError(true);
      return;
    }
    setBusy("switch");
    setNotice("");
    setNoticeError(false);
    try {
      await injected.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_HEX }],
      });
    } catch (error) {
      const code = typeof error === "object" && error && "code" in error ? Number(error.code) : NaN;
      if (code !== 4902) {
        setNotice(errorText(error));
        setNoticeError(true);
        setBusy(null);
        return;
      }
      try {
        await injected.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: SEPOLIA_HEX,
              chainName: "Sepolia",
              nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
              rpcUrls: [sepoliaRpc],
              blockExplorerUrls: ["https://sepolia.etherscan.io"],
            },
          ],
        });
      } catch (addError) {
        setNotice(errorText(addError));
        setNoticeError(true);
        setBusy(null);
        return;
      }
    }
    try {
      setWallet(await readWallet(injected));
    } catch (error) {
      setNotice(errorText(error));
      setNoticeError(true);
    } finally {
      setBusy(null);
    }
  }

  async function recordProof() {
    const injected = browserWallet();
    if (!injected) {
      setNotice("Install MetaMask in this browser, then press Save again.");
      setNoticeError(true);
      return;
    }
    setBusy("record");
    setNotice("A wallet window will open. Press Confirm.");
    setNoticeError(false);
    try {
      await injected.request({ method: "eth_requestAccounts" });
      let provider = new BrowserProvider(injected);
      let network = await provider.getNetwork();
      if (network.chainId !== SEPOLIA_CHAIN_ID) {
        setNotice("Press Confirm to switch the wallet to the practice network.");
        try {
          await injected.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: SEPOLIA_HEX }],
          });
        } catch (error) {
          const code = typeof error === "object" && error && "code" in error ? Number(error.code) : NaN;
          if (code !== 4902) throw error;
          await injected.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: SEPOLIA_HEX,
                chainName: "Sepolia",
                nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
                rpcUrls: [sepoliaRpc],
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ],
          });
        }
        provider = new BrowserProvider(injected);
        network = await provider.getNetwork();
      }
      if (network.chainId !== SEPOLIA_CHAIN_ID) {
        throw new Error("Switch the wallet to Sepolia, then press Save again.");
      }
      const signer = await provider.getSigner();
      const contract = new Contract(paymentProofAddress, paymentProofAbi, signer);
      const paymentId = query.trim();
      const dollars = Number(amount);
      if (!paymentId || !Number.isInteger(dollars) || dollars <= 0) {
        throw new Error("Type a new payment number and a whole amount, like KP10031 and 80.");
      }
      setNotice("Press Confirm one more time to save the payment.");
      const tx = await contract.recordProof(paymentId, dollars);
      setNotice("Waiting. Press Confirm in the wallet window.");
      await tx.wait();
      setQuery(paymentId);
      setNotice("Saved. Press Check.");
      setNoticeError(false);
      await refreshProofs();
    } catch (error) {
      setNotice(errorText(error));
      setNoticeError(true);
    } finally {
      setBusy(null);
    }
  }

  const needle = query.trim().toLowerCase();
  const matches = proofs.filter((item) => item.paymentId.toLowerCase() === needle);
  const found = matches[0];

  return (
    <section className="glass mx-auto max-w-xl rounded-3xl p-6 sm:p-8">
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          setQuery(query.trim());
        }}
      >
        <label className="sr-only" htmlFor="payment-id">
          Payment number
        </label>
        <input
          id="payment-id"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="KP10021"
          className="w-full rounded-full border border-line bg-[#f5f7fb] px-5 py-3 text-base text-navy outline-none focus:border-royal"
        />
        <button type="submit" className="pay-glow grad-btn rounded-full bg-royal px-6 py-3 text-sm font-semibold text-white">
          Check
        </button>
      </form>

      <div className="mt-8 text-center">
        {!proofsReady ? (
          <p className="text-sm text-muted">Checking…</p>
        ) : found ? (
          <>
            <p className="text-5xl font-semibold text-mint">Yes</p>
            <p className="mt-3 text-3xl font-semibold text-navy">{money(Number(found.amount))}</p>
            <p className="mt-2 text-sm text-muted">
              Payment {found.paymentId} is saved. {matches.length} confirmed. No money moved. This is practice data.
            </p>
          </>
        ) : (
          <>
            <p className="text-5xl font-semibold text-rose-600">No</p>
            <p className="mt-3 text-sm text-muted">
              {needle ? `${query.trim()} is not saved.` : "Type a payment number."} Try {payment.id}.
            </p>
          </>
        )}
      </div>

      <div className="mt-8 border-t border-line pt-6">
        <p className="text-sm font-semibold text-navy">Recent confirmed</p>
        <p className="mt-1 text-sm text-muted">Each line was saved and confirmed. KP10000 is on this list.</p>
        {!proofsReady ? (
          <p className="mt-4 text-sm text-muted">Checking…</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {proofs.map((item) => (
              <li key={item.txHash} className="rounded-2xl border border-line bg-white px-4 py-3 text-left">
                <p className="text-sm font-semibold text-navy">
                  <span className="text-mint">Confirmed</span>
                  {" · "}
                  {item.paymentId}
                  {" · "}
                  {money(Number(item.amount))}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {when(item.recordedAt)} · {shortAddress(item.recordedBy)}
                </p>
                <a href={explorerTx(item.txHash)} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-semibold text-royal">
                  See it
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 border-t border-line pt-6 text-sm leading-6 text-muted">
        <p className="font-semibold text-navy">Make another example</p>
        <p className="mt-2">Change the number above to a new one, such as KP10031. Type the amount. Press Save, then Confirm in the wallet. Press Check.</p>
        <input
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="80"
          inputMode="numeric"
          aria-label="Amount"
          className="mt-4 w-full rounded-full border border-line bg-[#f5f7fb] px-5 py-3 text-base text-navy outline-none focus:border-royal"
        />
        {notice ? <p className={noticeError ? "mt-3 text-rose-700" : "mt-3 text-navy"}>{notice}</p> : null}
        <button
          type="button"
          onClick={() => void recordProof()}
          disabled={busy !== null}
          className="mt-4 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-navy disabled:cursor-wait disabled:opacity-70"
        >
          {busy === "record" ? "Waiting for the wallet…" : "Save"}
        </button>
      </div>
    </section>
  );
}
