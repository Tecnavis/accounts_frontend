// import React, { useEffect, useState } from 'react';
// import { Table, Spinner, Alert, Button, Modal, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
// import PaginationSection from './PaginationSection';

// const AllProductTable = ({ categoryId }) => {
//     const [services, setServices] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const dataPerPage = 10;
//     const [selectedService, setSelectedService] = useState(null);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);

//     useEffect(() => {
//         fetchServices();
//     }, [categoryId]);

//     const fetchServices = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`http://127.0.0.1:8000/api/v1/services/services`);
//             setServices(response.data);
//         } catch (err) {
//             setError('Failed to fetch services');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEdit = (service) => {
//         setSelectedService(service);
//         setShowEditModal(true);
//     };

//     const handleDelete = (service) => {
//         setSelectedService(service);
//         setShowDeleteModal(true);
//     };

//     const updateService = async (updatedService) => {
//         try {
//             await axios.put(`http://127.0.0.1:8000/api/v1/services/${updatedService.id}/update/`, updatedService);
//             fetchServices();
//             setShowEditModal(false);
//         } catch (error) {
//             alert("Failed to update service");
//         }
//     };
    

//     const deleteService = async () => {
//         try {
//             await axios.delete(`http://127.0.0.1:8000/api/v1/categories/${categoryId}/services/${selectedService.id}/delete/`);
//             fetchServices();
//             setShowDeleteModal(false);
//         } catch (error) {
//             alert("Failed to delete service");
//         }
//     };

//     const indexOfLastData = currentPage * dataPerPage;
//     const indexOfFirstData = indexOfLastData - dataPerPage;
//     const currentData = services.slice(indexOfFirstData, indexOfLastData);
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);
//     const totalPages = Math.ceil(services.length / dataPerPage);
//     const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);

//     return (
//         <>
//             <OverlayScrollbarsComponent>
//                 {loading && <Spinner animation="border" variant="primary" />}
//                 {error && <Alert variant="danger">{error}</Alert>}
//                 {!loading && !error && (
//                     <Table className="table table-hover table-striped">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Name</th>
//                                 <th>Description</th>
//                                 <th>Category</th>
//                                 <th>Price</th>
//                                 <th>Discount</th>
//                                 <th>Tax Rate</th>
//                                 <th>Status</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentData.map((service) => (
//                                 <tr key={service.id}>
//                                     <td>{service.id}</td>
//                                     <td>{service.name}</td>
//                                     <td>{service.description}</td>
//                                     <td>{service.category_name}</td>
//                                     <td>{service.price}</td>
//                                     <td>{service.discount}%</td>
//                                     <td>{service.tax_rate}%</td>
//                                     <td>{service.is_active ? "Active" : "Inactive"}</td>
//                                     <td>
//                                         <div className="btn-box">
//                                             <button onClick={() => handleEdit(service)}><i className="fa-light fa-pen"></i></button>
//                                             <button onClick={() => handleDelete(service)}><i className="fa-light fa-trash"></i></button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 )}
//             </OverlayScrollbarsComponent>
//             <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} pageNumbers={pageNumbers} />

//             {/* Edit Modal */}
//             {selectedService && (
//                 <EditServiceModal
//                     show={showEditModal}
//                     handleClose={() => setShowEditModal(false)}
//                     service={selectedService}
//                     updateService={updateService}
//                 />
//             )}

//             {/* Delete Modal */}
//             {selectedService && (
//                 <DeleteServiceModal
//                     show={showDeleteModal}
//                     handleClose={() => setShowDeleteModal(false)}
//                     handleDelete={deleteService}
//                     service={selectedService}
//                 />
//             )}
//         </>
//     );
// };

// // Edit Service Modal
// const EditServiceModal = ({ show, handleClose, service, updateService }) => {
//     const [formData, setFormData] = useState({ ...service });

