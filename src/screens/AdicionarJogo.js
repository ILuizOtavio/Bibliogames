// src/screens/AdicionarJogo.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref as dbRef, push, set } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { dbRealtime, storage } from "../lib/BDfirebase";

export default function AdicionarJogo({ navigation }) {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [ano, setAno] = useState("");
  const [nota, setNota] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [dev, setDev] = useState("");

  const [imagemUri, setImagemUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function escolherImagem() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return Alert.alert("Permissão negada");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
    });

    if (!result.canceled) setImagemUri(result.assets[0].uri);
  }

  async function salvar() {
    if (!titulo.trim()) {
      Alert.alert("Erro", "Título é obrigatório.");
      return;
    }

    try {
      setUploading(true);
      let url = null;

      if (imagemUri) {
        const blob = await (await fetch(imagemUri)).blob();
        const fileRef = storageRef(storage, `capas/${Date.now()}.jpg`);
        await uploadBytes(fileRef, blob);
        url = await getDownloadURL(fileRef);
      }

      const novoRef = push(dbRef(dbRealtime, "jogos"));

      await set(novoRef, {
        Titulo: titulo,
        Genero: genero,
        Ano: ano,
        Nota: nota,
        Plataforma: plataforma,
        Desenvolvedor: dev,
        capa: url,
      });

      Alert.alert("Sucesso", "Jogo adicionado!");
      navigation.navigate("Biblioteca");
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Jogo</Text>

      <TextInput placeholder="Título" placeholderTextColor="#888" style={styles.input} value={titulo} onChangeText={setTitulo} />
      <TextInput placeholder="Gênero" placeholderTextColor="#888" style={styles.input} value={genero} onChangeText={setGenero} />
      <TextInput placeholder="Ano" placeholderTextColor="#888" style={styles.input} value={ano} onChangeText={setAno} />
      <TextInput placeholder="Nota" placeholderTextColor="#888" style={styles.input} value={nota} onChangeText={setNota} />
      <TextInput placeholder="Plataforma" placeholderTextColor="#888" style={styles.input} value={plataforma} onChangeText={setPlataforma} />
      <TextInput placeholder="Desenvolvedor" placeholderTextColor="#888" style={styles.input} value={dev} onChangeText={setDev} />

      <TouchableOpacity style={styles.btn} onPress={escolherImagem}>
        <Text style={styles.btnText}>
          {imagemUri ? "Trocar Imagem" : "Escolher Imagem"}
        </Text>
      </TouchableOpacity>

      {imagemUri && <Image source={{ uri: imagemUri }} style={styles.preview} />}

      <TouchableOpacity style={[styles.btn, { marginTop: 18 }]} onPress={salvar} disabled={uploading}>
        <Text style={styles.btnText}>
          {uploading ? "Enviando..." : "Salvar Jogo"}
        </Text>
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
