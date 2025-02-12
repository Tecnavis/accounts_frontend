// import React from 'react'
// import Footer from '../components/footer/Footer'
// import { Form } from 'react-bootstrap'

// const InvoicesMainContent = () => {
//   return (
//     <div className="main-content">
//     <div className="dashboard-breadcrumb dashboard-panel-header mb-30">
//         <h2>Invoices</h2>
//     </div>
//     <div className="row g-4 justify-content-center">
//         <div className="col-12">
//             <div className="panel rounded-0">
//                 <div className="panel-body invoice" id="invoiceBody">
//                     <div className="invoice-header mb-30">
//                         <div className="row justify-content-between align-items-end">
//                             <div className="col-xl-4 col-lg-5 col-sm-6">
//                                 <div className="shop-address">
//                                     <div className="logo mb-20">
//                                         <img src="assets/images/logo-big.png" alt="Logo"/>
//                                     </div>
//                                     <div className="part-txt">
//                                         <p className="mb-1">Address: 456 E-Commerce Avenue, Cityville, Countryland</p>
//                                         <p className="mb-1">Email: support@shopifymart.com</p>
//                                         <p className="mb-1">Phone: +1 (800) 123-4567</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-sm-6">
//                                 <div className="d-flex gap-xl-4 gap-3 status-row">
//                                     <div className="w-50">
//                                         <div className="payment-status">
//                                             <label className="form-label">Payment Status:</label>
//                                             <Form.Select className="form-control">
//                                                 <option value="0">Paid</option>
//                                                 <option value="1">Unpaid</option>
//                                                 <option value="2">Partial</option>
//                                             </Form.Select>
//                                         </div>
//                                     </div>
//                                     <div className="w-50">
//                                         <div className="Order-status">
//                                             <label className="form-label">Order Status:</label>
//                                             <Form.Select className="form-control">
//                                                 <option value="0">Pending</option>
//                                                 <option value="1">Delivered</option>
//                                                 <option value="2">Canceled</option>
//                                             </Form.Select>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="invoice-body">
//                         <div className="info-card-wrap mb-30">
//                             <div className="row">
//                                 <div className="col-md-4 col-sm-6">
//                                     <div className="info-card">
//                                         <h3>Customer Details:</h3>
//                                         <ul className="p-0">
//                                             <li><span>Name:</span> John Doe</li>
//                                             <li><span>Email:</span> john.doe@example.com</li>
//                                             <li><span>Phone:</span> +1 (555) 555-1234</li>
//                                             <li><span>Address:</span> 123 Main Street, Anytown, USA</li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4 col-sm-6 d-flex justify-content-center">
//                                     <div className="info-card">
//                                         <h3>Shipping Address:</h3>
//                                         <ul className="p-0">
//                                             <li><span>Name:</span> John Doe</li>
//                                             <li><span>Email:</span> john.doe@example.com</li>
//                                             <li><span>Phone:</span> +1 (555) 555-1234</li>
//                                             <li><span>Address:</span> 123 Main Street, Anytown, USA</li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4 col-sm-6 d-flex justify-content-end">
//                                     <div className="info-card">
//                                         <h3>Invoice Details:</h3>
//                                         <ul className="p-0">
//                                             <li><span>Invoice No.:</span> 22123101</li>
//                                             <li><span>Oder Date:</span> 2022-12-26</li>
//                                             <li><span>Total Amount:</span> 282.00</li>
//                                             <li><span>Payment Type:</span> cash on delivery</li>
//                                             <li><span>Payment Status:</span> <span className="text-danger">Unpaid</span></li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="table-responsive mb-30">
//                             <table className="table table-bordered mb-0 invoice-table">
//                                 <thead>
//                                     <tr>
//                                         <th>No.</th>
//                                         <th>Products</th>
//                                         <th>Qty.</th>
//                                         <th>Price</th>
//                                         <th>Shipping Cost</th>
//                                         <th>Tax</th>
//                                         <th>Subtotal</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr>
//                                         <td>01</td>
//                                         <td>AeroGlide ProTech Backpack</td>
//                                         <td>01</td>
//                                         <td>$99</td>
//                                         <td>$09</td>
//                                         <td>$00</td>
//                                         <td>$108</td>
//                                     </tr>
//                                     <tr>
//                                         <td>02</td>
//                                         <td>StellarBloom Infinity Scarf</td>
//                                         <td>02</td>
//                                         <td>$150</td>
//                                         <td>$10</td>
//                                         <td>$00</td>
//                                         <td>$160</td>
//                                     </tr>
//                                     <tr>
//                                         <td>03</td>
//                                         <td>LuminaFlex Smart Desk Lamp</td>
//                                         <td>03</td>
//                                         <td>$03</td>
//                                         <td>$03</td>
//                                         <td>$00</td>
//                                         <td>$06</td>
//                                     </tr>
//                                     <tr>
//                                         <td>04</td>
//                                         <td>AquaGlow HydroTech Water Bottle</td>
//                                         <td>04</td>
//                                         <td>$04</td>
//                                         <td>$04</td>
//                                         <td>$00</td>
//                                         <td>$08</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                         <div className="total-payment-area row justify-content-end mb-30">
//                             <div className="col-md-4 col-sm-6">
//                                 <ul>
//                                     <li className="d-flex justify-content-between">Net Total:<span>282.00</span></li>
//                                     <li className="d-flex justify-content-between">Shipping Cost:<span>0</span></li>
//                                     <li className="d-flex justify-content-between">Vat:<span>0</span></li>
//                                     <li className="d-flex justify-content-between">Total:<span>282.00</span></li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <p className="invoice-note text-center mb-0">Please check your parcel carefully</p>
//                     </div>
//                 </div>
//                 <div className="panel-body border-top">
//                     <div className="btn-box d-flex justify-content-end gap-2">
//                         <button className="btn btn-sm btn-primary" id="printInvoice"><i className="fa-light fa-print"></i> Print</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>

