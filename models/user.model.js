const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4(),
  },
  first_name: { type: String, required: true },
  last_name: { type: String, unique: true },
  email: { type: String },
  password: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
});

// before save
UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
