import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import moment from 'moment';

// ... (import statements remain unchanged)

const UpdateNotification = () => {
    const [appointments, setAppointments] = useState([]);
  
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/v1/appointment/allnotification-appointments');
        setAppointments(response.data.appointments || []);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
  
    const fetchNotifications = async () => {
        try {
          const response = await axios.get('/api/v1/appointment/allnotification-appointments'); // Update the endpoint
          setAppointments(response.data.notifications || []); // Update the data extraction
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
      
      useEffect(() => {
        fetchNotifications(); // Update the function call
      }, []);
      
    useEffect(() => {
      fetchAppointments();
    }, []);
  
    const handleStatusUpdate = async (notificationId, newStatus) => {
      try {
        // Make an API call to update the status using the notificationId
        await axios.put(`http://localhost:8080/api/v1/appointment/appointment-status/${notificationId}`, { status: newStatus });
        // Refresh the appointments after the update
        fetchAppointments();
      } catch (error) {
        console.error('Error updating notification status:', error);
      }
    };
  
    return (
      <Layout title={'All Appointments'}>
        <div className="container-fluid p-3 m-3 dashboard">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h1 className="text-center">All Appointments</h1>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Specialization</th>
                      <th>Address</th>
                      <th>Phone Number</th>
                      <th>Date</th>
                   
                      <th>Notification Status</th>
                      <th>Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment, index) => (
                      <tr key={appointment._id}>
                        <td>{index + 1}</td>
                        <td>{appointment.firstname}</td>
                        <td>{appointment.lastname}</td>
                        <td>{appointment.description}</td>
                        <td>{appointment.type}</td>
                        <td>{appointment.specialization}</td>
                        <td>{appointment.address}</td>
                        <td>{appointment.phoneNumber}</td>
                        <td>{moment(appointment.date).format('MMMM DD, YYYY')}</td>
                     
                        <td>{appointment.notifications[0]?.status || 'N/A'}</td>
                        <td>
                          <select
                            value={appointment.status}
                            onChange={(e) => handleStatusUpdate(appointment.notifications[0]?._id, e.target.value)}
                          >
                            <option value="unread">Unread</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="pending">Pending</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  };
  
  export default UpdateNotification;
  