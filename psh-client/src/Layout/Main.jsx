import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navmenu from "../components/shared/NavMenu";
import Footer from "../components/shared/Footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./Main.css";

const Main = () => {
  const location = useLocation();
  const isProfileMenu = useSelector(
    (state) => state?.profileMenu?.isProfileMenu
  );

  const noHeaderFooter =
    location.pathname.includes("signin") ||
    location.pathname.includes("signup");

  // Page location top to path dependency
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isProfileMenu && !noHeaderFooter && <Navmenu />}

      <main className="flex-grow">
        <Outlet />
      </main>

      {!isProfileMenu && !noHeaderFooter && <Footer />}
    </div>
  );
};

export default Main;
