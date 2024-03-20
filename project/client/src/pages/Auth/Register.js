import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import registrationImage from "./register.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validations (unchanged)

    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register ">
      <div className="form-container">
        <form
          onSubmit={handleSubmit}
          style={{
            borderRadius: "10px 10px 10px 10px",
          }}
        >
          <h4 className="title">REGISTER FORM</h4>

          <div className="row">
            {/* Image on the left side */}
            <div className="col-md-6">
              <img
                src={registrationImage}
                alt="Registration"
                className="img-fluid"
                style={{
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "10px 10px 10px 10px",
                }}
              />

              <span style={{ alignSelf: "center" }}>
                Already have an account?{" "}
                <NavLink to="/login">Login here</NavLink>
              </span>
            </div>

            {/* Form fields on the right side */}
            <div className="col-md-6">
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Name"
                  required
                  autoFocus
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Email "
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Your Password"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Phone"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Address"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Your favourite sport?"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className=" btn btn-primary"
            style={{ borderRadius: "40px" }}
          >
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
