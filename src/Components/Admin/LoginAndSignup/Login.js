import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle successful login
        console.log('Login successful:', userCredential.user);
        navigate('/admin/dashboard');
        // Show SweetAlert message
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
          confirmButtonText: 'OK'
        });
      })
      .catch((error) => {
        // Handle login error
        const errorCode = error.code;
        let errorMessage = '';

        switch (errorCode) {
          case 'auth/user-not-found':
            errorMessage = 'User not found. Please check your email.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email format. Please enter a valid email address.';
            break;
          case 'auth/invalid-credential':
            errorMessage = 'Invalid email or password. Please check your credentials and try again.';
            break;
          default:
            errorMessage = 'Login failed. Please try again later.';
            break;
        }

        setError(errorMessage);
        console.error('Login error:', error.message);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '22rem' }}>
        <Card.Body>
          <h2 className="mb-3">Login</h2>
          <Form noValidate validated={validated} onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Form.Control.Feedback type="invalid">Please provide your password.</Form.Control.Feedback>
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
            <div className="mt-3 d-flex justify-content-center align-item-center">
              Don't have an account? <Link to="/admin/signup">Sign up</Link>
            </div>
            <div className="mt-2 d-flex justify-content-center align-item-center">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;

