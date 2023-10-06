import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, SafeAreaView, ScrollView, Keyboard, Alert } from 'react-native';
import { auth, db } from '../firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import InputBox from '../components/InputBox';
import COLORS from '../data/Colors';
import sex from '../data/gender';
import DropdownComponent from '../components/Dropdown';
import CustomButton from '../components/CustomButton';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [inputs, setInputs] = useState({
    email: '',
    fullname: '',
    sex: '',
    locality: '',
    location: '',
    password: '',
    confirmpassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleSexChange = (value) => {
    setInputs((prevState) => ({ ...prevState, sex: value }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const validate = async () => {
    Keyboard.dismiss();
    let valid = true;
    const newErrors = {};

    if (!inputs.email) {
      newErrors.email = 'Please input email';
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      newErrors.email = 'Please input valid email';
      valid = false;
    }

    if (!inputs.fullname) {
      newErrors.fullname = 'Please input full name';
      valid = false;
    }

    if (!inputs.sex) {
      newErrors.sex = 'Please select gender';
      valid = false;
    }

    if (!inputs.locality) {
      newErrors.locality = 'Please input locality';
      valid = false;
    }

    if (!inputs.location) {
      newErrors.location = 'Please input location';
      valid = false;
    }

    if (!inputs.password) {
      newErrors.password = 'Please input password';
      valid = false;
    } else if (inputs.password.length < 6) {
      newErrors.password = 'Min password length of 6';
    }

    if (inputs.password !== inputs.confirmpassword) {
      newErrors.confirmpassword = "Passwords don't match";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      register();
    }
  };

  const register = async () => {
    const { email, fullname, sex, locality, location, password } = inputs;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        email,
        fullname,
        sex,
        locality,
        location,
        password,
      };
      await addDoc(collection(db, 'users'), user);
      console.log('Registred: ', user)
      setInputs({
        email: '',
        fullname: '',
        sex: '',
        locality: '',
        location: '',
        password: '',
        confirmpassword: '',
      });

      navigation.navigate('LoginScreen');

    } catch (error) {
      console.error('Error registering user: ', error);
      Alert.alert('Error', 'Failed to register user. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/Background.png')} resizeMode="cover" style={styles.imagemFundo}>
        <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
          <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>Register</Text>
          <View style={{ marginVertical: 20 }}>
            <InputBox
              placeholder=" Enter your Email"
              iconName="email-outline"
              label="Email"
              onChangeText={(text) => handleOnChange(text, 'email')}
              value={inputs.email}
              error={errors.email}
              onFocus={() => handleError(null, 'email')}
            />
            <InputBox
              placeholder=" Full Name"
              iconName="account"
              label="Name"
              onChangeText={(text) => handleOnChange(text, 'fullname')}
              value={inputs.fullname}
              error={errors.fullname}
              onFocus={() => handleError(null, 'fullname')}
            />
            <View style={{ marginBottom: 20 }}>
              <Text styles={styles.label}>Gender</Text>
              <DropdownComponent onChange={handleSexChange} onFocus={() => handleError(null, 'sex')} error={errors.sex} />
            </View>
            <InputBox
              placeholder=" Enter your locality"
              iconName="home-variant-outline"
              label="Locality"
              onChangeText={(text) => handleOnChange(text, 'locality')}
              value={inputs.locality}
              error={errors.locality}
              onFocus={() => handleError(null, 'locality')}
            />
            <InputBox
              placeholder=" Enter your location"
              iconName="map-marker"
              label="Localition"
              onChangeText={(text) => handleOnChange(text, 'location')}
              value={inputs.location}
              error={errors.location}
              onFocus={() => handleError(null, 'location')}
            />
            <InputBox
              placeholder=" Enter your password"
              iconName="lock"
              label="Password"
              password
              onChangeText={(text) => handleOnChange(text, 'password')}
              value={inputs.password}
              error={errors.password}
              onFocus={() => handleError(null, 'password')}
            />
            <InputBox
              placeholder=" Enter your password"
              iconName="lock-alert"
              label="Confirm Password"
              password
              onChangeText={(text) => handleOnChange(text, 'confirmpassword')}
              value={inputs.confirmpassword}
              error={errors.confirmpassword}
              onFocus={() => handleError(null, 'confirmpassword')}
            />
            <CustomButton text="Register" onPress={validate} />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagemFundo: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default RegisterScreen;
