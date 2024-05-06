import React, { useContext, useState } from "react";
import { Navigate, useLocation, useOutlet } from "react-router-dom";
import Navmenu from "../components/shared/NavMenu";
import Footer from "../components/shared/Footer";
import { AuthContext } from "../contexts/UserProvider";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  let location = useLocation();
  const outlet = useOutlet();
  const [size, setSize] = React.useState(false);

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <div>
      <Navmenu size={size} setSize={setSize} />
      {outlet}
      <Footer />
    </div>
  );
};

export default PrivateRoute;
