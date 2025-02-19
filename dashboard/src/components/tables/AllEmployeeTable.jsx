
import React, { useContext, useState, useEffect } from "react";
import PaginationSection from "./PaginationSection";
import { DigiContext } from "../../context/DigiContext";
import { BASE_URL } from "../../api";

const AllEmployeeTable = () => {
  const { isBelowLg } = useContext(DigiContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchStaffUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/staffs/`);
        const result = await response.json();

        // Handle array response
        if (Array.isArray(result) && result.length > 0) {
          const formattedData = result.map(user => ({
            employee_id: user.id,
            username: user.username,
            email: user.email,
            contact_number: user.contact_number || "N/A",
            is_staff: user.is_staff,
            
            section: user.section || "N/A",
            present_address: user.present_address || "N/A",
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

    fetchStaffUsers();
  }, []);

  const currentData = Array.isArray(dataList) 
    ? dataList.slice((currentPage - 1) * dataPerPage, currentPage * dataPerPage) 
    : [];

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(dataList.length / dataPerPage);

  return (
    <>
      <table className="table table-dashed table-hover digi-dataTable all-employee-table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Action</th>
            <th>Employee ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            {/* <th>Present Address</th> */}
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((data, index) => (
              <tr key={data.employee_id || index}>
                <td>{(currentPage - 1) * dataPerPage + index + 1}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary">
                    Action <i className="fa-regular fa-angle-down"></i>
                  </button>
                </td>
                <td>{data.employee_id}</td>
                <td>
                  <img 
                    src={data.image} 
                    alt={`${data.username}'s photo`}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{data.username}</td>
                <td>{data.contact_number}</td>
                <td>{data.email}</td>
                {/* <td>{data.present_address}</td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
  <PaginationSection 
    currentPage={currentPage} 
    totalPages={totalPages} 
    paginate={paginate} 
  />
)}

    </>
  );
};

export default AllEmployeeTable;