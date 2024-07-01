const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const  axios  = require('axios');
const User = require("../models/user")

const signToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.EXPIRE_TIME,
  });
};

exports.signup = async (req, res,) => {
  // signup controller
  try {
    const userData = req.body;
    console.log({userData})
    const userAccessToken = null
    return res.status(200).json({access_token: userAccessToken})
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

}

exports.signupWithToken = async (req, res) => {
  try {
    
    const { googleAccessToken } = req.body;

    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        'Authorization': `Bearer ${googleAccessToken}`
      }
    });

    const { sub: googleId, email, name, avatar, email_verified } = response.data;
    
    let user = await User.findOne({ googleId }).lean();

    if (!user) {
      user = new User({
        googleId,
        email, name, avatar, emailVerified: email_verified
      })
      await user.save()
    }

    const userAccessToken = signToken(user._id);

    return res
      .status(200)
      .json({ accessToken: userAccessToken, user });
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}