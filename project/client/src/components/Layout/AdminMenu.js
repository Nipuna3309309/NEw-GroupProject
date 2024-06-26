import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminMenu.css"; // Import the CSS file for styling

const AdminMenu = () => {
  return (
    <div className="admin-menu-container">
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-post"
            className="list-group-item list-group-item-action"
          >
            Create Posts
          </NavLink>
          <NavLink
            to="/dashboard/admin/get-posts"
            className="list-group-item list-group-item-action"
          >
            Posts
          </NavLink>
          <NavLink
            to="/dashboard/admin"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/admin/update-notification"
            className="list-group-item list-group-item-action"
          >
            Appointments
          </NavLink>
          <NavLink
            to="/dashboard/admin/createrole"
            className="list-group-item list-group-item-action"
          >
            Role
          </NavLink>
        </div>
      </div>
    </div>

    
  );

  
};

export default AdminMenu;
