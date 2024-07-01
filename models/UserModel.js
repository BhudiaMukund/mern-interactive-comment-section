import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  googleId: String,
});

export default mongoose.model("User", UserSchema);
