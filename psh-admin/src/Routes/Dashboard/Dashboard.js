import React from "react";
import { useOutlet } from "react-router-dom";

import Navbar from "../../components/Common/Navbar/Navbar";
import Footer from "../../components/Common/Navbar/Footer";

const Dashboard = ({ children }) => {
  // eslint-disable-next-line no-unused-vars

  const outlet = useOutlet();

  return (
    <div>
      <Navbar />
      {outlet}
      <Footer />
    </div>
  );
};

export default Dashboard;
