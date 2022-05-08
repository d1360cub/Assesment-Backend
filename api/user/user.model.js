const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    },
    password: {
      type: String,
      required: true,
      match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
      minlength: 6,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

UserSchema.pre('save', async function (next) {
  const user = this;
  try {
    if (!user.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (error) {
    next();
    return null;
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  const result = await bcrypt.compare(candidatePassword, user.password);
  return result;
};

UserSchema.virtual('profile').get(function () {
  const { firstName, lastName, email } = this;
  return {
    fullName: `${firstName} ${lastName}`,
    email,
  };
});

module.exports = mongoose.model('User', UserSchema);
