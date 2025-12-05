import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { dbRealtime } from "../lib/BDfirebase";

export default function BibliotecaGrid({ navigation }) {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    const jogosRef = ref(dbRealtime, "jogos");
    const unsub = onValue(jogosRef, (snap) => {
      if (snap.exists()) {
        const data = snap.val();
        const lista = Object.keys(data).map((id) => ({ id, ...data[id] }));
        setJogos(lista);
      } else {
        setJogos([]);
      }
    });

    return () => unsub();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Biblioteca de Jogos</Text>

      <FlatList
        data={jogos}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DetalhesJogo", { jogo: item })}>
            <Image source={{ uri: item.capa }} style={styles.capa} />
            <View style={styles.overlay}>
              <Text style={styles.title}>{item.nome}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16 },
  header: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 12, textAlign: "center" },
  card: { width: "48%", height: 190, backgroundColor: "#000", borderWidth: 1, borderColor: "#fff", borderRadius: 10, marginBottom: 12, overflow: "hidden" },
  capa: { width: "100%", height: "100%" },
  overlay: { position: "absolute", bottom: 0, width: "100%", backgroundColor: "rgba(0,0,0,0.6)", paddingVertical: 6 },
  title: { color: "#fff", textAlign: "center", fontSize: 14, fontWeight: "600" },
});
