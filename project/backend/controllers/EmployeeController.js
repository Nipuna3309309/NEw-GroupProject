// employeeController.js

import Employee from '../models/EmployeeModel.js';
import { hashPassword } from '../helpers/authHelper.js';

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

export const employeeLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: 'Invalid email / password',
      });
    }

    // Check employee
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(404).send({
        success: false,
        message: 'Email is not registered',
      });
    }

    const match = await comparePassword(password, employee.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: 'Invalid Password',
      });
    }

    // Token generation for employee
    const token = await JWT.sign({ _id: employee._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).send({
      success: true,
      message: 'Login successful',
      employee: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        address: employee.address,
        role: employee.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in employee login',
      error,
    });
  }
};
