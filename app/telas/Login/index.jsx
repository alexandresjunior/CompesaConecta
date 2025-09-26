import { useRouter } from "expo-router";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import autenticarUsuario from "../../servicos/login";

const LOGO_COMPESA = require("../../../assets/images/compesa-logo.png");

function Login() {
  const router = useRouter();

  const handleLoginPress = async () => {
    const resposta = await autenticarUsuario("user", "pass"); // Simula chamada
    if (resposta.sucesso) {
      router.push("/telas/Feed");
    }
  };

  return (
    <View style={estilos.container}>
      <StatusBar barStyle={"dark-content"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={estilos.keyboardView}
      >
        <View style={estilos.formulario}>
          <Text style={estilos.titulo}>COMPESA Conecta</Text>
          <Text style={estilos.subtitulo}>Insira suas credenciais de rede</Text>

          <TextInput
            style={estilos.input}
            placeholder="Usuário"
            placeholderTextColor={"#999"}
            autoCapitalize="none"
          />

          <TextInput
            style={estilos.input}
            placeholder="Senha"
            placeholderTextColor={"#999"}
            secureTextEntry
          />

          <TouchableOpacity style={estilos.botao} onPress={handleLoginPress}>
            <Text style={estilos.textoBotao}>ENTRAR</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Image source={LOGO_COMPESA} style={estilos.logoCompesa} />
    </View>
  );
}

export default Login;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F4F6F8",
  },
  keyboardView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  formulario: {
    width: "100%",
    maxWidth: 400,
    padding: 25,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A237E",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  botao: {
    width: "100%",
    height: 50,
    backgroundColor: "#0D47A1",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  logoCompesa: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
});
