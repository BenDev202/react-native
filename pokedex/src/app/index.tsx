import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, StyleSheet, Pressable } from "react-native";

type Pokemon = {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
};

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

const colorByType = {
  grass: "#78C850",     // green
  fire: "#F08030",      // orange-red
  water: "#6890F0",     // blue
  electric: "#F8D030",  // yellow
  normal: "#A8A878",    // gray-beige
  bug: "#A8B820",       // green-yellow
  poison: "#A040A0",    // purple
  flying: "#A890F0",    // light blue-purple
  ground: "#E0C068",    // brown-yellow
  rock: "#B8A038",      // gray-brown
  psychic: "#F85888",   // pink
  ghost: "#705898",     // dark purple
  ice: "#98D8D8",       // light cyan
  dragon: "#7038F8",    // deep violet-blue
  steel: "#B8B8D0",     // metallic gray
  fairy: "#EE99AC",     // light pink
  fighting: "#C03028",  // red
  dark: "#705848",      // dark brown
};

export default function Index() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10"
      );

      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();

          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        })
      );

      setPokemon(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}>
      {pokemon.map((item) => (
        // @ts-ignore
        <Link key={item.name} href={{pathname:'/details', params: { pokemon: item.name }}} style={{backgroundColor: colorByType[item.types[0].type.name] + 55, padding: 20,
          borderRadius: 20,
        }}>
        <View >
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.type}>{item.types[0].type.name}</Text>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Image source={{ uri: item.imageBack }} style={{ width: 100, height: 100 }} />
          </View>
        </View>
        
        </Link>
      ))}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'gray',
    textAlign: "center",
  }
})
