import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategotyProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import ViewUser from "./pages/Admin/ViewUser";
import EmployeeRoute from "./components/Routes/EmployeeRoute";
import EmployeeManagerDashboard from "./pages/EmployeManager/EmployeeManagerDashboard";
import CreatePosts from "./pages/Admin/CreatePosts";
import Posts from "./pages/Admin/Posts";
import UpdatePosts from "./pages/Admin/UpdatePosts";
import BookingPage from "./pages/user/BookingPage";
import Appointment from "./pages/user/appointment";
import EmployeeUserRoute from "./components/Routes/EmployeeUser";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import NotificationDashboard from "./pages/user/NotificationDashboard";
import UpdateNotification from "./pages/Admin/UpdateNotification";
import CurrentUserAppointment from "./pages/user/CurrentUserAppointment";
import AllEmployees from "./pages/EmployeManager/AllEmployees";
import EditEmployee from "./pages/EmployeManager/EditEmployee";
import Feedback from "./pages/user/Feedback.js";
import FeedbackDashboard from "./pages/user/FeedbackDashboard.js";
import UpdateFeedback from "./pages/user/UpadteFeedback.js";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/appointment" element={<BookingPage />} />
          <Route path="user/getappointments" element={<Appointment />} />
          <Route path="user/notification" element={<NotificationDashboard />} />
          <Route path="user/currentappointments" element={<CurrentUserAppointment />} />
          <Route path="user/feedback" element={<Feedback />} />
          <Route path="user/feedbackdashboard" element={<FeedbackDashboard />} />
          <Route path="user/updatefeedback/:Id" element={<UpdateFeedback />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/users/:userId" element={<ViewUser />} />

          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/create-post" element={<CreatePosts />} />
          <Route path="admin/get-posts" element={<Posts />} />
          <Route path="admin/update-posts/:id" element={<UpdatePosts />} />
          <Route path="admin/update-notification" element={<UpdateNotification />} />
        </Route>

        <Route path="/dashboard" element={<EmployeeRoute />}>
          <Route path="employee" element={<EmployeeManagerDashboard />} />
          <Route path="employee/all-employees" element={<AllEmployees />} />
          <Route path="employee/edit/:id" element={<EditEmployee />} />
        </Route>

        <Route path="/dashboard" element={<EmployeeUserRoute />}>
          <Route path="employeeuser" element={<EmployeeDashboard />} />
          
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
