import React, { createContext, useState, useEffect } from 'react';
import {auth,db,store} from './firebase.config';

export const AuthContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authenticatedUser) => {
      if (authenticatedUser) {
        setUser(authenticatedUser);
        fetchUserData(authenticatedUser);
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = (authenticatedUser) => {
    store
      .collection('users')
      .where('email', '==', authenticatedUser.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, userData }}>{children}</AuthContext.Provider>
  );
};
