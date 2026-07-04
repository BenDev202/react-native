import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, StyleSheet } from "react-native";

export default function Details() {
  const params = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    if (params.pokemon) {
      fetchPokemonByName(params.pokemon as string);
    }
  }, [params.pokemon]);

  async function fetchPokemonByName(name: string) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const data = await response.json();
    setPokemon(data);
  }

  if (!pokemon) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const primaryType = pokemon.types[0].type.name;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: "#fff" },
      ]}
    >
      <Text style={styles.name}>{pokemon.name}</Text>

      <Text style={styles.type}>{primaryType}</Text>

      <View style={styles.images}>
        <Image
          source={{ uri: pokemon.sprites.front_default }}
          style={styles.image}
        />
        <Image
          source={{ uri: pokemon.sprites.back_default }}
          style={styles.image}
        />
      </View>

      <Text style={styles.statsTitle}>Stats</Text>

      {pokemon.stats.map((s: any) => (
        <View key={s.stat.name} style={styles.statRow}>
          <Text style={styles.statName}>{s.stat.name}</Text>
          <Text style={styles.statValue}>{s.base_stat}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 16,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 18,
    textAlign: "center",
    color: "gray",
  },
  images: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  image: {
    width: 120,
    height: 120,
  },
  statsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  statName: {
    textTransform: "capitalize",
  },
  statValue: {
    fontWeight: "bold",
  },
});