import { ref, set } from "firebase/database";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import { dbRealtime } from "../../firebase/config";

export default function Adicionar() {
  const [titulo, setTitulo] = useState("");
  const [ano, setAno] = useState("");
  const [genero, setGenero] = useState("");
  const [nota, setNota] = useState("");
  const [capa, setCapa] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  

  async function salvar() {
  setEnviando(true);
  const id = Date.now().toString();

  await set(ref(dbRealtime, `jogos/${id}`), {
    Id: id,
    Titulo: titulo,
    Ano: ano,
    Genero: genero,
    Nota: nota,
    capa: capa?.trim() || null,  
  });

  setEnviando(false);
  alert("Jogo adicionado!");
}

  return (
    <View style={styles.container}>
      <Header title="Adicionar Jogo" />

      <TextInput placeholder="Título" placeholderTextColor="#777" style={styles.input} onChangeText={setTitulo}/>
      <TextInput placeholder="Ano" placeholderTextColor="#777" style={styles.input} onChangeText={setAno}/>
      <TextInput placeholder="Gênero" placeholderTextColor="#777" style={styles.input} onChangeText={setGenero}/>
      <TextInput placeholder="Nota" placeholderTextColor="#777" style={styles.input} onChangeText={setNota}/>
      <TextInput placeholder="Url da imagem" placeholderTextColor="#777" style={styles.input} onChangeText={setCapa}/>

      {capa && <Image source={{ uri: capa }} style={styles.preview} />}

      <TouchableOpacity style={styles.saveButton} onPress={salvar} disabled={enviando}>
        <Text style={{ color: "#fff" }}>{enviando ? "Enviando..." : "Salvar Jogo"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  input: {
    backgroundColor: "#111", color: "#fff",
    padding: 12, borderRadius: 8, marginVertical: 8
  },
  imgButton: {
    backgroundColor: "#222", padding: 12,
    borderRadius: 8, alignItems: "center", marginVertical: 10
  },
  preview: {
    width: 150, height: 200, alignSelf: "center",
    marginVertical: 10, borderRadius: 8
  },
  saveButton: {
    backgroundColor: "#1e90ff", padding: 14,
    borderRadius: 8, alignItems: "center", marginTop: 20
  },
});
