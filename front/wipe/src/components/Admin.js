import { useState } from "react";
import "../design/Admin.css";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export default function AdminStockManagement() {
 const [stock, setStock] = useState([]);
  const navigate=useNavigate()
  const [productData, setProductData] = useState({ id: null, name: "", quantity: "", image: "" ,price:""});
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  //This is the request to get products from the DB.
  useEffect(()=>{
    fetch('http://localhost:8080/adminProducts')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => setStock(data)
    //console.log('Products:', data))
  )
     // 
    .catch(error => console.error('Error fetching products:', error));

  },[])

  const addProduct = () => {
     console.log(productData)
     
    fetch('http://localhost:8080/addProduct', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data,'after ')
      
      setStock(oldStock=>[...oldStock, { id: data.id, ...data }]);
      
      resetForm();
      
    })
    .catch(error => console.error('Error:', error));
  
  };
///The function to update the product 
  const updateProduct = () => {
    fetch(`http://localhost:8080/updateProduct/${productData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
    .then(response => response.json())
    .then(data => {
      setStock(stock.map(item => (item.id === data.id ? data : item)));
      resetForm();
    })
    .catch(error => console.error('Error:', error));
  };

  //Request to delete the product from the DB.
  const deleteProduct = (id) => {
    fetch(`http://localhost:8080/deleteProduct/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      setStock(stock.filter(item => item.id !== id));
    })
    .catch(error => console.error('Error:', error));
  };

  const resetForm = () => {
    setProductData({ id: null, productName: "", quantity: "", image: "" ,price:""});
    setModalOpen(false);
    setEditMode(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData({ ...productData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Stock Management</h2>
      <button className="admin-button" onClick={() => setModalOpen(true)}>Add Product</button>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item.id}>
              <td>{item._id.substring(0, 5)}</td>
              <td>{item.productName}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.image && <img style={{ width: "200px", height: "150px" }} src={item.image} alt={item.productName} className="product-image" />}</td>
              <td>
                <button className="admin-button" onClick={() => { setProductData(item); setEditMode(true); setModalOpen(true); }}>Edit</button>
                <button className="admin-button delete" onClick={() => deleteProduct(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">{editMode ? "Edit Product" : "Add New Product"}</h3>
            <input
              className="modal-input"
              placeholder="Product Name"
              value={productData.productName}
              onChange={(e) => setProductData({ ...productData, productName: e.target.value })}
            />
             <input
              className="modal-input"
              type="number"
              placeholder="Price"
              value={productData.price}
              onChange={(e) => setProductData({ ...productData, price: e.target.value })}
            />
            <input
              className="modal-input"
              type="number"
              placeholder="Quantity"
              value={productData.quantity}
              onChange={(e) => setProductData({ ...productData, quantity: e.target.value })}
            />
            <input
              type="file"
              className="modal-input"
              onChange={handleImageUpload}
            />
            {productData.image && <img src={productData.image} alt="Preview" className="image-preview" style={{ width: "200px", height: "150px" }}/>}
            <button className="admin-button" onClick={editMode ? updateProduct : addProduct}>{editMode ? "Update" : "Add"}</button>
            <button className="admin-button close" onClick={resetForm}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
