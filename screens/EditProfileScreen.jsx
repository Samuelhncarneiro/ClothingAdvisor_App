import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView,ImageBackground, ScrollView, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { auth, db } from '../firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import InputBox from '../components/InputBox';
import COLORS from '../data/Colors';
import CustomButton from '../components/CustomButton';

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  
  const [inputs, setInputs] = useState({
    email: '',
    sex: '',
    locality: '',
    location: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUser(userData);

          setInputs({
            email: userData.email,
            sex: userData.sex,
            locality: userData.locality,
            location: userData.location,
            password: '',
            confirmPassword: '',
          });
        }
      }
    };

    fetchUserData();
  }, []);

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const validate = async () => {
    Keyboard.dismiss();
    let valid = true;
    const newErrors = {};

    if (!inputs.email) {
      newErrors.email = 'Please enter your email';
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!inputs.sex) {
      newErrors.sex = 'Please select your gender';
      valid = false;
    }

    if (!inputs.locality) {
      newErrors.locality = 'Please enter your locality';
      valid = false;
    }

    if (!inputs.location) {
      newErrors.location = 'Please enter your location';
      valid = false;
    }

    if (inputs.password && inputs.password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters long';
      valid = false;
    }

    if (inputs.password !== inputs.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      updateUserProfile();
    }
  };

  const updateUserProfile = async () => {
    const { email, sex, locality, location, password } = inputs;
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userDocRef, {
          email,
          sex,
          locality,
          location,
        });

        setInputs((prevState) => ({
          ...prevState,
          password: '',
          confirmPassword: '',
        }));

        Alert.alert('Success', 'Profile updated successfully.');
      } catch (error) {
        console.error('Error updating profile:', error);
        Alert.alert('Error', 'Failed to update profile. Please try again later.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/Background.png')} resizeMode="cover" style={styles.imagemFundo}/>
      <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
          <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>Edit Profile</Text>
          <Text style={styles.welcomeText}>Welcome {user ? user.uid : ''}</Text>
          <View style={{ marginVertical: 20 }}>
          <InputBox
            iconName="email-outline"
            placeholder="Email"
            value={inputs.email}
            onChangeText={(text) => handleOnChange(text, 'email')}
            errorMessage={errors.email}
          />
          <InputBox
            label="Locality"
            iconName="home-variant-outline"
            placeholder="Locality"
            value={inputs.locality}
            onChangeText={(text) => handleOnChange(text, 'locality')}
            errorMessage={errors.locality}
          />

          <InputBox
            label="Location"
            iconName="map-marker"
            placeholder="Location"
            value={inputs.location}
            onChangeText={(text) => handleOnChange(text, 'location')}
            errorMessage={errors.location}
          />

          <InputBox
            label="Password"
            iconName="lock"
            placeholder="Password"
            secureTextEntry
            value={inputs.password}
            onChangeText={(text) => handleOnChange(text, 'password')}
            errorMessage={errors.password}
          />

          <InputBox
            label="Confirm Password"
            iconName="lock-alert"
            placeholder="Confirm Password"
            secureTextEntry
            value={inputs.confirmPassword}
            onChangeText={(text) => handleOnChange(text, 'confirmPassword')}
            errorMessage={errors.confirmPassword}
          />

          <CustomButton text="Save changes" onPress={validate} />

          <TouchableOpacity style={styles.goBackContainer} onPress={() => navigation.goBack()}>
            <Text style={styles.goBackText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
  },
  goBackContainer: {
    marginTop: 20,
    alignSelf:'center',
  },
  goBackText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    alignItems:'center',
  },
});

export default EditProfileScreen;
