import React from "react";
import { Spinner } from "react-bootstrap";
import { MdArrowForwardIos } from "react-icons/md";
import useSubscription from "../../hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import useUserSubscription from "../../hooks/useUserSubscription";

const Subscription = () => {
  const [subsCriptions] = useSubscription();
  const [userSubscription, refetch] = useUserSubscription();
  const navigate = useNavigate();

  const buySubscription = (subscripiton) => {
    navigate("/buy-subscription", { state: subscripiton });
  };
  return (
    <div className="wrapper">
      <div className="content-wrapper" style={{ background: "unset" }}>
        <section className="content customize_list">
          <div className="container-fluid">
            <h3>Subscription Plan</h3>
            <h6>AVAILABLE PACKAGE</h6>

            <div className="row ">
              {subsCriptions?.map((subscripiton) => (
                <div
                  style={{
                    backgroundColor:
                      subscripiton?.packageDuration !== "1"
                        ? "#006666"
                        : "#EB6753",
                    color: "white",
                    width: "320px",
                  }}
                  className="col-lg-3 col-md-3 col-sm-12 mr-3 "
                >
                  <h5 className="text-danger bg-white mt-3 text-center py-2 ">
                    {subscripiton?.packageName}
                  </h5>
                  <div className="d-flex justify-items-center">
                    <MdArrowForwardIos
                      style={{
                        marginTop: "3px",
                      }}
                    />
                    <p>{subscripiton?.packageDuration} Month Package</p>
                  </div>
                  <div className="d-flex justify-items-center">
                    <MdArrowForwardIos
                      style={{
                        marginTop: "3px",
                      }}
                    />
                    <p>{subscripiton?.addedTotalRoom} </p>
                  </div>
                  <div className="d-flex justify-items-center">
                    <MdArrowForwardIos
                      style={{
                        marginTop: "3px",
                      }}
                    />
                    <p>Unlimited Bookings.</p>
                  </div>
                  <div className="d-flex justify-items-center">
                    <MdArrowForwardIos
                      style={{
                        marginTop: "3px",
                      }}
                    />
                    <p>Personal Payment Method.</p>
                  </div>
                  <div className="d-flex justify-items-center">
                    <MdArrowForwardIos
                      style={{
                        marginTop: "3px",
                      }}
                    />
                    <p>
                      {" "}
                      {subscripiton?.totalFeaturedRoom === "0"
                        ? "No Features Facilities."
                        : `Unlimited Features Facilities. (max ${subscripiton?.totalFeaturedRoom} room at a time `}
                    </p>
                  </div>
                  <div className="d-flex justify-items-center">
                    <MdArrowForwardIos
                      style={{
                        marginTop: "3px",
                      }}
                    />
                    <p>Price BDT {subscripiton?.packagePrice}</p>
                  </div>
                  <h5
                    className="text-danger bg-white text-center "
                    style={{
                      marginTop:
                        subscripiton?.totalFeaturedRoom !== "0"
                          ? "45px"
                          : "70px",
                    }}
                  >
                    <button
                      className="btn border-0"
                      onClick={() => buySubscription(subscripiton)}
                      disabled={
                        userSubscription?.find(
                          (s) =>
                            s?.packageId === subscripiton?._id &&
                            new Date(s?.packageEndDate) > new Date()
                        )
                          ? true
                          : false
                      }
                    >
                      {userSubscription?.find(
                        (s) =>
                          s?.packageId === subscripiton?._id &&
                          new Date(s?.packageEndDate) > new Date()
                      )
                        ? "Purchased"
                        : "Buy Package"}
                    </button>
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Subscription;
