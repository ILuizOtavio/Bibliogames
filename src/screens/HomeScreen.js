import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Biblioteca de Jogos</Text>
      

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Biblioteca")}>
        <Text style={styles.buttonText}>📚 Ver Biblioteca</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: "#222" }]} onPress={() => navigation.navigate("AdicionarJogo")}>
        <Text style={styles.buttonText}>➕ Adicionar Jogo</Text>
      </TouchableOpacity>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", alignItems: "center", paddingTop: 60 },
  logo: { width: 180, height: 180, marginBottom: -20 },
  title: { color: "#fff", fontSize: 28, fontWeight: "700", marginTop: 30, marginBottom: 10 },
  subtitle: { color: "#aaa", fontSize: 14, marginBottom: 30 },
  button: { width: "75%", backgroundColor: "#111", paddingVertical: 14, borderRadius: 12, alignItems: "center", marginBottom: 12, borderWidth: 1, borderColor: "#fff" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  footerImg: { width: 180, height: 140, position: "absolute", bottom: 10 },
});
