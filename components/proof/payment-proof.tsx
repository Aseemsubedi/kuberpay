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
  const [guideStep, setGuideStep] = useState<"connect" | "network" | "confirm" | "done" | null>(null);

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
    setGuideStep("connect");
    setNotice("MetaMask is opening. If it says Connect, press Connect.");
    setNoticeError(false);
    try {
      await injected.request({ method: "eth_requestAccounts" });
      let provider = new BrowserProvider(injected);
      let network = await provider.getNetwork();
      if (network.chainId !== SEPOLIA_CHAIN_ID) {
        setGuideStep("network");
        setNotice("MetaMask is asking for the practice network. Press Switch.");
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
      setGuideStep("confirm");
      setNotice("MetaMask is asking you to confirm. The small fee is practice money, not the customer's payment. Press Confirm.");
      const tx = await contract.recordProof(paymentId, dollars);
      await tx.wait();
      setQuery(paymentId);
      setGuideStep("done");
      setNotice("Saved. Close the wallet window and press Check. Yes means the number is on the record.");
      setNoticeError(false);
      await refreshProofs();
    } catch (error) {
      setGuideStep(null);
      setNotice(errorText(error));
      setNoticeError(true);
    } finally {
      setBusy(null);
    }
  }

  const walletSteps = [
    {
      id: "connect" as const,
      title: "Connect",
      text: "MetaMask opens in its own window. Press Connect. This page can then see the account. It cannot spend money by itself.",
    },
    {
      id: "network" as const,
      title: "Practice network",
      text: "If it asks to switch, choose Sepolia. That is the practice network. It is not real money.",
    },
    {
      id: "confirm" as const,
      title: "Confirm",
      text: "A small practice fee appears. That fee is not the customer's payment. Press Confirm to save the number.",
    },
  ];

  const needle = query.trim().toLowerCase();
  const matches = proofs.filter((item) => item.paymentId.toLowerCase() === needle);
  const found = matches[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className="glass rounded-3xl p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-royal">Try this first</p>
        <h2 className="mt-2 text-2xl font-semibold text-navy">Check a number</h2>
        <p className="mt-2 text-sm leading-6 text-muted">No wallet is needed. Leave {payment.id} in the box and press Check.</p>
        <form
          className="mt-6 flex flex-col gap-3 sm:flex-row"
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
              <p className="mt-2 text-sm leading-6 text-muted">
                {found.paymentId} is saved. {matches.length} confirmed. No money moved.
              </p>
            </>
          ) : (
            <>
              <p className="text-5xl font-semibold text-rose-600">No</p>
              <p className="mt-3 text-sm text-muted">
                {needle ? `${query.trim()} is not saved yet.` : "Type a payment number."} Try {payment.id}.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="glass rounded-3xl p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-royal">Only for a new number</p>
        <h2 className="mt-2 text-2xl font-semibold text-navy">When MetaMask opens</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          MetaMask is the business key. It opens in a separate window. Press the button inside that window. Never type a secret phrase on this page.
        </p>
        <ol className="mt-5 space-y-3">
          {walletSteps.map((step, index) => {
            const active = guideStep === step.id;
            return (
              <li
                key={step.id}
                className={`rounded-2xl border px-4 py-3 ${active ? "border-royal bg-[#f3f7ff]" : "border-line bg-white"}`}
              >
                <p className="text-sm font-semibold text-navy">
                  <span className="text-royal">{index + 1}.</span> {step.title}
                  {active ? <span className="ml-2 text-royal">Open now</span> : null}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted">{step.text}</p>
              </li>
            );
          })}
        </ol>
        <p className="mt-4 text-sm leading-6 text-muted">
          {wallet
            ? `Wallet ready · ${shortAddress(wallet.address)} · ${networkLabel(wallet.chainId)}`
            : hasMetaMask === false
              ? "This browser has no MetaMask. Check still works. Save needs MetaMask."
              : hasMetaMask
                ? "MetaMask is installed. Check still works before you press Save."
                : "Check works before a wallet is connected."}
        </p>
        <label className="mt-4 block text-sm font-semibold text-navy" htmlFor="proof-amount">
          Amount for a new example
        </label>
        <input
          id="proof-amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="80"
          inputMode="numeric"
          className="mt-2 w-full rounded-full border border-line bg-[#f5f7fb] px-5 py-3 text-base text-navy outline-none focus:border-royal"
        />
        {notice ? <p className={noticeError ? "mt-3 text-sm text-rose-700" : "mt-3 text-sm font-medium text-navy"}>{notice}</p> : null}
        <button
          type="button"
          onClick={() => void recordProof()}
          disabled={busy !== null}
          className="mt-4 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-navy disabled:cursor-wait disabled:opacity-70"
        >
          {busy === "record" ? "Waiting for MetaMask…" : "Save a new number"}
        </button>
        {guideStep === "done" ? <p className="mt-3 text-sm font-medium text-mint">Saved. Press Check.</p> : null}
      </section>

      <section className="glass rounded-3xl p-6 sm:p-8 lg:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-royal">Already on the record</p>
        <h2 className="mt-2 text-2xl font-semibold text-navy">Recent confirmed</h2>
        <p className="mt-2 text-sm leading-6 text-muted">Each line was saved and confirmed. The same list is what a customer would be checking.</p>
        {!proofsReady ? (
          <p className="mt-4 text-sm text-muted">Checking…</p>
        ) : (
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
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
      </section>
    </div>
  );
}
