import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/bookingCss/css/style.css';
import '../../styles/bookingCss/css/bootstrap.min.css';
import '../../styles/bookingCss/js/main'
import Layout from "./../../components/Layout/Layout";


const BookingPage = () => 
{
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    description: '',
    type: 'Morning',
    specialization: 'Hardware Service',
    address: '',
    date: '',
    phoneNumber: '',
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
      const apiUrl = '/api/v1/appointment/create-appointment';
      const response = await axios.post(apiUrl, formData);

      console.log('Form Data submitted successfully!', response.data);
      // Add any further logic after a successful form submission
    } catch (error) {
      console.error('Error submitting form data:', error.message);
      // Handle the error appropriately, such as displaying an error message to the user
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
   
    <div>
      <Layout title={"Dashboard - Booking"}>
      {/* Page Header Start */}
  <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
    <div className="container py-5">
      <h1 className="display-3 text-white mb-3 animated slideInDown">Book Now</h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol className="breadcrumb text-uppercase mb-0">
          <li className="breadcrumb-item"><a className="text-white" href="/">Home</a></li>
          <li className="breadcrumb-item"><a className="text-white" href="/dashboard/user">Dashboard</a></li>
          <li className="breadcrumb-item text-primary active" aria-current="page">Appointment</li>
        </ol>
      </nav>
    </div>
  </div>
  {/* Page Header End */}
  {/* Appointment Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
          <p className="d-inline-block border rounded-pill py-1 px-4">Book Appointment Now</p>
          <h1 className="mb-4">Make An Appointment To Visit Our Shop</h1>
          <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
          <div className="bg-light rounded d-flex align-items-center p-5 mb-4">
            <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: 55, height: 55}}>
              <i className="fa fa-phone-alt text-primary" />
            </div>
            <div className="ms-4">
              <p className="mb-2">Call Us Now</p>
              <h5 className="mb-0">+012 345 6789</h5>
            </div>
          </div>
          <div className="bg-light rounded d-flex align-items-center p-5">
            <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-white" style={{width: 55, height: 55}} img src="../styles/img/testimonial-1.jpg">
              <i className="fa fa-envelope-open text-primary"  />
            </div>
            <div className="ms-4">
              <p className="mb-2">Mail Us Now</p>
              <h5 className="mb-0">info@example.com</h5>
            </div>
          </div>
        </div>
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="bg-light rounded h-100 d-flex align-items-center p-5">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
              <h4>Personal Details:</h4>
                <div className="col-12 col-sm-6"><div className="font-color1">First Name</div>
                
                <input type="text" className="form-control border-0" name="firstname" value={formData.firstname} onChange={handleChange} required />
                
                </div>

                <div className="col-12 col-sm-6"><div className="font-color1">Last Name</div>
                
                <input type="text" className="form-control border-0" name="lastname"  value={formData.lastname} onChange={handleChange} required />
                </div>

                <div className="col-12 col-sm-6"><div className="font-color1">Phone Number</div>
               
                <input type="tel" className="form-control border-0" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required /> 
               
                </div>

                <div className="col-12 col-sm-6"><div className="font-color1">Address </div>
                
                <input type="text" className="form-control border-0" name="address" value={formData.address}  onChange={handleChange} required />
                
                </div>
                
                
                <div className="col-12 col-sm-6"><div className="font-color1">Time </div>
               
               <select name="type" value={formData.type} onChange={handleChange} className="form-select border-0" style={{height: 55}}>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>

             </div>
              
             <div className="col-12 col-sm-6"><div className="font-color1">Date </div>
                
                <div className="input-container" >
                  <label htmlFor="date-from">Pick a date</label>
                <input type="date"  name='date' className="form-control border-0"
               
                 value={formData.date}
                 onChange={handleChange}
                 min={getCurrentDate()}
                 required />
                </div>
               
 
                 </div>

               
                <div className="col-12 col-sm-6"><div className="font-color1">Specilalization </div>
                  
                  <select name="specialization" value={formData.specialization} onChange={handleChange} className="form-select border-0" style={{height: 55}}>
            <option value="Hardware Service">Hardware Service</option>
            <option value="Software Service">Software Service</option>
            <option value="Other">Other</option>
          </select>

                </div>
            
              
                <div className="col-12 col-sm-6"><div className="font-color1">Describe your Problem</div>
                <div class="col-12">
                
                <textarea name="description" class="form-control border-0" rows="5" cols="15" placeholder="Describe your qualification" value={formData.description} onChange={handleChange} />
               
                </div>
                </div>

                <div className="col-12">
                  <button className="btn btn-primary w-100 py-3" type="submit">Book Now</button>
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  </div>
  
  {/* Appointment End */}

 
  
  <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"><i className="bi bi-arrow-up" /></a>
      
  </Layout>  
    </div>
  
  );
};

export default BookingPage;
