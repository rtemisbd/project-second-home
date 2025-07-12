import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { leftDate, rightDate } from "../../../redux/reducers/dateSlice";
import { addDays, addMonths, addYears, format, parse, subDays } from "date-fns";
import DatePicker from "react-datepicker";
import axios from "axios";
import { baseUrl } from "../../../utils/getBaseURL";

const CreateNewOrderForVilla = ({ id, user }) => {
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.dateCount.startDate);
  const endDate = useSelector((state) => state.dateCount.endDate);
  // const customerRent = useSelector((state) => state.dateCount.customerRent);

  const [villa, setVilla] = useState(null);
  const [rentDates, setRentDate] = useState(null);

  const [perNight, setPerNight] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [initialAmount, setInitialAmount] = useState(0);
  // const [payableAmount, setPayableAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [customerRent, setCustomerRent] = useState(1);

  const [dataForBooking, setDataForBooking] = useState({
    user: user?._id || "",
    fullName: user?.firstName || "",
    phone: user?.phone || "",
    address: user?.userAddress || "",
    validityType: user?.validityType || "",
    emergencyContactName: user?.emergencyContact?.contactName || "",
    emergencyRelationC: user?.emergencyContact?.relation || "",
    emergencyContact: user?.emergencyContact?.contactNumber || "",
  });

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
      const bookingData = {
        ...dataForBooking,
        villa: villa,
        resort: villa?.resortId?._id,

        perNight: villa?.pricing?.afterDiscountPerNight,
        pricing: {
          initialAmount,
          totalAmount,
          discount,
        },
        // payableAmount: totalAmount,
        minimumPayment: villa?.pricing?.advancePayment,
        rentDate: {
          bookStartDate: format(new Date(startDate), "dd-MM-yyyy"),
          bookEndDate: format(new Date(endDate), "dd-MM-yyyy"),
          daysDifference: customerRent,
        },
      };

      const { data } = await axios.post(
        `${baseUrl}/api/villa-order`,
        bookingData
      );
      // console.log(data);

      if (data?.success) {
        toast.success("Your booking has been placed.");
      }

      if (data?.data?.status === true) {
        toast.success("Booking Added!");
      }
    } catch (error) {
      // console.log(error);

      toast.error("Something is wrong");
    }
  };

  const parseDate = (dateStr) => {
    if (typeof dateStr === "string") {
      const [day, month, year] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day); // Month is 0-indexed
    } else if (dateStr instanceof Date) {
      return dateStr;
    } else {
      return new Date(); // fallback
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/villa/${id}`);

        setVilla(data?.data?.villa);
        setPerNight(data?.data?.villa?.pricing?.perNight);
        setRentDate(data?.data?.bookedDates);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);
  // durations
  useEffect(() => {
    console.log({ startDate, endDate });

    if (startDate && endDate) {
      const start = parseDate(startDate);
      const end = parseDate(endDate);
      console.log({ start, end });

      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setCustomerRent(diffDays);
    }
  }, [startDate, endDate]);

  // calculations

  useEffect(() => {
    if (customerRent && perNight) {
      const initialAmount = customerRent * perNight;
      setInitialAmount(initialAmount);

      const total = initialAmount - discount;
      setTotalAmount(total);

      // const payable = initialAmount;
      // setPayableAmount(payable);
    }
  }, [customerRent, perNight, discount]);

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

                  {/* <div>
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
                  </div> */}
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
          {/* about villa*/}

          <p
            className=" d-flex justify-content-start  "
            style={{
              backgroundColor: "#FCA22A",
              color: "white",
              padding: "3px 5px ",
              borderRadius: "5px",
              width: "100%",
            }}
          >
            <h4>
              {villa?.title} - {villa?.villaNumber}
            </h4>
          </p>
          <hr />

          <div
            style={{
              width: "80%",
            }}
          >
            {/* check in check out */}
            <div className="d-flex justify-content-between gap-3 total-area text-black px-2 mt-3">
              <div>
                <p className="text-left font-bold mb-1">Check-In</p>
                <DatePicker
                  selected={new Date(startDate)}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => dispatch(leftDate(date))}
                  excludeDateIntervals={rentDates?.map((rent) => {
                    const start = parse(
                      rent?.bookStartDate,
                      "dd-MM-yyyy",
                      new Date()
                    );
                    const end = parse(
                      rent?.bookEndDate,
                      "dd-MM-yyyy",
                      new Date()
                    );
                    return {
                      start: subDays(start, 0),
                      end: addDays(end, -1),
                    };
                  })}
                  minDate={subDays(new Date(), 0)}
                  className={`ps-7 w-[124px] `}
                  dayClassName={(date) =>
                    rentDates.some((rent) => {
                      const start = parse(
                        rent.bookStartDate,
                        "dd-MM-yyyy",
                        new Date()
                      );
                      const end = parse(
                        rent.bookEndDate,
                        "dd-MM-yyyy",
                        new Date()
                      );
                      return (
                        date >= subDays(start, 0) && date <= addDays(end, -1)
                      );
                    })
                      ? "line-through"
                      : ""
                  }
                />
              </div>
              <div>
                <p className="text-left font-bold mb-1">Check-Out</p>
                <DatePicker
                  selected={new Date(endDate)}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => dispatch(rightDate(date))}
                  excludeDateIntervals={rentDates?.map((rent) => {
                    const start = parse(
                      rent.bookStartDate,
                      "dd-MM-yyyy",
                      new Date()
                    );
                    const end = parse(
                      rent.bookEndDate,
                      "dd-MM-yyyy",
                      new Date()
                    );
                    return {
                      start: subDays(start, 0),
                      end: addDays(end, -1),
                    };
                  })}
                  className="ps-7 w-[124px] "
                  dayClassName={(date) =>
                    rentDates.some((rent) => {
                      const start = parse(
                        rent.bookStartDate,
                        "dd-MM-yyyy",
                        new Date()
                      );
                      const end = parse(
                        rent.bookEndDate,
                        "dd-MM-yyyy",
                        new Date()
                      );
                      return (
                        date >= subDays(start, 0) && date <= addDays(end, -1)
                      );
                    })
                      ? "line-through"
                      : ""
                  }
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
                  value={` ${customerRent} Nights`}
                  disabled
                />
              </div>
            </div>
            {/* calculation */}
            <div className="text-black pr-3 mt-3 fw-medium">
              <div className="d-flex justify-content-between ">
                <div className="ml-5 ">
                  <p>Rent Per Night</p>
                </div>
                <p>BDT {perNight}</p>
              </div>

              <hr className="mt-3 ml-5 text-black" />
              <div className="d-flex justify-content-between mt-2">
                <p className="ml-5">Sub Total</p>
                <p>BDT {initialAmount}</p>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <p className="ml-5">
                  {" "}
                  {discount ? "Previous Adjustment" : "Discount"}{" "}
                </p>
                <p>BDT {discount}</p>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <p className="ml-5"> Total Amount</p>
                <p>BDT {totalAmount}</p>
              </div>

              <div className="d-flex justify-content-between text-danger">
                <div className="ml-5 ">
                  <p className=" fw-bold">Minimum Payment</p>
                </div>
                <p> BDT {villa?.pricing?.advancePayment}</p>
              </div>
            </div>
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

export default CreateNewOrderForVilla;
