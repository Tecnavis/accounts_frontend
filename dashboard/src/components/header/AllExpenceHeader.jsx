import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AllCustomerHeader = () => {
    
  return (
      <div className="panel-header">
          <h5>All Expences</h5>
          <div className="btn-box d-flex flex-wrap gap-2">
              <div id="tableSearch">
                  <Form.Text placeholder='Search...'/>
              </div>
              <Link to="/addExpenses" className="btn btn-sm btn-primary"><i className="fa-light fa-plus"></i> Add New</Link>
          </div>
      </div>
    )
  }

export default AllCustomerHeader