import React, { useState } from 'react';
import axios from 'axios';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
const CreateRole = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    answer: '',
    role: 0, // Default role is 0 (for regular users)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to the server
      const response = await axios.post('http://localhost:8085/api/v1/auth/register', formData);
      console.log(response.data);
      window.alert('Role created successfully!');
      // Optionally, you can handle success or redirect the user to another page
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error display or logging
    }
  };

  return (    <Layout title={'All Appointments'}>
  <div className="container-fluid p-3 m-3 dashboard">
    <div className="row">
      <div className="col-md-3">
        <AdminMenu />
      </div> 
         <div className="col-md-9">
          
            <div>
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="username">UserName</label>
          <input type="text" className="form-control" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Email</label>
          <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Password</label>
          <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputAddress">Address</label>
          <input type="text" className="form-control" name="address" placeholder="1234 Main St" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputAddress">Phone No:</label>
          <input type="text" className="form-control" name="phone" placeholder="+94XXXXXXXXX" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputAddress">companyID-No</label>
          <input type="text" className="form-control" name="answer" placeholder="GLT111222" value={formData.answer} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="roleSelect">Select Role:</label>
        <select name="role" id="roleSelect" value={formData.role} onChange={handleChange}>
     
          <option value={1}>Admin</option>
          <option value={2}>Employee Manager</option>
        </select>
        
      </div>

      <button type="submit" className="btn btn-primary">Create role</button>
    </form>
    </div>
    </div>
    </div>
    </div>
    </Layout>
  );
};

export default CreateRole;
