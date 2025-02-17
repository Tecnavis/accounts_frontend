import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { DigiContext } from "../../context/DigiContext";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { BASE_URL } from "../../api";

const AllSalesHeader = () => {
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

  const downloadSalesPDF = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/financials/transactions_list/`);
      const transactions = response.data;

      // Create a new PDF document
      const doc = new jsPDF();
      doc.setFontSize(10);
      doc.text("Sales Report", doc.internal.pageSize.getWidth() / 2, 10, { align: "center" });

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
        .filter((transaction) => transaction.transaction_type === "sale")
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
      doc.save("Sales_Report.pdf");
    } catch (error) {
      console.error("Error generating Sales PDF:", error);
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
          <Button className="btn btn-sm btn-success ms-2" onClick={downloadSalesPDF}>
            <i className="fa fa-download"></i> Download Sales PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllSalesHeader;
