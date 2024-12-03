import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Common/Navbar/Footer";
import Navbar from "../components/Common/Navbar/Navbar";

const Main = () => {
  return (
    <div>
      <>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </>
    </div>

    // <div
    //   style={{
    //     // display: "flex",
    //     // flexDirection: "column",
    //     minHeight: "100vh",
    //   }}
    // >
    //   {/* <h2 style={{ zIndex: "20" }}>xyzaiiuiuooooouuuuuuuuuuuuuuu</h2> */}
    //   <Navbar />
    //   <div style={{ minHeight: "100vh" }}>
    //     <Outlet />
    //   </div>

    //   <Footer />
    // </div>
  );
};

export default Main;
