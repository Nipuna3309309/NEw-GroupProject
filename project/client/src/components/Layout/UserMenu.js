import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/user/appointment"
            className="list-group-item list-group-item-action"
          >
            Book Appointment
          </NavLink>

          <NavLink
            to="/dashboard/user/currentappointments"
            className="list-group-item list-group-item-action"
          >
            Appointments
          </NavLink>

          <NavLink
            to="/dashboard/user/feedback"
            className="list-group-item list-group-item-action"
          >
            Feedback
          </NavLink>

          <NavLink
            to="/dashboard/user/givenRatings"
            className="list-group-item list-group-item-action"
          >
            Ratings
          </NavLink>

        </div>
      </div>
    </>
  );
};

export default UserMenu;
