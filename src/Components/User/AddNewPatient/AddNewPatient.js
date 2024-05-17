import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { db, auth } from '../../../Firebase/Firebase';
import { push, ref, set } from 'firebase/database';

const AddNewPatient = ({ show, handleClose, isEditMode, patientMemberData }) => {
    const [formData, setFormData] = useState({
        name: "",
        contactNumber: "",
        age: "",
        gender: ""
    });
    const [validationError, setValidationError] = useState(""); // State for form validation error

    const handleModalClose = () => {
        handleClose();
        setValidationError(""); // Clear validation error message
    };

    useEffect(() => {
        if (isEditMode && patientMemberData) {
            setFormData(patientMemberData);
        } else {
            // Reset form data when adding a new patient
            setFormData({
                name: "",
                contactNumber: "",
                age: "",
                gender: ""
            });
        }
    }, [isEditMode, patientMemberData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
            setValidationError("Please enter only alphabetic characters.");
            return;
        }
        setFormData({
            ...formData,
            [name]: value
        });
        setValidationError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Form validation
        if (!formData.name || !formData.contactNumber || !formData.age || !formData.gender) {
            setValidationError("Please fill out all fields.");
            return;
        }

        // Phone number validation
        const phoneNumberPattern = /^[0-9]{10}$/;
        if (!phoneNumberPattern.test(formData.contactNumber)) {
            setValidationError("Please enter a valid 10-digit phone number.");
            return;
        }

        const userPhoneNumber = auth.currentUser.phoneNumber.substring(3);
        const userRef = ref(db, `patients/${userPhoneNumber}/patientMembers`);

        if (patientMemberData) {
            // Update existing patient member
            const patientMemberRef = ref(db, `patients/${userPhoneNumber}/patientMembers/${patientMemberData.id}`);
            set(patientMemberRef, formData)
                .then(() => {
                    console.log('Patient member updated successfully');
                    handleClose();
                    setValidationError('');
                })
                .catch((error) => {
                    console.error('Error updating patient member:', error);
                });
        } else {
            // Add new patient member
            const newPatientRef = push(userRef); // Generate a unique key for the new patient
            set(newPatientRef, formData)
                .then(() => {
                    console.log('New patient added successfully');
                    setFormData({ // Clear form fields after successful submission
                        name: "",
                        contactNumber: "",
                        age: "",
                        gender: ""
                    });
                    handleClose();
                    setValidationError('');
                })
                .catch((error) => {
                    console.error('Error adding new patient:', error);
                });
        }
    };

    return (
        <Modal show={show} onHide={handleModalClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Edit Patient' : 'Add New Patient'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {validationError && <div className="text-danger mb-3">{validationError}</div>} {/* Display form validation error */}
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter name"
                                required
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="Enter contact number"
                                required
                            />
                        </Col>
                        <Col>
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="Enter age"
                                required
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                as="select"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Button type="submit" className="w-100 btn-lg mt-4">
                        {isEditMode ? 'Update' : 'Add'} Patient
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddNewPatient;
