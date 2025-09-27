import { router } from "expo-router";
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'; // Importar Platform e KeyboardAvoidingView
import { SafeAreaView } from "react-native-safe-area-context";
import PostForm from "../../componentes/PostForm";
import { criarPublicacao } from '../../servicos/publicacoes';

const LOGO_COMPESA_CONECTA = require('../../../assets/images/compesa_conecta_logo_horizontal.png');

function NovaPublicacao() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (dadosPublicacao) => {
        setIsLoading(true);
        try {
            await criarPublicacao(dadosPublicacao);
            Alert.alert("Sucesso", "Publicação criada com sucesso!");
            router.back();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar a publicação. Tente novamente.");
            console.error("Erro ao criar publicação:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <SafeAreaView style={estilos.safeArea}>
            <StatusBar barStyle={"dark-content"} />

            <View style={estilos.header}>
                <Image source={LOGO_COMPESA_CONECTA} style={estilos.logoAppHeader} />
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <PostForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isLoading={isLoading}
                />
            </KeyboardAvoidingView>

            {isLoading && (
                <View style={estilos.loadingOverlay}>
                    <ActivityIndicator size="large" color="#0D47A1" />
                    <Text style={estilos.loadingText}>Publicando...</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

export default NovaPublicacao;

const estilos = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
    header: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        alignItems: 'center',
    },
    logoAppHeader: {
        width: 150,
        height: 50,
        resizeMode: 'contain',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
});