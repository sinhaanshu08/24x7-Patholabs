import React, { useEffect, useState } from 'react';
import { BsJustify, BsSearch, BsPersonCircle } from 'react-icons/bs';

// import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { auth, db } from '../../Firebase/Firebase';
import { onValue, ref } from "firebase/database";
function Header({ OpenSidebar }) {

  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user) {
        // Retrieve user's name from Realtime Database
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data && data.name) {
            setUserName(data.name);
          } else {
            console.log("Name not found in database.");
          }
        }, (error) => {
          console.error("Error fetching user data:", error);
        });
      }
    });

    return unsubscribe;
  }, []);

  const handleSignout = () => {
    auth.signOut().then(() => {
      // Navigate to the login page
      window.location.href = '/admin/login';
    }).catch(error => {
      console.error('Error signing out:', error.message);
    });
  };

  return (
    <header className='header'>
      
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <BsSearch className='icon' />
      </div>
      <div className='header-right'>
        {/* <BsFillBellFill className='icon' /> */}
        {/* <BsFillEnvelopeFill className='icon' /> */}
        
        <Dropdown>
          <Dropdown.Toggle variant="transparent" id="dropdown-basic">
            <BsPersonCircle className='icon'  style={{fontSize:'36px'}}/>
          </Dropdown.Toggle>

          <Dropdown.Menu align="right">
            <Dropdown.Header>
              <div style={{fontSize:"16px", fontWeight:"bold"}}>
            <span className="block text-sm">{currentUser ? userName: 'Guest'}</span><br />
            <span className="block truncate text-sm font-medium">{currentUser ? currentUser.email : 'guest@example.com'}</span>
            </div> </Dropdown.Header>
            <Dropdown.Item as={Link} to="/admin/dashboard">Dashboard</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
      </div>
    </header>
  );
}

export default Header;
