import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { AuthContext } from '../AuthContext';
import { useRoute } from '@react-navigation/native';
import COLORS from '../data/Colors';

const ProfileScreen = ({navigation}) => {
    const route = useRoute();
    const userData = route.params?.userData;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../assets/Background.png')} resizeMode="cover" style={styles.imagemFundo}>
          <Text style={styles.heading}>Profile</Text>
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Full Name:</Text>
            <Text style={styles.value}>{userData?.fullname}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userData?.email}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Locality:</Text>
            <Text style={styles.value}>{userData?.locality}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{userData?.location}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Sex:</Text>
            <Text style={styles.value}>{userData?.sex}</Text>
          </View>
        </ImageBackground>
        
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imagemFundo:{
      flex: 1,
      justifyContent: 'center'
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: COLORS.black,
      marginLeft: 50
    },
    profileInfo: {
      flexDirection: 'row',
      marginBottom: 10,
      marginLeft: 50
    },
    label: {
      fontWeight: 'bold',
      marginRight: 10,
      color: COLORS.black,
    },
    value: {
      flex: 1,
      color: COLORS.gray,
    },
  });
  
  export default ProfileScreen;

