
import mongoose from 'mongoose';

// Create a schema for the product model
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      minlength: 3, // Enforcing a minimum length for product name
      maxlength: 100, // Maximum length for product name
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be less than 0'], // Ensuring that quantity is a non-negative number
    },
    image: {
      type: String,
      required: true, // Assuming this will store a URL or a path to the image
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be less than 0'], // Price must be a positive number
    },
  }
);

// Create a model based on the schema
const ProductModel = mongoose.model('Products', productSchema);

export default ProductModel;
