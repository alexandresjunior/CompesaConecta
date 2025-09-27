import { useRouter } from "expo-router";
import { Image, ImageBackground, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import autenticarUsuario from "../../servicos/login";

// Caminhos das imagens
const BACKGROUND_IMAGEM = require('../../../assets/images/background.png');
const LOGO_COMPESA = require('../../../assets/images/compesa-logo.png'); // Logo da COMPESA institucional (ainda no rodapé)
const LOGO_COMPESA_CONECTA = require('../../../assets/images/compesa_conecta_logo.png'); // NOVA: Logomarca do aplicativo

function Login() {
  const router = useRouter();

  const handleLoginPress = async () => {
    const resposta = await autenticarUsuario("user", "pass"); // Simula chamada
    if (resposta.sucesso) {
      router.push("/telas/Feed");
    }
  }

  return (
    <ImageBackground
      source={BACKGROUND_IMAGEM}
      style={estilos.background}
    >
      <StatusBar barStyle={"dark-content"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={estilos.container}
      >
        <View style={estilos.formulario}>
          {/* Substituído o Text pelo Image com a logomarca do app */}
          <Image source={LOGO_COMPESA_CONECTA} style={estilos.logoApp} />

          <Text style={estilos.subtitulo}>
            Insira suas credenciais de rede
          </Text>

          <TextInput
            style={estilos.input}
            placeholder="Usuário"
            placeholderTextColor={'#999'}
            autoCapitalize="none"
          />

          <TextInput
            style={estilos.input}
            placeholder="Senha"
            placeholderTextColor={'#999'}
            secureTextEntry
          />

          <TouchableOpacity
            style={estilos.botao}
            onPress={handleLoginPress}
          >
            <Text style={estilos.textoBotao}>ENTRAR</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Image source={LOGO_COMPESA} style={estilos.logoCompesa} />
    </ImageBackground>
  );
}

export default Login;

const estilos = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  formulario: {
    width: '100%',
    maxWidth: 400,
    padding: 25,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8
  },
  // Removido o estilo 'titulo' pois não será mais um Text
  subtitulo: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 15, // Adicionado um espaçamento para a logo do app
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  botao: {
    width: '100%',
    height: 50,
    backgroundColor: '#0D47A1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  logoCompesa: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 120,
    height: 40,
    resizeMode: 'contain'
  },
  logoApp: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  }
});