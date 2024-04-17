import EmployeeNotification from "../models/EmployeeNotification.js";
import appointmentModel from "../models/appointmentModel.js";
import appointmentNotification from "../models/appointmentNotification.js";
import AppointmentNotification from "../models/appointmentNotification.js"; // Correct import
import userModel from "../models/userModel.js";
import slugify from "slugify";

export const createAppointmentController = async (req, res) => {
  try {
    const { firstname, lastname, description, type, specialization, address, date, phoneNumber } = req.body;

    if (!firstname || !lastname || !type || !specialization || !address || !date || !phoneNumber) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingAppointment = await appointmentModel.findOne({ firstname, lastname, date });

    if (existingAppointment) {
      return res.status(200).json({
        success: true,
        message: "Appointment already exists",
        appointment: existingAppointment, // Include existing appointment details in the response
      });
    }

    const newAppointment = await appointmentModel.create({
      user: req.user._id, // Assuming you have user information in req.user
      firstname,
      lastname,
      description,
      type,
      specialization,
      address,
      date,
      phoneNumber,
    });

    // Create an appointment notification message
    const appointmentNotificationMessage = `Appointment ID ${newAppointment._id} created on ${newAppointment.date}`;

    // Create the appointment notification and associate appointment ID
    const newAppointmentNotification = await AppointmentNotification.create({
      user: req.user._id,
      message: appointmentNotificationMessage,
      status: 'pending',
      appointment: newAppointment._id, // Associate appointment ID with the notification
    });
    
    // Send the response with all created data including the appointment ID
    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      appointment: newAppointment,
      appointmentNotification: newAppointmentNotification,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error while creating appointment',
      error: error.message,
    });
  }
};




export const updateAppointmentController = async (req, res) => {
  try {
    const { firstname, lastname, description, type, specialization, address, date, phoneNumber } = req.body;
    const { id } = req.params;

    const appointment = await appointmentModel.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        description,
        type,
        specialization,
        address,
        date,
        phoneNumber,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error updating appointment",
    });
  }
};

export const getAppointmentController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.status(200).send({
      success: true,
      message: "All Appointments List",
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all appointments",
    });
  }
};

export const getCurrentAppointmentController = async (req, res) => {
  try {
    // Find appointments for the current user
    const appointments = await appointmentModel
      .find({ user: req.user._id })
      .populate("user", "name") // You can populate additional fields if needed
      .exec();

    res.json({ appointments });
  } catch (error) {
    console.error(error);not
    res.status(500).json({
      success: false,
      message: "Error while getting appointments",
      error: error.message,
    });
  }
};


export const getSingleAppointmentController = async (req, res) => {
  try {
    const appointment = await appointmentModel.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "Get Single Appointment Successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single appointment",
    });
  }
};

export const deleteAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;
    await appointmentModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error deleting appointment",
    });
  }
};

export const getAppointmentsNotificationController = async (req, res) => {
  try {
    // Find appointments
    const appointments = await appointmentModel
      .find({ user: req.user._id });

    // Find notifications and populate user
    const notifications = await appointmentNotification
      .find({ user: req.user._id })
      .populate("user", "name")
      .exec();

    res.json({ appointments, notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while getting appointments and notifications",
      error: error.message,
    });
  }
};

export const getAllNotificationAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({})
      .populate({
        path: 'user',
        select: 'firstname lastname email',
      })
      .sort({ createdAt: -1 });

    const notifications = await AppointmentNotification
      .find({})
      .populate("user", "name")
      .populate({
        path: 'appointment',
        select: 'firstname lastname description type specialization address date phoneNumber',
      })
      .exec();

    // Map through appointments to extract notification details
    const appointmentsWithNotifications = appointments.map(appointment => {
      const notification = notifications.find(n => n.appointment && n.appointment._id.equals(appointment._id));
      return {
        ...appointment.toObject(),
        notifications: notification ? [notification] : [],
      };
    });

    res.json({
      success: true,
      message: 'All appointments retrieved successfully',
      appointments: appointmentsWithNotifications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error while fetching appointments',
      error: error.message,
    });
  }
};


export const notificationStatusController = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    const updatedNotification = await appointmentNotification.findByIdAndUpdate(
      appointmentId,  // Use appointmentId here
      { status },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json(updatedNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while updating notification status",
      error: error.message,
    });
  }
};

export const deleteNotificationAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;
    await notificationModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error deleting appointment",
    });
  }
};


  export const deleteAllUserNotificationsController = async (req, res) => {
    try {
      // Assuming the user name is available in the request after authentication
      const userName = req.user.name;
      
      // Delete notifications for the authenticated user based on user name
      await notificationModel.deleteMany({ name: userName });
  
      res.status(200).send({
        success: true,
        message: 'Current user notifications deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        error,
        message: 'Error deleting current user notifications',
      });
    }
  };

  export const countNotificationStatusController = async (req, res) => {
    try {
      const { user } = req;
  
      const notifications = user?.notifications || [];
  
      const count = {
        approved: notifications.filter((notification) => notification.status === "approved").length,
        rejected: notifications.filter((notification) => notification.status === "rejected").length,
        pending: notifications.filter((notification) => notification.status === "pending").length,
      };
  
      return res.status(200).json(count);
    } catch (error) {
      console.error("Error counting notification statuses:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };