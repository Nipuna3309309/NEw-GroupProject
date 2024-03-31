import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";

const Feedback = () => {
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceType: 'good',
    ratings: 0 // Initialize ratings state
  });

  useEffect(() => {
    if (auth?.user) {
      const { email, name, phone, address } = auth.user;
      setFormData({
        ...formData,
        name: name || '',
        email: email || '',
        phone: phone || '',
        address: address || '',
      });
    }
  }, [auth?.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleStarRating = (value) => {
    setFormData(prevState => ({
      ...prevState,
      ratings: value // Update ratings value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8085/api/v1/feedback/create-feedback', formData);
      console.log(response.data.data); // Assuming your backend returns feedback data
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        serviceType: 'good',
        ratings: 0 // Reset ratings value
      });
      alert('Feedback submitted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error submitting feedback:', error);
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

        <label>Ratings:</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((starValue) => (
            <button
              key={starValue}
              className={`star ${starValue <= formData.ratings ? 'selected' : ''}`}
              onClick={() => handleStarRating(starValue)}
            >
              ⭐️
            </button>
          ))}
        </div>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
