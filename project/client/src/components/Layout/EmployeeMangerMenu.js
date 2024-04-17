import React from 'react'
import { NavLink } from 'react-router-dom';

const EmployeeMangerMenu = () => {
    return (
        <div className="admin-menu-container">
          <div className="text-center">
            <div className="list-group">
              <h4>Employee Manger Panel</h4>
              <NavLink
                to="/dashboard/employee/creater"
                className="list-group-item list-group-item-action"
              >
                Create Employee
              </NavLink>
              <NavLink
                to="/dashboard/employee/all-employees"
                className="list-group-item list-group-item-action"
              >
                All Employees
              </NavLink>
         
            </div>
          </div>
        </div>
    
        
      );
    
      
    };

export default EmployeeMangerMenu