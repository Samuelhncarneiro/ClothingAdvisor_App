import React, { useState } from 'react';
import { View, TextInput, SafeAreaView,ScrollView,Button, Image,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase.config';
import Navbar from '../components/navbar';
import InputBox from '../components/InputBox';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const AdminAddClothes = () => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [material, setMaterial] = useState('');
  const [bodypart, setBodypart] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [climate, setClimate] = useState('');
  const [photo, setPhoto] = useState(null);

  const navigation = useNavigation();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const handleSave = async () => {
    try {
      const clothesRef = collection(db, 'clothes');
      await addDoc(clothesRef, {
        title,
        color,
        material,
        bodypart,
        tempMin,
        tempMax,
        climate,
        photo,
      });
      setTitle('');
      setColor('');
      setMaterial('');
      setBodypart('');
      setTempMin('');
      setTempMax('');
      setClimate('');
      setPhoto(null);
      console.log('Clothes added successfully!');
      navigation.navigate('AdminAddList');
      Alert.alert('Clothe Sucessfully created!')
    } catch (error) {
      console.error('Error adding clothes:', error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
    <View>
      <Navbar name="Add Clothes" />
      <InputBox
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <InputBox
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />
      <InputBox
        placeholder="Material"
        value={material}
        onChangeText={setMaterial}
      />
      <InputBox
        placeholder="Body Part"
        value={bodypart}
        onChangeText={setBodypart}
      />
      <InputBox
        placeholder="Min Temperature"
        value={tempMin}
        onChangeText={setTempMin}
      />
      <InputBox
        placeholder="Max Temperature"
        value={tempMax}
        onChangeText={setTempMax}
      />
      <InputBox
        placeholder="Climate"
        value={climate}
        onChangeText={setClimate}
      />
      <CustomButton text="Pick Image" onPress={pickImage} />
      {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
      <CustomButton text="Save" onPress={handleSave} />
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default AdminAddClothes;