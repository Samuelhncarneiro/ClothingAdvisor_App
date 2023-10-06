import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { store } from '../firebase.config';

const ImagePickerButton = ({ onImageSelected }) => {
  const [imageUri, setImageUri] = useState(null);

  const handleImagePicker = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permission to access media library denied');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
      });

      if (!result.cancelled) {
        const imageSource = { uri: result.uri };
        setImageUri(imageSource);
        uploadImage(result.uri);
      }
    } catch (error) {
      console.error('Error picking image: ', error);
    }
  };

  const uploadImage = async (uri) => {
    const storageRef = ref(store, 'images/' + uri.split('/').pop());

    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const snapshot = await uploadString(storageRef, blob, 'data_url');
      const downloadURL = await getDownloadURL(snapshot.ref);
      onImageSelected(downloadURL);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  return (
    <View>
      <Button title="Select Image" onPress={handleImagePicker} />
      {imageUri && <Image source={imageUri} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

export default ImagePickerButton;