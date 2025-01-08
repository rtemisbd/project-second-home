// const call_back = async (req, res) => {
//     const { paymentID, status, callbackData } = req.query;

//     if (status === "cancel" || status === "failure") {
//       return res.redirect(`${config.client_url}/error?message=${status}`);
//     }

//     if (status === "success") {
//       const session = await startSession();
//       try {
//         session.startTransaction();

//         // Step 4: Execute payment via bKash
//         const response = await fetch(config.bkash_execute_payment_url, {
//           method: "POST",
//           headers: await bkash_headers(getValue("id_token")),
//           body: JSON.stringify({ paymentID }),
//         });

//         if (!response.ok) {
//           throw new Error(
//             `Error executing payment: ${response.status} ${response.statusText}`
//           );
//         }

//         const data = await response.json();

//         // Log the bKash API response for debugging
//         console.log("bKash Payment Execution Response:", data);

//         if (data && data.statusCode === "0000") {
//           // Step 5: Create order
//           const dataForBooking = await JSON.parse(
//             decodeURIComponent(callbackData)
//           );

//           dataForBooking.paymentType = "bkash";
//           dataForBooking.status = "Approved";
//           dataForBooking.paymentNumber = data?.customerMsisdn;
//           dataForBooking.transactionId = data?.trxID;
//           dataForBooking.receivedTk = parseInt(data?.amount);

//           const result = await OrderModel.create([dataForBooking], { session });

//           // Step 6: Create user transaction
//           await Transaction.create(
//             [
//               {
//                 orderId: result[0]?._id,
//                 branch: dataForBooking?.branch,
//                 paymentDate: new Date(),
//                 totalAmount: dataForBooking?.bookingInfo?.totalAmount,
//                 payableAmount: dataForBooking?.payableAmount,
//                 paymentType: "bkash",
//                 receivedTk: parseInt(data?.amount),
//                 paymentNumber: data?.customerMsisdn,
//                 transactionId: data.trxID,
//                 userId: getValue("userId"),
//                 userPhone: dataForBooking?.phone,
//                 userName: dataForBooking?.fullName,
//                 acceptableStatus: "Accepted",
//               },
//             ],
//             { session }
//           );

//           // Step 7: Create rent collection
//           await RentRoom.create(
//             [
//               {
//                 bookStartDate:
//                   dataForBooking?.bookingInfo?.rentDate?.bookStartDate,
//                 bookEndDate: dataForBooking?.bookingInfo?.rentDate?.bookEndDate,
//                 roomId: dataForBooking?.bookingInfo?.roomId,
//                 roomNumber: dataForBooking?.bookingInfo?.data?.roomNumber,
//                 roomType: dataForBooking?.bookingInfo?.roomType,
//                 seatId: dataForBooking?.bookingInfo?.seatBooking?._id,
//                 seatNumber: dataForBooking?.bookingInfo?.seatBooking?.seatNumber,
//                 bookingId: dataForBooking?._id,
//                 branch: dataForBooking?.bookingInfo?.branch?._id,
//                 userId: dataForBooking?.userId,
//               },
//             ],
//             { session }
//           );

//           // Phone SMS for booking
//           const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${dataForBooking?.phone}&senderid=8809617617196&message=Your%20booking%20with%20Project%20Second%20Home%20is%20Confirmed!%20Booking%20ID%3A%23${dataForBooking?.bookingId}.%20Check-in%3A%${dataForBooking?.bookingInfo?.rentDate?.bookStartDate}%2C%20Check-out%3A%${dataForBooking?.bookingInfo?.rentDate?.bookEndDate}.%20Call%20Us%3A%2001647647404.%20Enjoy%20your%20stay!%20-%20PSH`;

//           await bookingSms(bookingMessage);

//           // Commit the transaction
//           await session.commitTransaction();
//           return await res.redirect(`${config.client_url}/success`);
//         } else {
//           throw new Error(data.statusMessage || "Payment execution failed");
//         }
//       } catch (error) {
//         await session.abortTransaction();
//         console.error("Error during payment execution:", error);
//         return await res.redirect(
//           `${config.client_url}/error?message=${encodeURIComponent(
//             error.message
//           )}`
//         );
//       } finally {
//         await session.endSession();
//       }
//     }
//   };
