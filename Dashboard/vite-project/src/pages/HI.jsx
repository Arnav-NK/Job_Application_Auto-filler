import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from "react";

const HI = ({ autofillData }) => {
  const [person, setPerson] = useState({
    name: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    domain: "",
    skills: "",
    experience: "",
  });

  // Autofill form data when `autofillData` changes
  useEffect(() => {
    if (autofillData && autofillData.contactInfo) {
      console.log("Autofill Data Received:", autofillData);
      const { contactInfo } = autofillData;
      setPerson((prevPerson) => ({
        ...prevPerson,
        name:
          contactInfo.name !== "Name not found"
            ? contactInfo.name
            : prevPerson.name,
        email: contactInfo.email || prevPerson.email,
        phone: contactInfo.phone || prevPerson.phone,
        github:
          contactInfo.git !== "GitHub URL not found"
            ? contactInfo.git
            : prevPerson.github,
        linkedin: contactInfo.Linkedin || prevPerson.linkedin,
        domain:
          contactInfo.domain !== "Domain not found"
            ? contactInfo.domain
            : prevPerson.domain,
        skills:
          contactInfo.skills !== "Skills not found"
            ? contactInfo.skills
            : prevPerson.skills,
      }));
    }
  }, [autofillData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Data:", person); // Log the data being sent

    try {
      const response = await fetch("http://localhost:3004/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FullName: person.name,
          email: person.email,
          phone: person.phone,
          github: person.github,
          linkedin: person.linkedin,
          domainSpecialization: person.domain,
          skills: person.skills,
          experience: person.experience,
        }),
      });

      const data = await response.json();
      console.log("Data saved in MongoDB:", data);

      if (response.ok) {
        alert("Profile saved successfully!");
      } else {
        alert("Failed to save profile. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading data", error);
      alert("An error occurred while saving the profile.");
    }
  };

  return (
    <div className="min-h-screen py-8">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Profile
          </CardTitle>
          <p className="text-center text-gray-500">Enter your details below</p>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Basic Information
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={person.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={person.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={person.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+1 (91) 000-0000"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Social Links
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="github"
                    className="text-sm font-medium text-gray-700"
                  >
                    GitHub Profile
                  </label>
                  <input
                    type="text"
                    id="github"
                    name="github"
                    value={person.github}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="linkedin"
                    className="text-sm font-medium text-gray-700"
                  >
                    LinkedIn Profile
                  </label>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    value={person.linkedin}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Professional Details
              </h3>
              <div className="space-y-2">
                <label
                  htmlFor="domain"
                  className="text-sm font-medium text-gray-700"
                >
                  Domain/Specialization
                </label>
                <input
                  type="text"
                  id="domain"
                  name="domain"
                  value={person.domain}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Full Stack Development, Data Science"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="skills"
                  className="text-sm font-medium text-gray-700"
                >
                  Skills
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  value={person.skills}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="List your key technical and soft skills"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="experience"
                  className="text-sm font-medium text-gray-700"
                >
                  Experience
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={person.experience}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your relevant work experience"
                />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HI;
