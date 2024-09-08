import * as XLSX from "xlsx";
import { formatDate } from "../../utils/dateConvert"; // Corrected the import

const ExportToExcel = ({ data }) => {
  const handleExport = () => {
    const rows = data?.map((row) => ({
      paymentDate: formatDate(row?.paymentDate), // Use formatDate
      name: row?.userName,
      branch: row?.branch?.name,
      phone: row?.userPhone,
      receiveAmount: row?.receivedTk?.toLocaleString(),
      paymentType: row?.paymentType,
      paymentNumber: row?.paymentNumber,
      transactionId: row?.transactionId,
      bankName: row?.bankName,
      bankHoldersName: row?.bankHoldingName,
      receiverName: row?.receiverName,
      status: row?.acceptableStatus,
      note: row?.noteForTransaction,
    }));

    // Generate worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

    // Fix headers
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "Payment Date",
          "Name",
          "Branch",
          "Phone",
          "Receive Amount",
          "Payment Type",
          "Payment Number",
          "Transaction Id",
          "Bank Name",
          "Bank Holder's Name",
          "Receiver Name",
          "Status",
          "Note",
        ],
      ],
      { origin: "A1" }
    );

    // Calculate column width dynamically for each column
    const columnWidths = [
      { wch: 15 }, // Payment Date
      { wch: Math.max(...rows.map((r) => (r.name || "").length), 10) },
      { wch: Math.max(...rows.map((r) => (r.branch || "").length), 10) },
      { wch: Math.max(...rows.map((r) => (r.phone || "").length), 10) },
      { wch: 12 }, // Receive Amount
      { wch: Math.max(...rows.map((r) => (r.paymentType || "").length), 10) },
      { wch: Math.max(...rows.map((r) => (r.paymentNumber || "").length), 10) },
      { wch: Math.max(...rows.map((r) => (r.transactionId || "").length), 10) },
      { wch: Math.max(...rows.map((r) => (r.bankName || "").length), 10) },
      {
        wch: Math.max(...rows.map((r) => (r.bankHoldersName || "").length), 10),
      },
      { wch: Math.max(...rows.map((r) => (r.receiverName || "").length), 10) },
      { wch: Math.max(...rows.map((r) => (r.status || "").length), 10) },
      { wch: Math.max(...rows.map((r) => (r.note || "").length), 10) },
    ];

    worksheet["!cols"] = columnWidths;

    // Create an XLSX file and save it as Payments.xlsx
    XLSX.writeFile(workbook, "Payments.xlsx", { compression: true });
  };

  return (
    <button onClick={handleExport} style={{ backgroundColor: "#1d6f42" }}>
      Export to Excel
    </button>
  );
};

export default ExportToExcel;
