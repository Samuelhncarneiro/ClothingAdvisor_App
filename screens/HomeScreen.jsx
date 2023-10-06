import React, {useState, useMemo, useEffect, useContext} from 'react';
import {StyleSheet,Text,View,Image,Button,FlatList,Dimensions,ScrollView,SafeAreaView,TouchableOpacity,} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import clothingData from '../data/clothes';
import { getCurrentWeather } from '../api/ConsultApi';
import * as Location from '../node_modules/expo-location';
import Navbar from '../components/navbar';
import { AuthContext } from '../AuthContext';
import { useRoute } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const route = useRoute();
  const userData = route.params?.userData;

  const [selectedIcon, setSelectedIcon] = useState('');
  const [imageList, setImageList] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentTemperature, setCurrentTemperature] = useState();
  const [location, setLocation] = useState();
  const [currentHour, setCurrentHour] = useState();
  const [locationCoords, setLocationCoords] = useState([]);
  const [currentWeatherMain, setCurrentWeatherMain] = useState([]);

  const handleRandomSelection = () => {
    const randomImages = {};
  
    randomImages.head = getRandomItem('head');
    randomImages.body = getRandomItem('body');
    randomImages.feet = getRandomItem('feet');
    randomImages.legs = getRandomItem('legs');
    randomImages.glasses = getRandomItem('glasses');
    randomImages.jacket = getRandomItem('jacket');
  
    setSelectedImages(Object.values(randomImages));
  };

  const getRandomItem = (bodyPart) => {
    try{
      const filteredData = clothingData.flatMap((item) =>
        item.categories.filter(
          (category) => category.bodypart === bodyPart && 
          currentTemperature >= category.tempmin &&
          currentTemperature <= category.tempmax
        )
      );
  
      const randomIndex = Math.floor(Math.random() * filteredData.length);
      return {
        bodyPart: bodyPart,
        image: filteredData[randomIndex].image,
      };
    } catch (error) {
      console.log('Error in HomeScreen.getRandomItem:', error.message);
      return null;
    }
  };

  const shuffledImageList = useMemo(() => {
    const shuffledList = [...imageList];
    for (let i = shuffledList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }
    return shuffledList;
  }, [imageList]);

  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName);

    let selectedPart = '';
    switch (iconName) {
      case 'hat':
        selectedPart = 'head';
        break;
      case 'tshirt-crew':
        selectedPart = 'body';
        break;
      case 'glasses':
        selectedPart = 'glasses';
        break;
      case 'snowflake':
        selectedPart = 'jacket';
        break;
      case 'human-handsup':
        selectedPart = 'legs';
        break;
      case 'shoe-formal':
        selectedPart = 'feet';
        break;
      default:
        break;
    }
    setSelectedBodyPart(selectedPart);

    const filteredData = clothingData.flatMap((item) =>
      item.categories.filter((category) => category.bodypart === selectedPart)
    );

    const images = filteredData.map((item) => item.image);

    setImageList(images);
  };

  const handleImagePress = (index) => {
    const selectedImage = imageList[index];
    const updatedSelectedImages = [...selectedImages];

    const existingIndex = updatedSelectedImages.findIndex(
      (img) => img.bodyPart === selectedBodyPart
    );

    if (existingIndex > -1) {
      updatedSelectedImages[existingIndex] = {
        bodyPart: selectedBodyPart,
        image: selectedImage,
      };
    } else {
      updatedSelectedImages.push({
        bodyPart: selectedBodyPart,
        image: selectedImage,
      });
    }

    setSelectedImages(updatedSelectedImages);
  };

  const handleRandomImages = () => {
    const randomImages = [];

    clothingData.forEach((category) => {
      const { bodypart, images } = category;
      const randomIndex = Math.floor(Math.random() * images.length);
      randomImages.push({
        bodyPart: bodypart,
        image: images[randomIndex],
      });
    });

    setSelectedImages(randomImages);
  };

  async function getLocation(){
    let { status } = await Location.requestForegroundPermissionsAsync()
    if(status !== 'granted'){
      setErrorMsg('Sem permissão')
    }else{
      let location = await Location.getCurrentPositionAsync({})
      setLocationCoords(location.coords)
    }
  }

  async function setCurrentWeather(){
    await getLocation()
    const data = await getCurrentWeather(locationCoords)

    let date = new Date()
    const Hours= date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const Minutes= date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    setCurrentHour(Hours + ':' + Minutes)

    setCurrentTemperature(convertKelvinInC(data[0]))
    setLocation(data[1])
    setCurrentWeatherMain(data[2])
  }

  function convertKelvinInC(Kelvin){
    return parseInt(Kelvin - 273)
  }

  useEffect(() => {
    setCurrentWeather()
  },[]);

  const renderItem = ({ item, index }) => {
    const isSelected = selectedImages.some((img) => img.image === item);
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => handleImagePress(index)}>
          <View
            style={[
              styles.imageBox,
              isSelected && styles.selectedImageBox,
            ]}
          >
            <Image source={item} style={{ width: 100, height: 100 }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navbar name='Home' navigation={navigation}/>
      <View style={styles.tempContainer}>
        <Text style={styles.headingText}>Welcome, {userData?.fullname}</Text>
        <View style={styles.temperature}>
          <Text style={styles.temperatureText}> {currentWeatherMain} | {location}: {currentTemperature}ºC   </Text>
        </View>
      </View>

      <View styles={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* hat */}
          <TouchableOpacity
            onPress={() => handleIconPress('hat')}
            style={[
              styles.iconContainer,
              selectedIcon === 'hat',
            ]}
          >
            <MaterialCommunityIcons
              name="hat-fedora"
              size={30}
              color={selectedIcon === 'hat' ? 'orange' : 'black'}
            />
          </TouchableOpacity>

          {/* Glasses */}
          <TouchableOpacity
            onPress={() => handleIconPress('glasses')}
            style={[
              styles.iconContainer,
              selectedIcon === 'glasses',
            ]}
          >
            <MaterialCommunityIcons
              name="glasses"
              size={30}
              color={selectedIcon === 'glasses' ? 'orange' : 'black'}
            />
          </TouchableOpacity>

          {/* Snowflake */}
          <TouchableOpacity
            onPress={() => handleIconPress('snowflake')}
            style={[
              styles.iconContainer,
              selectedIcon === 'snowflake',
            ]}
          >
            <MaterialCommunityIcons
              name="snowflake"
              size={30}
              color={selectedIcon === 'snowflake' ? 'orange' : 'black'}
            />
          </TouchableOpacity>

          {/* Tshirt */}
          <TouchableOpacity
            onPress={() => handleIconPress('tshirt-crew')}
            style={[
              styles.iconContainer,
              selectedIcon === 'tshirt-crew',
            ]}
          >
            <MaterialCommunityIcons
              name="tshirt-crew"
              size={30}
              color={selectedIcon === 'tshirt-crew' ? 'orange' : 'black'}
            />
          </TouchableOpacity>

          {/* Human-hadsup || bottom */}
          <TouchableOpacity
            onPress={() => handleIconPress('human-handsup')}
            style={[
              styles.iconContainer,
              selectedIcon === 'human-handsup',
            ]}
          >
            <MaterialCommunityIcons
              name="human-handsup"
              size={30}
              color={selectedIcon === 'human-handsup' ? 'orange' : 'black'}
            />
          </TouchableOpacity>

          {/* Shoes */}
          <TouchableOpacity
            onPress={() => handleIconPress('shoe-formal')}
            style={[
              styles.iconContainer,
              selectedIcon === 'shoe-formal',
            ]}
          >
            <MaterialCommunityIcons
              name="shoe-formal"
              size={30}
              color={selectedIcon === 'shoe-formal' ? 'orange' : 'black'}
            />
          </TouchableOpacity>
        </ScrollView>
        <Image
          style={styles.stickman}
          source={require('../assets/Stickman.png')}
        />
      </View>

      <View style={styles.selectedImageContainer}>
        {selectedImages.map((selectedImage, index) => (
          <Image
            key={selectedImage.bodyPart}
            source={selectedImage.image}
            style={[
              styles.selectedImage,
              styles[selectedImage.bodyPart],
              { zIndex: selectedImages.length - index },
            ]}
          />
        ))}
      </View>
      <TouchableOpacity onPress={handleRandomSelection} style={styles.randomButton}>
        <FontAwesome name="random" size={20} color="white" style={styles.randomIcon} />
      </TouchableOpacity>

      <View style={styles.flatListWrapper}>
        <FlatList
          data={shuffledImageList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cont}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: 60,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  flatListWrapper: {
    paddingHorizontal: 0,
    paddingVertical: 10,
    marginBottom: 0,
    marginTop: 20,
  },
  itemContainer: {
    marginRight: 10,
  },
  stickman: {
    position: 'absolute',
    width: 130,
    height: 338,
    marginTop: 90,
    marginBottom: 20,
    left: 130,
  },
  selectedImageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.51,
  },
  selectedImage: {
    position: 'absolute',
    resizeMode: 'cover',
  },
  imageBox: {
    backgroundColor: '#DCDCDC',
    borderRadius: 10,
    padding: 20,
  },
  selectedImageBox: {
    backgroundColor: 'orange',
  },
  head: {
    width: 80,
    height: 80,
    top: -15,
  },
  body: {
    width: 130,
    height: 130,
    top: 95,
  },
  glasses: {
    width: 40,
    height: 40,
    top: 35,
  },
  jacket: {
    width: 140,
    height: 130,
    top: 85,
  },
  legs: {
    width: 140,
    height: 140,
    top: 205,
  },
  feet: {
    width: 100,
    height: 70,
    top: 330,
  },
  randomButton: {
    position: 'absolute',
    top: 300,
    right: 30,
    width: 40,
    height: 40,
    backgroundColor: 'orange',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  randomIcon: {
    marginLeft: 4,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //marginBottom: 10,
  },
});