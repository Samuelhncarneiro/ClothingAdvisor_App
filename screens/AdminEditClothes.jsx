import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { db } from '../firebase.config';

const AdminEditClothes = ({ route }) => {
  const { selectedItem } = route.params;
  const [title, setTitle] = useState(selectedItem.title);
  const [color, setColor] = useState(selectedItem.color);
  const [material, setMaterial] = useState(selectedItem.material);
  const [bodyPart, setBodyPart] = useState(selectedItem.bodyPart);
  const [tempMin, setTempMin] = useState(selectedItem.tempMin);
  const [tempMax, setTempMax] = useState(selectedItem.tempMax);
  const [climate, setClimate] = useState(selectedItem.climate);

  const handleEditClothes = () => {
    db.collection('clothes')
      .doc(selectedItem.id)
      .update({
        title,
        color,
        material,
        bodyPart,
        tempMin,
        tempMax,
        climate,
      })
      .then(() => {
        console.log('Clothes edited successfully!');
      })
      .catch((error) => {
        console.error('Error editing clothes: ', error);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />
      <TextInput
        placeholder="Material"
        value={material}
        onChangeText={setMaterial}
      />
      <TextInput
        placeholder="Body Part"
        value={bodyPart}
        onChangeText={setBodyPart}
      />
      <TextInput
        placeholder="Min Temperature"
        value={tempMin}
        onChangeText={setTempMin}
      />
      <TextInput
        placeholder="Max Temperature"
        value={tempMax}
        onChangeText={setTempMax}
      />
      <TextInput
        placeholder="Climate"
        value={climate}
        onChangeText={setClimate}
      />
      <Button title="Edit Clothes" onPress={handleEditClothes} />
    </View>
  );
};

export default AdminEditClothes;
