import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createAppointmentController,
  deleteAppointmentController,
  getAppointmentController,
  getSingleAppointmentController,
  updateAppointmentController,


  notificationStatusController,
  getAppointmentsNotificationController,
  getAllNotificationAppointmentsController,
  deleteNotificationAppointmentController,
  deleteAllUserNotificationsController,
  getCurrentAppointmentController,
  countNotificationStatusController,
 
} from "../controllers/appointmentController.js";

const router = express.Router();

// Create appointment
router.post("/create-appointment", requireSignIn, createAppointmentController);

// Get all appointments
router.get("/get-appointments", getAppointmentController);


//current user appointments
router.get("/getCurrent-appointments",requireSignIn, getCurrentAppointmentController);

// Get a single appointment
router.get("/get-appointments/:id", getSingleAppointmentController);

// Update an appointment
router.put("/update-appointments/:id", requireSignIn, updateAppointmentController);

// Delete an appointment
router.delete("/delete-appointments/:id", requireSignIn, deleteAppointmentController);

// appointments
router.get("/notification-appointments", requireSignIn, getAppointmentsNotificationController);


// appointments
router.delete("/deletenotification-appointments", requireSignIn, deleteNotificationAppointmentController);
//all appointments
router.get("/allnotification-appointments", requireSignIn, isAdmin, getAllNotificationAppointmentsController);

router.get("/count-notification", requireSignIn, countNotificationStatusController );

router.delete("/deleteallnotification-appointments", requireSignIn, deleteAllUserNotificationsController);
// appointment status update
router.put(
  "/appointment-status/:appointmentId",
  requireSignIn,
  isAdmin,
  notificationStatusController
);

export default router;
