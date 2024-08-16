import React from "react";
import "./Home.css";

import { AuthContext } from "../../contexts/UserProvider";
import { useContext } from "react";

import ManagerOrdersList from "../Orders/ManagerOrdersList";
import NewOrders from "../Orders/NewOrders";

const Homes = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user?.role === "manager" || user?.role === "partner" ? (
        <div className="mt-0">
          <ManagerOrdersList />
        </div>
      ) : (
        <div className="mt-0">
          <NewOrders />
        </div>
      )}
    </>
  );
};

export default Homes;
