import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  orderDeleteController,
  getUsers,
  getUserDetailsController,
  updateUserRoleController,
  
  deleteUserRoleController,
  getUserCount,
  getEmployeeManagerCount,
  employeeRegisterController,
  getEmpDetailsController,
  getEmployees,
  updateEmployeeController,
  deleteEmployeeController,
} from "../controllers/authController.js";
import {
  isAdmin,
  isEmployee,
  isEmployeeUser,
  requireSignIn,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);

// LOGIN || post
router.post("/login", loginController);

// Forgot password || post
router.post("/forgot-password", forgotPasswordController);

// test routes
router.get("/test", requireSignIn, isAdmin, testController);

// protected routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin routes
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/employee-auth", requireSignIn, isEmployee, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/employeeuser-auth", requireSignIn, isEmployeeUser, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileController);

// orders
router.get("/orders", requireSignIn, getOrdersController);

// all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

// Order deletion
router.delete(
  "/order-delete/:orderId",
  requireSignIn,
  isAdmin,
  orderDeleteController
);

router.get("/admin/users", requireSignIn, isAdmin, getUsers);

router.get(
  "/admin/users/:userId",
  requireSignIn,
  isAdmin,
  getUserDetailsController
);

router.get(
  "/admin/count",
  requireSignIn,
  isAdmin,
  getUserCount,
);
router.get(
  "/admin/users/employeeManager/count",
  requireSignIn,
  isAdmin,
  getEmployeeManagerCount
);


router.put(
  "/admin/users/role/:userId",
  requireSignIn,
  isAdmin,
  updateUserRoleController
);

router.delete(
  "/admin/users/delete/:userId",
  requireSignIn,

  deleteUserRoleController
);


router.delete(
  "/profile/delete/:userId",
  requireSignIn,

  deleteUserRoleController
);

// Define routes
router.post('/e-register',requireSignIn,isEmployee, employeeRegisterController);


router.get('/all-employees',requireSignIn,isEmployee, getEmployees);

router.get("/employees/:employeeId",requireSignIn,isEmployee, getEmpDetailsController); // Read single employee
router.put("/update-employees/:employeeId",requireSignIn,isEmployee, updateEmployeeController); // Update employee role
router.delete("/delete-employees/:employeeId",requireSignIn,isEmployee, deleteEmployeeController);
export default router;
