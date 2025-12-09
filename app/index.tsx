import { router } from "expo-router";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GameCard from "../../Bibliogame/components/GameCard";
import { dbRealtime } from "../../Bibliogame/firebase/config";

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
      <Text style={styles.title}>🎮 Biblioteca de Jogos</Text>

      <FlatList
        data={jogos}
        contentContainerStyle={{ padding: 15, paddingBottom: 140 }}
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/adicionar")}
      >
        <Text style={styles.buttonText}>➕ Adicionar Jogo</Text>
      </TouchableOpacity>
    </View>
    
  );
}




const styles = StyleSheet.create({
 container: { flex: 1, backgroundColor: "#000" },
  title: { fontSize: 28, color: "#fff", fontWeight: "bold", textAlign: "center", marginVertical: 20 },
  subtitle: { color: "#999", marginBottom: 40 },
  button: {
    position: 'absolute',
    bottom: 28,
    alignSelf: 'center',
    backgroundColor: "#222",
    padding: 14,
    borderRadius: 10,
    width: "80%",
    textAlign: "center",
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: { textAlign: "center", color: "#fff", fontSize: 18 },
  emptyText: { color: "#777", textAlign: "center", marginTop: 40 }
});
