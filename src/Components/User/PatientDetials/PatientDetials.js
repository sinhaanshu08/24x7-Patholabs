// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Table, Form } from 'react-bootstrap';
import { db, auth } from '../../../Firebase/Firebase';
import { ref, onValue, set } from 'firebase/database';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AddNewPatient from '../AddNewPatient/AddNewPatient';
import './PatientDetails.css'; // Import custom styles
import { useLocation, useNavigate } from 'react-router-dom';

const PatientDetails = () => {
  // State variables
  const [patientProfile, setPatientProfile] = useState({});
  const [patientMembers, setPatientMembers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPatientMember, setEditingPatientMember] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [selectedTime, setSelectedTime] = useState(getCurrentTime());
  const location = useLocation();
  const { cartItems, priceDetails, isChecked} = location.state;
  const navigate = useNavigate();


  // Fetch patient profile and members data from Firebase
  useEffect(() => {
    if (auth.currentUser) {
      const userPhoneNumber = auth.currentUser.phoneNumber.substring(3);
      const userRef = ref(db, `patients/${userPhoneNumber}`);

      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          setPatientProfile(userData);
        }
      });

      const patientMembersRef = ref(db, `patients/${userPhoneNumber}/patientMembers`);
      onValue(patientMembersRef, (snapshot) => {
        const patientMembersData = snapshot.val();
        if (patientMembersData) {
          const members = Object.entries(patientMembersData).map(([id, data]) => ({ id, ...data }));
          setPatientMembers(members);
        } else {
          setPatientMembers([]);
        }
      });
    }
  }, []);

  // Update selected date to current date if it's in the past
  useEffect(() => {
    const currentDate = new Date();
    if (new Date(selectedDate) < currentDate) {
      setSelectedDate(getCurrentDate());
    }
  }, [selectedDate]);

  // Update selected time to current time if it's in the past
  useEffect(() => {
    const currentTime = new Date();
    if (new Date(`${selectedDate}T${selectedTime}`) < currentTime) {
      setSelectedTime(getCurrentTime());
    }
  }, [selectedDate, selectedTime]);

  // Function to handle editing a patient member
  const handleEditPatientMember = (id, patientMember) => {
    setEditingPatientMember(patientMember);
    setShowAddModal(true);
  };

  // Function to open the add modal
  const handleAddModalOpen = () => {
    setShowAddModal(true);
    setEditingPatientMember(null); // Reset editing patient member when opening modal for adding
  };

  // Function to close the add modal
  const handleAddModalClose = () => {
    setShowAddModal(false);
  };

  // Function to delete a patient member
  const handleDeletePatient = (id) => {
    const userPhoneNumber = auth.currentUser.phoneNumber.substring(3);
    const memberRef = ref(db, `patients/${userPhoneNumber}/patientMembers/${id}`);

    // Show confirmation dialog before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this patient member?");
    if (confirmDelete) {
      // Remove the specific patient member
      set(memberRef, null)
        .then(() => {
          console.log('Patient member deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting patient member:', error);
        });
    }
  };

  // State variables
  const [isCheckedProfile, setIsCheckedProfile] = useState(false);
  const [isCheckedMember, setIsCheckedMember] = useState(new Array(patientMembers.length).fill(false));

  // Function to handle profile checkbox change
  const handleProfileCheckbox = () => {
    setIsCheckedProfile(!isCheckedProfile);
    setIsCheckedMember(new Array(patientMembers.length).fill(false)); // Uncheck all member checkboxes
  };

  // Function to handle member checkbox change
  const handleMemberCheckbox = (index) => {
    const updatedCheckedMember = new Array(patientMembers.length).fill(false);
    updatedCheckedMember[index] = !isCheckedMember[index]; // Toggle the checked state of the clicked member

    setIsCheckedProfile(false); // Uncheck the profile checkbox

    setIsCheckedMember(updatedCheckedMember);
  };



