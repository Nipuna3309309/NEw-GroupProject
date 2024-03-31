// employeeController.js

import EmployeeNotification from '../models/EmployeeNotification.js';

export const getEmployeeNotifications = async (req, res) => {
  try {
    const { employeeId } = req.query; // Assuming employeeId is provided as a query parameter

    let notifications;
    if (employeeId) {
      // Fetch notifications for a specific employee
      notifications = await EmployeeNotification.find({ employee: employeeId });
    } else {
      // Fetch all notifications
      notifications = await EmployeeNotification.find();
    }

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}