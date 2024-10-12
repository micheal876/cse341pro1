// models/Item.js

const mongoose = require('mongoose');

// Define the item schema
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'], // Custom error message
        trim: true, // Trim whitespace
        minlength: [2, 'Name must be at least 2 characters long.'] // Minimum length
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        trim: true,
        minlength: [5, 'Description must be at least 5 characters long.'] // Minimum length
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
        min: [0, 'Price must be a positive number.'] // Ensure price is non-negative
    },
    category: {
        type: String,
        required: [true, 'Category is required.'],
        trim: true,
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required.'],
        min: [0, 'Stock cannot be negative.'] // Ensure stock is non-negative
    },
    brand: {
        type: String,
        required: [true, 'Brand is required.'],
        trim: true,
    },
    sku: {
        type: String,
        required: [true, 'SKU is required.'],
        unique: true,
        trim: true,
    }
}, { timestamps: true });

// Create and export the Item model
module.exports = mongoose.model('Item', itemSchema);
