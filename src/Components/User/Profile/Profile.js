import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Card, Alert } from 'react-bootstrap'; 
import { db, auth } from '../../../Firebase/Firebase';
import { ref, get, set, onValue, update } from 'firebase/database';
import { FaUser, FaEnvelope, FaPhone, FaUserClock, FaMapMarkerAlt, FaSave, FaEdit, FaTimes, FaTrash, FaFemale, FaMale } from 'react-icons/fa';
import AddNewPatient from '../AddNewPatient/AddNewPatient';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    age: "",
    gender: "",
    address: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [originalFormData, setOriginalFormData] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [patientMembers, setPatientMembers] = useState([]);
  const [showPatientMembers, setShowPatientMembers] = useState(true);
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();
  const [editingPatientMember, setEditingPatientMember] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      const userPhoneNumber = auth.currentUser.phoneNumber;
      const phoneNumberWithoutCountryCode = userPhoneNumber.substring(3);
      setFormData(prevData => ({
        ...prevData,
        phoneNumber: phoneNumberWithoutCountryCode,
      }));
      const userRef = ref(db, `patients/${phoneNumberWithoutCountryCode}`);
      get(userRef)
        .then((snapshot) => {
          const userData = snapshot.val();
          if (userData) {
            setOriginalFormData(userData);
            setFormData(prevData => ({
              ...prevData,
              name: userData.name || "",
              email: userData.email || "",
              age: userData.age || "",
              gender: userData.gender || "",
              address: userData.address || "",
            }));
            const { name, age, email, gender, address } = userData;
            if (!name || !age || !email || !gender || !address) {
              setShowForm(true);
            }
          } else {
            setShowForm(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      const patientMembersRef = ref(db, `patients/${phoneNumberWithoutCountryCode}/patientMembers`);
      onValue(patientMembersRef, (snapshot) => {
        const patientMembersData = snapshot.val();
        if (patientMembersData) {
          const members = Object.entries(patientMembersData).map(([id, data]) => ({ id, ...data }));
          setPatientMembers(members);
        } else {
          setPatientMembers([]);
        }
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

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
    setValidationError("");
  };

  const handleEdit = () => {
    setOriginalFormData({ ...formData });
    setShowForm(true);
    setEditMode(true);
    setShowPatientMembers(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData(originalFormData);
    setEditMode(false);
    setShowPatientMembers(true);
    setValidationError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if all required fields are filled
    if (!formData.name || !formData.email || !formData.age || !formData.gender || !formData.address) {
      setValidationError("Please fill out all fields.");
      return;
    }
  
    if (auth.currentUser) {
      const userPhoneNumber = auth.currentUser.phoneNumber.substring(3);
      const userRef = ref(db, `patients/${userPhoneNumber}`);
  
      // Retrieve existing patient member data
      const patientMembersRef = ref(db, `patients/${userPhoneNumber}/patientMembers`);
  
      // Update only the profile fields
      update(userRef, {
        name: formData.name,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        address: formData.address
      }).then(() => {
        console.log('Profile updated successfully');
        setFormSubmitted(true);
        setShowForm(false);
        setEditMode(true);
        setShowPatientMembers(true);
        setValidationError("");
  
        // Update patient members if necessary
        onValue(patientMembersRef, (snapshot) => {
          const patientMembersData = snapshot.val();
          if (patientMembersData) {
            const members = Object.entries(patientMembersData).map(([id, data]) => ({ id, ...data }));
            setPatientMembers(members);
          } else {
            setPatientMembers([]);
          }
        });
      }).catch((error) => {
        console.error('Error updating profile:', error);
      });
    }
  };
  

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

  const handleEditPatientMember = (id, patientMember) => {
    setEditingPatientMember(patientMember);
    setShowAddModal(true);
  };

  const handleAddModalOpen = () => {
    setShowAddModal(true);
    setEditingPatientMember(null); // Reset editing patient member when opening modal for adding
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setValidationError("");  
  };

  return (
    <div className="container py-4" style={{ marginTop: '100px', fontSize: '20px' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Row>
            <Col className='text-end'>
              <h5><span onClick={handleAddModalOpen} style={{ color: "#ff6f61", fontWeight: '700', cursor:'pointer', padding:'5px' }}>+ ADD A NEW PATIENT</span></h5>
              <AddNewPatient show={showAddModal} handleClose={handleAddModalClose} isEditMode={!!editingPatientMember} patientMemberData={editingPatientMember} />
            </Col>
          </Row>

          <Card className="shadow-lg border-0" style={{ backgroundColor: 'white' }}>
            <Card.Header className="text-white text-center" style={{ backgroundColor: '#ff6f61' }}>
              <h3 className="m-0">My Profile</h3>
            </Card.Header>
            <Card.Body>
              {validationError && <Alert variant="danger">{validationError}</Alert>}
              {!showForm ? (
                <>
                  <Row className="mb-4">
                    <Col md={6} className="d-flex align-items-center">
                      <p className="m-0"><FaUser className="me-2" /><strong>Name:</strong> {formData.name}</p>
                    </Col>
                    <Col md={6}>
                      <p className="m-0"><strong>{formData.gender === 'Male' ? <FaMale className="me-2" /> : <FaFemale className="me-2" />}Gender:</strong> {formData.gender}</p> 
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <p><FaEnvelope className="me-2" /><strong>Email:</strong> {formData.email}</p>
                      <p><FaPhone className="me-2" /><strong>Contact Number:</strong> {formData.phoneNumber}</p>
                    </Col>
                    <Col md={6}>
                      <p><FaUserClock className="me-2" /><strong>Age:</strong> {formData.age}</p>
                      <p><FaMapMarkerAlt className="me-2" /><strong>Address:</strong> {formData.address}</p>
                    </Col>
                  </Row>
                  <div className='text-center'>
                    <Button onClick={handleEdit} variant="primary" size="sm" style={{ fontSize: '20px' }}><FaEdit className="me-1" />Edit Profile</Button>
                  </div>
                </>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Enter your age"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      placeholder="Select gender"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      rows={3}
                    />
                  </Form.Group>
                  <div className="text-center">
                    {editMode ? (
                      <>
                        <Button variant="primary" type="submit" className="me-2">
                          <FaSave className="me-1" />Update
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                          <FaTimes className="me-1" />Cancel
                        </Button>
                      </>
                    ) : (
                      <Button variant="primary" type="submit">
                        <FaSave className="me-1" />Save
                      </Button>
                    )}
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>

          {showPatientMembers && patientMembers.length > 0 && (
            <Card className="mt-4 shadow-lg border-0" style={{ backgroundColor: 'white' }}>
              <Card.Header className="text-white text-center" style={{ backgroundColor: '#ff6f61' }}>
                <h3 className="m-0">Patient Members</h3>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  {patientMembers.map((member) => (
                    <div key={member.id} className="row-md-6 mb-3">
                      <Card>
                        <Card.Body>
                          <Row>
                            <Col>
                              <p><strong>Name:</strong> {member.name}</p>
                              <p><strong>Age:</strong> {member.age}</p>
                            </Col>
                            <Col>
                              <p><strong>Contact Number:</strong> {member.contactNumber}</p>
                              <p><strong>Gender:</strong> {member.gender}</p>
                            </Col>
                          </Row>
                          <div className="text-center">
                            <Button style={{fontSize: '18px'}} variant="primary" size="sm" className="me-2" onClick={() => handleEditPatientMember(member.id, member)}>
                              <FaEdit className="me-1" />Edit
                            </Button>
                            <Button style={{fontSize: '18px'}} variant="danger" size="sm" onClick={() => handleDeletePatient(member.id)}>
                              <FaTrash className="me-1" />Delete
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

