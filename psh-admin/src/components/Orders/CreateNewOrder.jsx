import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/getBaseURL";
import { useDispatch, useSelector } from "react-redux";
import { leftDate, rightDate, toTalRent } from "../../redux/reducers/dateSlice";
import { addDays, addMonths, addYears, subDays } from "date-fns";
import DatePicker from "react-datepicker";
import useExtraCharge from "../../hooks/useExtraCharge";

import toast, { Toaster } from "react-hot-toast";
import useCategory from "../../hooks/useCategory";
import CreateNewOrderForVilla from "../../pages/resort-admin/booking-overview/CreateNewOrderForVilla";

const CreateNewOrder = ({ category, id, user }) => {
  const [extraCharge] = useExtraCharge();
  const { categories } = useCategory();

  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.dateCount.startDate);
  const endDate = useSelector((state) => state.dateCount.endDate);
  const customerRent = useSelector((state) => state.dateCount.customerRent);

  const [room, setRoom] = useState(null);
  const [rentDates, setRentDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isIncludeFood, setIsIncludeFood] = useState(false);

  const [payableAmount, setPayableAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [foodAmount, setFoodAmount] = useState();
  const [vatTax, setVatTax] = useState(
    (subTotal * extraCharge[0]?.vatTax) / 100
  );
  const [addMissionFee, setAddMissionFee] = useState(0);
  const [securityFee, setSecurityFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [minimumPayment, setMinimumPayment] = useState(0);

  const [dataForBooking, setDataForBooking] = useState({
    bookingExtend: false,
    userId: user?._id || "",
    fullName: user?.firstName || "",
    phone: user?.phone || "",
    address: user?.userAddress || "",
    validityType: user?.validityType || "",
    emergencyContactName: user?.emergencyContact?.contactName || "",
    emergencyRelationC: user?.emergencyContact?.relation || "",
    emergencyContact: user?.emergencyContact?.contactNumber || "",
    arrivalTime: "09 AM To 10 AM",
  });

  // get month Last Day
  function getLastDayOfMonth() {
    const today = new Date(startDate);
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed, so we add 1.
    const lastDay = new Date(year, month, 0).getDate(); // Setting day to 0 gets the last day of the previous month.
    return lastDay;
  }

  useEffect(() => {
    const select = categories.find((item) => item._id === category);
    setSelectedCategory(select);
  }, [category, categories]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCategory.name !== "Shared Room") {
          const { data } = await axios.get(`${baseUrl}/api/property/${id}`);
          setRoom(data?.property);
          setRentDate(data?.rentRooms);
        } else {
          const { data } = await axios.get(`${baseUrl}/api/seats/${id}`);
          setRoom(data?.data?.seat);
          setRentDate(data?.data?.rentRooms);
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id, selectedCategory]);

  useEffect(() => {
    dispatch(toTalRent());
    if (customerRent.remainingDays < 1) {
      dispatch(rightDate(addDays(new Date(startDate), 1)));
    }
  }, [startDate, customerRent.remainingDays, dispatch, endDate]);

  useEffect(() => {
    // amount calculation
    // subtotal
    if (
      customerRent?.remainingDays &&
      customerRent?.months === undefined &&
      customerRent?.years === undefined
    ) {
      setSubTotal(room?.dAmountForDay * customerRent?.remainingDays);
    } else if (customerRent?.months >= 1 && customerRent?.years === undefined) {
      setSubTotal(
        room?.dAmountForMonth * customerRent?.months +
          room?.dAmountForDay * customerRent?.days
      );
    } else {
      setSubTotal(room?.dAmountForYear * customerRent?.years);
    }

    // set vat
    if (subTotal) {
      const getVatTax = (subTotal * extraCharge[0]?.vatTax) / 100;
      setVatTax(parseInt(getVatTax));
    }

    // set security, admission, minimum , food amount
    if (
      customerRent.remainingDays &&
      (customerRent?.months === undefined || customerRent?.months <= 1) &&
      customerRent?.years === undefined
    ) {
      const minimum = 500;
      setMinimumPayment((minimum * extraCharge[0]?.vatTax) / 100 + minimum);
      setAddMissionFee(0);
      setSecurityFee(0);
    } else if (
      customerRent?.months >= 2 &&
      customerRent?.months < 6 &&
      customerRent?.years === undefined
    ) {
      setMinimumPayment(extraCharge[0]?.securityFee);
      setAddMissionFee(extraCharge[0]?.admissionFee);
      setSecurityFee(extraCharge[0]?.securityFee);
    } else if (customerRent?.months >= 6 && customerRent?.years === undefined) {
      setMinimumPayment(extraCharge[0]?.upto6MonthsSecurityFee);
      setAddMissionFee(extraCharge[0]?.upto6MonthsAdmissionFee);
      setSecurityFee(extraCharge[0]?.upto6MonthsSecurityFee);
    } else if (customerRent?.years !== undefined) {
      setMinimumPayment(extraCharge[0]?.for1YearSecurityFee);
      setAddMissionFee(extraCharge[0]?.for1YearAdmissionFee);
      setSecurityFee(extraCharge[0]?.for1YearSecurityFee);
    } else {
      setMinimumPayment(room?.minimumPayment);
    }

    // set food amount
    if (isIncludeFood) {
      setFoodAmount(room?.branch?.foodAmount * customerRent.remainingDays);
    } else {
      setFoodAmount(0);
    }
    // set total amount
    setTotalAmount(
      subTotal + foodAmount + vatTax + addMissionFee + securityFee
    );

    setPayableAmount(totalAmount);
  }, [
    room,
    addMissionFee,
    customerRent,
    extraCharge,
    foodAmount,
    isIncludeFood,
    securityFee,
    subTotal,
    totalAmount,
    vatTax,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataForBooking((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handle booking
  const handleBooking = async () => {
    try {
      const bookingInfo = {
        subTotal,
        foodAmount,
        isIncludeFood,
        vatTax,
        totalAmount,
        payableAmount,
        roomId: id,
        roomName: room?.name,
        roomNumber: room?.roomNumber,
        roomType: room?.category?.name,
        seatBooking: room?.category?.name === "Shared Room" ? room : null,
        branch: room?.branch,
        rentDate: {
          bookStartDate: new Date(startDate).toISOString().split("T")[0],
          bookEndDate: new Date(endDate).toISOString().split("T")[0],
        },
        customerRent,
      };
      dataForBooking.bookingInfo = bookingInfo;
      dataForBooking.branch = room?.branch?._id;
      dataForBooking.totalAmount = totalAmount;
      dataForBooking.payableAmount = payableAmount;

      const { data } = await axios.post(
        `${baseUrl}/api/bkash/payment/create`,
        { amount: null, dataForBooking, selectMethod: "cash" },
        { withCredentials: true }
      );

      if (data?.data?.status === true) {
        toast.success("Booking Added!");
      }
    } catch (error) {
      toast.error("Something is wrong");
    }
  };

  if (selectedCategory?.name === "Villa") {
    return <CreateNewOrderForVilla id={id} user={user} />;
  }
  return (
    <div className="content customize_list">
      <h2>Create new order</h2>
      <hr />
      <div style={{ display: "flex", gap: "120px" }}>
        <div
          style={{
            width: "60%",
            padding: "30px",
          }}
        >
          {/* information */}
          <div className="">
            <div>
              <h4>
                Personal Information <span className="text-red-500">*</span>
              </h4>

              <div>
                <div
                  style={{
                    display: "flex",
                    gap: "120px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <label htmlFor="Full Name">Name</label> <br />
                    <input
                      placeholder="Your Full Name *"
                      type="text"
                      name="firstName"
                      defaultValue={user ? user?.firstName : ""}
                      required
                      disabled
                      style={{
                        height: "40px",
                        padding: "0px 10px",
                        borderRadius: "5px",
                        width: "280px",
                      }}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="Phone Number">Mobile Number</label> <br />
                    <input
                      type="text"
                      placeholder="Phone Number *"
                      name="phone"
                      required
                      disabled
                      defaultValue={user ? user?.phone : ""}
                      style={{
                        height: "40px",
                        padding: "0px 10px",
                        borderRadius: "5px",
                        width: "280px",
                      }}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "120px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <label htmlFor="Address">Address</label> <br />
                    <input
                      type="text"
                      placeholder="Address "
                      name="address"
                      defaultValue={user ? user?.userAddress : ""}
                      value={user?.address}
                      style={{
                        height: "40px",
                        padding: "0px 10px",
                        borderRadius: "5px",
                        width: "280px",
                        background: "#F7F7F7",
                        border: "1px solid #CCC",
                      }}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="">Choose Your Identity Verification</label>{" "}
                    <br />
                    <select
                      style={{
                        height: "40px",
                        padding: "0px 10px",
                        borderRadius: "5px",
                        width: "280px",
                        background: "#F7F7F7",
                        border: "1px solid #CCC",
                      }}
                      name="validityType"
                      onChange={handleInputChange}
                      defaultValue={user?.validityType}
                      // disabled={user?.validityType ? true : false}
                      // required={validityType === "Select One"}
                      required
                    >
                      <option selected>Select One</option>
                      <option
                        selected={user?.validityType === "National ID Card"}
                        value="National ID Card"
                      >
                        National ID Card
                      </option>
                      <option
                        selected={user?.validityType === "Passport"}
                        value="Passport"
                      >
                        Passport
                      </option>
                      <option
                        selected={user?.validityType === "Driving Licence"}
                        value="Driving Licence"
                      >
                        Driving Licence
                      </option>
                      <option
                        selected={user?.validityType === "Birth Certificate"}
                        value="Birth Certificate"
                      >
                        Birth Certificate
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Emargency Details */}
            <div>
              <h4>
                Guardian Information <span className="text-red-500">*</span>
              </h4>

              <div
                style={{
                  display: "flex",
                  gap: "120px",
                  marginBottom: "24px",
                }}
              >
                <div>
                  <label htmlFor="Contact Name">Name</label> <br />
                  <input
                    placeholder="Guardian Contact Name *"
                    type="text"
                    name="emergencyContactName"
                    defaultValue={user?.emergencyContact?.contactName}
                    style={{
                      height: "40px",
                      padding: "0px 10px",
                      borderRadius: "5px",
                      width: "280px",
                      background: "#F7F7F7",
                      border: "1px solid #CCC",
                    }}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="Relationship">Relationship</label> <br />
                  <input
                    placeholder="Relationship *"
                    type="text"
                    name="emergencyRelationC"
                    style={{
                      height: "40px",
                      padding: "0px 10px",
                      borderRadius: "5px",
                      width: "280px",
                      background: "#F7F7F7",
                      border: "1px solid #CCC",
                    }}
                    defaultValue={user?.emergencyContact?.relation}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="Contact Number">Mobile Number</label> <br />
                <input
                  type="text"
                  placeholder="Guardian Contact Number *"
                  name="emergencyContact"
                  required
                  defaultValue={user?.emergencyContact?.contactNumber}
                  style={{
                    height: "40px",
                    padding: "0px 10px",
                    borderRadius: "5px",
                    width: "280px",
                    background: "#F7F7F7",
                    border: "1px solid #CCC",
                  }}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* booking */}
        <div
          className="px-3 pt-3 "
          style={{
            boxShadow: "0px 0px 5px 3px #CCC",
            borderRadius: "5px",
            width: "35%",
          }}
        >
          {/* about room*/}
          <h4 className="text-left " style={{ color: "#212A42" }}>
            {room?.name} - {room?.roomNumber}
          </h4>

          <p
            className=" d-flex justify-content-start "
            style={{
              backgroundColor: "#FCA22A",
              color: "white",
              padding: "3px 5px ",
              borderRadius: "5px",
              width: "45%",
            }}
          >
            {room?.category?.name}-[{room?.branch?.name}]
          </p>
          <hr />

          <div
            style={{
              width: "80%",
            }}
          >
            {/* day month year */}
            <div className="mx-2">
              <ul className="d-flex justify-content-between list-unstyled calcaulation">
                <li className=" border py-1">
                  <span
                    onClick={() =>
                      dispatch(rightDate(addDays(new Date(startDate), 1)))
                    }
                    className={` px-5 py-2 ${
                      customerRent.remainingDays < getLastDayOfMonth() &&
                      customerRent.years === undefined
                        ? "dmyActive "
                        : "text-black"
                    }`}
                  >
                    Day
                  </span>
                </li>
                <li className=" border py-1">
                  <span
                    onClick={() =>
                      dispatch(rightDate(addMonths(new Date(startDate), 1)))
                    }
                    className={` px-5 py-2 ${
                      customerRent.remainingDays >= getLastDayOfMonth() &&
                      customerRent.years === undefined
                        ? "dmyActive "
                        : "text-black"
                    }`}
                  >
                    Month
                  </span>
                </li>
                <li className=" border py-1">
                  <span
                    onClick={() =>
                      customerRent.years === undefined
                        ? dispatch(rightDate(addYears(new Date(endDate), 1)))
                        : ""
                    }
                    className={` px-5 py-2 ${
                      customerRent.years >= 1 ? "dmyActive " : "text-black"
                    }`}
                  >
                    Year
                  </span>
                </li>
              </ul>
            </div>
            {/* check in check out */}
            <div className="d-flex justify-content-between gap-3 total-area text-black px-2 mt-3">
              <div>
                <p className="text-left font-bold mb-1">Check-In</p>
                <DatePicker
                  selected={new Date(startDate)}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => dispatch(leftDate(date))}
                  excludeDateIntervals={rentDates?.map((rent) => {
                    return {
                      start: subDays(new Date(rent?.bookStartDate), 1),
                      end: addDays(new Date(rent?.bookEndDate), 0),
                    };
                  })}
                />
              </div>
              <div>
                <p className="text-left font-bold mb-1">Check-Out</p>
                <DatePicker
                  selected={new Date(endDate)}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => dispatch(rightDate(date))}
                  excludeDateIntervals={rentDates?.map((rent) => {
                    return {
                      start: subDays(new Date(rent?.bookStartDate), 1),
                      end: addDays(new Date(rent?.bookEndDate), 0),
                    };
                  })}
                />
              </div>
            </div>
            {/* total duration */}
            <div className="d-flex justify-content-between mt-3 justify-items-center pl-5">
              <p className="text-left fw-bold mb-1 ">Total Duration = </p>
              <div>
                <input
                  className="pl-2"
                  type="text"
                  style={{ width: "95%", height: "30px" }}
                  value={`${
                    customerRent?.daysDifference >= 0
                      ? `${customerRent?.daysDifference} night`
                      : "" ||
                        (customerRent?.months &&
                          customerRent?.days >= 0 &&
                          !customerRent?.years)
                      ? `${customerRent?.months} months, ${customerRent?.days} night`
                      : "" ||
                        (customerRent?.years &&
                          customerRent?.months >= 0 &&
                          customerRent?.days >= 0)
                      ? `${customerRent?.years} year`
                      : ""
                  }`}
                  disabled
                />
              </div>
            </div>
            {/* calculation */}
            <div className="text-black pr-3 mt-3 fw-medium">
              <div className="d-flex justify-content-between ">
                <div className="ml-5 ">
                  <p>Rent</p>
                </div>
                <p>BDT {subTotal}</p>
              </div>
              {isIncludeFood ? (
                <div className="d-flex justify-content-between ">
                  <div className="ml-5 ">
                    <p>Food</p>
                  </div>
                  <p>BDT {foodAmount}</p>
                </div>
              ) : (
                ""
              )}
              <div className="d-flex justify-content-between">
                <div className="ml-5 ">
                  <p>VAT</p>
                </div>

                <p> + BDT {vatTax}</p>
              </div>
              {customerRent.months >= 1 || customerRent.years ? (
                <div className="d-flex justify-content-between ">
                  <div className="ml-5 ">
                    <p>Admission Fee</p>
                  </div>
                  <p>BDT {addMissionFee}</p>
                </div>
              ) : (
                ""
              )}
              {customerRent.months >= 1 || customerRent.years ? (
                <div className="d-flex justify-content-between ">
                  <div className="ml-5">
                    <p>Security Fee</p>
                  </div>
                  <p>BDT {securityFee}</p>
                </div>
              ) : (
                ""
              )}

              <hr className="mt-2 ml-5 text-black" />
              <div className="d-flex justify-content-between mt-1">
                <p className="ml-5">Total Amount</p>
                <p>BDT {totalAmount}</p>
              </div>

              <div className="d-flex justify-content-between mt-1">
                <p className="ml-5">Payable Amount</p>
                <p>BDT {payableAmount}</p>
              </div>
              {(customerRent?.months >= 2 &&
                customerRent?.years === undefined) ||
              (customerRent?.months === 0 &&
                customerRent?.years !== undefined) ? (
                <div className="d-flex justify-content-between">
                  <div className="ml-5">
                    <p className="text-danger fw-bold">Advance Payment</p>
                  </div>
                  <p> BDT {minimumPayment}</p>
                </div>
              ) : (
                ""
              )}

              <div
                className={`d-flex justify-content-between ${
                  (customerRent?.months >= 2 &&
                    customerRent?.years === undefined) ||
                  (customerRent?.months === 0 && customerRent?.years >= 1)
                    ? "d-none"
                    : "d-block"
                }`}
              >
                <div className="ml-5 d-flex justify-items-center ">
                  <p className="text-danger fw-bold">Minimum Payment</p>
                </div>
                <p> BDT {minimumPayment}</p>
              </div>
            </div>

            {/* add food */}
            {room?.branch?.foodAmount === 0 ||
            room?.category?.name === "Home-Stay" ? (
              ""
            ) : (
              <div className="d-flex gap-3 ms-3">
                <input
                  style={{
                    cursor: "pointer",
                  }}
                  type="checkbox"
                  name="terms"
                  id="food"
                  defaultChecked={isIncludeFood}
                  onClick={() => setIsIncludeFood(!isIncludeFood)}
                />
                <label
                  htmlFor="food"
                  style={{
                    cursor: "pointer",
                    marginTop: "8px",
                  }}
                >
                  Including Foods (2 Meals in a Day)
                </label>{" "}
                <br />
              </div>
            )}
          </div>

          <div
            className={` d-flex justify-content-center justify-items-center my-3 `}
            style={{
              backgroundColor: "#35B0A7",
            }}
          >
            <div>
              <button onClick={handleBooking}>Confirm Booking</button>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        containerStyle={{ top: 200, zIndex: "100000" }}
        toastOptions={{ position: "top-center" }}
      ></Toaster>
    </div>
  );
};

export default CreateNewOrder;
