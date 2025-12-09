import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { ref, onValue } from "firebase/database";
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
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetalhesJogo", { jogo: item })}
          >
            <Image
              source={
                item.capa
                  ? { uri: item.capa }
                  : require("../../assets/images/no-image.png")
              }
              style={styles.capa}
            />

            <View style={styles.infoArea}>
              <Text style={styles.title}>{item.Titulo}</Text>

              {item.Genero ? (
                <Text style={styles.sub}>🎮 {item.Genero}</Text>
              ) : null}

              {item.Ano ? (
                <Text style={styles.sub}>📅 {item.Ano}</Text>
              ) : null}

              {item.Plataforma ? (
                <Text style={styles.sub}>🖥 {item.Plataforma}</Text>
              ) : null}

              {item.Nota ? (
                <Text style={styles.sub}>⭐ {item.Nota}</Text>
              ) : null}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16 },
  header: { color: "#fff", fontSize: 22, fontWeight: "700", marginBottom: 16, textAlign: "center" },

  card: {
    flexDirection: "row",
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    borderColor: "#333",
    borderWidth: 1,
    alignItems: "center",
  },

  capa: {
    width: 90,
    height: 120,
    borderRadius: 6,
    marginRight: 15,
    backgroundColor: "#222",
  },

  infoArea: { flex: 1 },

  title: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 4 },
  sub: { color: "#aaa", fontSize: 14, marginBottom: 3 },
});
