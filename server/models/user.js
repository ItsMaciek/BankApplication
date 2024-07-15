const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },  
  balance: {
    type: Number,
    required: true,
    default: 1000,
  },
  saving: {
    type: Number,
    required: true,
    default: 0,
  },
  limit: {
    type: Number,
    required: true,
    default: 2000,
  },
  history: {
    type: Array,
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
