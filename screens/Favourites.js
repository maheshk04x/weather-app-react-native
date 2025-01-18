import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useContext } from "react";
import { FavouritesContext } from "../context/AppContext";
import axios from "axios";
import { useState } from "react";

const Favourites = ({ navigation }) => {
  const [weather, setWeather] = useState(null);
  const { favourites } = useContext(FavouritesContext);
  const [selectedCity, setSelectedCity] = useState(null);
  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?appid=0f0bd39c94dac8bcc9e15ce29468fed1&q=${city}`
      );
      setWeather(response.data);
      navigation.navigate("Current Weather", { weatherData: response.data });
      setSelectedCity(city);
    } catch (error) {
      console.log("Error fetching weather");
    }
  };
  const favouritesList = favourites.map((city, index) => (
    <Text key={index} onPress={() => fetchWeather(city)} style={[styles.city , selectedCity === city && styles.blackBorder]}>
      {city}
    </Text>
  ));
  return (
    <View style={styles.container}>
      <Pressable>{favouritesList}</Pressable>
    </View>
  );
};
export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    backgroundColor: "#ffffb3",
  },
  city: {
    marginTop:20,
    fontSize: 25,
    fontWeight: "bold",
  },
  blackBorder: {
    padding:7,
    marginRight:50,
    borderWidth:2,
    borderRadius:10
  }
});
