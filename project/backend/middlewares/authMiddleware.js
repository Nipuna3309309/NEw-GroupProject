import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import Employee from "../models/EmployeeModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    // Check if the authorization header exists
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ success: false, message: "No token provided" });
    }

    // Verify the JWT token
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ success: false, message: "Token has expired" });
    }
    console.error("Error in requireSignIn middleware:", error);
    res.status(401).send({ success: false, message: "Unauthorized access" });
  }
};


//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

//employee acceess
export const isEmployee = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 2) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};

export const isEmployeeUser = async (req, res, next) => {
  try {
    // Check if the authenticated user is an employee
    const employee = await Employee.findById(req.user._id);

    if (!employee || employee.role !== 3) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized Access: User is not an employee with role 3',
      });
    }

    // If the user is authenticated and is an employee with role 3, proceed to the next middleware
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in isEmployeeUserController',
      error: error.message,
    });
  }
};
