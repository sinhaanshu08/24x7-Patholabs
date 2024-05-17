import React, { useState } from "react";
import { Container, Button, Spinner } from 'react-bootstrap';
import "./Login.css";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { RecaptchaVerifier } from "firebase/auth";
import { db, firebaseApp } from "./../../../Firebase/Firebase";
import { ref, get } from 'firebase/database';
import { useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";

function Login( {onHide}) {
  const auth = getAuth(firebaseApp); // Initialize auth object using firebaseApp

  const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyOtp, setVerifyOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  


  const handlePhoneNumberFocus = () => {
    setPhoneNumberFocused(true);
  };

  const handlePhoneNumberBlur = () => {
    if (!phoneNumber) {
      setPhoneNumberFocused(false);
    }
  };

  const handlePhoneNumberChange = (event) => {
    const formattedPhoneNumber = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setPhoneNumber(formattedPhoneNumber);
  };


  const sendOTP = (e) => {
    e.preventDefault();

    const phoneNumberRegex = /^[0-9]{10}$/; // Regular expression to match a 10-digit number
    if (!phoneNumberRegex.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    setLoading(true);

    // Check if the user is signed up before sending OTP
    const userRef = ref(db, `patients/${phoneNumber}`);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // User exists, proceed with sending OTP
          const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: () => {
              console.log('recaptcha resolved..');
            }
          });
          signInWithPhoneNumber(auth, `+91${phoneNumber}`, recaptchaVerifier)
            .then((confirmationResult) => {
              setVerifyOtp(confirmationResult);
              alert("OTP sent successfully. Please check your phone for the code.");
              setShowOtpInput(true);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error sending OTP:", error);
              alert("Failed to send OTP. Please try again later.");
              setLoading(false);
            });
        } else {
          // User does not exist, show message to sign up first
          alert("User is not signed up. Please sign up first.");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error checking user existence:", error);
        alert("Failed to check user existence. Please try again later.");
        setLoading(false);
      });
  };

  const verifyOTP = () => {
    if (!otp || otp.length !== 6 || !verifyOtp) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    setLoading(true);
    verifyOtp.confirm(otp)
      .then((result) => {
        alert('OTP verified successfully!');
        setLoading(false);
        onHide ();
        // navigate('/'); // Navigate to the home page

      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        alert("Failed to verify OTP. Please make sure you entered the correct OTP.");
        setLoading(false);
      });
  };

  return (
    <div>
      <Container fluid>
        <h2 className="mb-4">Login</h2>
        <form>
          <p className="mb-4">Please enter your phone number to continue.</p>
          <div className={`form-group${phoneNumberFocused ? " focused" : ""}`}>
            <label htmlFor="phone" className="label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="form-control"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              onFocus={handlePhoneNumberFocus}
              onBlur={handlePhoneNumberBlur}
            />
          </div>
          <div id="recaptcha-container"></div>
          {!showOtpInput ? (
            <Button onClick={sendOTP} className="w-100 btn-lg btn-block mb-4" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'LOGIN'}

            </Button>
          ) : (
            <div>
              <label htmlFor="otp" className="mt-4">One Time Password</label>
              <input
                type="number"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-control"
              />
              <Button onClick={verifyOTP} variant="primary" className="w-100 btn-lg btn-block mb-4" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Verify OTP'}
              </Button>
            </div>
          )}
        </form>
        {/* <p className="text-center">New on 24x7 Patholabs? <Link to="/signup">Sign up</Link></p> */}
      </Container>
    </div>
  );
}

export default Login;

