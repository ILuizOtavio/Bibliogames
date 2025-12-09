import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Game = {
  Id?: string;
  Titulo?: string;
  Genero?: string;
  Ano?: number | string;
  Nota?: number | string;
  Plataforma?: string;
  capa?: string | null;
};

export default function GameCard({ item, onPress }: { item: Game; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={
          item.capa ? { uri: item.capa } : require("../assets/images/no-image.png")
        }
        style={styles.capa}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.Titulo}</Text>
        <Text style={styles.meta}>🎮 {item.Genero}</Text>
        <Text style={styles.meta}>📅 {item.Ano}</Text>
        <Text style={styles.meta}>⭐ {item.Nota}</Text>
      </View>
    </TouchableOpacity>
    
  );
}


const styles = StyleSheet.create({
  card: {
    flexDirection: "row", backgroundColor: "#111",
    padding: 12, borderRadius: 10, marginBottom: 12
  },
  capa: { width: 90, height: 120, borderRadius: 8, marginRight: 12 },
  title: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  meta: { color: "#ccc", marginTop: 2 }
});
