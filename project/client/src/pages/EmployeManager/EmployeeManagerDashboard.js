// EmployeeManagerDashboard.jsx
import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const EmployeeManagerDashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [profession, setProfession] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/e-register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
        profession,
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        // Optionally, you can clear the form fields or navigate to another page
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <h1 className="text-center mb-4">Employee Manager Dashboard</h1>

        {/* Employee Registration Form */}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Enter Employee Name"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Enter Employee Email"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter Employee Password"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  placeholder="Enter Employee Phone"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  placeholder="Enter Employee Address"
                  required
                />
              </div>


              <div className="mb-3">
                <select
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="form-select"
                  placeholder="Select Employee's Profession"
                  required
                >
                  <option value="" disabled>Select Employee's Profession</option>
                  <option value="hardware">Hardware</option>
                  <option value="software">Software</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ borderRadius: "40px" }}
              >
                Register Employee
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeManagerDashboard;
