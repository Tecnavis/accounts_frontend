import React, { useState } from "react";
// import Footer from "../components/footer/Footer";
import Footer from "../../components/footer/Footer";
import AddNewBreadcrumb from "../../components/breadcrumb/AddNewBreadcrumb";
import axios from "axios";
import { BASE_URL } from "../../api";
import Cookies from "js-cookie";

const ExpenseData = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "general",
    date: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      setMessage("Amount should be a positive number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/expenses/create/`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });

      setMessage("Expense added successfully!");
      setFormData({
        title: "",
        amount: "",
        category: "general",
        date: "",
        notes: "",
      });

      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding expense.");
      console.error("API Error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <AddNewBreadcrumb link="/expenses" title={"Add Expense"} />
      <div className="row">
        <div className="col-12">
          <div className="panel">
            <div className="panel-header">
              <h5>Add New Expense</h5>
            </div>
            <div className="panel-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-lg-4">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label">Amount</label>
                    <input
                      type="number"
                      name="amount"
                      className="form-control"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label">Category</label>
                    <select
                      name="category"
                      className="form-control"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="general">General</option>
                      <option value="travel">Travel</option>
                      <option value="food">Food</option>
                      <option value="office">Office</option>
                    </select>
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-lg-8">
                    <label className="form-label">Notes (Optional)</label>
                    <textarea
                      name="notes"
                      className="form-control"
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Saving..." : "Save Expense"}
                  </button>
                </div>
              </form>
              {message && <p className="mt-2 text-info">{message}</p>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExpenseData;
