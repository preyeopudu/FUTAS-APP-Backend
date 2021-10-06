const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRoles = ['user', 'admin'];

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
    },
    role: {
      type: String,
      enum: userRoles,
      default: 'user',
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
