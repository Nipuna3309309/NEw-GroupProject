import express from 'express';
import { getEmployeeNotifications } from '../controllers/EmployeeController.js';  // Adjust the import path based on your file structure

const router = express.Router()



router.get('/EmployeeNotification',getEmployeeNotifications );

export default router;