// Function to save the selected items and navigate to order summary page
const handleSave = () => {
  // If no patient is selected
  if (!isCheckedProfile && !isCheckedMember.some(checked => checked)) {
    alert('Please select a patient before saving.');
    return;
  }

  // If both profile and members are selected
  if (isCheckedProfile && isCheckedMember.some(checked => checked)) {
    alert('Please select only one patient.');
    return;
  }

  let selectedPatientData;
  
  // If only profile is selected
  if (isCheckedProfile) {
    selectedPatientData = {
      ...patientProfile,
      address: patientProfile.address, // Include the address field
      contactNumber: patientProfile.phoneNumber, // Include the contact number
      email: patientProfile.email // Include the contact number

    };
  } else {
    // If validation passed, proceed with saving and navigation for selected member
    const selectedPatientIndex = isCheckedMember.findIndex(checked => checked);
    const selectedPatient = patientMembers[selectedPatientIndex];
    selectedPatientData = {
      ...selectedPatient,
      address: patientProfile.address, // Include the address field
      contactNumber: selectedPatient.contactNumber, // Include the contact number
      email: patientProfile.email // Include the contact number

    };
  }

  // Store the selected data in localStorage
  localStorage.setItem('orderData', JSON.stringify({
    selectedPatient: selectedPatientData,
    selectedDate,
    selectedTime,
    cartItems,
    priceDetails,
    isChecked
  }));

  navigate('/order-summary');
};



  // Function to get current date in YYYY-MM-DD format
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Function to get current time in HH:MM format
  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Render the component
  return (
    <div className="container py-4 main-container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Row>
            <Col className='text-end'>
              <h5><span onClick={handleAddModalOpen} className="add-new-patient-btn">+ ADD A NEW PATIENT</span></h5>
              <AddNewPatient show={showAddModal} handleClose={handleAddModalClose} isEditMode={!!editingPatientMember} patientMemberData={editingPatientMember} />
            </Col>
          </Row>

          <Card className="shadow-lg border-0" style={{ backgroundColor: 'white' }}>
            <Card.Header className="text-white text-center" style={{ backgroundColor: '#ff6f61' }}>
              <h3 className="m-0">Patient Details</h3>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col md={6} className="d-flex align-items-center">
                  <p className="m-0"><strong>Name:</strong> {patientProfile.name}</p>
                </Col>
                <Col md={6}>
                  <p className="m-0"><strong>Gender:</strong> {patientProfile.gender}</p>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <p><strong>Email:</strong> {patientProfile.email}</p>
                  <p><strong>Contact Number:</strong> {patientProfile.phoneNumber}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Age:</strong> {patientProfile.age}</p>
                  <p><strong>Address:</strong> {patientProfile.address}</p>
                </Col>
              </Row>
              <div>
                <Form.Check
                  style={{ fontSize: '20px', fontWeight: 'bold' }}
                  type="checkbox"
                  id={`profile-checkbox`}
                  label="Tests are for me"
                  checked={isCheckedProfile}
                  onChange={handleProfileCheckbox}
                />

              </div>
            </Card.Body>
          </Card>
          {patientMembers.length > 0 && (
            <Card className="mt-4 shadow-lg border-0" style={{ backgroundColor: 'white' }}>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>
                        Select
                      </th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Contact Number</th>
                      <th>Gender</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientMembers.map((member, index) => (
                      <tr key={member.id}>
                        <td>
                          <Form.Check
                            style={{ fontSize: '18px' }}
                            type="checkbox"
                            id={`member-${member.id}`}
                            label=""
                            checked={isCheckedMember[index]}
                            onChange={() => handleMemberCheckbox(index)}
                          />
                        </td>
                        <td>{member.name}</td>
                        <td>{member.age}</td>
                        <td>{member.contactNumber}</td>
                        <td>{member.gender}</td>
                        <td>
                          <div className="d-flex">
                            <Button style={{ fontSize: '18px' }} variant="primary" size="sm" className="me-2" onClick={() => handleEditPatientMember(member.id, member)}>
                              <FaEdit className="me-1" />Edit
                            </Button>
                            <Button style={{ fontSize: '18px' }} variant="danger" size="sm" onClick={() => handleDeletePatient(member.id)}>
                              <FaTrash className="me-1" />Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="text-center mt-4">
                  <Button className='me-2' variant="success" onClick={handleSave}>Save</Button>
                  <Button className='me-2' variant="secondary" onClick={() => navigate(-1)}>Back</Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
        <div className="col-lg-4">
          <Card className="shadow-lg border-0 slot-card" style={{ backgroundColor: 'white' }}>
            <Card.Header className="text-white text-center slot-header" style={{ backgroundColor: '#ff6f61' }}>
              <h3 className="m-0">Pathology Slot</h3>
            </Card.Header>
            <Card.Body className="slot-body">
              <div className="mb-3">
                <Form.Label className="form-label" htmlFor="selectDate">Select Date:</Form.Label>
                <Form.Control
                  id="selectDate"
                  type="date"
                  value={selectedDate}
                  min={getCurrentDate()} // Set minimum date to today
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Form.Label className="form-label" htmlFor="selectTime">Select Time:</Form.Label>
                <Form.Control
                  id="selectTime"
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  min={getCurrentTime()} // Set minimum time to current time
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;
