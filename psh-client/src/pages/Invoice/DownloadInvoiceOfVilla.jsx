import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import logo from "../../assets/img/logo.png";
import { format, parseISO } from "date-fns";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },

  logo: {
    width: "84px",
    height: "84px",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#35B0A7",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#35B0A7",
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    color: "#000000",
    marginBottom: 5,
  },

  bold: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#35b0a7",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5px",
    fontSize: 12,
  },
});

const DownloadInvoiceOfVilla = ({ booking }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <View>
            <Image src={booking?.resort?.logo} style={styles.logo} />
          </View>

          <View>
            {/* Invoice title */}
            <Text style={styles.title}>INVOICE</Text>

            {/* Invoice number */}
            <Text style={styles.text}>#{booking?.bookingId}</Text>

            {/* Date */}
            <Text style={styles.text}>
              Date:{" "}
              {booking?.createdAt
                ? format(parseISO(booking.createdAt), "dd/MM/yyyy")
                : "N/A"}
            </Text>
          </View>
        </View>

        {/* Booking Location */}
        <View
          style={{
            marginTop: "20px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.subtitle}>{booking?.resort?.name}</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "#000000",
                marginBottom: 5,
                width: "150px",
              }}
            >
              Address: {booking?.resort?.address}
            </Text>
            <Text style={styles.text}>
              Contact :{" "}
              {(booking?.resort?.contactNumbers || [])
                .map((contact) => contact)
                .join(", ")}
            </Text>
            <Text style={styles.text}>
              Email: {booking?.resort?.resortEmail}
            </Text>
          </View>
          <View>
            {/* Bill To */}
            <View>
              <Text style={styles.subtitle}>Bill To</Text>
              <Text style={styles.text}>Name: {booking?.user?.firstName}</Text>
              <Text style={styles.text}>
                Address: {booking?.user?.userAddress}
              </Text>
              <Text style={styles.text}>Mobile: {booking?.user?.phone}</Text>
              <Text style={styles.text}>
                Check In : {booking?.rentDate?.bookStartDate}
              </Text>
              <Text style={styles.text}>
                Check Out : {booking?.rentDate?.bookEndDate}
              </Text>
            </View>
          </View>
        </View>

        {/* Booking Table */}
        <View
          style={{
            backgroundColor: "#35B0A7",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px 0px",
            position: "relative",
            width: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              color: "white",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                padding: "0 5px",
              }}
            >
              Villa Number
            </Text>

            <Text
              style={{
                fontSize: 14,
                marginLeft: 10,
                fontWeight: "bold",
                padding: "0 5px",
              }}
            >
              Villa Name
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginLeft: 10,
                fontWeight: "bold",
                padding: "0 5px",
              }}
            >
              Per Night
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                padding: "0 5px",
              }}
            >
              Total Duration
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginLeft: 10,
                fontWeight: "bold",
                padding: "0 5px",
              }}
            >
              Amount
            </Text>
          </View>
        </View>

        {/* Booking Table Content */}
        <View
          style={{
            backgroundColor: "rgba(53, 176, 167, 0.10)",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: 240,
            padding: 10,
          }}
        >
          <View
            style={{
              position: "absolute",
              left: "30%",
              top: "25%",
              opacity: 0.1,
            }}
          >
            <Image
              src={logo}
              style={{
                width: 260,
                height: 100,
              }}
            />
          </View>
          <View
            style={{
              fontWeight: "bold",
              fontSize: 14,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text>{booking?.villa?.villaNumber}</Text>
            <Text>{booking?.villa?.title}</Text>
            <Text>{booking?.perNight}</Text>
            <Text>
              {booking?.rentDate?.daysDifference}{" "}
              {booking?.rentDate?.daysDifference === 1 ? "Night" : "Nights"}
            </Text>
            <Text>BDT {booking?.totalAmount}</Text>
          </View>
        </View>

        {/* Payment Details */}
        <View style={[styles.flex]}>
          <View>
            <Text style={styles.bold}> Payment History</Text>
            <View>
              <Text
                style={{
                  marginTop: "5px",
                }}
              >
                Payment Method : {booking?.paymentPlatform}
              </Text>
              <Text
                style={{
                  marginTop: "5px",
                }}
              >
                Account Number : {booking?.senderAccountNumber}
              </Text>
            </View>
          </View>
          <View style={[styles.flex, styles.totalAmountRight]}>
            <View>
              <View style={styles.flex}>
                <Text style={styles.bold}>Total :</Text>

                <Text style={{}}>
                  BDT {booking?.totalAmount?.toLocaleString()}
                </Text>
              </View>

              <View style={styles.flex}>
                <Text style={styles.bold}>
                  Paid : BDT {booking?.sendAmount}{" "}
                </Text>
              </View>
              <View
                style={{
                  width: 200,
                  borderBottomWidth: 1,
                  marginTop: 4,
                  marginBottom: 4,
                }}
              />
              <View style={styles.flex}>
                <Text
                  style={[
                    styles.bold,
                    {
                      color:
                        booking?.totalAmount - booking?.sendAmount > 0
                          ? "red"
                          : "",
                    },
                  ]}
                >
                  Due :
                </Text>

                <Text style={{}}>
                  BDT{" "}
                  {(
                    booking?.totalAmount - booking?.sendAmount
                  )?.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Note */}
        <View
          style={{
            marginTop: 60,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.noteArea}>
            <Text style={[styles.bold, { color: "#35b0a7", fontSize: 10 }]}>
              Note:
            </Text>
            <View
              style={{
                width: 300,
                height: 70,
                backgroundColor: "#f7f7f7",
              }}
            ></View>
          </View>
          <View>
            <Text style={{ fontSize: 12 }}>Authorized Signature</Text>
            <View style={{ width: 200, borderBottomWidth: 1, marginTop: 24 }} />
          </View>
        </View>

        <View style={{ marginTop: 10, fontSize: 12 }}>
          <Text>
            • Please bring a hard/soft copy of the Invoice and one hard copy of
            your NID Card / Passport / Birth Certificate / Driving License at
            the time of check-in.
          </Text>
          <Text>
            • For any further questions, kindly reach out to{" "}
            <Text style={{ fontWeight: "bold" }}>
              {booking?.resort?.name} -{" "}
              {(booking?.resort?.contactNumbers || [])
                .map((contact) => contact)
                .join(", ")}
            </Text>
          </Text>
        </View>

        {/* Invoice Footer */}
        <View
          style={{
            backgroundColor: "#35b0a7",
            color: "white",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "5px",
            marginTop: 30,
            fontSize: 10,
          }}
        >
          <Text>Head Office: House-23, Road-03, Dhanmondi, Dhaka</Text>
          <Text>Mobile: +8801647647404</Text>
          <Text>www.psh.com.bd</Text>
        </View>
      </Page>
    </Document>
  );
};

export default DownloadInvoiceOfVilla;
