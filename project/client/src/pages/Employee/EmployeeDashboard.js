import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const EmployeeDashboard = () => {
  const [employeeNotifications, setEmployeeNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusToUpdate, setStatusToUpdate] = useState(null);

  const fetchEmployeeNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/Employee/notifications');
      setEmployeeNotifications(response.data || []);
    } catch (error) {
      console.error('Error fetching employee notifications:', error);
    }
  };

  useEffect(() => {
    fetchEmployeeNotifications();
  }, []);

  const handleEdit = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async () => {
    if (!selectedNotification || !statusToUpdate) return;

    try {
      // Update the notification status
      await axios.put(`http://localhost:8085/api/v1/Employee/notifications/update/${selectedNotification._id}`, {
        status: statusToUpdate,
      });

      // Fetch updated notifications after the status update
      fetchEmployeeNotifications();
      setIsModalOpen(false); // Close the modal after updating status
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStatusToUpdate(null); // Reset the status to update
  };

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <div className="employee-notifications">
        <h2>Employee Notifications</h2>
        <ul>
          {employeeNotifications.map((notification) => (
            <li key={notification._id}>
              <div>Message: {notification.message}</div>
              <div>Status: {notification.status}</div>
              {notification.appointment && (
                <div>
                  Appointment Description: {notification.appointment.description}
                  <br />
                  Appointment Specialization: {notification.appointment.specialization}
                </div>
              )}

              {notification.user && (
                <div>
                  User Name: {notification.user.name}
                  <br />
                  Email: {notification.user.email}
                  <br />
                  Phone: {notification.user.phone}
                  <br />
                  Address: {notification.user.address}
                </div>
              )}
              {/* Edit button to open modal */}
              <button onClick={() => handleEdit(notification)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        {selectedNotification && (
          <div>
            <h2>Edit Employee Notification</h2>
            <div>User Name: {selectedNotification.user.name}</div>
            <div>Email: {selectedNotification.user.email}</div>
            {/* Add more fields for editing */}
            <div>
              <button onClick={() => setStatusToUpdate('completed')}>Completed</button>
              <button onClick={() => setStatusToUpdate('issue occured')}>Issue Occurred</button>
              <button onClick={() => setStatusToUpdate('pending')}>pending</button>
            </div>
            <button onClick={handleStatusUpdate}>Update Status</button>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EmployeeDashboard;
