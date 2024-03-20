import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";

// Styles for the component
const styles = {
  container: {
    padding: "20px",
  },
  card: {
    marginBottom: "15px",
    padding: "15px",
    borderRadius: "5px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  userInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfoTitle: {
    fontWeight: "bold",
  },
};

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [totalUsers, setTotalUsers] = useState(0);
  const [employeeManagerCount, setEmployeeManagerCount] = useState(0);

  useEffect(() => {
    // Fetch total users count
    axios
      .get("http://localhost:8080/api/v1/auth/admin/count")
      .then((response) => setTotalUsers(response.data.userCount))
      .catch((error) => console.error("Error fetching total users count:", error));

    // Fetch employee managers count
    axios
      .get("http://localhost:8080/api/v1/auth/admin/users/employeeManager/count")
      .then((response) => setEmployeeManagerCount(response.data.employeeManagerCount))
      .catch((error) => console.error("Error fetching employee managers count:", error));
  }, []);

  return (
    <Layout>
      <div className="container-fluid" style={styles.container}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <p className="p-3">
              <div className="card w-75" style={styles.card}>
                <h3>Admin Name: {auth?.user?.name}</h3>
                <h3>Admin Email: {auth?.user?.email}</h3>
                <h3>Admin Contact: {auth?.user?.phone}</h3>
              </div>
            </p>
            <div className="card w-75" style={styles.card}>
              <h5>All Accounts</h5>
              <div className="card" style={styles.card}>
                <div className={styles.userInfo}>
                  <span style={styles.userInfoTitle}>Total Users:</span>
                  <span>{totalUsers}</span>
                </div>
              </div>
              <div className="card" style={styles.card}>
                <div className={styles.userInfo}>
                  <span style={styles.userInfoTitle}>Employee Managers:</span>
                  <span>{employeeManagerCount}</span>
                </div>
              </div>
            </div>
            {/* Add other cards or components as needed */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
