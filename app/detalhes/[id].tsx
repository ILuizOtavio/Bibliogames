import { router, useLocalSearchParams } from "expo-router";
import { onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import { dbRealtime } from "../../firebase/config";

type Jogo = {
  Id: string;
  Titulo?: string;
  Ano?: string | number;
  Genero?: string;
  Nota?: string | number;
  Plataforma?: string;
  Desenvolvedor?: string;
  capa?: string | null;
};

export default function Detalhes() {
  const { id } = useLocalSearchParams();
  const [jogo, setJogo] = useState<Jogo | null>(null);

  useEffect(() => {
    const r = ref(dbRealtime, `jogos/${id}`);
    const unsub = onValue(r, (snap) => {
      if (snap.exists()) setJogo(snap.val());
    });
    return () => unsub();
  }, [id]);

  const excluirJogo = () => {
    Alert.alert(
      "Excluir jogo",
      "Tem certeza que deseja remover este jogo da biblioteca?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await remove(ref(dbRealtime, "jogos/" + id));
            router.back();
          },
        },
      ]
    );
  };

  if (!jogo)
    return (
      <View style={styles.container}>
        <Header title="Detalhes" />
        <Text style={{ color: "#fff", marginTop: 30 }}>Carregando...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Header title={jogo.Titulo || "Detalhes"} />

      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={
            jogo.capa
              ? { uri: jogo.capa }
              : require("../../assets/images/no-image.png")
          }
          style={styles.capa}
        />

        <Text style={styles.title}>{jogo.Titulo}</Text>

        <View style={styles.infoBox}>
          {jogo.Genero && <Text style={styles.info}>🎮 {jogo.Genero}</Text>}
          {jogo.Ano && <Text style={styles.info}>📅 {jogo.Ano}</Text>}
          {jogo.Nota && <Text style={styles.info}>⭐ {jogo.Nota}</Text>}
          {jogo.Plataforma && <Text style={styles.info}>🕹 {jogo.Plataforma}</Text>}
          {jogo.Desenvolvedor && <Text style={styles.info}>🏢 {jogo.Desenvolvedor}</Text>}
        </View>

        {/* BOTÃO DE EXCLUIR */}
        <TouchableOpacity style={styles.btnExcluir} onPress={excluirJogo}>
          <Text style={styles.btnExcluirTexto}>Excluir jogo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  content: { padding: 20, paddingBottom: 50 },
  capa: {
    width: "100%", height: 300, borderRadius: 8,
    backgroundColor: "#222", marginBottom: 20
  },
  title: { color: "#fff", fontSize: 26, fontWeight: "bold", textAlign: "center" },
  infoBox: {
    marginTop: 15, padding: 15,
    backgroundColor: "#111", borderRadius: 10
  },
  info: { color: "#ccc", fontSize: 18, marginBottom: 6 },

  /* BOTÃO DE EXCLUIR */
  btnExcluir: {
    marginTop: 25,
    backgroundColor: "#b00020",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnExcluirTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
