import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getFromLocalStorage } from "../../../utils/local-storage";
import { authKey } from "../../../utils/storageKey";
import axios from "axios";
import { baseUrl } from "../../../utils/getBaseURL";
import toast, { Toaster } from "react-hot-toast";

const VillaBookingBills = ({
  data,
  refetch,
  showPaymentModal,
  setShowPaymentModal,
}) => {
  const dispatch = useDispatch();
  const dateInputRef = useRef(null);

  const [paymentType, setPaymentType] = useState("Cash");
  const [customerType, setCustomerType] = useState("Customer Type");
  const paymentOption = ["Additional Bills", "Make Payment"];
  const [paymentOptionValue, setPaymentOptionValue] = useState(0);
  const [receivedTk, setReciveTk] = useState(0);
  const [loading, setLoading] = useState(false);

  const [totalAmount, setTotalAmount] = useState(data?.pricing?.totalAmount);
  const [subTotal, setSubTotal] = useState(data?.pricing?.totalAmount || 0);
  const [foodCost, setFoodCost] = useState(data?.pricing?.foodCost || 0);
  const [adultCount, setAdultCount] = useState(data?.occupancy?.adult || 0);
  const [adultCost, setAdultCost] = useState(0);
  const [childCost, setChildCost] = useState(0);
  const [childCount, setChildCount] = useState(data?.occupancy?.child || 0);
  const [totalOccupancyCost, setTotalOccupancyCost] = useState(
    data?.pricing?.occupancyCharge || 0
  );
  const [discount, setDiscount] = useState(data?.pricing?.discount || 0);

  const [providerName, setProviderName] = useState("");
  const [noteForAdjustment, setNoteForAdjustment] = useState("");

  console.log(data);

  useEffect(() => {
    const totalAdultCost =
      adultCount *
      data?.villa?.pricing?.adultAddition *
      data?.rentDate?.daysDifference;
    setAdultCost(totalAdultCost);
    const totalChildCost =
      childCount *
      data?.villa?.pricing?.kidAddition *
      data?.rentDate?.daysDifference;
    setChildCost(totalChildCost);
    const occupancyCost = totalAdultCost + totalChildCost;
    setTotalOccupancyCost(occupancyCost);
    const initialSubTotal =
      data?.pricing?.initialAmount + foodCost + occupancyCost;
    setSubTotal(initialSubTotal);

    const finalTotal = initialSubTotal - discount;
    setTotalAmount(finalTotal);
  }, [
    adultCost,
    childCost,
    data?.rentDate?.daysDifference,
    data?.pricing?.initialAmount,
    foodCost,
    adultCount,
    childCount,
    data?.villa?.pricing?.adultAddition,
    data?.villa?.pricing?.kidAddition,
    discount,
  ]);

  const handleClose = () => setShowPaymentModal(false);

  const handleUpdateBills = async () => {
    try {
      const orderPayload = {
        pricing: {
          initialAmount: data?.pricing?.initialAmount,
          totalAmount,
          occupancyCharge: totalOccupancyCost,
          foodCost,
          discount,
        },
        occupancy: {
          child: childCount,
          adult: adultCount,
        },
      };

      // Get the access token
      const accessToken = getFromLocalStorage(authKey);
      // Set the headers
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      };

      const updatedData = await axios.patch(
        `${baseUrl}/api/villa-order/${data?._id}`,
        orderPayload,
        { headers }
      );

      if (updatedData?.data?.success) {
        toast.success(updatedData?.data?.message);
      }

      if (discount > 0) {
        const adjustmentPayload = {
          bookingId: data?.bookingId,
          orderId: data?._id,
          userId: data?.user?._id,
          resortId: data?.resort,
          adjustmentAmount: discount,
          providerName,
          noteForAdjustment,
        };
        const newAdjustment = await axios.post(
          `${baseUrl}/api/villa-order-adjustment`,
          adjustmentPayload,
          { headers }
        );
        console.log(newAdjustment);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal show={showPaymentModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <div className="">
            <div className="">
              <div className="d-flex gap-3">
                {paymentOption?.map((option, index) => (
                  <p
                    key={index}
                    style={{
                      // cursor: "pointer",
                      backgroundColor:
                        paymentOptionValue === index ? "#00BBB4" : "",
                      color: paymentOptionValue === index ? "white" : "",
                      cursor: "pointer",
                      padding: "5px",
                      border: "1px solid #00BBB4",
                    }}
                    className="fs-5 rounded"
                    onClick={() => setPaymentOptionValue(index)}
                  >
                    {option}
                  </p>
                ))}
              </div>

              {paymentOptionValue === 0 ? (
                <form
                  // onSubmit={handleUpdateBills}
                  style={{
                    // width: "90%",
                    // margin: "auto",
                    marginTop: "24px",
                  }}
                >
                  <div className="d-flex justify-content-between fs-5 ">
                    <p>Per Night Cost </p>
                    <p>:</p>
                    <p>BDT {data?.perNight}</p>
                  </div>
                  <div className="d-flex justify-content-between fs-5 ">
                    <p>Duration </p>
                    <p>:</p>
                    <p> {data?.rentDate?.daysDifference} Night</p>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between fs-5 ">
                    <p>Booking Charge </p>
                    <p>:</p>
                    <p>BDT {data?.pricing?.initialAmount} </p>
                  </div>

                  <div className="d-flex justify-content-between fs-5 ">
                    <p>Food Cost</p> <p>:</p>
                    <div className="d-flex justify-content-between fs-5 gap-3 ">
                      <p>BDT</p>
                      <input
                        type="number"
                        placeholder=""
                        id=""
                        style={{ width: "90px", height: "30px" }}
                        name="foodCost"
                        defaultValue={foodCost}
                        onChange={(e) => setFoodCost(Number(e.target.value))}
                      />{" "}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between fs-5 ">
                    <p>Occupancy</p> <p>:</p>
                    <div>
                      <div className="d-flex  fs-5 gap-2 ">
                        <p>Adult</p>
                        <input
                          type="number"
                          placeholder=""
                          id=""
                          defaultValue={adultCount}
                          style={{ width: "40px", height: "30px" }}
                          name="adultCount"
                          onChange={(e) => setAdultCount(e.target.value)}
                        />{" "}
                        <p>
                          * BDT {data?.villa?.pricing?.adultAddition} *{" "}
                          {data?.rentDate?.daysDifference} Night
                        </p>
                        <p> = </p>
                        <p>BDT {adultCost}</p>
                      </div>

                      <div className="d-flex  fs-5 gap-2 ">
                        <p>Child</p>
                        <input
                          type="number"
                          placeholder=""
                          id=""
                          min="0"
                          max="3"
                          defaultValue={childCount}
                          style={{ width: "40px", height: "30px" }}
                          name="childCount"
                          onChange={(e) => setChildCount(e.target.value)}
                        />{" "}
                        <p>
                          {" "}
                          * BDT {data?.villa?.pricing?.kidAddition} *{" "}
                          {data?.rentDate?.daysDifference} night
                        </p>
                        <p> = </p>
                        <p>BDT {childCost}</p>
                      </div>
                      <hr />
                      <p className="text-right">BDT {totalOccupancyCost}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fs-5 ">
                    <p> Sub Total </p>
                    <p>:</p>
                    <p>BDT {subTotal} </p>
                  </div>

                  <div className="d-flex justify-content-between fs-5 ">
                    <p>Discount</p> <p>:</p>
                    <div className="d-flex justify-content-between fs-5 gap-3 ">
                      <p>BDT</p>
                      <input
                        type="number"
                        placeholder=""
                        id=""
                        style={{ width: "90px", height: "30px" }}
                        name="discount"
                        defaultValue={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                      />{" "}
                    </div>
                  </div>

                  <hr />
                  <div className="d-flex justify-content-between fs-5 ">
                    <p> Total Amount </p>
                    <p>:</p>
                    <p>BDT {totalAmount} </p>
                  </div>
                  {discount > 0 && (
                    <div style={{ marginTop: "24px" }}>
                      <div>
                        <label htmlFor="" className="fs-5 fw-normal">
                          Provider Name
                        </label>
                        <br />
                        <input
                          type="text"
                          placeholder="Provider Name"
                          id=""
                          className="px-2 rounded mt-2"
                          style={{ width: "300px", height: "40px" }}
                          name="providerName"
                          value={providerName}
                          onChange={(e) => setProviderName(e.target.value)}
                          required
                        />
                        <br />
                        <label htmlFor="" className="fs-5 fw-normal mt-2">
                          Note For Discount:
                        </label>{" "}
                        <br />
                        <textarea
                          className="px-2 rounded"
                          placeholder="note"
                          style={{ width: "300px", height: "70px" }}
                          name="noteForAdjustment"
                          value={noteForAdjustment}
                          onChange={(e) => setNoteForAdjustment(e.target.value)}
                          required
                        ></textarea>
                      </div>
                    </div>
                  )}
                  <div className="d-flex justify-content-end  ">
                    <button
                      type="button"
                      onClick={handleUpdateBills}
                      style={{
                        width: "140px",
                        height: "40px",
                        backgroundColor: "#00BBB4",
                        border: "none",
                        color: "white",
                        margin: "16px 0px",
                      }}
                    >
                      Update Now
                    </button>
                  </div>
                </form>
              ) : (
                ""
              )}

              {paymentOptionValue === 1 ? (
                <form
                // onSubmit={handlePayment}
                >
                  <div className="d-flex gap-3 justify-items-center">
                    <div>
                      <label htmlFor="" className="fs-5 fw-normal">
                        Payment Date
                      </label>
                      <br />
                      <input
                        type="date"
                        ref={dateInputRef}
                        placeholder="Payment Date"
                        id=""
                        className="px-2 rounded"
                        style={{ width: "300px", height: "40px" }}
                        name="paymentDate"
                        min={new Date()}
                        required
                        onClick={() => dateInputRef.current?.showPicker()}
                      />
                    </div>

                    <div className="">
                      <label htmlFor="">Payment Method</label>
                      <br />
                      <select
                        name="paymentType"
                        id=""
                        className="rounded"
                        style={{
                          width: "150px",
                          height: "40px",
                          marginTop: "5px",
                        }}
                        required
                        onChange={(e) => setPaymentType(e.target.value)}
                        value={paymentType}
                      >
                        <option disabled value="">
                          Payment Type
                        </option>
                        <option value="Cash">Cash</option>
                        <option value="bkash">Bkash</option>
                        <option value="nagad">Nagad</option>
                        <option value="dutch">dutch-bangla</option>
                        <option value="bank">Bank</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="" className="fs-5 fw-normal">
                        Received Amount
                      </label>
                      <br />
                      <input
                        onChange={(e) => setReciveTk(e.target.value)}
                        type="number"
                        placeholder="Type Received Tk "
                        id=""
                        className="px-2 rounded"
                        style={{ width: "300px", height: "40px" }}
                        name="receivedTk"
                        required
                      />{" "}
                      <br />
                    </div>

                    <div>
                      <label htmlFor="" className="fs-5 fw-normal">
                        Customer Type
                      </label>
                      <br />
                      <select
                        style={{ width: "300px", height: "40px" }}
                        required
                        onChange={(e) => setCustomerType(e.target.value)}
                        defaultValue={customerType}
                      >
                        <option disabled>Customer Type</option>
                        <option value="Walk-in Guest">Walk-in Guest</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                      </select>
                    </div>
                    {customerType === "Monthly" || customerType === "Yearly" ? (
                      <div>
                        <label htmlFor="" className="fs-5 fw-normal">
                          Which of Month Payment
                        </label>
                        <br />
                        <select
                          style={{ width: "300px", height: "40px" }}
                          required
                          name="whichOfMonthPayment"
                        >
                          <option disabled>Which of Month Payment</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                      </div>
                    ) : (
                      ""
                    )}

                    {paymentType === "Payment Type" ? (
                      ""
                    ) : (
                      <>
                        {paymentType !== "Cash" && paymentType !== "bank" ? (
                          <>
                            <label htmlFor="" className="fs-5 fw-normal">
                              Payment Number
                            </label>
                            <br />
                            <input
                              type="text"
                              placeholder="Type Payment Number "
                              id=""
                              className="px-2 rounded mt-2"
                              style={{ width: "300px", height: "40px" }}
                              name="paymentNumber"
                              required
                            />
                            <br />
                            <label htmlFor="" className="fs-5 fw-normal">
                              Transaction Id
                            </label>
                            <br />
                            <input
                              type="text"
                              placeholder="Type Transaction Id"
                              id=""
                              className="px-2 rounded mt-2"
                              style={{ width: "300px", height: "40px" }}
                              name="transactionId"
                              required
                            />
                            <br />
                          </>
                        ) : (
                          ""
                        )}

                        {paymentType === "bank" ? (
                          <>
                            <label htmlFor="" className="fs-5 fw-normal">
                              Bank Name
                            </label>
                            <br />
                            <input
                              type="text"
                              placeholder="Type Bank Name 
                                                      "
                              id=""
                              className="px-2 rounded mt-2"
                              style={{ width: "300px", height: "40px" }}
                              name="bankName"
                              required
                            />
                            <br />
                            <label htmlFor="" className="fs-5 fw-normal">
                              Bank {`Holder's`} Name
                            </label>
                            <br />
                            <input
                              type="text"
                              placeholder="Type Holder's Name
                                                            "
                              id=""
                              className="px-2 rounded mt-2"
                              style={{ width: "300px", height: "40px" }}
                              name="bankHoldingName"
                              required
                            />
                            <br />
                          </>
                        ) : (
                          ""
                        )}
                        <label htmlFor="" className="fs-5 fw-normal">
                          Receiver Name
                        </label>
                        <br />
                        <input
                          type="text"
                          placeholder="Receiver Name"
                          id=""
                          className="px-2 rounded mt-2"
                          style={{ width: "300px", height: "40px" }}
                          name="receiverName"
                          required
                        />
                        <br />
                      </>
                    )}
                    <div>
                      <label htmlFor="" className="fs-5 fw-normal mt-2">
                        Note : (Optional)
                      </label>{" "}
                      <br />
                      <textarea
                        className="px-2 rounded"
                        placeholder="note"
                        style={{ width: "300px", height: "70px" }}
                        name="noteForTransaction"
                      ></textarea>
                      <br />
                    </div>
                  </div>

                  <input
                    type="submit"
                    className="mt-2 px-4 py-1 rounded text-white"
                    id=""
                    style={{
                      fontSize: "18px",
                      backgroundColor:
                        data?.totalReceiveTk === data?.payableAmount
                          ? "rgb(170 221 220)"
                          : "#00BBB4",
                      border: "none",
                    }}
                    disabled={
                      loading
                        ? true
                        : false || data?.totalReceiveTk === data?.payableAmount
                        ? true
                        : false
                    }
                  />
                </form>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <Toaster
          containerStyle={{ top: 300 }}
          toastOptions={{ position: "top-center" }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default VillaBookingBills;
