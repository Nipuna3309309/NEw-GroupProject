import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Order from "../models/orderModel.js"; // Add this line
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import Employee from '../models/EmployeeModel.js';

import JWT from "jsonwebtoken";
import mongoose from "mongoose";
// ... rest of your code

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer,role } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "[phone] is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }
    if (!answer) {
      return res.send({ message: "answer is required" });
    }
    //check user
    const existingUser = await userModel.findOne({ email });
    //existinf user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
      role,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Success",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in registeration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email / password",
      });
    }

    // Check if the email is registered for a user
    const user = await userModel.findOne({ email });

    // If not found as a user, check as an employee
    if (!user) {
      const employee = await Employee.findOne({ email });

      if (!employee) {
        return res.status(404).send({
          success: false,
          message: "Email is not registered",
        });
      }

      // Check the password for the employee
      const match = await comparePassword(password, employee.password);

      if (!match) {
        return res.status(400).send({
          success: false,
          message: "Invalid Password",
        });
      }

      // Generate token for the employee
      const token = await JWT.sign(
        { _id: employee._id, role: employee.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(200).send({
        success: true,
        message: "Login successful",
        user: {
          _id: employee._id,
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          address: employee.address,
          role: employee.role,
        },
        token,
      });
    } else {
      // Check the password for the user
      const match = await comparePassword(password, user.password);

      if (!match) {
        return res.status(400).send({
          success: false,
          message: "Invalid Password",
        });
      }

      // Generate token for the user
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).send({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgot
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New password is required" });
    }

    // Check user
    const user = await userModel.findOne({ email, answer });

    if (!user) {
      // Moved 'return' inside this block to prevent the code below from executing
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }

    // Hash the new password
    const hashed = await hashPassword(newPassword);

    // Update user's password
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//testController
export const testController = (req, res) => {
  try {
    res.send("protected Route");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 8) {
      return res.json({ error: "Passsword is required and 8 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting order",
      error,
    });
  }
};

//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 }); // Correct syntax for sorting by createdAt in descending order
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Orders",
      error,
    });
  }
};
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Use await and fix the parameter name to orderId
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.json(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Order",
      error,
    });
  }
};

export const orderDeleteController = async (req, res) => {
  try {
    // Extract orderId from request parameters
    const { orderId } = req.params;

    // Assuming you have a model named Order, you can use its delete method
    // Make sure to replace Order with your actual model
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order deleted successfully",
      deletedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while deleting order",
      error: error.message,
    });
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error counting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserCount = async (req, res, next) => {
  try {
    const userCount = await userModel.countDocuments();
    res.status(200).json({ success: true, userCount });
  } catch (error) {
    console.error("Error counting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserDetailsController = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if id is provided and follows a valid pattern for MongoDB ObjectId
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    if (!userId || !objectIdPattern.test(userId)) {
      return res.status(400).json({ error: "Invalid user ID provided" });
    }

    const user = await userModel.findById(userId);

    // Check if the user with the provided ID exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User details retrieved successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while retrieving user details",
      error,
    });
  }
};

export const updateUserRoleController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Validate if userId is provided and is a valid ObjectId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID provided" });
    }

    // Validate the role
    if (![0, 1, 2].includes(role)) {
      return res
        .status(400)
        .json({ error: "Invalid role value. Must be 0, 1, or 2." });
    }

    // Update user role
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while updating user role",
      error,
    });
  }
};


export const deleteUserRoleController = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if userId is provided and is a valid ObjectId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID provided" });
    }

    // Delete user by ID
    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while deleting user",
      error: error.message,  // Include the error message in the response
    });
  }
};


export const getEmployeeManagerCount = async (req, res, next) => {
  try {
    const employeeManagerCount = await userModel.countDocuments({ role: 2 });
    res.status(200).json({ success: true, employeeManagerCount });
  } catch (error) {
    console.error("Error counting employee managers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const employeeRegisterController = async (req, res) => {
  try {
    const { name, email, password, phone, address, profession } = req.body;

    // Validations
    if (!name || !email || !password || !phone || !address || !profession) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    // Check if the email is already registered
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).send({
        success: false,
        message: 'Email is already registered. Please use a different email.',
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new employee with the specified profession
    const newEmployee = await new Employee({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      profession,
    }).save();

    res.status(201).send({
      success: true,
      message: 'Employee registration successful',
      employee: {
        _id: newEmployee._id,
        name: newEmployee.name,
        email: newEmployee.email,
        phone: newEmployee.phone,
        address: newEmployee.address,
        profession: newEmployee.profession,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in employee registration',
      error,
    });
  }
};

export const getEmpDetailsController = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Validate if id is provided and follows a valid pattern for MongoDB ObjectId
    if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ error: "Invalid employee ID provided" });
    }

    const employee = await Employee.findById(employeeId);

    // Check if the employee with the provided ID exists
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({
      success: true,
      message: "Employee details retrieved successfully",
      employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while retrieving employee details",
      error,
    });
  }
};


export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error getting employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateEmployeeController = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { name, email, phone, address, profession } = req.body;

    // Validate if employeeId is provided and is a valid ObjectId
    if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ error: "Invalid employee ID provided" });
    }

    // Find the employee by ID
    const existingEmployee = await Employee.findById(employeeId);

    // Check if the employee with the provided ID exists
    if (!existingEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Update employee information
    existingEmployee.name = name || existingEmployee.name;
    existingEmployee.email = email || existingEmployee.email;
    existingEmployee.phone = phone || existingEmployee.phone;
    existingEmployee.address = address || existingEmployee.address;
    existingEmployee.profession = profession || existingEmployee.profession;

    // Save the updated employee
    const updatedEmployee = await existingEmployee.save();

    res.status(200).json({
      success: true,
      message: "Employee information updated successfully",
      updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while updating employee information",
      error,
    });
  }
};

export const deleteEmployeeController = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Validate if employeeId is provided and is a valid ObjectId
    if (!employeeId || !mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ error: "Invalid employee ID provided" });
    }

    // Delete employee by ID
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      deletedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while deleting employee",
      error: error.message,
    });
  }
};