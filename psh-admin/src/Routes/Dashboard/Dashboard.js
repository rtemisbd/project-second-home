import React, { useContext } from "react";
import { useOutlet } from "react-router-dom";

import { AuthContext } from "../../contexts/UserProvider";
import Navbar from "../../components/Common/Navbar/Navbar";
import Footer from "../../components/Common/Navbar/Footer";

const Dashboard = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useContext(AuthContext);
  const outlet = useOutlet();
  // if (!user) {
  //   // user is not authenticated
  //   return <Navigate to="/login" />;
  // }
  return (
    <div>
      <Navbar />
      {outlet}
      <Footer />
    </div>
  );
};

export default Dashboard;
