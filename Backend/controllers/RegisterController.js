import Register from "../model/RegisterModel.js";
import { catchAsyncErr } from "../middleware/catchasyncErr.js";
import { ErrorHandler } from "../middleware/err.js";

export const register = catchAsyncErr(async (req, res, next) => {
  const {
    name, // Change FullName to name
    email,
    phone,
    github,
    linkedin,
    domain, // Change domainSpecialization to domain
    skills,
    experience,
  } = req.body;

  try {
    const newUser = await Register.create({
      FullName: name, // Rename to match DB field
      email,
      phone,
      github,
      linkedin,
      domainSpecialization: domain, // Rename to match DB field
      skills,
      experience,
    });

    res.status(200).json({
      success: true,
      message: "User successfully registered",
      newUser,
    });
  } catch (error) {
    return next(new ErrorHandler("Error saving user profile", 500));
  }
});
