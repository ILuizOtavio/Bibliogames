import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Header({ title }: { title: string }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.back}>
        <Text style={styles.backText}>◀</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60, backgroundColor: "#000",
    flexDirection: "row", alignItems: "center",
    borderBottomWidth: 1, borderBottomColor: "#111",
    paddingHorizontal: 12
  },
  back: { width: 40 },
  backText: { color: "#fff", fontSize: 20 },
  title: {
    flex: 1, color: "#fff", textAlign: "center",
    fontSize: 18, fontWeight: "bold"
  },
});
