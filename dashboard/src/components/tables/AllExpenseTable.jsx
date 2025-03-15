import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { BASE_URL } from "../../api";
import Cookies from "js-cookie";

const AllExpenseTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("access_token");
      const response = await axios.get(`${BASE_URL}/financials/expenses/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data); 
      const expensesData = response.data.results || [];
      setExpenses(expensesData);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError("Error fetching expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleViewExpense = async (id) => {
    try {
      const token = Cookies.get("access_token");
      const response = await axios.get(`${BASE_URL}/financials/expenses/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedExpense({ ...response.data, isEditing: false });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching expense details:", error);
    }
  };

  const handleOpenEditModal = (expense) => {
    setSelectedExpense({ ...expense, isEditing: true });
    setShowModal(true);
  };

  const handleUpdateExpense = async () => {
    try {
      const token = Cookies.get("access_token");
      await axios.put(
        `${BASE_URL}/financials/expenses/${selectedExpense.id}/update/`,
        {
          title: selectedExpense.title,
          amount: selectedExpense.amount,
          date: selectedExpense.date,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowModal(false);
      fetchExpenses(); // Refresh expenses after update
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        const token = Cookies.get("access_token");
        await axios.delete(`${BASE_URL}/financials/expenses/${id}/delete/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchExpenses(); // Refresh expenses after delete
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <OverlayScrollbarsComponent>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Expense ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.id}</td>
                  <td>{expense.title}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.date}</td>
                  <td>
                    <button className="btn btn-sm" onClick={() => handleViewExpense(expense.id)}>
                      <i className="fa-light fa-eye"></i>
                    </button>
                    <button className="btn btn-sm" onClick={() => handleOpenEditModal(expense)}>
                      <i className="fa-light fa-pen-to-square"></i>
                    </button>
                    <button className="btn btn-sm" onClick={() => handleDeleteExpense(expense.id)}>
                      <i className="fa-light fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </OverlayScrollbarsComponent>

      {showModal && selectedExpense && selectedExpense.isEditing && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Expense</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Description:</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={selectedExpense.title}
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, title: e.target.value })}
                />

                <label className="form-label">Amount:</label>
                <input
                  type="number"
                  className="form-control mb-2"
                  value={selectedExpense.amount}
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, amount: e.target.value })}
                />

                <label className="form-label">Date:</label>
                <input
                  type="date"
                  className="form-control mb-3"
                  value={selectedExpense.date}
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, date: e.target.value })}
                />

                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                  cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleUpdateExpense}>
                    Update Expense
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllExpenseTable;
