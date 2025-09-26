import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function AccordionItem({ titulo, children }) {
    const [aberto, setAberto] = useState(false);

    return (
        <View style={estilos.accordionContainer}>
            <TouchableOpacity style={estilos.accordionHeader} onPress={() => setAberto(!aberto)}>
                <Text style={estilos.accordionTitle}>{titulo}</Text>
                <AntDesign name={aberto ? "caretup" : "caretdown"} size={20} color={"#333"} />
            </TouchableOpacity>
            {aberto && <View style={estilos.accordionContent}>{children}</View>}
        </View>
    );
}

export default AccordionItem;

const estilos = StyleSheet.create({
    accordionContainer: { backgroundColor: '#FFF', borderRadius: 10, marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#E0E0E0' },
    accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#F9F9F9' },
    accordionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    accordionContent: { paddingVertical: 10, paddingHorizontal: 20, borderTopWidth: 1, borderTopColor: '#E0E0E0' },
});