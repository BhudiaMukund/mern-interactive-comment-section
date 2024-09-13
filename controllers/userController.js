import User from "../models/UserModel.js";
import Comment from "../models/CommentModel.js";
import { StatusCodes } from "http-status-codes";
import { UnauthorizedError } from "../errors/customErrors.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user: user });
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    await Comment.deleteMany({ author: user._id });
    await User.deleteOne({ _id: user._id });
  } catch (error) {
    throw new UnauthorizedError("Unauthorised");
  }
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User deleted successfully!" });
};
