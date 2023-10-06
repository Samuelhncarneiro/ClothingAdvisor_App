import axios from './axiosInstance';
import * as Location from 'expo-location';

export async function getCurrentWeather(){
    let results = [];

    try{
        // Request permission to access the user's location
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted'){
            // Hangle permission denied case
            console.log('Permission denied to access location');

            return results;
        }

        //Get the user's current location
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });

        const { latitude, longitude } = location.coords;

        const response = await axios.get(`/weather?lat=${latitude}&lon=${longitude}&appid=80b10954020ab6d68ea2d8da341cb80d`);
        const data = response.data;

        // Uncomment to see all data being fetched
        console.log(data);

        const locationName = data.sys.country + ', ' + ' ' + data.name;
        const currentTemperature = data.main.temp;
        const currentWeatherMain = data.weather[0].main;

        results = [currentTemperature, locationName, currentWeatherMain];

    } catch (error) {
        console.log(error);
    }

    return results;
}

// import axios from 'axios';

// export async function getCurrentWeather(locationCoords) {
//     const lat = locationCoords.latitude;
//     const lon = locationCoords.longitude;
  
//     var results = [];
  
//     try {
//         const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=80b10954020ab6d68ea2d8da341cb80d`);
//         const data = response.data;

//         // Uncoment to see all data being fetched
//         // console.log(data);
  
//         const locationName = (data.sys.country + ', ' + ' ' + data.name);
//         const currentTemperature = data.main.temp;
//         const currentWeatherMain = data.weather[0].main;
        
//         results = [currentTemperature, locationName, currentWeatherMain];
//     }   catch (error) {
//         console.log(error);
//     }
  
//     return results;
// }

