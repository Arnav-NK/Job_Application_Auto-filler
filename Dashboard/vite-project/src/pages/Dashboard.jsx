import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import HI from "./HI";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [autofillData, setAutofillData] = useState(null); // State to store parsed data

  // Getting the user from Redux store
  const { user } = useSelector((state) => state.user);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("user_file", file);

    try {
      const response = await axios.post("http://localhost:3004/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Set the parsed data received from the backend
      setAutofillData(response.data);

      // Store the parsed data in localStorage
      localStorage.setItem("parsedData", JSON.stringify(response.data));
      console.log("Parsed Data:", response.data);
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Display user avatar */}
      {user.avatar && user.avatar.url ? (
        <img
          src={user.avatar.url || ""}
          alt="User Avatar"
          className="h-14 w-14 rounded-full mx-auto mb-4"
        />
      ) : (
        <div className="h-14 w-14 rounded-full bg-gray-300 mx-auto mb-4" />
      )}

      {/* Welcome message */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome back,{" "}
        <span className="text-blue-600">{user.fullName || "USER"}</span>!
      </h1>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resume Upload */}
          <div className="flex flex-col items-center mb-6">
            <label
              htmlFor="resume"
              className="flex items-center justify-center w-full py-3 px-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50"
            >
              <input
                type="file"
                id="resume"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
              />
              <span className="text-gray-500">Upload your resume here</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit-Resume
          </button>
        </form>
      </div>

      {/* Pass the parsed data to the HI component */}
      <HI autofillData={autofillData} />
    </div>
  );
};

export default Dashboard;
