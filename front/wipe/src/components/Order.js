import React, { useState } from 'react';
import "../design/Order.css";

const OrderComponent = () => {
    const [order, setOrder] = useState({
        name: "",
        address: "",
        item: "",
        price: "",
        paymentMethod: "Bank Transfer",
        phoneNumber: "",
        cardNumber: "",
        expiryDate: "",
        cvv: ""
    });

    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirm(true); // Show confirmation dialog
    };

    const confirmOrder = () => {
        console.log("Order confirmed:", order);
        setShowConfirm(false);
        alert("Order placed successfully!");
    };

    return (
        <div className="order-container">
            <h2>Place Your Order</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={order.name} onChange={handleChange} required />

                <label>Address:</label>
                <input type="text" name="address" value={order.address} onChange={handleChange} required />

                <label>Item:</label>
                <input type="text" name="item" value={order.item} onChange={handleChange} required />

                <label>Price ($):</label>
                <input type="number" name="price" value={order.price} onChange={handleChange} required />

                <label>Payment Method:</label>
                <select name="paymentMethod" value={order.paymentMethod} onChange={handleChange}>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Airtel Money">Airtel Money</option>
                    <option value="MTN Money">MTN Money</option>
                </select>

                {/* Conditional Input for Airtel/MTN Money */}
                {(order.paymentMethod === "Airtel Money" || order.paymentMethod === "MTN Money") && (
                    <>
                        <label>Phone Number:</label>
                        <input type="tel" name="phoneNumber" value={order.phoneNumber} onChange={handleChange} required />
                    </>
                )}

                {/* Conditional Input for Bank Transfer */}
                {order.paymentMethod === "Bank Transfer" && (
                    <>
                        <label>Card Number:</label>
                        <input type="text" name="cardNumber" value={order.cardNumber} onChange={handleChange} required />

                        <label>Expiry Date:</label>
                        <input type="month" name="expiryDate" value={order.expiryDate} onChange={handleChange} required />

                        <label>CVV:</label>
                        <input type="password" name="cvv" value={order.cvv} onChange={handleChange} required maxLength="3" />
                    </>
                )}

                <button type="submit">Proceed to Confirmation</button>
            </form>

            {showConfirm && (
                <div className="confirmation-dialog">
                    <div className="confirmation-content">
                        <h3>Confirm Your Order</h3>
                        <ul>
                            <li><strong>Name:</strong> {order.name}</li>
                            <li><strong>Address:</strong> {order.address}</li>
                            <li><strong>Item:</strong> {order.item}</li>
                            <li><strong>Price:</strong> ${order.price}</li>
                            <li><strong>Payment Method:</strong> {order.paymentMethod}</li>

                            {/* Show Phone Number if Airtel/MTN */}
                            {(order.paymentMethod === "Airtel Money" || order.paymentMethod === "MTN Money") && (
                                <li><strong>Phone Number:</strong> {order.phoneNumber}</li>
                            )}

                            {/* Show Card Details if Bank Transfer */}
                            {order.paymentMethod === "Bank Transfer" && (
                                <>
                                    <li><strong>Card Number:</strong> **** **** **** {order.cardNumber.slice(-4)}</li>
                                    <li><strong>Expiry Date:</strong> {order.expiryDate}</li>
                                </>
                            )}
                        </ul>
                        <button onClick={confirmOrder}>Confirm & Complete</button>
                        <button onClick={() => setShowConfirm(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderComponent;


