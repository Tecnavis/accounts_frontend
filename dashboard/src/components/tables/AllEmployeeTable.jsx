
// import React, { useContext, useState, useEffect } from "react";
// import PaginationSection from "./PaginationSection";
// import { DigiContext } from "../../context/DigiContext";
// import { BASE_URL } from "../../api";

// const AllEmployeeTable = () => {
//   const { isBelowLg } = useContext(DigiContext);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [dataPerPage] = useState(10);
//   const [dataList, setDataList] = useState([]);

//   useEffect(() => {
//     const fetchStaffUsers = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/users/staffs/`);
//         const result = await response.json();

//         // Handle array response
//         if (Array.isArray(result) && result.length > 0) {
//           const formattedData = result.map(user => ({
//             employee_id: user.id,
//             username: user.username,
//             email: user.email,
//             contact_number: user.contact_number || "N/A",
//             is_staff: user.is_staff,
            
//             section: user.section || "N/A",
//             present_address: user.present_address || "N/A",
//           }));
//           setDataList(formattedData);
//         } else {
//           setDataList([]); 
//         }
//       } catch (error) {
//         console.error("Error fetching staff users:", error);
//         setDataList([]);
//       }
//     };

//     fetchStaffUsers();
//   }, []);

//   const currentData = Array.isArray(dataList) 
//     ? dataList.slice((currentPage - 1) * dataPerPage, currentPage * dataPerPage) 
//     : [];

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const totalPages = Math.ceil(dataList.length / dataPerPage);

//   return (
//     <>
//       <table className="table table-dashed table-hover digi-dataTable all-employee-table table-striped">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Action</th>
//             <th>Employee ID</th>
//             <th>Photo</th>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>Email</th>
//             {/* <th>Present Address</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {currentData.length > 0 ? (
//             currentData.map((data, index) => (
//               <tr key={data.employee_id || index}>
//                 <td>{(currentPage - 1) * dataPerPage + index + 1}</td>
//                 <td>
//                     <div className="digi-dropdown dropdown d-inline-block" ref={dropdownRef}>
//                     <button
//                     className={`btn btn-sm btn-outline-primary ${data.showDropdown ? 'show' : ''}`}
//                     onClick={(event) => handleDropdownToggle(event, index)}
//                     >
//                     Action <i className="fa-regular fa-angle-down"></i>
//                     </button>                        
//                     <ul className={`digi-table-dropdown digi-dropdown-menu dropdown-menu dropdown-slim dropdown-menu-sm ${
//                         data.showDropdown ? 'show' : ''
//                     }`}>
//                             <li><a href="#" className="dropdown-item"><span className="dropdown-icon"><i className="fa-light fa-eye"></i></span> View</a></li>
//                             <li><a href="#" className="dropdown-item"><span className="dropdown-icon"><i className="fa-light fa-pen-to-square"></i></span> Edit</a></li>
//                             <li><a href="#" className="dropdown-item"><span className="dropdown-icon"><i className="fa-light fa-pen-nib"></i></span> Revok</a></li>
//                             <li><a href="#" className="dropdown-item"><span className="dropdown-icon"><i className="fa-light fa-trash-can"></i></span> Delete</a></li>
//                         </ul>
//                     </div>
//                 </td>
//                 <td>{data.employee_id}</td>
//                 <td>{data.username}</td>
//                 <td>{data.contact_number}</td>
//                 <td>{data.email}</td>
//                 {/* <td>{data.present_address}</td> */}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8" className="text-center">No employees found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {totalPages > 1 && (
//   <PaginationSection 
//     currentPage={currentPage} 
//     totalPages={totalPages} 
//     paginate={paginate} 
//   />
// )}

//     </>
//   );
// };

// export default AllEmployeeTable;


import React, { useContext, useState, useEffect, useRef } from "react";
import PaginationSection from "./PaginationSection";
import { DigiContext } from "../../context/DigiContext";
import { BASE_URL } from "../../api";

const AllEmployeeTable = () => {
  const { isBelowLg } = useContext(DigiContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [dataList, setDataList] = useState([]);
  const dropdownRef = useRef(null); // ✅ FIXED: Define dropdownRef

  useEffect(() => {
    const fetchStaffUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/staffs/`);
        const result = await response.json();

        if (Array.isArray(result) && result.length > 0) {
          const formattedData = result.map(user => ({
            employee_id: user.id,
            username: user.username,
            email: user.email,
            contact_number: user.contact_number || "N/A",
            is_staff: user.is_staff,
            section: user.section || "N/A",
            present_address: user.present_address || "N/A",
            showDropdown: false, // Add this to track dropdown state
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

  const handleDropdownToggle = (event, index) => {
    event.stopPropagation();
    setDataList((prevDataList) =>
      prevDataList.map((data, i) => ({
        ...data,
        showDropdown: i === index ? !data.showDropdown : false, // Toggle dropdown for the clicked row
      }))
    );
  };

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
              <tr key={data.employee_id || index}>
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
                        <a href="#" className="dropdown-item">
                          <span className="dropdown-icon">
                            <i className="fa-light fa-eye"></i>
                          </span>
                          View
                        </a>
                      </li>
                      <li>
                        <a href="#" className="dropdown-item">
                          <span className="dropdown-icon">
                            <i className="fa-light fa-pen-to-square"></i>
                          </span>
                          Edit
                        </a>
                      </li>
                      <li>
                        <a href="#" className="dropdown-item">
                          <span className="dropdown-icon">
                            <i className="fa-light fa-pen-nib"></i>
                          </span>
                          Revoke
                        </a>
                      </li>
                      <li>
                        <a href="#" className="dropdown-item">
                          <span className="dropdown-icon">
                            <i className="fa-light fa-trash-can"></i>
                          </span>
                          Delete
                        </a>
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
              <td colSpan="8" className="text-center">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
    </>
  );
};

export default AllEmployeeTable;
