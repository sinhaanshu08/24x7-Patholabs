import React, { useState, useEffect } from 'react';
import './OnlineOfflineMessage.css'; // Import CSS for styling

// Custom hook for detecting online/offline status
const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

const OnlineOfflineMessage = () => {
  const isOnline = useOnlineStatus();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOnline) {
      setMessage('You are currently online.');
      const timeout = setTimeout(() => {
        setMessage('');
      }, 3000); // 3 seconds
      return () => clearTimeout(timeout);
    } else {
      setMessage('You are currently offline.');
    }
  }, [isOnline]);

  return (
    <div>
      {message && (
        <div className={`online-offline-message ${isOnline ? 'online' : 'offline'}`}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default OnlineOfflineMessage;

