const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//= ===============================
// User Schema
//= ===============================
const UserSchema = new Schema(
  {
    username: { type: String }
  }
);

module.exports = mongoose.model('User', UserSchema);