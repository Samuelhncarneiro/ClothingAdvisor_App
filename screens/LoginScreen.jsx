import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, SafeAreaView, ScrollView, Keyboard, Alert } from 'react-native';
import { auth,store,db } from '../firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs } from 'firebase/firestore';

import InputBox from '../components/InputBox';
import COLORS from '../data/Colors';
import CustomButton from '../components/CustomButton';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleLogin = async () => {
    const { email, password } = inputs;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      setInputs({
        email: '',
        password: '',
      });

      const usersCollectionRef = collection(db, 'users');
      const usersQuery = query(usersCollectionRef, where('email', '==', email));
      const querySnapshot = await getDocs(usersQuery);

      if (querySnapshot.empty) {
        setError('Failed to login. Please check your credentials and try again.');
        return;
      }

      const userData = querySnapshot.docs[0].data();

      if (email === 'admin@admin.com' && password === '123456789') {
        navigation.navigate('AdminAddList');
      } else {
        navigation.navigate('HomeScreen', { userData });
      }

    } catch (error) {
      console.log('Login Error:', error);
      setError('Failed to login. Please check your credentials and try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/Background.png')} resizeMode="cover" style={styles.imagemFundo}>
        <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>
          <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>Login</Text>
          <View style={{ marginVertical: 20 }}>
            <InputBox
              placeholder=" Enter your Email"
              iconName="email-outline"
              label="Email"
              onChangeText={(text) => handleOnChange(text, 'email')}
              value={inputs.email}
              onFocus={() => setError('')}
            />
            <InputBox
              placeholder=" Enter your Password"
              iconName="lock"
              label="Password"
              password
              onChangeText={(text) => handleOnChange(text, 'password')}
              value={inputs.password}
              onFocus={() => setError('')}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <CustomButton text="Login" onPress={handleLogin} />
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
  errorText: {
    color: COLORS.red,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
