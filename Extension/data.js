const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3004;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/profilesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  github: String,
  linkedin: String,
  domain: String,
  skills: [String],
  experience: String,
});

const Profile = mongoose.model("Profile", ProfileSchema);

// API to Fetch Profiles
app.get("/profiles", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
