import mongoose from 'mongoose';
import bcrypt, { compare } from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  } else {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(
      this.password,
      salt
    );
  }
});

userSchema.methods.matchPassword =
  async function (userPassword) {
    return await bcrypt.compare(
      userPassword,
      this.password
    );
  };
const User = mongoose.model('User', userSchema);
export default User;
