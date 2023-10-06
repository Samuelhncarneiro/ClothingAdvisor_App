import React, { useState, useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text, View,SafeAreaView,useWindowDimensions} from 'react-native';
import { AuthContext } from './AuthContext';
import 'react-native-gesture-handler';

import InputBox from './components/InputBox';

import MainScreen from "./screens/MainScreen";
import HomeScreen from './screens/HomeScreen';
import GuestScreen from './screens/GuestScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AdminAddList from './screens/AdminList';
import EditProfileScreen from './screens/EditProfileScreen';
import AdminListClothes from './screens/AdminListClothes';
import AdminAddClothes from './screens/AdminAddClothes';
import AdminEditClothes from './screens/AdminEditClothes';
import ProfileScreen from './screens/ProfileScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions = {{headerShown:false}}>
          <Stack.Screen name="MainScreen" component={MainScreen} />
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
              <Stack.Screen name="AdminAddList" component={AdminAddList} />
              <Stack.Screen name="AdminListClothes" component={AdminListClothes} /> 
              <Stack.Screen name="AdminEditClothes" component={AdminEditClothes} /> 
              <Stack.Screen name="AdminAddClothes" component={AdminAddClothes} /> 
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="GuestScreen" component={GuestScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;