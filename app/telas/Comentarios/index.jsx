import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Comentario from "../../componentes/Comentario";

function Comentarios() {
    const { post: postString } = useLocalSearchParams();
    const post = JSON.parse(postString);

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
                renderItem={({ item }) => <Comentario item={item} />}
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
    }
});