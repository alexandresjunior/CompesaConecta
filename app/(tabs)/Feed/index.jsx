import { FontAwesome } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Post from "../../componentes/Post";
import { listarPublicacoes, removerPublicacao } from '../../servicos/publicacoes';

const LOGO_COMPESA_CONECTA = require('../../../assets/images/compesa_conecta_logo_horizontal.png');

function Feed() {
  const [publicacoes, setPublicacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const insets = useSafeAreaInsets();

  const handleRemoverPost = async (postId) => {
    try {
      await removerPublicacao(postId);
      setPublicacoes(publicacoesAtuais => publicacoesAtuais.filter(p => p.id !== postId));
      Alert.alert("Sucesso", "Publicação removida.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover a publicação.");
      console.error(error);
    }
  };

  const carregarPublicacoesDoFeed = useCallback(async () => {
    setCarregando(true);
    try {
      const dados = await listarPublicacoes();
      setPublicacoes(dados);
    } catch (error) {
      console.error("Erro ao carregar publicações:", error);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarPublicacoesDoFeed();
    }, [carregarPublicacoesDoFeed])
  );

  if (carregando) {
    return (
      <View style={[estilos.centerContainer, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color="#0D47A1" />
        <Text style={{ paddingTop: 15 }}>Carregando publicações...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={estilos.safeArea}>
      <StatusBar barStyle={"dark-content"} />

      <View style={estilos.header}>
        <Image source={LOGO_COMPESA_CONECTA} style={estilos.logoAppHeader} />
        <TouchableOpacity onPress={() => router.push("telas/NovaPublicacao")}>
          <FontAwesome name="plus-square-o" size={35} color="#1A237E" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={publicacoes}
        renderItem={({ item }) => <Post item={item} onRemove={handleRemoverPost} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilos.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={carregando}
        onRefresh={carregarPublicacoesDoFeed}
        ListEmptyComponent={() => (
          <View style={estilos.emptyFeedContainer}>
            <Text style={estilos.emptyFeedText}>Nenhuma publicação encontrada. Seja o primeiro a postar!</Text>
          </View>
        )}
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
  },
  emptyFeedContainer: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  emptyFeedText: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
  },
});