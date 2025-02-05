import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

const PDFUploader = () => {
  const [pdfText, setPdfText] = useState(""); // Store extracted text
  const [fileName, setFileName] = useState(""); // Store file name
  const parsePDF = async (file) => {
    const reader = new FileReader();

    reader.onload = async function () {
      try {
        const pdfData = new Uint8Array(reader.result);

        const pdfDocument = await pdfjsLib.getDocument(pdfData).promise;

        let textContent = "";

        for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
          const page = await pdfDocument.getPage(pageNum);
          const pageText = await page.getTextContent();
          pageText.items.forEach((item) => {
            textContent += item.str + " "; // Append the text of the page
          });
        }

        setPdfText(textContent);
      } catch (error) {
        console.error("Error parsing PDF:", error);
        alert("Failed to parse PDF file.");
      }
    };

    reader.readAsArrayBuffer(file); 
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name); // Set the file name
      parsePDF(file); // Parse the PDF
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Upload and Parse PDF
        </h2>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 mb-4"
        />

        {fileName && (
          <div className="mb-4">
            <strong>Uploaded PDF:</strong> {fileName}
          </div>
        )}

        <div className="text-gray-700">
          <strong>Extracted Text:</strong>
          <p>{pdfText || "No PDF uploaded or parsed yet."}</p>
        </div>
      </div>
    </div>
  );
};

export default PDFUploader;