//     useEffect(() => {
//         setFormData({ ...service });
//     }, [service]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         updateService(formData);
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Edit Service</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group>
//                         <Form.Label>Name</Form.Label>
//                         <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Category</Form.Label>
//                         <Form.Control type="text" name="category_name" value={formData.category_name} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group></Form.Group>
//                     <Form.Group>
//                         <Form.Label>Price</Form.Label>
//                         <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>HS Code</Form.Label>
//                         <Form.Control type="text" name="hs_code" value={formData.hsn_code} onChange={handleChange} required />
//                     </Form.Group>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//                         <Button type="submit" variant="primary">Save Changes</Button>
//                     </Modal.Footer>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

// // Delete Confirmation Modal
// const DeleteServiceModal = ({ show, handleClose, handleDelete, service }) => {
//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Confirm Delete</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <p>Are you sure you want to delete the service <strong>{service.name}</strong>?</p>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>Cancel</Button>
//                 <Button variant="danger" onClick={handleDelete}>Delete</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default AllProductTable;


import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import PaginationSection from './PaginationSection';
import { BASE_URL } from "../../api";

const AllProductTable = ({ categoryId }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 10;
    const [selectedService, setSelectedService] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchServices();
    }, [categoryId]);

    const fetchServices = async () => {
        setLoading(true);
        try {
       
            const response = await axios.get(`${BASE_URL}/services/services`);
            setServices(response.data);
        } catch (err) {
            setError('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (service) => {
        setSelectedService(service);
        setShowEditModal(true);
    };

    const handleDelete = (service) => {
        setSelectedService(service);
        setShowDeleteModal(true);
    };

    const updateService = async (updatedService) => {
        try {
            await axios.put(`${BASE_URL}/services/${updatedService.id}/update/`, updatedService);

            fetchServices();
            setShowEditModal(false);
        } catch (error) {
            alert("Failed to update service");
        }
    };

    const deleteService = async () => {
        try {
            await axios.delete(`${BASE_URL}/categories/${categoryId}/services/${selectedService.id}/delete/`);
            fetchServices();
            setShowDeleteModal(false);
        } catch (error) {
            alert("Failed to delete service");
        }
    };

    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = services.slice(indexOfFirstData, indexOfLastData);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(services.length / dataPerPage);
    const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);

    return (
        <>
            <OverlayScrollbarsComponent>
                {loading && <Spinner animation="border" variant="primary" />}
                {error && <Alert variant="danger">{error}</Alert>}
                {!loading && !error && (
                    <Table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Vat type</th>
                                <th>Offer Price</th>
                                <th>Vat amount</th>
                                <th>total price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((service) => (
                                <tr key={service.id}>
                                    <td>{service.id}</td>
                                    <td>{service.name}</td>
                                    <td>{service.description}</td>
                                    <td>{service.category_name}</td>
                                    <td>{service.price}</td>
                                    <td>{service.vat_type}</td>
                                    <td>{service.offerPrice}</td>
                                    
                                    
                                    <td>{service.vat_amount}</td>
                                    <td>{service.total_price}</td>
                                    {/* <td>{service.vat_rate}</td> */}

                                    <td>{service.is_active ? "Active" : "Inactive"}</td>
                                    <td>
                                        <div className="btn-box">
                                            <button onClick={() => handleEdit(service)}><i className="fa-light fa-pen"></i></button>
                                            <button onClick={() => handleDelete(service)}><i className="fa-light fa-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </OverlayScrollbarsComponent>
            <PaginationSection currentPage={currentPage} totalPages={totalPages} paginate={paginate} pageNumbers={pageNumbers} />

            {selectedService && (
                <EditServiceModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    service={selectedService}
                    updateService={updateService}
                />
            )}

            {selectedService && (
                <DeleteServiceModal
                    show={showDeleteModal}
                    handleClose={() => setShowDeleteModal(false)}
                    handleDelete={deleteService}
                    service={selectedService}
                />
            )}
        </>
    );
};

const EditServiceModal = ({ show, handleClose, service, updateService }) => {
    const [formData, setFormData] = useState({ ...service });

    useEffect(() => {
        setFormData({ ...service });
    }, [service]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateService(formData);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>GST Rate</Form.Label>
                        <Form.Control type="text" name="gst_rate" value={formData.gst_rate} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>VAT Rate</Form.Label>
                        <Form.Control type="text" name="vat_rate" value={formData.vat_rate} onChange={handleChange} required />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant="primary">Save Changes</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AllProductTable;




