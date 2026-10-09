// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @notice Public note of a sample payment id and amount. This contract does not hold or settle funds.
contract KuberPaymentProof {
    struct Proof {
        string paymentId;
        uint256 amount;
        address recordedBy;
        uint256 recordedAt;
    }

    Proof[] private proofs;

    event PaymentRecorded(
        uint256 indexed index,
        string paymentId,
        uint256 amount,
        address indexed recordedBy,
        uint256 recordedAt
    );

    function recordProof(string calldata paymentId, uint256 amount) external returns (uint256 index) {
        require(bytes(paymentId).length > 0, "payment id required");
        index = proofs.length;
        proofs.push(
            Proof({
                paymentId: paymentId,
                amount: amount,
                recordedBy: msg.sender,
                recordedAt: block.timestamp
            })
        );
        emit PaymentRecorded(index, paymentId, amount, msg.sender, block.timestamp);
    }

    function proofCount() external view returns (uint256) {
        return proofs.length;
    }
}
