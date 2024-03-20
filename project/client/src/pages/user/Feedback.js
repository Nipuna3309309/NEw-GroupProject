import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceType: 'good'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8085/api/v1/feedback/create-feedback', formData);
      console.log(response.data.data); // Assuming your backend returns feedback data
      // Reset form data after successful submission if needed
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        serviceType: 'good'
      });
      // Show success message to the user
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Show error message to the user
      alert('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div>
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Message:</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>

        <label>Service Type:</label>
        <select name="serviceType" value={formData.serviceType} onChange={handleChange}>
          <option value="good">Good</option>
          <option value="bad">Bad</option>
          <option value="neutral">Neutral</option>
        </select>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
