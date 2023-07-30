import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    Admin: {
      type: Boolean,
    },
    Operador: {
      type:Boolean,
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
