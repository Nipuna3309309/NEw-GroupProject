// AllEmployees.js
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/v1/auth/all-employees");
      setEmployees(response.data.employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleEditEmployee = (employeeId) => {
    // Implement the logic to navigate to the edit page or show a modal for editing
    console.log(`Edit employee with ID: ${employeeId}`);
  };

  const handleDeleteEmployee = async (employeeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      try {
        await axios.delete(`/api/v1/auth/delete-employees/${employeeId}`);
        fetchEmployees(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <Layout title={"All Employees"}>
      <div className="container-fluid m-3 p-3">
        <h1>All Employees</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Profession</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {employees &&
              employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{employee.profession}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEditEmployee(employee._id)}
                    >
                      Edit
                    </button>{" "}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteEmployee(employee._id)}
                    >
                      Delete
                    </button>{" "}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AllEmployees;
