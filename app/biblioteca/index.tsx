import { View, Text, FlatList, StyleSheet } from "react-native";
import { onValue, ref } from "firebase/database";
import { dbRealtime } from "../../firebase/config";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import GameCard from "../../components/GameCard";
import Header from "../../components/Header";

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

export default function Biblioteca() {
  const [jogos, setJogos] = useState<Jogo[]>([]);

  useEffect(() => {
    const r = ref(dbRealtime, "jogos");

    const unsub = onValue(r, (snap) => {
      if (snap.exists()) {
        const dados = snap.val();
        const lista: Jogo[] = Object.values(dados);
        setJogos(lista);
      } else {
        setJogos([]);
      }
    });

    return () => unsub();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="Biblioteca" />

      <FlatList
        data={jogos}
        contentContainerStyle={{ padding: 15 }}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => (
          <GameCard
            item={item}
            onPress={() =>
              router.push({
                pathname: "/detalhes/[id]",
                params: { id: item.Id },
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum jogo encontrado.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  emptyText: { color: "#777", textAlign: "center", marginTop: 40 }
});
