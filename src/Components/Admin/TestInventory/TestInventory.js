
import React, { useState, useEffect } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { RiAddCircleFill, RiFileList2Line } from 'react-icons/ri';
import { useNavigate, useLocation } from 'react-router-dom';
import AddNewTest from './AddNewTest';
import { db } from '../../../Firebase/Firebase';
import { ref, onValue, remove } from 'firebase/database';
import Swal from 'sweetalert2';
import EditTest from './EditTest';

function TestInventory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [testPackages, setTestPackages] = useState([]);

  useEffect(() => {
    const testPackagesRef = ref(db, 'testPackages');
    const unsubscribe = onValue(testPackagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const testPackagesList = Object.entries(data).map(([id, packageData]) => ({ id, ...packageData }));
        setTestPackages(testPackagesList);
      } else {
        setTestPackages([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAddNewTest = () => {
    navigate('/admin/dashboard/test-inventory/add-new-test');
  };

  const handleViewAllTests = () => {
    navigate('/admin/dashboard/test-inventory/');
  };

  const handleEditTest = (testPackage) => {
    navigate('/admin/dashboard/test-inventory/edit-test', { state: { testPackage } });
  };

  const handleDeleteTest = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this test package?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        remove(ref(db, `testPackages/${id}`))
          .then(() => {
            console.log('Test package deleted successfully');
            // Update state after deletion
            const updatedPackages = testPackages.filter(testPackage => testPackage.id !== id);
            setTestPackages(updatedPackages);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Test package deleted successfully!',
              confirmButtonText: 'OK'
            });
          })
          .catch((error) => {
            console.error('Error deleting test package:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete test package. Please try again later.',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  };

  const renderContent = () => {
    switch (location.pathname) {
      case '/admin/dashboard/test-inventory/add-new-test':
        return <AddNewTest />;
      case '/admin/dashboard/test-inventory/edit-test':
        return <EditTest />;
      default:
        return (
          <div>
            <h3>View All Test Details</h3>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Package Name</th>
                  <th>Category</th>
                  <th>Test Name</th>
                  <th>Sample Required for Test</th>
                  <th>Test For</th>
                  <th>Estimated Report Time</th>
                  <th>Original Amount</th>
                  <th>Discount %</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testPackages.map((testPackage, index) => (
                  <tr key={testPackage.id}>
                    {/* <td>{testPackage.id}</td> */}
                    <td>{index + 1}</td>
                    <td>{testPackage.packageName}</td>
                    <td>{testPackage.selectedCategory}</td>
                    <td>{testPackage.testDetails.map(test => test.testName).join(', ')}</td>
                    <td>{testPackage.sampleRequired.join(', ')}</td>
                    <td>{testPackage.selectedTestFor.join(', ')}</td>
                    <td>{testPackage.reportTime}</td>
                    <td><span style={{fontWeight:"500"}}>{testPackage.totalAmount}</span></td>
                    <td>{testPackage.discountPercent > 0 ? <span style={{color:"#1aab2a", fontWeight:"bold"}}>{testPackage.discountPercent+"% off"}</span>:<span style={{color:"red", fontWeight:"bold"}}>No</span> }</td>
                    <td><span style={{fontWeight:"700"}}>{testPackage.payableAmount}</span></td>
                    <td>
                      <td>
                        <div className="d-flex" style={{ textAlign: 'center' }}>
                          <Button variant="primary" size="sm" onClick={() => handleEditTest(testPackage)} style={{ margin: '2px' }}>Edit</Button>
                          <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDeleteTest(testPackage.id)}>Delete</Button>
                        </div>
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        );
    }
  };

  return (
    <main className='main-container' style={{ color: "black" }}>
      <div className="test-inventory-container">
        <Row className="mb-3">
          <Col xs={12} md={3}>
            <Button variant="primary" onClick={handleAddNewTest} block>
              <RiAddCircleFill className="mr-2" /> Add New Test
            </Button>
          </Col>
          <Col xs={12} md={3} >
            <Button variant="secondary" onClick={handleViewAllTests} block>
              <RiFileList2Line className="mr-2" /> View All Tests
            </Button>
          </Col>
        </Row>
        {renderContent()}
      </div>
    </main>
  );
}

export default TestInventory;
