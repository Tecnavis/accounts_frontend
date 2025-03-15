import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import PaginationSection from "./PaginationSection";
import { BASE_URL } from "../../api";
import Cookies from "js-cookie";

const AllExpenseTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataPerPage] = useState(10);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchExpenses(currentPage);
  }, [currentPage]);

  const fetchExpenses = async (page) => {
    try {
      const token = Cookies.get("access_token");
      const response = await axios.get(`${BASE_URL}/expenses/?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const expensesWithDropdown = response.data.results.map((expense) => ({
        ...expense,
        showDropdown: false,
      }));

      setExpenses(expensesWithDropdown);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError("Error fetching expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleViewExpense = async (id) => {
    if (!id) {
      console.error("Invalid expense ID:", id);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/expenses/${id}/`);
      if (!response.ok) throw new Error("Failed to fetch expense details");

      const data = await response.json();
      setSelectedExpense({ ...data, isEditing: false });
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
      const response = await fetch(`${BASE_URL}/expenses/${selectedExpense.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        body: JSON.stringify({
          description: selectedExpense.description,
          amount: selectedExpense.amount,
          date: selectedExpense.date,
          category: selectedExpense.category,
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log("Updated Expense:", updatedData);
        fetchExpenses(currentPage);
        setShowModal(false);
      } else {
        console.error("Error updating expense:", await response.json());
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        const response = await fetch(`${BASE_URL}/expenses/${id}/delete/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });

        if (response.ok) {
          setExpenses(expenses.filter((expense) => expense.id !== id));
          setShowModal(false);
        } else {
          console.error("Failed to delete expense:", await response.text());
        }
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  const handleDropdownToggle = (event, index) => {
    event.stopPropagation();
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense, i) => ({
        ...expense,
        showDropdown: i === index ? !expense.showDropdown : false,
      }))
    );
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <OverlayScrollbarsComponent>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Action</th>
              <th>Expense ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <tr key={index}>
                  <td>
                    <div className="dropdown d-inline-block" ref={dropdownRef}>
                      <button
                        className={`btn btn-sm btn-outline-primary ${expense.showDropdown ? "show" : ""}`}
                        onClick={(event) => handleDropdownToggle(event, index)}
                      >
                        Action <i className="fa-regular fa-angle-down"></i>
                      </button>
                      <ul className={`dropdown-menu ${expense.showDropdown ? "show" : ""}`}>
                        <li>
                          <button className="dropdown-item" onClick={() => handleViewExpense(expense.id)}>
                            <span className="dropdown-icon">
                              <i className="fa-light fa-eye"></i>
                            </span>
                            View
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => handleOpenEditModal(expense)}>
                            <span className="dropdown-icon">
                              <i className="fa-light fa-pen-nib"></i>
                            </span>
                            Update
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => handleDeleteExpense(expense.id)}>
                            <span className="dropdown-icon">
                              <i className="fa-light fa-trash-can"></i>
                            </span>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>{expense.id}</td>
                  <td>{expense.description}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.date}</td>
                  <td>{expense.category}</td>
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

      {/* Pagination */}
      <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} />

      {/* Edit Modal */}
      {showModal && selectedExpense && selectedExpense.isEditing && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Expense</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={selectedExpense.description}
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, description: e.target.value })}
                />
                <button className="btn btn-primary mt-3" onClick={handleUpdateExpense}>
                  Update Expense
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllExpenseTable;
