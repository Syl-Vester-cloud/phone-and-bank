
import { useEffect, useState } from "react";
import "../design/PhoneList.css";
import { useNavigate } from "react-router-dom";

/*const phones = [
  { id: 1, name: "iPhone 14", price: 999, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Samsung Galaxy S23", price: 899, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Google Pixel 7", price: 799, image: "https://via.placeholder.com/150" },
];*/

export default function PhoneList() {
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [phones,setPhones]=useState([])
  let navigate=useNavigate()

  const handleOrder = (phone) => {
    setSelectedPhone(phone);
    //I need to handle the order  here.
    navigate("/order")
  };
  console.log("phones component")
  useEffect(()=>{

    async function fetchPhones() {
      try {
        const response =  await fetch('http://192.168.12.242/phones');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data =  await response.json();
        console.log(data,":in phones")
        setPhones(data); // Assuming setPhones is a function that updates state
        
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchPhones();
  },[])
  
  
  
  // Call the function
 
  

  return (
    <div className="phone-list-container">
      <h2>Available Phones</h2>
      <div className="phone-grid">
        {phones.map((phone) => (
          <div key={phone.id} className="phone-card">
            <img src={phone.image} alt={phone.productName} />
            <h3>{phone.productName}</h3>
            <p>K {phone.price}</p>
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
