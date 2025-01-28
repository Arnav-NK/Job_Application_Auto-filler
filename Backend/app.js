import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dbConnect from "./database/dbConnect.js";
import userRoutes from "./router/userrouter.js";
import PDFParser from "pdf2json";
import upload from "./multer.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/user", userRoutes);

// Helper function to extract name, email, and phone number using regex
function extractContactInfo(text) {
  const namePattern = /^[A-Z ]{2,}(?=\s|$)/;
  const phonePattern =
    /\+?[1-9][0-9]{0,2}[-.\s]?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;
  const emailPattern = /[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/;
  const githubPattern = /https?:\/\/github\.com\/[^\s]+/i;
  const linkedinPattern = /https?:\/\/(www\.)?linkedin\.com\/in\/[^\s]+/i;
  const skillsPattern = /SKILLS([\s\S]*?)ACHIEVEMENTS/;
  const domainPattern = /EXPERIENCE([\s\S]*?)SELECTED PROJECTS/i;

  const name = text.match(namePattern)?.[0] || "Name not found";

  const email = text.match(emailPattern)?.[0] || "Email not found";
  const githubUrl = text.match(githubPattern)?.[0] || "GitHub URL not found";
  const linkedinUrl =
    text.match(linkedinPattern)?.[0] || "LinkedIn URL not found";
  const domainMatch = text.match(domainPattern);
  const phoneMatches = text.match(phonePattern);
  const phone = phoneMatches ? phoneMatches[0] : "Phone number not found";
  const domain = domainMatch ? domainMatch[1].trim() : "Domain not found";
  const skillsMatch = text.match(skillsPattern);
  const skills = skillsMatch
    ? skillsMatch[1].trim().replace(/\•/g, "-")
    : "Skills not found";
  const experiencePattern = /EXPERIENCE([\s\S]*?)(?=SELECTED PROJECTS)/i;
  const experienceMatch = text.match(experiencePattern);
  const currentCompany = experienceMatch
    ? experienceMatch[1].split(/\n|•/)[0].trim()
    : "Current company not found";

  return {
    name,
    phone,
    email,
    skills,
    domain,
    git: githubUrl,
    Linkedin: linkedinUrl,
    company: currentCompany,
  };
}

// Upload route
app.post("/upload", upload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    // Get the uploaded file path
    const filePath = path.join(__dirname, "uploads", req.file.filename);

    // Initialize PDF parser
    const pdfParser = new PDFParser(this, 1);

    // Handle error in PDF parsing
    pdfParser.on("pdfParser_dataError", (errData) =>
      console.error("Error parsing PDF:", errData.parserError)
    );

    // Parse the PDF and handle the data ready event
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      const textContent = pdfParser.getRawTextContent(); // Extract the raw text content
      // Extract name, email, and phone number
      const contactInfo = extractContactInfo(textContent);

      // Send the extracted contact info as the response
      res.status(200).send({
        message: "File uploaded and parsed successfully",
        contactInfo: contactInfo,
      });
    });

    // Load the uploaded PDF file for parsing
    pdfParser.loadPDF(filePath);
  } catch (error) {
    console.error("Error in file upload and parsing:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Connect to database
dbConnect();

export default app;
export {extractContactInfo};
