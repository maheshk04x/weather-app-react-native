import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import axios from "axios";
export default function HomeScreen() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);
  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?appid=0f0bd39c94dac8bcc9e15ce29468fed1&q=${input}`
      );
      setWeather(response.data);
    } catch (error) {
      console.log("Error fetching weather");
      setWeather(null);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Add city name to fetch weather</Text>
        <TextInput
          placeholder="Ex: Pune"
          value={input}
          onChangeText={(text) => setInput(text)}
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.button} onPress={fetchWeather}>
          <Text style={styles.buttonText}>Fetch Weather</Text>
        </TouchableOpacity>
      </View>

      {weather && (
        <View>
          <Text>{weather.name}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffb3",
  },
  title: {
    fontSize: 20,
    fontWeight:"bold",
    textAlign: "center",
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 2,
    height: 50,
    width: 330,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    borderRadius: 10,
    height: 50,
    width: 330,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
