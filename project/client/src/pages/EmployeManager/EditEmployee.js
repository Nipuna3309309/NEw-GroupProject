import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {
  const { employeeId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profession, setProfession] = useState("");

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/v1/auth/employees/${employeeId}`);
      const { name, email, phone, address, profession } = response.data.employee;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
      setProfession(profession);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleUpdateEmployee = async () => {
    try {
      await axios.put(`http://localhost:8085/api/v1/auth/update-employees/${employeeId}`, {
        name,
        email,
        phone,
        address,
        profession,
      });
      alert("Employee information updated successfully!");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Employee</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="text" id="phone" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" id="address" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        
        <button type="button" className="btn btn-primary" onClick={handleUpdateEmployee}>Update</button>
      </form>
    </div>
  );
};

export default EditEmployee;
