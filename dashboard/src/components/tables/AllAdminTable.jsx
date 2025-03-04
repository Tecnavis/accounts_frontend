import React, { useContext, useState, useEffect, useRef } from "react";
import PaginationSection from "./PaginationSection";
import { DigiContext } from "../../context/DigiContext";
import { BASE_URL } from "../../api";
import Cookies from "js-cookie";
import axios from "axios";

const AllAdminTable = () => {
  const { isBelowLg } = useContext(DigiContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [dataList, setDataList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchStaffUsers();
  }, []);
  
  const fetchStaffUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/staffs/`);
      const result = await response.json();
  
      if (Array.isArray(result) && result.length > 0) {
     
        const staffUsers = result.filter(user => user.role === "admin");
  
        const formattedData = staffUsers.map((user) => ({
          employee_id: user.id,
          username: user.username,
          email: user.email,
          contact_number: user.contact_number || "N/A",
          is_staff: user.is_staff,
          section: user.section || "N/A",
          present_address: user.present_address || "N/A",
          showDropdown: false,
        }));
  
        setDataList(formattedData);
      } else {
        setDataList([]);
      }
    } catch (error) {
      console.error("Error fetching staff users:", error);
      setDataList([]);
    }
  };

  const handleViewEmployee = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/users/users/${id}/`);
      const data = await response.json();
      setSelectedEmployee(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  const handleOpenEditModal = (employee) => {
    // console.log("Selected Employee:", employee);  // Debugging
    // if (!employee || !employee.employee_id) {
    //     console.error("Error: Employee ID is missing!", employee);
    //     return;
    // }
    setSelectedEmployee({ ...employee, isEditing: true });
    setShowModal(true);
};

const handleUpdateEmployee = async () => {

    if (!selectedEmployee || !selectedEmployee.employee_id) {
        console.error("Error: Employee ID is undefined", selectedEmployee);
        return;
    }

    try {
        const apiUrl = `${BASE_URL}/users/admin/${selectedEmployee.employee_id}/`;
        console.log("API URL:", apiUrl); 
        
        const response = await axios.put(apiUrl, {
            username: selectedEmployee.username,
            email: selectedEmployee.email,
            contact_number: selectedEmployee.contact_number,
            password: selectedEmployee.password,
        },{
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${Cookies.get("access_token")}` // ✅ Add Token Here
          }
    });

        console.log("Update Successful:", response.data);
    } catch (error) {
        console.error("Error updating employee:", error.response?.data || error);
    }
};
  const handleDeleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(`${BASE_URL}/users/admin/${id}/delete/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("access_token")}`
          },
        });
        if (response.ok) {
          setDataList(dataList.filter((employee) => employee.employee_id !== id));
          setShowModal(false); 
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleDropdownToggle = (event, index) => {
    event.stopPropagation();
    setDataList((prevDataList) =>
      prevDataList.map((data, i) => ({
        ...data,
        showDropdown: i === index ? !data.showDropdown : false,
      }))
    );
  };

  const currentData = dataList.slice((currentPage - 1) * dataPerPage, currentPage * dataPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(dataList.length / dataPerPage);

  return (
    <>
      <table className="table table-dashed table-hover digi-dataTable all-employee-table table-striped">
        <thead>
          <tr>
            <th>Action</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((data, index) => (
              <tr key={data.employee_id}>
                <td>
                  <div className="digi-dropdown dropdown d-inline-block" ref={dropdownRef}>
                    <button
                      className={`btn btn-sm btn-outline-primary ${data.showDropdown ? "show" : ""}`}
                      onClick={(event) => handleDropdownToggle(event, index)}
                    >
                      Action <i className="fa-regular fa-angle-down"></i>
                    </button>
                    <ul
                      className={`digi-table-dropdown digi-dropdown-menu dropdown-menu dropdown-slim dropdown-menu-sm ${
                        data.showDropdown ? "show" : ""
                      }`}
                    >
                      <li>
                        <button className="dropdown-item" onClick={() => handleViewEmployee(data.employee_id)}>
                          <span className="dropdown-icon">
                            <i className="fa-light fa-eye"></i>
                          </span>
                          View
                        </button>
                      </li>
                      
                      <li>
                        <button className="dropdown-item" onClick={() => handleOpenEditModal(data)}>
                          <span className="dropdown-icon">
                            <i className="fa-light fa-pen-nib"></i>
                          </span>
                          Update
                        </button>
                      </li>
                      
                      <li>
                        <button className="dropdown-item" onClick={() => handleDeleteEmployee(data.employee_id)}>
                          <span className="dropdown-icon">
                            <i className="fa-light fa-trash-can"></i>
                          </span>
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
                <td>{data.employee_id}</td>
                <td>{data.username}</td>
                <td>{data.contact_number}</td>
                <td>{data.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}

      {/* View Employee Modal */}
      {showModal && selectedEmployee && !selectedEmployee.isEditing && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0 rounded">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Employee Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4 text-center">
                <i className="fa-solid fa-user-circle fa-4x text-primary mb-3"></i>
                <p><strong>ID:</strong> {selectedEmployee.id}</p>
                <p><strong>Name:</strong> {selectedEmployee.username}</p>
                <p><strong>Email:</strong> {selectedEmployee.email}</p>
                <p><strong>Phone:</strong> {selectedEmployee.contact_number}</p>
                <p><strong>Role:</strong> {selectedEmployee.role || "N/A"}</p>
                <p><strong>Active:</strong> {selectedEmployee.is_active ? "Yes" : "No"}</p>
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className="btn btn-warning px-4"
                  onClick={() => setSelectedEmployee({ ...selectedEmployee, isEditing: true })}
                >
                  Edit
                </button>
                <button type="button" className="btn btn-danger px-4" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Edit Employee Modal */}
      {showModal && selectedEmployee?.isEditing && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0 rounded">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Edit Employee</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateEmployee();
                  }}
                >
                  {/* Username Field */}
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedEmployee.username}
                      onChange={(e) =>
                        setSelectedEmployee({ ...selectedEmployee, username: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={selectedEmployee.email}
                      onChange={(e) =>
                        setSelectedEmployee({ ...selectedEmployee, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Contact Number Field */}
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedEmployee.contact_number || ""}
                      onChange={(e) =>
                        setSelectedEmployee({ ...selectedEmployee, contact_number: e.target.value })
                      }
                    />
                  </div>

                  {/* Password Field (Leave Empty for New Password) */}
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter new password (optional)"
                      onChange={(e) =>
                        setSelectedEmployee({ ...selectedEmployee, password: e.target.value })
                      }
                    />
                  </div>

                  {/* Modal Footer */}
                  <div className="modal-footer justify-content-center">
                    <button type="submit" className="btn btn-success px-4">
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary px-4"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllAdminTable;






