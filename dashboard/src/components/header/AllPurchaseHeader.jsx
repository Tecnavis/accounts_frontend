
import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { DigiContext } from "../../context/DigiContext";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

const AllPurchaseHeader = () => {
  const { headerBtnOpen, handleHeaderBtn, handleHeaderReset, headerRef } =
    useContext(DigiContext);

  const [checkboxes, setCheckboxes] = useState({
    showProducts: true,
    showPublished: true,
    showStock: true,
    showPrice: true,
    showSales: true,
    showRating: true,
  });

  const handleChange = (e) => {
    const { id } = e.target;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [id]: !prevCheckboxes[id],
    }));
  };

  const downloadPurchasePDF = async () => {
    try {
      // Fetch transactions data from API
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/financials/transactions_list/"
      );
      const transactions = response.data;

      // Create a new PDF document
      const doc = new jsPDF();
      doc.setFontSize(10);
      doc.text("Purchase Report", doc.internal.pageSize.getWidth() / 2, 10, { align: "center" });

      // Define table columns (Added Payment Mode)
      const columns = [
        "Transaction ID",
        "Customer Name",
        "Service",
        "Price",
        "Total Paid",
        "Remaining Amount",
        "Sale Date",
        "Payment Modes",
      ];

      // Define table rows
      const rows = transactions
        .filter((transaction) => transaction.transaction_type === "purchase")
        .map((transaction) => {
          const paymentModes = transaction.payments
            ?.map((payment) => payment.payment_mode)
            .join(", ") || "N/A";

          return [
            transaction.transaction_id,
            transaction.username,
            transaction.service_name,
            `Rs ${transaction.service_price}`,
            `Rs ${transaction.total_paid}`,
            `Rs ${transaction.remaining_amount}`,
            transaction.sale_date,
            paymentModes,
          ];
        });

      // Add table to PDF
      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 20,
      });

      // Save the PDF
      doc.save("Purchase_Report.pdf");
    } catch (error) {
      console.error("Error generating purchase PDF:", error);
    }
  };

  return (
    <div className="panel-header">
      <h5>Sales</h5>
      <div className="btn-box d-flex flex-wrap gap-2">
        <div id="tableSearch">
          <Form.Control type="text" placeholder="Search..." />
        </div>
        <div className="btn-box">
          <Link to="/addSales" className="btn btn-sm btn-primary">
            <i className="fa-light fa-plus"></i> Add New
          </Link>
          <Button className="btn btn-sm btn-success ms-2" onClick={downloadPurchasePDF}>
            <i className="fa fa-download"></i> Download Purchase PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllPurchaseHeader;
