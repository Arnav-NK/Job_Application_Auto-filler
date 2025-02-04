import Register from "../model/RegisterModel.js";
import { catchAsyncErr } from "../middleware/catchasyncErr.js";
import { ErrorHandler } from "../middleware/err.js";

export const register = catchAsyncErr(async (req, res, next) => {
  const {
    FullName,
    email,
    phone,
    github,
    linkedin,
    domainSpecialization,
    skills,
    experience,
  } = req.body;

  try {
    const newUser = await Register.create({
      FullName,
      email,
      phone,
      github,
      linkedin,
      domainSpecialization,
      skills,
      experience,
    });

    res.status(200).json({
      success: true,
      message: "User successfully registered",
      newUser,
    });
  } catch (error) {
    console.error("Error while saving user profile:", error);
    return next(new ErrorHandler("Error saving user profile", 500));
  }
});

export const getRegister = catchAsyncErr(async (req, res, next) => {
  const register = await Register.findOne().sort({ createdAt: -1 }).limit(1); // Fetch the latest document

  if (!register) {
    return next(new ErrorHandler("No user found", 404));
  }

  res.status(200).json({
    success: true,
    register,
  });
});

