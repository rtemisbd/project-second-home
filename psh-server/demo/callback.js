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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const createOrderIntoDB = async (payload) => {
//   const { amount, dataForBooking, selectMethod } = payload;
//   const session = await startSession();
//   try {
//     session.startTransaction();

//     // Set user context
//     setValue("userId", dataForBooking?.userId);

//     // Step 1: Update user information
//     const userUpdate = {
//       firstName: dataForBooking?.fullName,
//       phone: dataForBooking?.phone,
//       userAddress: dataForBooking?.address,
//       validityType: dataForBooking?.validityType,
//       emergencyContact: {
//         contactName: dataForBooking?.emergencyContactName,
//         relation: dataForBooking?.emergencyRelationC,
//         contactNumber: dataForBooking?.emergencyContact,
//       },
//     };
//     await User.updateOne(
//       { phone: dataForBooking?.phone },
//       { $set: userUpdate },
//       { runValidators: true, session }
//     );

//     // Step 2: Generate booking ID
//     const generateId = await generateBookingId();
//     dataForBooking.bookingId = generateId;

//     if (selectMethod === "manual") {
//       const result = await createOrderByManualBkash(dataForBooking);
//       return result;
//     } else {
//       // Step 3: Create payment request via bKash
//       const callbackData = encodeURIComponent(JSON.stringify(dataForBooking));
//       const response = await fetch(config.bkash_create_payment_url, {
//         method: "POST",
//         headers: await bkash_headers(getValue("id_token")),
//         body: JSON.stringify({
//           mode: "0011",
//           payerReference: " ",
//           callbackURL: `${config.server_url}/bkash/payment/callback?callbackData=${callbackData}`,
//           amount,
//           currency: "BDT",
//           intent: "sale",
//           merchantInvoiceNumber: `Inv${uuidv4().substring(0, 5)}`,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();

//       // Commit the transaction
//       await session.commitTransaction();
//       return { bkashURL: data?.bkashURL };
//     }
//   } catch (error) {
//     await session.abortTransaction();
//     // console.error("Error in createOrderIntoDB:", error);
//     return { error: error.message };
//   } finally {
//     session.endSession();
//   }
// };

// const createOrderByManualBkash = async (payload) => {
//   const session = await startSession();
//   try {
//     session.startTransaction();

//     const dataForBooking = payload;
//     dataForBooking.paymentType = "bkash";
//     const result = await OrderModel.create([dataForBooking], { session });

//     // Step 6: Create user transaction
//     await Transaction.create(
//       [
//         {
//           orderId: result[0]?._id,
//           branch: dataForBooking?.branch,
//           paymentDate: new Date(),
//           totalAmount: dataForBooking?.bookingInfo?.totalAmount,
//           payableAmount: dataForBooking?.payableAmount,
//           paymentType: "bkash",
//           receivedTk: dataForBooking?.receivedTk,
//           paymentNumber: dataForBooking?.paymentNumber,
//           // transactionId: data.trxID,
//           userId: getValue("userId"),
//           userPhone: dataForBooking?.phone,
//           userName: dataForBooking?.fullName,
//           acceptableStatus: "Pending",
//         },
//       ],
//       { session }
//     );

//     // Phone SMS for booking
//     const bookingMessage = `/api/smsapi?api_key=${config.sms_api_key}&type=text&number=88${result[0]?.phone}&senderid=${config.sms_sender_id}&message=Thank%20you%20for%20choosing%20us!%20Your%20booking%20ID%3A%23${result[0]?.bookingId}%20is%20received.%20Our%20team%20will%20verify%20your%20information%20before%20confirming%20your%20booking.%20Call%20us:%2001647647404.%20-%20PSH`;

//     await bookingSms(bookingMessage);

//     // Commit the transaction
//     await session.commitTransaction();
//     return {
//       bkashURL: `${config.client_url}/success`,
//     };
//   } catch (error) {
//     await session.abortTransaction();
//     console.error("Error during payment execution:", error);
//     return {
//       bkashURL: `${config.client_url}/error?message=${encodeURIComponent(
//         error.message
//       )}`,
//     };
//   } finally {
//     session.endSession();
//   }
// };
