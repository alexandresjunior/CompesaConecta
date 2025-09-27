import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'expo-checkbox';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import autenticarUsuario from "../../servicos/login";
import { registerForPushNotificationsAsync } from '../../servicos/notifications';

const BACKGROUND_IMAGEM = require('../../../assets/images/background.png');
const LOGO_COMPESA = require('../../../assets/images/compesa-logo.png');
const LOGO_COMPESA_CONECTA = require('../../../assets/images/compesa_conecta_logo.png');

function Login() {
  const router = useRouter();

  const [manterConectado, setManterConectado] = useState(false);
  const [verificandoLogin, setVerificandoLogin] = useState(true);

  useEffect(() => {
    const verificarStatusLogin = async () => {
      try {
        const usuarioLogado = await AsyncStorage.getItem('@COMPESA_CONECTA:userLoggedIn');
        if (usuarioLogado === 'true') {
          router.replace('/(tabs)/Feed');
        } else {
          setVerificandoLogin(false);
        }
      } catch (e) {
        console.error("Erro ao verificar status de login:", e);
        setVerificandoLogin(false);
      }
    };

    verificarStatusLogin();
  });

  const handleLoginPress = async () => {
    const resposta = await autenticarUsuario("user", "pass");
    if (resposta.sucesso) {
      if (manterConectado) {
        try {
          await AsyncStorage.setItem('@COMPESA_CONECTA:userLoggedIn', 'true');
        } catch (e) {
          console.error("Erro ao salvar o estado de 'manter conectado':", e);
        }
      }

      await registerForPushNotificationsAsync();

      router.replace("/(tabs)/Feed");
    }
  };

  if (verificandoLogin) {
    return (
      <View style={estilos.loadingContainer}>
        <ActivityIndicator size="large" color="#0D47A1" />
      </View>
    );
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

          <View style={estilos.checkboxContainer}>
            <Checkbox
              style={estilos.checkbox}
              value={manterConectado}
              onValueChange={setManterConectado}
              color={manterConectado ? '#0D47A1' : undefined}
            />
            <Text style={estilos.checkboxLabel}>Mantenha-me conectado</Text>
          </View>

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6F8'
  },
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
  subtitulo: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 15,
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
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    justifyContent: 'flex-start',
  },
  checkbox: {
    marginRight: 8,
    borderRadius: 5,
    borderColor: '#0D47A1'
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#555',
  },
});