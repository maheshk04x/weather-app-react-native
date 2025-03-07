import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useContext } from "react";
import { FavouritesContext } from "../context/AppContext";

const windIcon = require("../assets/wind.png");
const humidityIcon = require("../assets/humidity.png");
const cloudIcon = require("../assets/cloud.png");
const img = require("../assets/adaptive-icon.png");
export default function WeatherDetails({ route }) {
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const { weatherData } = route.params;
  const { name: city, sys, main, wind, dt, weather, clouds } = weatherData;
  //const country = sys.country;
  //const condition = weather[0].main;
  const description = weather[0].description;
  const temperature = (main.temp - 273.15).toFixed(1);
  const feelsLike = (main.feels_like - 273.15).toFixed(1);
  const humidity = main.humidity;
  const windSpeed = (wind.speed * 3.6).toFixed(1);
  const cloudiness = clouds.all;
  const dateTime = new Date(dt * 1000);
  const date = dateTime.toDateString();
  const addFavourite = () => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(city)) {
        const updatedFavourites = [...prevFavourites, city];
        Alert.alert("Added to Favourites");
        //console.log(updatedFavourites);
        return updatedFavourites;
      } else {
        Alert.alert("Already in Favourites!!!");
        //console.log(prevFavourites);
        return prevFavourites;
      }
    });
  };
  //console.log(dateTime);
  return (
    <View style={styles.container}>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.temp}>{temperature} &deg;C</Text>
      <Text style={styles.feelsLike}>Feels Like : {feelsLike} &deg; C</Text>
      <Text style={styles.summary}>Daily Summary:</Text>
      <Text>
        Some short description of Weather which displays about temperature
      </Text>
      <View style={styles.sky}>
        <View>
          <Image
            source={windIcon}
            style={{ width: 60, height: 60, resizeMode: "contain" }}
          />
          <Text style={styles.skyItem}>{windSpeed} km/h</Text>
          <Text style={{ fontWeight: "bold" }}>Wind Speed</Text>
        </View>
        <View>
          <Image
            source={humidityIcon}
            style={{ width: 60, height: 60, resizeMode: "contain" }}
          />
          <Text style={styles.skyItem}> {humidity}%</Text>
          <Text style={{ fontWeight: "bold" }}>Humidity</Text>
        </View>
        <View>
          <Image
            source={cloudIcon}
            style={{ width: 60, height: 60, resizeMode: "contain" }}
          />
          <Text style={styles.skyItem}>    {cloudiness}%</Text>
          <Text style={{ fontWeight: "bold" }}>cloudiness</Text>
        </View>
      </View>
      <TouchableOpacity onPress={addFavourite}>
        <Text style={styles.button}>Favourite</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffb3",
    //justifyContent: "center",
    alignItems: "center",
  },
  city: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 50,
  },
  temp: {
    fontSize: 50,
    fontWeight: "bold",
  },
  feelsLike: {
    fontStyle: "italic",
  },
  summary: {
    marginTop: 30,
    alignSelf: "flex-start",
    marginLeft: 12,
    fontWeight: "bold",
  },
  description: {
    marginBottom: 10,
    fontSize: 20,
  },
  date: {
    marginTop: 10,
    textAlign: "center",
    width: 130,
    borderWidth: 3,
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
    marginBottom: 10,
  },
  sky: {
    height: 150,
    width: 350,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 3,
  },
  skyItem: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
    width: 100,
    height: 25,
    textAlign: "center",
  },
});
