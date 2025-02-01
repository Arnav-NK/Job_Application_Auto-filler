import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  FullName: {
    type: String,
  },
  email: {
    type: String,

    unique: true,
  },
  phone: {
    type: String,
  },

  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },

  domainSpecialization: {
    type: String,
  },
  skills: {
    type: String,
  },
  experience: {
    type: String,
  },
});

const Register = mongoose.model("Register", registerSchema);
export default Register;
