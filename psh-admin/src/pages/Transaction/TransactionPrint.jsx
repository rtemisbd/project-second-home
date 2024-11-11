import React, { useContext } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { AuthContext } from "../../contexts/UserProvider";
import { useDispatch } from "react-redux";
import TransactionStatusUpdate from "./TransactionStatusUpdate";
import { placeLoadingShow } from "../../redux/reducers/loadingStateSlice";
import ViewTransactionModal from "./ViewTransactionModal";
import UpdateTransaction from "./UpdateTransaction";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { formatDate } from "../../utils/dateConvert";

const TransactionPrint = ({ transaction }) => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(placeLoadingShow(false));
  console.log(transaction);

  return (
    <tr style={{ fontSize: "15px" }}>
      <td
      //  style={{ textAlign: "center", display: "block" }}
      >
        {formatDate(transaction?.paymentDate)}
      </td>
      <td>#{transaction?.orderId.slice(19)}</td>
      <td> {transaction?.branchDetails?.name}</td>

      <td>{transaction?.userName}</td>
      <td>#{transaction?.userDetails.userId}</td>
      <td>{transaction?.userPhone}</td>
      <td style={{ color: "#1d6f42", fontWeight: "bold" }}>
        {" "}
        Tk {transaction?.receivedTk}
      </td>
      <td>
        {" "}
        {transaction?.paymentType === "bkash" ||
        transaction?.paymentType === "nagad" ? (
          <span style={{ fontWeight: "bold" }}>
            {" "}
            {transaction?.paymentType}, {transaction?.paymentNumber}, Trx :{" "}
            {transaction?.transactionId}
          </span>
        ) : (
          transaction?.paymentType
        )}
        {transaction?.paymentType === "bank" ? (
          <span>
            {" "}
            {transaction?.paymentType}, {transaction?.bankName},
            {transaction?.bankHoldingName}
          </span>
        ) : (
          ""
        )}
      </td>
      <td
        className="d-flex justify-content-center gap-3 fw-bold"
        style={{
          color:
            transaction?.acceptableStatus === "Accepted"
              ? "#35b0a7"
              : "#FF0000",
        }}
      >
        {transaction?.acceptableStatus}
        {user?.role === "SuperAdmin" || user?.role === "subAdmin1" ? (
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target={`#transactionStatus${transaction._id}`}
            className="d-flex btn mt-2 "
          >
            <BiSolidEdit style={{ width: "30px", height: "30px" }} />
          </button>
        ) : (
          ""
        )}
        <div>
          <TransactionStatusUpdate
            data={transaction}
            // refetch={refetch}
            handleClose={handleClose}
          />
        </div>
      </td>
      <td>
        <div className="d-flex justify-content-center gap-3">
          {user?.role === "SuperAdmin" ? (
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target={`#transaction${transaction._id}`}
              className="d-flex btn mt-2"
            >
              <BiSolidEdit style={{ width: "30px", height: "30px" }} />
            </button>
          ) : (
            ""
          )}

          <button
            type="button"
            className="btn"
            data-bs-toggle="modal"
            data-bs-target={`#details${transaction._id}`}
          >
            <span>
              <AiOutlineEye style={{ width: "30px", height: "30px" }} />
            </span>
          </button>

          {user?.role === "SuperAdmin" ? (
            <div>
              <AiOutlineDelete
                // onClick={() => handleDelete(transaction._id)}
                style={{
                  width: "30px",
                  height: "30px",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        {/* <UpdateTransaction
          data={transaction}
          // refetch={refetch}
          // transactions={data}
          // bookings={bookings}
          // setUserAllBooking={setUserAllBooking}
        /> */}
        {/* Modal Transaction Details */}
        <ViewTransactionModal
          data={transaction}
          // bookings={bookings}
          // userAllBooking={userAllBooking}
        />
      </td>
    </tr>
  );
};

export default TransactionPrint;
