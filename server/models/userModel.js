import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requred: [true, "User must have a name"],
  },

  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
    lowercase: true,
  },

  photo: {
    type: String,
    default: () => {
      return "https://jumbo-bowls.onrender.com/public/images/users/defaultUser.webp";
    },
  },

  role: {
    type: String,
    enum: ["user", "guide", "Lead-guide", "admin"],
    default: "user",
  },

  password: {
    type: String,
    required: [true, "User must have a password"],
    minlength: 1,
    select: false,
  },

  passwordConfirm: {
    type: String || undefined,
    required: [true, "You must confirm the password"],
  },

  joinedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },

  active: {
    type: Boolean,
    default: true,
  },
});

// HASH PASSWORD ON SIGNUP
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// PASS VERIFICATION
userSchema.methods.correctPassword = async function (
  canditatePassword,
  userPassword,
) {
  return await bcrypt.compare(canditatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
