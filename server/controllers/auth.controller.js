import User from "../models/user.model.js";
import genToken from "../config/token.js";
export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    // validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    // check if user already exists
    let user = await User.findOne({ email });

    // if not, create new user
    if (!user) {
      user = await User.create({
        name,
        email,
      });
    }
    let token=await genToken(user._id)
    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    
    })

    // send response
    return res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user,
    });

  } catch (error) {
    console.error("Google Auth Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// logout controller
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};