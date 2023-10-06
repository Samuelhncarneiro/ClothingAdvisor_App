import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';

import Navbar from '../components/navbar';
import clothingData from '../data/clothes';
import CustomButton from '../components/CustomButton';

const images = [
  { id: '1', title: 'head', image: require('project_group_52/assets/icons/hat.png') },
  { id: '2', title: 'glasses', image: require('project_group_52/assets/icons/glasses.png') },
  { id: '3', title: 'jacket', image: require('project_group_52/assets/icons/jacket.png') },
  { id: '4', title: 'body', image: require('project_group_52/assets/icons/tshirt.png') },
  { id: '5', title: 'legs', image: require('project_group_52/assets/icons/jeans.png') },
  { id: '6', title: 'feet', image: require('project_group_52/assets/icons/shoe.png') },
];

const AdminAddList = ({ navigation }) => {
  const handleAddClothes = () => {
    navigation.navigate('AdminAddClothes');
  };

  const renderGridItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('AdminListClothes', { selectedItemTitle: item.title })
      }
    >
      <Image source={item.image} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Navbar name="Admin List" />
      <Text style={styles.headingText}>Select a body part</Text>
      <FlatList
        data={images}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      <CustomButton text="Add Clothes" onPress={handleAddClothes} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    backgroundColor: 'lightgrey',
    margin: 8,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  image: {
    width: 100,
    height: 100,
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingTop: 20,
    paddingBottom: 20,
    alignSelf: 'center',
  },
});

export default AdminAddList;
