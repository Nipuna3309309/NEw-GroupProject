// EditEmployee.js
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    address: "",
    profession: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/employees/${id}`);
      setEmployee(response.data.employee);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      await axios.put(`/api/v1/auth/update-employees/${id}`, employee);
      navigate("/dashboard/admin/all-employees"); // Use navigate to redirect after updating
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout title={"Edit Employee"}>
      <div className="container-fluid m-3 p-3">
        <h1>Edit Employee</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={employee.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={employee.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="profession" className="form-label">
              Profession
            </label>
            <input
              type="text"
              className="form-control"
              id="profession"
              name="profession"
              value={employee.profession}
              onChange={handleChange}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleUpdateEmployee}
          >
            Update Employee
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditEmployee;
