import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from 'react';
import { Alert, Dimensions, FlatList, Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Comentario from "../Comentario";

import USUARIO_LOGADO from '../../mocks/usuarios';

const { width } = Dimensions.get("window");

function Post({ item, onRemove }) {
  const [curtido, setCurtido] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Confira esta publicação no COMPESA Conecta:\n\n"${item.legenda}"\n\n(Link simulado: https://compesa-conecta.com.br/post/${item.id})`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleRemovePress = () => {
    Alert.alert(
      "Confirmar Remoção",
      "Você tem certeza que deseja remover esta publicação? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", style: "destructive", onPress: () => onRemove(item.id) }
      ]
    );
  };

  const handleVerComentarios = () => {
    router.push({
      pathname: "/telas/Comentarios",
      params: { post: JSON.stringify(item) }
    });
  };

  const renderConteudo = () => {
    switch (item.tipo) {
      case "TEXTO":
        return null;
      case "IMAGEM":
        return (
          <FlatList
            data={item.imagens}
            renderItem={({ item: imagemUrl }) => (
              <Image source={{ uri: imagemUrl }} style={estilos.imagemPost} />
            )}
            keyExtractor={(imagemUrl) => imagemUrl}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={estilos.carousel}
          />
        );
      case "VIDEO":
        const videoId = item.videoUrl.split("v=")[1];
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        return (
          <WebView
            style={estilos.video}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: embedUrl }}
          />
        );
      case "ENQUETE":
        const totalVotos = item.enquete.opcoes.reduce(
          (acc, op) => acc + op.votos,
          0
        );
        return (
          <View style={estilos.enqueteContainer}>
            {item.enquete.opcoes.map((opcao) => (
              <TouchableOpacity key={opcao.id} style={estilos.opcaoEnquete}>
                <Text style={estilos.textoOpcao}>{opcao.texto}</Text>
                <Text style={estilos.votosOpcao}>
                  {((opcao.votos / totalVotos) * 100).toFixed(0)}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={estilos.card}>
      <View style={estilos.cabecalhoPost}>
        <Image source={{ uri: item.autor.avatar }} style={estilos.avatar} />
        <View style={estilos.infoAutor}>
          <Text style={estilos.nomeAutor}>{item.autor.nome}</Text>
          <Text style={estilos.timestamp}>{new Date(item.timestamp).toLocaleDateString('pt-BR')}</Text>
        </View>
        {/* Botão de Remover Post */}
        {USUARIO_LOGADO.nivel >= 3 && (
          <TouchableOpacity style={estilos.botaoRemoverPost} onPress={handleRemovePress}>
            <FontAwesome name="trash-o" size={22} color="#D32F2F" />
          </TouchableOpacity>
        )}
      </View>
      <Text style={estilos.legenda}>{item.legenda}</Text>

      {renderConteudo()}

      <View style={estilos.rodapePost}>
        <TouchableOpacity style={estilos.botaoAcao} onPress={() => setCurtido(!curtido)}>
          <FontAwesome name={curtido ? "heart" : "heart-o"} size={20} color={curtido ? "#E91E63" : "#555"} />
          <Text style={estilos.textoAcao}>{item.curtidas + (curtido ? 1 : 0)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.botaoAcao} onPress={handleVerComentarios}>
          <FontAwesome name="comment-o" size={20} color="#555" />
          <Text style={estilos.textoAcao}>{item.comentarios.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.botaoAcao} onPress={handleShare}>
          <FontAwesome name="whatsapp" size={20} color="#25D366" />
          <Text style={estilos.textoAcao}>Compartilhar</Text>
        </TouchableOpacity>
      </View>

      {item.comentarios.length > 0 && (
        <View style={estilos.secaoComentarios}>
          <FlatList
            data={item.comentarios.slice(0, 2)}
            renderItem={({ item: comentario }) => <Comentario item={comentario} />}
            keyExtractor={(comentario) => comentario.id}
          />
          {item.comentarios.length > 2 && (
            <TouchableOpacity onPress={handleVerComentarios}>
              <Text style={estilos.verMais}>Ver todos os {item.comentarios.length} comentários</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

export default Post;

const estilos = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cabecalhoPost: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nomeAutor: {
    fontWeight: "bold",
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  legenda: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  imagemPost: {
    width: width - 60,
    height: 250,
    borderRadius: 8,
    marginRight: 10,
  },
  carousel: {
    marginBottom: 10,
  },
  video: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  enqueteContainer: {
    marginTop: 10,
  },
  opcaoEnquete: {
    backgroundColor: "#F0F0F0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textoOpcao: {
    fontSize: 14,
  },
  votosOpcao: {
    fontWeight: "bold",
  },
  rodapePost: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 10,
  },
  botaoAcao: {
    flexDirection: "row",
    alignItems: "center",
  },
  textoAcao: {
    marginLeft: 8,
    fontSize: 14,
    color: "#555",
  },
  secaoComentarios: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 10,
  },
  verMais: {
    color: '#0D47A1',
    fontWeight: 'bold',
    marginTop: 5,
  },
  infoAutor: {
    flex: 1,
  },
  botaoRemoverPost: {
    padding: 5,
    marginLeft: 10,
  },
});
