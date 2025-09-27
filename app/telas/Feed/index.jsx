import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Post from "../../componentes/Post";
import listarPublicacoes from '../../servicos/publicacoes';

const LOGO_COMPESA_CONECTA = require('../../../assets/images/compesa_conecta_logo_horizontal.png');

function Feed() {
  const [publicacoes, setPublicacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const insets = useSafeAreaInsets();

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
      <View style={[estilos.centerContainer, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color="#0D47A1" />
        <Text>Carregando publicações...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={estilos.safeArea}>
      <StatusBar barStyle={"dark-content"} />

      <View style={estilos.header}>
        <Image source={LOGO_COMPESA_CONECTA} style={estilos.logoAppHeader} />
        <TouchableOpacity onPress={() => { }}>
          <FontAwesome name="plus-square-o" size={35} color="#1A237E" />
        </TouchableOpacity>
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
    backgroundColor: '#F4F6F8',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFF'
  },
  listContainer: {
    padding: 15,
  },
  logoAppHeader: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  }
});