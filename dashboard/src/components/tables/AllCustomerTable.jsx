import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import PaginationSection from "./PaginationSection";

const AllCustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/financials/transactions_list/");
      
      // Filter transactions where transaction_type is "sale"
      const salesTransactions = response.data.filter(
        (transaction) => transaction.transaction_type === "sale"
      );

      // Extract unique customers
      const uniqueCustomers = [];
      const seenUsernames = new Set();

      salesTransactions.forEach((transaction) => {
        if (!seenUsernames.has(transaction.username)) {
          seenUsernames.add(transaction.username);
          uniqueCustomers.push({
            username: transaction.username,
            billing_address: transaction.billing_address || "N/A",
          });
        }
      });

      setCustomers(uniqueCustomers);
    } catch (error) {
      setError("Error fetching customers");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = customers.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(customers.length / dataPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <OverlayScrollbarsComponent>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>contact number</th>
              <th>Billing Address</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((customer, index) => (
              <tr key={index}>
                <td>{customer.username}</td>
                <td>{customer.billing_address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </OverlayScrollbarsComponent>
      <PaginationSection
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        pageNumbers={pageNumbers}
      />
    </>
  );
};

export default AllCustomerTable;
