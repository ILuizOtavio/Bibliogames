import * as ImagePicker from "expo-image-picker";
import { ref as dbRef, push, set } from "firebase/database";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { dbRealtime, storage } from "../lib/BDfirebase";

export default function AdicionarJogo({ navigation }) {
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [imagemUri, setImagemUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function escolherImagem() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permissão necessária", "Permita acesso às imagens.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.9 });
    if (result.canceled) return;
    setImagemUri(result.assets[0].uri);
  }

  async function salvar() {
    if (!nome.trim() || !imagemUri) {
      Alert.alert("Erro", "Preencha o nome e escolha uma imagem.");
      return;
    }

    try {
      setUploading(true);

      // fetch -> blob
      const resp = await fetch(imagemUri);
      const blob = await resp.blob();

      // upload para storage
      const fileRef = storageRef(storage, `capas/${Date.now()}.jpg`);
      await uploadBytes(fileRef, blob);
      const url = await getDownloadURL(fileRef);

      // salvar no RTDB
      const novoRef = push(dbRef(dbRealtime, "jogos"));
      await set(novoRef, { nome: nome.trim(), genero: genero.trim() || "", capa: url });

      Alert.alert("Sucesso", "Jogo adicionado.");
      setNome(""); setGenero(""); setImagemUri(null);
      navigation.navigate("Biblioteca");
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Falha ao salvar: " + (err.message || err));
    } finally {
      setUploading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Jogo</Text>

      <TextInput placeholder="Nome" placeholderTextColor="#888" style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput placeholder="Gênero (opcional)" placeholderTextColor="#888" style={styles.input} value={genero} onChangeText={setGenero} />

      <TouchableOpacity style={styles.btn} onPress={escolherImagem}>
        <Text style={styles.btnText}>{imagemUri ? "Trocar Imagem" : "Escolher Imagem"}</Text>
      </TouchableOpacity>

      {imagemUri && <Image source={{ uri: imagemUri }} style={styles.preview} />}

      <TouchableOpacity style={[styles.btn, { marginTop: 18 }]} onPress={salvar} disabled={uploading}>
        <Text style={styles.btnText}>{uploading ? "Enviando..." : "Salvar Jogo"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { color: "#fff", fontSize: 22, marginBottom: 12, fontWeight: "700" },
  input: { backgroundColor: "#111", borderColor: "#444", borderWidth: 1, marginBottom: 12, padding: 12, color: "#fff", borderRadius: 8 },
  btn: { backgroundColor: "#fff", padding: 12, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#000", fontWeight: "700" },
  preview: { width: "100%", height: 200, resizeMode: "contain", marginTop: 12 },
});
