const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    barcode: {
      type: Number,
      // required: true,
    },
    imgUrl: {
      type: String,
      // required: true,
    },
    name: {
      type: String,
      // required: true,
    },
    brands: {
      type: String,
      // required: true,
    },
    quantity: {
      type: String,
      // required: true,
    },
    ingredients: {
      type: String,
      // required: true,
    },
    categories: {
      type: String,
      // required: true,
    },
    calories: {
      type: Number,
      // required: true,
    },
    carbs: {
      type: Number,
      // required: true,
    },
    protein: {
      type: Number,
      // required: true,
    },
    fats: {
      type: Number,
      // required: true,
    },
    salt: {
      type: Number,
      // required: true,
    },
    sugars: {
      type: Number,
      // required: true,
    },
    addedAmount: {
      type: Number,
      // required: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model('product', productSchema);

module.exports = Product;
