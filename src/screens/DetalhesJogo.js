import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

export default function DetalhesJogo({ route }) {
  const { jogo } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <Image
          source={
            jogo.capa
              ? { uri: jogo.capa }
              : require("../../assets/images/no-image.png")
          }
          style={styles.capa}
        />
        <Text style={styles.title}>{jogo.Titulo}</Text>
      </View>

      <View style={styles.content}>
        {jogo.Genero && <Text style={styles.info}>🎮 Gênero: {jogo.Genero}</Text>}
        {jogo.Ano && <Text style={styles.info}>📅 Ano: {jogo.Ano}</Text>}
        {jogo.Plataforma && <Text style={styles.info}>🕹 Plataforma: {jogo.Plataforma}</Text>}
        {jogo.Desenvolvedor && <Text style={styles.info}>🏢 Desenvolvedor: {jogo.Desenvolvedor}</Text>}
        {jogo.Nota && <Text style={styles.info}>⭐ Nota: {jogo.Nota}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  top: { alignItems: "center", padding: 20 },

  capa: {
    width: 150,
    height: 220,
    borderRadius: 10,
    marginBottom: 12,
  },

  title: { color: "#fff", fontSize: 26, fontWeight: "700", textAlign: "center" },

  content: { padding: 20 },
  info: { color: "#ccc", fontSize: 16, marginTop: 10 },
});
