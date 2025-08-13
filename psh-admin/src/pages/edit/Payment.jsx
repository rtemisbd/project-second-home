import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import "./Payment.css";
import { useDispatch } from "react-redux";
import { placeLoadingShow } from "../../redux/reducers/loadingStateSlice";

// import LoadingState from "../LoadingState/LoadingState";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { baseUrl } from "../../utils/getBaseURL";

const Payment = ({
  data,
  refetch,
  // isLoading,
  showPaymentModal,
  setShowPaymentModal,
}) => {
  console.log(data);

  const dispatch = useDispatch();
  const dateInputRef = useRef(null);

  // const isLoadingState = useSelector(
  //   (state) => state?.loadingModal?.isLoadingState
  // );
  const [paymentType, setPaymentType] = useState("Cash");
  const [customerType, setCustomerType] = useState("Customer Type");
  const paymentOption = ["Receive", "Adjustment"];
  const [paymentOptionValue, setPaymentOptionValue] = useState(0);
  const [adjustmentAmount, setAdjustmentAmount] = useState(0);
  const [receivedTk, setReciveTk] = useState(0);
  const [loading, setLoading] = useState(false);
  const closeButtonRef = useRef(null);
  const handleClickCloseButton = () => {
    // Check if the closeButtonRef exists
    if (closeButtonRef.current) {
      // Trigger the click event on the close button
      closeButtonRef.current.click();
    }
  };
  // for Update Payment Status
  useEffect(() => {
    refetch();
  }, [data?.payableAmount, data?.totalReceiveTk, refetch]);

  console.log(data);

  const handlePayment = async (e) => {
    e.preventDefault();

    // if (paymentType === "Payment Type") {
    //   return toast.warn("Please Select Payment Type");
    // }
    if (customerType === "Customer Type") {
      return toast.warn("Please Select Customer Type");
    }
    if (Number(receivedTk) === 0) {
      return toast.warn(`Sorry ! 0 Tk Receive Not Acceptable`);
    }

    const dueAmount =
      data?.payableAmount - (data?.totalReceiveTk + Number(receivedTk));

    // if (data?.dueAmount < Number(receivedTk)) {
    //   return toast.warn(`Sorry ! Your Due ${data?.dueAmount}`);
    // }

    if (data?.payableAmount === data?.totalReceiveTk) {
      return toast.warn(`Sorry ! This Order Payment Already Paid`);
    }
    if (data?.payableAmount < Number(receivedTk)) {
      return toast.warn(`Sorry Your Total Tk ${data?.payableAmount}`);
    }
    setLoading(true);
    const receivedPayment = {
      orderId: data?._id,
      branch: data?.branch,
      paymentDate: e.target?.paymentDate?.value,
      customerType: customerType,
      whichOfMonthPayment: e.target?.whichOfMonthPayment?.value,
      totalAmount: data?.bookingInfo?.totalAmount,
      payableAmount: data?.payableAmount,
      // discount: data?.discount,
      receivedTk: Number(receivedTk),
      dueAmount: dueAmount,
      totalReceiveTk: data?.totalReceiveTk + Number(receivedTk),
      paymentType: paymentType,
      // paymentStatus: "Unpaid",
      paymentNumber: e.target?.paymentNumber?.value,
      transactionId: e.target?.transactionId?.value,
      bankName: e.target?.bankName?.value,
      bankHoldingName: e.target?.bankHoldingName?.value,
      receiverName: e.target?.receiverName?.value,
      acceptableStatus: paymentType === "Cash" ? "Accepted" : "Pending",
      noteForTransaction: e.target?.noteForTransaction?.value,
      userId: data?.userId,
      userPhone: data?.phone,
      userName: data?.fullName,
    };

    try {
      dispatch(placeLoadingShow(true));
      const { data } = await axios.post(
        `${baseUrl}/api/transaction`,
        receivedPayment
      );

      // await axios.patch(`${baseUrl}/api/order/${data?._id}`, receivedPayment, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      e.target.reset();
      setLoading(false);
      // dispatch(placeLoadingShow(false));
      handleClose();
      if (data.success) {
        toast.success("Payment Successfully Done");
        refetch();
        handleClickCloseButton();
      }
    } catch (error) {
      // dispatch(placeLoadingShow(false));
      handleClose();
      toast.error(error?.response?.data?.message);
    }
  };

  // Handle Adjustment Request
  const handleAdjustment = async (e) => {
    e.preventDefault();

    const noteForAdjustment = e.target.noteForAdjustment.value;
    // const adjustmentAmount = parseInt(e.target.discount.value);

    //If Discount Amount <= 0
    if (Number(adjustmentAmount) <= 0) {
      return toast.warn(`Sorry ! 0 Tk Adjustment Not Acceptable`);
    }

    // Validation for Due Amount
    if (data?.dueAmount < Number(adjustmentAmount)) {
      return toast.warn(`Sorry ! Your Due ${data?.dueAmount}`);
    }

    //If Discount Amount > payable Amount
    if (data?.payableAmount < Number(adjustmentAmount)) {
      return toast.warn(
        `Sorry ! Your Payable Amount ${
          data?.payableAmount
        } But you give have discount ${Number(adjustmentAmount)}`
      );
    }
    setLoading(true);
    const adjustment = {
      booking: data?._id,
      branch: data?.bookingInfo?.branch,
      userId: data?.userId,
      adjustmentAmount: adjustmentAmount,
      noteForAdjustment: noteForAdjustment,
    };

    try {
      dispatch(placeLoadingShow(true));
      const { data } = await axios.post(
        `${baseUrl}/api/adjustment`,
        adjustment
      );
      setLoading(false);

      handleClose();
      if (data.success) {
        toast.success("Request Success");
        refetch();
        handleClickCloseButton();
      }

      // await axios.patch(`${baseUrl}/api/order/${data._id}`, adjustment, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // setLoading(false);
      // handleClose();
      // toast.success("Request Success");
      // refetch();
      // handleClickCloseButton();
    } catch (error) {
      handleClose();
      toast.error(error.response.data.message);
    }
    e.target.reset();
  };

  const handleClose = () => setShowPaymentModal(false);
  return (
    <>
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
                  <form onSubmit={handlePayment}>
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
                      {customerType === "Monthly" ||
                      customerType === "Yearly" ? (
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
                          : false ||
                            data?.totalReceiveTk === data?.payableAmount
                          ? true
                          : false
                      }
                    />
                  </form>
                ) : (
                  ""
                )}

                {paymentOptionValue === 1 ? (
                  <form onSubmit={handleAdjustment}>
                    <div>
                      <label htmlFor="" className="fs-5 fw-normal">
                        Adjustment Amount :
                      </label>{" "}
                      <br />
                      <input
                        type="text"
                        placeholder="Adjustment Amount"
                        id=""
                        className="px-2 rounded"
                        style={{ width: "300px", height: "40px" }}
                        name="discount"
                        onChange={(e) =>
                          setAdjustmentAmount(parseInt(e.target.value))
                        }
                      />{" "}
                      <br />
                    </div>
                    <div>
                      <label htmlFor="" className="fs-5 fw-normal mt-2">
                        Note :
                      </label>{" "}
                      <br />
                      <textarea
                        className="px-2 rounded"
                        placeholder="note"
                        style={{ width: "300px", height: "70px" }}
                        name="noteForAdjustment"
                        required
                      ></textarea>
                      <br />
                    </div>
                    <div className="mt-3">
                      <div className="text-right total-amount-right font-[600] ">
                        <div className="d-flex ">
                          <p className="fw-bold">Total :</p>

                          <p className="ms-5">{data?.totalAmount} Tk</p>
                        </div>
                        <div className="d-flex ">
                          <p className="fw-bold">Already Discount :</p>

                          <p className=" ms-5">
                            {data?.adjustments[0]?.totatAdjustmentAmount || 0}{" "}
                            Tk
                          </p>
                        </div>
                        <div className="d-flex ">
                          <p className="fw-bold">Payable :</p>

                          <p className=" ms-5">
                            {data?.totalAmount -
                              (data?.adjustments[0]?.totatAdjustmentAmount ||
                                0)}{" "}
                            Tk
                          </p>
                        </div>

                        <div className="paid-amount d-flex ">
                          <p className="fw-bold ">Receive :</p>
                          <p className=" ms-5">
                            {" "}
                            {data?.transactions[0]?.totalReceiveTk} Tk
                          </p>
                        </div>

                        <div className="paid-amount d-flex ">
                          <p
                            className="fw-bold "
                            style={{
                              color: data?.dueAmount > 0 ? "red" : "",
                            }}
                          >
                            Due :
                          </p>

                          <p className=" text-[12px] ms-5">
                            {data?.dueAmount} Tk
                          </p>
                        </div>
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="mt-2 px-4 py-1 rounded text-white"
                      id=""
                      style={{
                        fontSize: "18px",
                        backgroundColor:
                          data?.totalReceiveTk === data?.payableAmount ||
                          data?.isAdjustmentRQ === "Yes"
                            ? "rgb(170 221 220)"
                            : "#00BBB4",
                        border: "none",
                      }}
                      value="Adjustment Request"
                      disabled={
                        loading ||
                        data?.totalReceiveTk === data?.payableAmount ||
                        data?.isAdjustmentRQ === "Yes"
                      }
                    />

                    <div>
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        {data?.isAdjustmentRQ === "Yes"
                          ? "Sorry ! you already sent an adjustment request"
                          : ""}
                      </span>
                    </div>
                  </form>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Payment;
