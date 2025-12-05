import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function DetalhesJogo({ route }) {
  const { jogo } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: jogo.capa }} style={styles.capa} />
      <View style={styles.content}>
        <Text style={styles.title}>{jogo.nome}</Text>
        {jogo.genero && <Text style={styles.info}>🎮 Gênero: {jogo.genero}</Text>}
        {jogo.plataforma && <Text style={styles.info}>🖥 Plataforma: {jogo.plataforma}</Text>}
        {jogo.descricao && <Text style={styles.desc}>{jogo.descricao}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  capa: { width: "100%", height: 260 },
  content: { padding: 20 },
  title: { color: "#fff", fontSize: 26, fontWeight: "700", marginBottom: 10 },
  info: { color: "#ccc", fontSize: 16, marginTop: 6 },
  desc: { color: "#e5e5e5", fontSize: 16, marginTop: 16, lineHeight: 22 },
});
