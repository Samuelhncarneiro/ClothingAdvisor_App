import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet,SafeAreaView,ScrollView, Image } from 'react-native';
import { collection, query, getDocs,where} from 'firebase/firestore';
import { db } from '../firebase.config';

import Navbar from '../components/navbar';

const AdminListClothes = ({ route }) => {
  const [clothes, setClothes] = useState([]);
  const { selectedItemTitle } = route.params;

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const clothesQuery = query(
          collection(db, 'clothes'),
          where('bodypart', '==', selectedItemTitle)
        );
        const clothesSnapshot = await getDocs(clothesQuery);

        const clothesData = clothesSnapshot.docs.map((doc) => doc.data());
        setClothes(clothesData);
      } catch (error) {
        console.error('Error fetching clothes:', error);
      }
    };

    fetchClothes();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>Color: {item.color}</Text>
        <Text style={styles.description}>Material: {item.material}</Text>
        <Text style={styles.description}>Bodypart: {item.bodypart}</Text>
        <Text style={styles.description}>Temperature Range: {item.tempMin}°C - {item.tempMax}°C</Text>
        <Text style={styles.description}>Climate: {item.climate}</Text>
      </View>
    </View>
  );

  return (
        <View style={styles.container}>
          <FlatList
            data={clothes}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
  },
});

export default AdminListClothes;