const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../models/user");
const { totp } = require("otplib");
const nodemailer = require("nodemailer");

/* Authentication */
async function sendMail(options) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      // secure: true,
      auth: {
        user: "samueloseh007@gmail.com",
        pass: "fevn kxkk ozia steg",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: "samueloseh007@gmail.com",
      to: options.email,
      subject: options.subject,
      text: options.message,
    });

    console.log("Email sent to user successfully");
  } catch (err) {
    console.log("Email not sent");
    throw new Error("Failed to send email. Please try again later.");
  }
}

const signToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.EXPIRE_TIME,
  });
};

exports.login = async (req, res) => {
  try {
    const { token, email } = req.body;

    const isValid = totp.check(token, process.env.ACCESS_TOKEN_SECRET);

    console.log({ isValid });
    if (!isValid) {
      return res.status(400).json({ message: "Invalid token/token expired" });
    }

    let user = await User.findOne({ email })
      .lean()
      .populate("recentlyVisited.pageId");
    if (!user) {
      console.log("creating");
      user = new User({
        email,
        emailVerified: true,
      });

      await user.save();
    }
    const userAccessToken = signToken(user._id);

    console.log({ user }, { userAccessToken });
    return res.status(200).json({
      user,
      accessToken: userAccessToken,
      message: "Login successful!",
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: "An error occured during login" });
  }
};

exports.loginUserWithGoogleToken = async (req, res) => {
  try {
    const { googleAccessToken } = req.body;

    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      },
    );

    const {
      sub: googleId,
      email,
      name,
      picture,
      email_verified,
    } = response.data;

    let user = await User.findOne({ email })
      .lean()
      .populate("recentlyVisited.pageId");

    if (!user) {
      user = new User({
        googleId,
        email,
        name,
        picture,
        emailVerified: email_verified,
      });
      await user.save();
    }

    const userAccessToken = signToken(user._id);

    return res.status(200).json({
      accessToken: userAccessToken,
      user,
      message: "Signed in sucessfully!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.loginWithToken = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.auth.userId })
      .lean()
      .populate("recentlyVisited.pageId");

    if (user) {
      return res
        .status(200)
        .json({ message: "Logged in with JWT Successfully", user });
    } else {
      return res.status(500).json({ message: "No User found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.sendToken = async (req, res) => {
  // create token

  try {
    const { email } = req.body;
    const token = totp.generate(process.env.ACCESS_TOKEN_SECRET);
    // console.log("token sent: ", token);

    const options = {
      email,
      subject: "Your OTP Code",
      message: `Dear user,\n\nYour One-Time Password (OTP) is ${token}. Please use this code to complete your verification process. \n\nThank you,\nDotion`,
    };
    await sendMail(options);
    return res
      .status(200)
      .json({ message: `An OTP token has been sent to ${email}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
