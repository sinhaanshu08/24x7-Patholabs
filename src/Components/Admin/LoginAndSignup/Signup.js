import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getDatabase, ref, set } from 'firebase/database';
function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle successful signup
        const user = userCredential.user;
        console.log('Signup successful:', user);

        // Write user's name to the Realtime Database
        const db = getDatabase();
        const userRef = ref(db, 'users/' + user.uid);
        set(userRef, {
          name: name,
          email: email,
        });

        navigate('/admin/login/');

        // Show SweetAlert message
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful!',
          text: 'You have successfully signed up.',
          confirmButtonText: 'OK'
        });
      })
      .catch((error) => {
        // Handle signup error
        const errorCode = error.code;
        let errorMessage = '';

        switch (errorCode) {
          case 'auth/email-already-in-use':
            errorMessage = 'The email address is already in use by another account.';
            break;
          case 'auth/weak-password':
            errorMessage = 'The password is too weak. Please choose a stronger password.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email format. Please enter a valid email address.';
            break;
          default:
            errorMessage = 'Signup failed. Please try again later.';
            break;
        }

        setError(errorMessage);
        console.error('Signup error:', error.message);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '22rem' }}>
        <Card.Body>
          <h2 className="mb-3">Signup</h2>
          <Form noValidate validated={validated} onSubmit={handleSignup}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Form.Control.Feedback type="invalid">Please provide your name.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Signup
            </Button>
            <div className="mt-3 d-flex justify-content-center align-item-center">
              Already have an account? <Link to="/admin/login">Login</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Signup;
