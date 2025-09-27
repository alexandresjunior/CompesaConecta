import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Comentario from "../../componentes/Comentario";
import USUARIO_LOGADO from "../../mocks/usuarios";
import { adicionarComentario, removerComentario } from '../../servicos/publicacoes';

function Comentarios() {
    const { post: postString } = useLocalSearchParams();
    const [post, setPost] = useState(JSON.parse(postString));
    const [novoComentarioTexto, setNovoComentarioTexto] = useState('');
    const [enviandoComentario, setEnviandoComentario] = useState(false);
    const [removendoComentario, setRemovendoComentario] = useState(null);

    const handleAdicionarComentario = async () => {
        if (!novoComentarioTexto.trim()) {
            Alert.alert('Erro', 'Por favor, digite seu comentário.');
            return;
        }
        setEnviandoComentario(true);
        try {
            const novoComentario = await adicionarComentario(post.id, novoComentarioTexto);
            setPost(prevPost => ({
                ...prevPost,
                comentarios: [...prevPost.comentarios, novoComentario],
            }));
            setNovoComentarioTexto('');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível adicionar o comentário.');
            console.error("Erro ao adicionar comentário:", error);
        } finally {
            setEnviandoComentario(false);
        }
    };

    const handleRemoverComentario = useCallback(async (comentarioId) => {
        if (USUARIO_LOGADO.nivel < 3) {
            Alert.alert('Permissão Negada', 'Você não tem permissão para remover comentários.');
            return;
        }
        setRemovendoComentario(comentarioId);
        try {
            await removerComentario(post.id, comentarioId);
            setPost(prevPost => ({
                ...prevPost,
                comentarios: prevPost.comentarios.filter(c => c.id !== comentarioId),
            }));
            Alert.alert('Sucesso', 'Comentário removido.');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível remover o comentário.');
            console.error("Erro ao remover comentário:", error);
        } finally {
            setRemovendoComentario(null);
        }
    }, [post.id]);


    const renderItemComentario = ({ item: comentario }) => (
        <View style={estilos.comentarioItemContainer}>
            <Comentario item={comentario} />
            {USUARIO_LOGADO.nivel >= 3 && (
                <TouchableOpacity
                    style={estilos.botaoRemoverComentario}
                    onPress={() => handleRemoverComentario(comentario.id)}
                    disabled={removendoComentario === comentario.id}
                >
                    {removendoComentario === comentario.id ? (
                        <ActivityIndicator size="small" color="#D32F2F" />
                    ) : (
                        <AntDesign name="delete" size={18} color="#D32F2F" />
                    )}
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <SafeAreaView style={estilos.safeArea}>
            <StatusBar barStyle={"dark-content"} />

            <View style={estilos.header}>
                <TouchableOpacity style={estilos.backButton} onPress={() => router.back()}>
                    <FontAwesome name="arrow-circle-left" size={30} color={'#1A237E'} />
                </TouchableOpacity>
                <Text style={estilos.title}>Comentários</Text>
            </View>

            <FlatList
                data={post.comentarios}
                renderItem={renderItemComentario}
                keyExtractor={(item) => item.id}
                contentContainerStyle={estilos.listContainer}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={estilos.postOriginal}>
                        <View style={estilos.cabecalhoPost}>
                            <Image source={{ uri: post.autor.avatar }} style={estilos.avatar} />
                            <Text style={estilos.nomeAutor}>{post.autor.nome}</Text>
                        </View>
                        <Text style={estilos.legenda}>{post.legenda}</Text>
                    </View>
                }
                ListEmptyComponent={() => (
                    <View style={estilos.emptyCommentsContainer}>
                        <Text style={estilos.emptyCommentsText}>Esta publicação ainda não possui nenhum comentário.</Text>
                    </View>
                )}
            />

            <View style={estilos.novoComentarioContainer}>
                <TextInput
                    style={estilos.inputComentario}
                    placeholder="Adicione um comentário..."
                    placeholderTextColor="#666"
                    value={novoComentarioTexto}
                    onChangeText={setNovoComentarioTexto}
                    multiline
                    editable={!enviandoComentario}
                />
                <TouchableOpacity
                    style={estilos.botaoEnviarComentario}
                    onPress={handleAdicionarComentario}
                    disabled={enviandoComentario || !novoComentarioTexto.trim()}
                >
                    {enviandoComentario ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <FontAwesome name="send" size={20} color="#FFF" />
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Comentarios;

const estilos = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFF' },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
    backButton: { padding: 5, marginRight: 15 },
    title: { fontSize: 22, fontWeight: 'bold', color: '#1A237E' },
    listContainer: { padding: 15 },
    postOriginal: {
        paddingBottom: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0'
    },
    cabecalhoPost: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    avatar: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
    nomeAutor: { fontWeight: 'bold' },
    legenda: { fontSize: 15, lineHeight: 22, color: '#333' },
    emptyCommentsContainer: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    emptyCommentsText: {
        fontSize: 14,
        color: '#888',
        fontStyle: 'italic',
    },
    novoComentarioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#F9F9F9',
    },
    inputComentario: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        maxHeight: 100,
    },
    botaoEnviarComentario: {
        backgroundColor: '#0D47A1',
        borderRadius: 25,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    comentarioItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: '#F0F0F0',
    },
    botaoRemoverComentario: {
        padding: 5,
        marginLeft: 10,
    }
});