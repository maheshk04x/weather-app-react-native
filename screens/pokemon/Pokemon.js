import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React from "react";
import axios from "axios";
import { useState } from "react";

// const Pokemon = () => {
//   const [name, setName] = useState("");
//   const [pokemon, setPokemon] = useState(null);
//   const PokemonName = name.toLowerCase();
//   const fetchPokemon = async () => {
//       if (PokemonName.trim() === "") {
//         Alert.alert("Please enter a Pokemon name");
//       return;
//     }
//     try {
//       const response = await axios.get(
//         `https://pokeapi.co/api/v2/pokemon/${PokemonName}`
//       );
//       //const data = await response.json();
//       setPokemon(response.data);
//       setName("");
//       //console.log(response.data);
//     } catch (error) {
//       console.log("Error fetching Pokemon");
//       setPokemon(null);
//     }
//   };
//   //const image = pokemon.sprites.front_default;
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Go Pokemon</Text>
//       <TextInput
//         placeholder="Enter Pokemon"
//         value={name}
//         onChangeText={(text) => setName(text)}
//         style={styles.textInput}
//       />
//       <TouchableOpacity style={styles.button} onPress={fetchPokemon}>
//         <Text style={styles.buttonText}>Get Card</Text>
//       </TouchableOpacity>
//       {pokemon && (
//         <View style={styles.card}>
//           <Image
//             source={{
//               uri: pokemon.sprites.other["official-artwork"].front_default,
//             }}
//             style={styles.img}
//           />
//           <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
//           <Text>{pokemon.type}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

const Pokemon = () => {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState("");
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);

  const PokemonName = name.toLowerCase();

  const fetchPokemon = async () => {
    if (PokemonName.trim() === "") {
      Alert.alert("Please enter a Pokemon name");
      return;
    }

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${PokemonName}`
      );
      // Extract types
      const types = response.data.types.map((type) => type.type.name);
      // Fetch type effectiveness for strengths and weaknesses
      const typeDataPromises = response.data.types.map((type) =>
        axios.get(type.type.url)
      );
      const typeDataResponses = await Promise.all(typeDataPromises);
      const typeData = await Promise.all(
        typeDataResponses.map((res) => res.data)
      );

      const newStrengths = [];
      const newWeaknesses = [];

      typeData.forEach((data) => {
        data.damage_relations.double_damage_to.forEach((type) =>
          newStrengths.push(type.name)
        );
        data.damage_relations.double_damage_from.forEach((type) =>
          newWeaknesses.push(type.name)
        );
      });

      setStrengths([...new Set(newStrengths)]);
      setWeaknesses([...new Set(newWeaknesses)]);
      setPokemon(response.data);
      setName(""); // Reset input after fetch
    } catch (error) {
        console.log("Error fetching Pokemon");
        Alert.alert("Pokemon not found");
      setPokemon(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Go Pokemon</Text>
      <TextInput
        placeholder="Enter Pokemon"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.button} onPress={fetchPokemon}>
        <Text style={styles.buttonText}>Get Card</Text>
      </TouchableOpacity>
      {pokemon && (
        <View style={styles.card}>
          <Image
            source={{
              uri: pokemon.sprites.other["official-artwork"].front_default,
            }}
            style={styles.img}
          />
          <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>

          {/* <Text style={styles.description}>{description}</Text> */}

          <Text style={styles.type}>
            <Text style={styles.typeHeading}>Types : </Text>
            {pokemon.types
              .map((type) => type.type.name)
              .join(", ")
              .toUpperCase()}
          </Text>

          <Text style={styles.type}>
            <Text style={styles.typeHeading}>Strengths :</Text>{" "}
            {strengths.join(", ").toUpperCase()}
          </Text>

          <Text style={styles.type}>
            <Text style={styles.typeHeading}>Weakness : </Text>
            {weaknesses.join(", ").toUpperCase()}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Pokemon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffb3",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 2,
    height: 50,
    width: 300,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    borderRadius: 10,
    height: 50,
    width: 300,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  card: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    height: 400,
    width: 300,
  },
  img: { height: 200, width: 200, alignSelf: "center" },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 3,
    borderRadius: 10,
    width: 190,
    alignSelf: "center",
    backgroundColor: "black",
    color: "white",
  },
  typeHeading: {
    fontWeight: "bold",
    width: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    marginBottom: 5,
  },
    type: {
        marginLeft:10,
    marginTop:5,
    fontSize: 16,
    marginBottom: 1,
  },
});