//     <Footer/>
// </div>
//   )
// }

// export default InvoicesMainContent

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const InvoicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoiceData();
  }, [id]);

  const fetchInvoiceData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/financials/transactions/${id}/`);
      setInvoiceData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching invoice:", error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!invoiceData) return <div>Invoice not found</div>;

  return (
    <div className="main-content">
      <div className="dashboard-breadcrumb dashboard-panel-header mb-30">
        <div className="d-flex justify-content-between align-items-center">
          {/* <h2>Invoice # {invoiceData.transaction_id}</h2> */}

          <h2>Invoice # <strong>{invoiceData.transaction_id}</strong></h2>

        </div>
      </div>

      <div className="panel rounded-0">
        <div className="panel-body invoice">
          <div className="invoice-header mb-30">
            <div className="row justify-content-between align-items-end">
              <div className="col-xl-4 col-lg-5 col-sm-6">
                <div className="shop-address">
                  {/* <div className="part-txt">
                    <h4>Company Name</h4>
                    <p className="mb-1">Address: Your Company Address</p>
                    <p className="mb-1">Email: company@email.com</p>
                    <p className="mb-1">Phone: +1234567890</p>
                  </div> */}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex gap-xl-4 gap-3 status-row">
                  <div className="w-100">
                    <div className="payment-status">
                      {/* <h5>Payment Status: {invoiceData.payment_status}</h5> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="invoice-body">
            <div className="info-card-wrap mb-30">
              <div className="row">
                <div className="col-md-6">
                  <div className="info-card">
                    <h3>Customer Details:</h3>
                    <ul className="p-0">
                      <li><span>Name:</span> {invoiceData.username}</li>
                      <li><span>Transaction ID:</span> {invoiceData.transaction_id}</li>
                      <li><span>Purchase Date:</span> {invoiceData.sale_date}</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-card">
                    <h3>Invoice Details:</h3>
                    <ul className="p-0">
                      <li><span>Service:</span> {invoiceData.service_name}</li>
                      <li><span>Payment Mode:</span> {invoiceData.payments?.[0]?.payment_mode || "N/A"}</li>
                      <li><span>Payment Status:</span> {invoiceData.payment_status}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="table-responsive mb-30">
              <table className="table table-bordered mb-0 invoice-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Tax Rate</th>
                    <th>Tax Amount</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{invoiceData.service_name}</td>
                    <td>Rs {invoiceData.service_price}</td>
                    <td>{invoiceData.tax_rate || "N/A"}</td>
                    <td>Rs {invoiceData.tax_amount || 0}</td>
                    <td>Rs {invoiceData.total_amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* New Payment History Section */}
            <div className="mb-30">
              <h3 className="mb-3">Payment History</h3>
              <div className="table-responsive">
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Payment ID</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Payment Mode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.payments?.map((payment) => (
                      <tr key={payment.payment_id}>
                        <td>{payment.payment_id}</td>
                        <td>{payment.payment_date}</td>
                        <td>Rs {payment.amount}</td>
                        <td className="text-capitalize">{payment.payment_mode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="total-payment-area row justify-content-end mb-30">
              <div className="col-md-4">
                <ul>
                  <li className="d-flex justify-content-between">
                    Net Amount:<span>Rs {invoiceData.service_price}</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    Tax Amount:<span>Rs {invoiceData.tax_amount || 0}</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    Total Amount:<span>Rs {invoiceData.total_amount || invoiceData.service_price}</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    Total Paid:<span>Rs {invoiceData.total_paid}</span>
                  </li>
                  <li className="d-flex justify-content-between fw-bold">
                    Remaining Amount:<span>Rs {invoiceData.remaining_amount}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="panel-body border-top">
          <div className="btn-box d-flex justify-content-end gap-2">
            <button 
              className="btn btn-sm btn-primary" 
              onClick={() => window.print()}
            >
              <i className="fa-light fa-print"></i> Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;