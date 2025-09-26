import { Entypo } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

function MiniaturaImagem({ uri, handleExcluir }) {
    return (
        <View style={estilos.photoThumbnailContainer}>
            <Image source={{ uri }} style={estilos.photoThumbnail} />
            <TouchableOpacity style={estilos.deleteButton} onPress={() => handleExcluir(uri)}>
                <Entypo name="circle-with-cross" size={24} color={"red"} />
            </TouchableOpacity>
        </View>
    );
}

export default MiniaturaImagem;

const estilos = StyleSheet.create({
    photoThumbnailContainer: { marginRight: 10, position: 'relative' },
    photoThumbnail: { width: 80, height: 80, borderRadius: 8 },
    deleteButton: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#FFF',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    }
});