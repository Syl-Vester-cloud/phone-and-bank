
import { useState } from "react";
import "../design/PhoneList.css";

const phones = [
  { id: 1, name: "iPhone 14", price: 999, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Samsung Galaxy S23", price: 899, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Google Pixel 7", price: 799, image: "https://via.placeholder.com/150" },
];

export default function PhoneList() {
  const [selectedPhone, setSelectedPhone] = useState(null);

  const handleOrder = (phone) => {
    setSelectedPhone(phone);
    alert(`You have selected ${phone.name}. Proceed to checkout.`);
  };

  return (
    <div className="phone-list-container">
      <h2>Available Phones</h2>
      <div className="phone-grid">
        {phones.map((phone) => (
          <div key={phone.id} className="phone-card">
            <img src={phone.image} alt={phone.name} />
            <h3>{phone.name}</h3>
            <p>${phone.price}</p>
            <button onClick={() => handleOrder(phone)}>Order Now</button>
          </div>
        ))}
      </div>

      {selectedPhone && (
        <div className="order-message">
          <p>You've selected: {selectedPhone.name}</p>
        </div>
      )}
    </div>
  );
}
