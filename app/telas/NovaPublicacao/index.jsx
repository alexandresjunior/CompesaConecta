import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostForm from '../../componentes/PostForm';
import { criarPublicacao } from '../../servicos/publicacoes';

function NovaPublicacao() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (novaPublicacao) => {
        setIsLoading(true);
        try {
            await criarPublicacao(novaPublicacao);
            Alert.alert('Sucesso', 'Publicação criada com sucesso!');
            router.back();
        } catch (error) {
            Alert.alert('Erro', 'Houve um erro ao criar a publicação.');
            console.error(error);
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
            <View style={estilos.container}>
                <PostForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} />
            </View>
        </SafeAreaView>
    );
}

export default NovaPublicacao;

const estilos = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F4F6F8',
    },
    container: {
        flex: 1,
    }
});