import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';


const Navbar = ({ name,navigation }) => {
  const route = useRoute();
  const userData = route.params?.userData;
  
  const handleHomeIconPress = () => {
    navigation.navigate('ProfileScreen',{userData});
  };

  return (
    <View style={styles.navbar}>
      {name === 'Home' && (
        <TouchableOpacity onPress={handleHomeIconPress} style={styles.iconContainer}>
          <MaterialCommunityIcons name="account-edit" size={37} color="#333" />
        </TouchableOpacity>
      )}
      <Text style={styles.navbarTitle}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#FF8C00',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingHorizontal: 16,
    flexDirection: 'row',
    marginTop: 31,
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    top: 12,
  },
});

export default Navbar;
