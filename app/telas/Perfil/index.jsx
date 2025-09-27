import { router } from "expo-router";
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import USUARIO_LOGADO from "../../mocks/usuarios";

const LOGO_COMPESA_CONECTA = require('../../../assets/images/compesa_conecta_logo_horizontal.png');

function Perfil() {
    const handleLogout = () => {
        router.replace('/telas/Login');
    };

    return (
        <SafeAreaView style={estilos.safeArea}>
            <StatusBar barStyle={"dark-content"} />

            <View style={estilos.header}>
                <Image source={LOGO_COMPESA_CONECTA} style={estilos.logoAppHeader} />
            </View>

            <View style={estilos.container}>
                <Image source={{ uri: USUARIO_LOGADO.avatar }} style={estilos.avatar} />
                <Text style={estilos.nomeUsuario}>{USUARIO_LOGADO.nome}</Text>
                <Text style={estilos.emailUsuario}>usuario.logado@compesa.com.br</Text>
                <Text style={estilos.nivelAcesso}>Nível de Acesso: {USUARIO_LOGADO.nivel}</Text>

                <TouchableOpacity style={estilos.botaoSair} onPress={handleLogout}>
                    <Text style={estilos.textoBotaoSair}>Sair</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Perfil;

const estilos = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F4F6F8' },
    header: { paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#E0E0E0', backgroundColor: '#FFF', alignItems: 'center' },
    logoAppHeader: { width: 150, height: 50, resizeMode: 'contain' },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF',
        margin: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#0D47A1'
    },
    nomeUsuario: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A237E',
        marginBottom: 5,
    },
    emailUsuario: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    nivelAcesso: {
        fontSize: 16,
        color: '#777',
        marginBottom: 30,
        fontStyle: 'italic',
    },
    botaoSair: {
        backgroundColor: '#D32F2F',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    textoBotaoSair: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});