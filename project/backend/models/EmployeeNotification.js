import mongoose from 'mongoose';

const employeeNotificationSchema = new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", // Assuming you have a User model
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'completed'], // Only allows 'pending' or 'completed' status
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointment", // Assuming you have an Appointment model
  },

}, { timestamps: true });

export default  mongoose.model('EmployeeNotification', employeeNotificationSchema);
