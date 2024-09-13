import { OAuth2Client } from "google-auth-library";
import { UnauthenticatedError } from "../errors/customErrors.js";
import User from "../models/UserModel.js";
import { createJWT } from "../utils/tokenUtils.js";
import { StatusCodes } from "http-status-codes";

export const login = async (req, res) => {
  const client = new OAuth2Client();

  let googleId, profilePicture, username;

  const verifyGoogleToken = async () => {
    const ticket = await client.verifyIdToken({
      idToken: req.body.idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    googleId = payload.sub;
    profilePicture = payload.picture;
    username = payload.name;
  };

  try {
    await verifyGoogleToken();
    let user = await User.findOne({ googleId: googleId });

    // update stored credentials if changed
    if (user) {
      if (user.username !== username) {
        user.username = username;
        await user.save();
      }
      if (user.profilePicture !== profilePicture) {
        user.profilePicture = profilePicture;
        await user.save();
      }
    }

    if (!user) {
      await User.create({
        googleId: googleId,
        profilePicture: profilePicture,
        username: username,
      });

      user = await User.findOne({ googleId: googleId });
    }

    const token = createJWT({ userId: user._id });
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
    });

    res
      .status(StatusCodes.CREATED)
      .json({ msg: "User logged in successfully" });
  } catch (error) {
    throw new UnauthenticatedError("Invalid Authentication");
  }
};

export const logout = (req, res) => {
  console.log("logout");
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
