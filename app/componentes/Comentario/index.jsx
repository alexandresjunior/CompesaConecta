import { StyleSheet, Text, View } from "react-native";

function Comentario({ item }) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.texto}>
        <Text style={estilos.autor}>{item.autor.nome}: </Text>
        {item.texto}
      </Text>
    </View>
  );
}

export default Comentario;

const estilos = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingLeft: 5,
  },
  texto: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  autor: {
    fontWeight: "bold",
    color: "#000",
  },
});
