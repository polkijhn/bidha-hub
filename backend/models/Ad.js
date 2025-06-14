
const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  category: String,
  location: String,
  email: String,
  image: String,
});

module.exports = mongoose.model('Ad', AdSchema);
