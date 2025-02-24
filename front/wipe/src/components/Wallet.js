import { useState } from "react";
import "../design/Wallet.css";

const WalletT=({user})=> {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [chatMode, setChatMode] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  console.log(user,'in wallter')

  const handleTransfer = () => {
    if (!recipient || !amount) {
      setSuccess("Please enter recipient and amount");
      return;
    }

    setChatMode(true);
    setChatMessages((prev) => [
      ...prev,
      { sender: "You", text: `Sent ${amount} to ${recipient}` },
    ]);
    setSuccess("");
    setAmount("");
    setMessage("");
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    setChatMessages((prev) => [...prev, { sender: "You", text: message }]);
    setMessage("");
  };

  return (
    <div className="transfer-container">
      {!chatMode ? (
        <>
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
          <button onClick={handleTransfer} className="transfer-button">
            Send Money
          </button>
          {success && <p className="transfer-message">{success}</p>}
        </>
      ) : (
        <div className="chat-container">
          <h2>Chat with {recipient}</h2>
          <div className="chat-box">
            {chatMessages.map((msg, index) => (
              <p key={index} className={`chat-message ${msg.sender === "You" ? "sent" : "received"}`}>
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chat-input"
          />
          <button onClick={sendMessage} className="chat-send-button">Send</button>
        </div>
      )}
    </div>
  );
}
export default WalletT;