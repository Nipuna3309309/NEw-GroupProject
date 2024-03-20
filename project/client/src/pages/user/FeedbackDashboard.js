import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SubmissionPage.css'; // Import CSS file for styling

const FeedbackDashboard = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/feedback/get-feedback');
      setFeedbackList(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handleEdit = (feedbackId) => {
    // Redirect to the edit feedback page
    // You can use React Router's useHistory hook for navigation
    // For example:
    // history.push(`/edit-feedback/${feedbackId}`);
    console.log(`Editing feedback with ID: ${feedbackId}`);
  };

  const handleDelete = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:8085/api/v1/feedback/delete-feedback/${feedbackId}`);
      setFeedbackList((prevFeedbackList) => prevFeedbackList.filter((feedback) => feedback._id !== feedbackId));
      console.log(`Feedback with ID ${feedbackId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div>
      <h1>Feedback Submissions</h1>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Service Type</th>
            <th>Actions</th> {/* Add a new column for actions */}
          </tr>
        </thead>
        <tbody>
          {feedbackList.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.name}</td>
              <td>{feedback.email}</td>
              <td>{feedback.phone}</td>
              <td>{feedback.message}</td>
              <td>{feedback.serviceType}</td>
              <td>
                <button onClick={() => handleEdit(feedback._id)}>Edit</button> {/* Edit button */}
                <button onClick={() => handleDelete(feedback._id)}>Delete</button> {/* Delete button */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackDashboard;
