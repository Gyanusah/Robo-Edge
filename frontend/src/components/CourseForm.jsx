import React, { useState } from "react";
import api from '../services/api';

const CourseForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/applications', formData);
      console.log('Application response:', response.data);
      alert("Application Submitted Successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        course: "",
        message: "",
      });
      // Close modal after successful submission
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Application error:', error);
      alert("Error submitting application");
    }
  };

  return (
    <div className="bg-transparent p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-background backdrop-blur-sm p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Course Application Form
        </h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border border-gray-300  text-text rounded-lg bg-white/70 backdrop-blur-sm focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur-sm focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur-sm focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur-sm focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Course</option>
          <option value="MERN Stack">MERN Stack</option>
          <option value="React Development">React Development</option>
          <option value="Node.js Development">Node.js Development</option>
        </select>

        <textarea
          name="message"
          placeholder="Why do you want to join?"
          value={formData.message}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur-sm focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600/80 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-blue-700/90 transition shadow-lg"
        >
          Apply Now
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
