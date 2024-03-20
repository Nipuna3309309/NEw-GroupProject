import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import UserMenu from '../../components/Layout/UserMenu';
import Layout from '../../components/Layout/Layout';

const NotificationDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.get('/api/v1/appointment/notification-appointments');
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (auth?.token) {
      getNotifications();
    }
  }, [auth?.token]);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      const detailsPromises = notifications.map(async (notification) => {
        const appointmentId = notification.appointment;
        try {
          const response = await axios.get(`/api/v1/appointment/get-appointments/${appointmentId}`);
          return response.data.appointment;
        } catch (error) {
          console.error(`Error fetching appointment details for ID ${appointmentId}:`, error);
          return null;
        }
      });

      const resolvedDetails = await Promise.all(detailsPromises);
      setAppointmentDetails(resolvedDetails);
    };

    fetchAppointmentDetails();
  }, [notifications]);

  const handleDeleteNotification = async (index) => {
    try {
      const notificationId = notifications[index]._id;
      await axios.delete(`/api/v1/appointment/delete-appointments/${notificationId}`);
      const updatedNotifications = [...notifications];
      updatedNotifications.splice(index, 1);
      setNotifications(updatedNotifications);
      // Optionally, you can also update appointmentDetails accordingly.
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleClearAllNotifications = async () => {
    try {
      await axios.delete('/api/v1/appointment/deleteallnotification-appointments');
      setNotifications([]);
      setAppointmentDetails([]);
    } catch (error) {
      console.error('Error clearing all notifications:', error);
    }
  };

  return (
    <Layout title={'Appointment Notifications'}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Appointment Notifications</h1>
            
            {/* Clear All Button */}
            <button
              type="button"
              className="btn btn-danger mb-3"
              onClick={handleClearAllNotifications}
            >
              Clear All
            </button>

            {appointmentDetails.map((appointmentDetails, index) => (
              <div key={index} className="mb-3 border shadow">
                <h3>Appointment Details</h3>
                {appointmentDetails ? (
                  <>
                    <p>Firstname: {appointmentDetails.firstname}</p>
                    <p>Lastname: {appointmentDetails.lastname}</p>
                    {/* Add other appointment details as needed */}
                  </>
                ) : (
                  <p>No appointment details available.</p>
                )}

                <h3>Notification Details</h3>
                <p>Status: {notifications[index]?.status}</p>
                <p>Message: {notifications[index]?.message}</p>
                {/* Add other notification details as needed */}
                
                {/* Delete Button */}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteNotification(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotificationDashboard;
