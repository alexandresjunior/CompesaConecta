import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import USUARIO_LOGADO from "../../mocks/usuarios";

function FaqItem({ titulo, children, onRemove }) {
    const [aberto, setAberto] = useState(false);

    const handleRemovePress = () => {
        Alert.alert(
            "Confirmar Remoção",
            "Você tem certeza que deseja remover esta pergunta do FAQ?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Remover", style: "destructive", onPress: onRemove }
            ]
        );
    };

    return (
        <View style={estilos.accordionContainer}>
            <TouchableOpacity style={estilos.accordionHeader} onPress={() => setAberto(!aberto)}>
                <View style={estilos.headerContent}>
                    <Text style={estilos.accordionTitle}>{titulo}</Text>
                    <View style={estilos.iconesContainer}>
                        {USUARIO_LOGADO.nivel >= 3 && (
                            <TouchableOpacity style={estilos.botaoRemoverFaq} onPress={handleRemovePress}>
                                <FontAwesome name="trash-o" size={20} color="#D32F2F" />
                            </TouchableOpacity>
                        )}
                        <AntDesign name={aberto ? "caret-up" : "caret-down"} size={20} color={"#333"} />
                    </View>
                </View>
            </TouchableOpacity>
            {aberto && <View style={estilos.accordionContent}>{children}</View>}
        </View>
    );
}

export default FaqItem;

const estilos = StyleSheet.create({
    accordionContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#F9F9F9',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    accordionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flexShrink: 1,
        marginRight: 10,
    },
    accordionContent: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0'
    },
    iconesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botaoRemoverFaq: {
        marginRight: 15,
        padding: 5,
    },
});