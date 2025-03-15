import React, { useContext} from 'react';
import { NavLink, Link } from 'react-router-dom';
import { DigiContext } from '../../context/DigiContext';
import Cookies from "js-cookie";

const AppsPart = () => {

  const userRole = Cookies.get("user_role") || ""; 
  const { 
    state, 
    toggleCrmDropdown, 
    toggleHrmDropdown, 
    toggleAccountsDropdown,
    toggleEcommerceDropdown, 
    toggleMainDropdown, 
    toggleSubDropdown,
    layoutPosition, 
    dropdownOpen,
    mainAppsDropdownRef,
    isExpanded,
    isNavExpanded,
    isSmallScreen
  } = useContext(DigiContext);
  const { 
    isMainDropdownOpen, 
    isCrmDropdownOpen, 
    isHrmDropdownOpen, 
    isAccountsDropdownOpen,
    isEcommerceDropdownOpen, 
    isSubDropdownOpen 
  } = state;
  
  const handleSubNavLinkClick = () => {
    if (!isSubDropdownOpen) {
      toggleSubDropdown(); 
    }
  };
  return (
    <li className="sidebar-item" ref={isExpanded || isNavExpanded.isSmall || layoutPosition.horizontal || (layoutPosition.twoColumn && isExpanded) || (layoutPosition.twoColumn && isSmallScreen) ? mainAppsDropdownRef : null}>
      <Link
        role="button"
        className={`sidebar-link-group-title has-sub ${isMainDropdownOpen ? 'show' : ''}`}
        onClick={toggleMainDropdown}
      >
        Apps
      </Link>
      <ul className={`sidebar-link-group 
      ${layoutPosition.horizontal ? (dropdownOpen.apps ? 'd-block' : 'd-none') : (isMainDropdownOpen ? 'd-none' : '')}
      `}>       

        <li className="sidebar-dropdown-item" >
          <Link
            role="button"
            className={`sidebar-link has-sub ${isCrmDropdownOpen ? 'show' : ''}`}
            onClick={toggleCrmDropdown}
          >
            <span className="nav-icon">
              <i className="fa-light fa-user-headset"></i>
            </span>{' '}
            <span className="sidebar-txt">Transaction</span>
          </Link>
          <ul
            className={`sidebar-dropdown-menu ${
              isCrmDropdownOpen && isSubDropdownOpen ? 'd-block' : ''
            }`}
            id="crmDropdown"
           
          >

            <li className="sidebar-dropdown-item">
              <NavLink to="/allSales" className="sidebar-link" onClick={handleSubNavLinkClick}>
                Sale
              </NavLink>
            </li>
  
            <li className="sidebar-dropdown-item">
              <NavLink to="/allPurchase" className="sidebar-link" onClick={handleSubNavLinkClick}>
                Purchase
              </NavLink>
            </li>

            <li className="sidebar-dropdown-item">
              <NavLink to="/allExpenses" className="sidebar-link" onClick={handleSubNavLinkClick}>
                Expenses
              </NavLink>
            </li>

          </ul>
        </li>
        <li className="sidebar-dropdown-item">
          <Link
            role="button"
            className={`sidebar-link has-sub ${isHrmDropdownOpen ? 'show' : ''}`}
            onClick={toggleHrmDropdown}
          >
            <span className="nav-icon">
              <i className="fa-light fa-user-tie"></i>
            </span>{' '}
            <span className="sidebar-txt">Account Master</span>
          </Link>
          <ul
            className={`sidebar-dropdown-menu ${
              isHrmDropdownOpen && isSubDropdownOpen ? 'd-block' : ''
            }`}
            id="hrmDropdown"
          >
          <li className="sidebar-dropdown-item">
            <NavLink to="/allCustomer" className="sidebar-link" onClick={handleSubNavLinkClick}>
              All Customer
            </NavLink>
          </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/supplier" className="sidebar-link" onClick={handleSubNavLinkClick}>
                All Suppliers
              </NavLink>
            </li>
            
            {(userRole === "ADMIN" || userRole === "SUPER_ADMIN") && (
              <li className="sidebar-dropdown-item">
                <NavLink to="/allEmployee" className="sidebar-link">
                  All Employee
                </NavLink>
              </li>
            )} 

            {userRole === "SUPER_ADMIN" && (
              <li className="sidebar-dropdown-item">
                <NavLink to="/allAdmin" className="sidebar-link">
                  All Admins
                </NavLink>
              </li>
            )}        
           
          </ul>
        </li>
        <li className="sidebar-dropdown-item">
          <Link
            role="button"
            className={`sidebar-link has-sub ${isEcommerceDropdownOpen ? 'show' : ''}`}
            onClick={toggleEcommerceDropdown}
          >
            <span className="nav-icon">
              <i className="fa-light fa-cart-shopping-fast"></i>
            </span>{' '}
            <span className="sidebar-txt">Item Master</span>
          </Link>
          <ul
            className={`sidebar-dropdown-menu ${
              isEcommerceDropdownOpen && isSubDropdownOpen ? 'd-block' :''
            }`}
            id="ecommerceDropdown"

          >
        
            <li className="sidebar-dropdown-item">
              <NavLink to="/allProduct" className="sidebar-link" onClick={handleSubNavLinkClick}>
               All Service
              </NavLink>
            </li>
            <li className="sidebar-dropdown-item">
              <NavLink to="/category" className="sidebar-link" onClick={handleSubNavLinkClick}>
                All Category
              </NavLink>
            </li>

          </ul>
        </li>
      </ul>
    </li>
  );
};

export default AppsPart;
