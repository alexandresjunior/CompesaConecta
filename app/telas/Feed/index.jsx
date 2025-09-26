import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Post from "../../componentes/Post";
import listarPublicacoes from "../../servicos/publicacoes";

function Feed() {
  const [publicacoes, setPublicacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarPublicacoes() {
      const dados = await listarPublicacoes();
      setPublicacoes(dados);
      setCarregando(false);
    }
    carregarPublicacoes();
  }, []);

  if (carregando) {
    return (
      <View style={estilos.centerContainer}>
        <ActivityIndicator size="large" color="#0D47A1" />
        <Text>Carregando feed...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={estilos.safeArea}>
      <StatusBar barStyle={"dark-content"} />

      <View style={estilos.header}>
        <Text style={estilos.titulo}>COMPESA Conecta</Text>
        <FontAwesome name="plus-square-o" size={30} color="#1A237E" />
      </View>

      <FlatList
        data={publicacoes}
        renderItem={({ item }) => <Post item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilos.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

export default Feed;

const estilos = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#FFF",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1A237E",
  },
  listContainer: {
    padding: 15,
  },
});
