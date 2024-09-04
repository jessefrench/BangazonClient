import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getUserDetails, switchUserToSeller } from '../api/userData';
import UserDetailCard from '../components/cards/UserDetailCard';

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const authenticatedUserId = user.uid;
        getUserDetails(authenticatedUserId)
          .then((data) => {
            setUserDetails(data);
          })
          .catch((error) => {
            console.error('Error fetching user details:', error);
          });
      } else {
        console.warn('No user is signed in.');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSwitchToSeller = () => {
    switchUserToSeller(userDetails.uid)
      .then((updatedUser) => {
        setUserDetails(updatedUser);
        console.warn('User updated to seller:', updatedUser);
      })
      .catch((error) => {
        console.error('Error updating user to seller:', error);
      });
  };

  return (
    <div className="user-details-container">
      {userDetails && (
        <>
          <UserDetailCard userDetails={userDetails} handleSwitchToSeller={handleSwitchToSeller} />
        </>
      )}
    </div>
  );
}
