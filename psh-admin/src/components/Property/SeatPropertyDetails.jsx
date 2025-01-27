// import React, { useEffect, useState } from "react";
// import UseFetch from "../../hooks/useFetch";

// import { baseUrl } from "../../utils/getBaseURL";
// import { Modal } from "react-bootstrap";

// const SeatPropertyDetails = ({ id, showDetails, setShowDetails }) => {
//   const { data3, loading3, error3, refetch3 } = UseFetch("facilityCategory");
//   const [data, setData] = useState(null);
//   const [seat, setSeat] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/api/seats/${id}`);
//         const { data } = await response.json();
//         setSeat(data.seat);

//         if (data?.seat) {
//           try {
//             const responseForRoom = await fetch(
//               `${baseUrl}/api/property/${data?.seat?.roomId}`
//             );
//             const { property } = await responseForRoom.json();
//             setData(property);
//           } catch (error) {
//             console.error("Error fetching data:", error);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [id]);
//   console.log({ data, seat });

//   return (
//     <Modal show={handleShowDetails} onHide={() => setShowDetails(!showDetails)}>
//       <Modal.Header
//         closeButton
//         style={{
//           backgroundColor: "#35B0A7",
//           height: "36px",
//           borderRadius: "3px 3px 0px 0px",
//         }}
//       >
//         <Modal.Title></Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div
//           style={{
//             width: "470px",
//             borderRadius: "3px",
//             backgroundColor: "white",
//           }}
//         >
//           <div
//             className="px-3 py-2 m-3"
//             style={{
//               boxShadow: "0px 0px 5px 3px #CCC",
//               borderRadius: "5px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyItems: "end",
//                 gap: "4px",
//               }}
//             >
//               <h5 className="text-left " style={{ color: "#212A42" }}>
//                 {detail?.categoryDetails?.name === "Shared Room"
//                   ? detail?.property?.name
//                   : detail?.name}{" "}
//                 - {detail?.roomNumber}
//               </h5>
//               {detail?.categoryDetails?.name === "Shared Room" && (
//                 <span style={{ marginTop: "4px" }}>
//                   [Seat : {detail?.seatNumber}]
//                 </span>
//               )}
//             </div>
//             <p
//               className=" d-flex justify-content-start "
//               style={{
//                 backgroundColor: "#FCA22A",
//                 color: "white",
//                 padding: "3px 5px ",
//                 borderRadius: "5px",
//               }}
//             >
//               {detail?.categoryDetails?.name}-[
//               {detail?.branchDetails?.name}]
//             </p>
//             <hr />
//             <ul
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 fontWeight: "bold",
//               }}
//             >
//               <li>Per Day : BDT {detail?.dAmountForDay}</li>
//               <li>Per Month : BDT {detail?.dAmountForMonth}</li>
//             </ul>
//             <h4>
//               {" "}
//               {bookingInfo.length
//                 ? "Booked for:"
//                 : `Available for : ${formatDate(date)}`}
//             </h4>

//             {bookingInfo?.map((info) => (
//               <div
//                 key={info._id}
//                 className="px-3 py-2 mb-2"
//                 style={{
//                   boxShadow: "0px 0px 3px 0px #CCC",
//                   borderRadius: "5px",
//                 }}
//               >
//                 <p>
//                   {info?.userId?.firstName}
//                   <br /> Phone : {info?.userId?.phone}
//                 </p>
//                 <p style={{ fontWeight: "semibold" }}>
//                   Duration : {formatDate(info?.bookStartDate)} -{" "}
//                   {formatDate(info?.bookEndDate)}
//                 </p>
//               </div>
//             ))}
//           </div>
//           {/* for new booking */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "end",
//               marginRight: "20px",
//             }}
//           >
//             <Link
//               to={`/dashboard/create-order/${detail?.category}/${detail?._id}`}
//             >
//               Book Now
//             </Link>
//           </div>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default SeatPropertyDetails;
