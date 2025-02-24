
import { useState } from "react";
import "../design/Wallet.css";

export default function PeerToPeerTransfer() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const handleTransfer = () => {
    if (recipient && amount) {
      // Simulate a transfer process
      setSuccess(`Successfully sent ${amount} to ${recipient}`);
      setRecipient("");
      setAmount("");
      setMessage("");
    } else {
      setSuccess("Please fill in all fields.");
    }
  };

  return (
    <div className="transfer-container">
      <h2>Send Money Instantly</h2>
      <input
        type="text"
        placeholder="Recipient Number or Bank ID"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="transfer-input"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="transfer-input"
      />
      <input
        type="text"
        placeholder="Message (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="transfer-input"
      />
      <button onClick={handleTransfer} className="transfer-button">
        Send Money
      </button>
      {success && <p className="transfer-message">{success}</p>}
    </div>
  );
}
