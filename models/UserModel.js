import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    googleId: { type: String, required: true },
    profilePicture: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
