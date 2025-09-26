import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function ChecklistItem({ item, aoSelecionar, valorSelecionado }) {
    return (
        <View style={estilos.checklistItem}>
            <Text style={estilos.checklistItemText}>{item.descricao}</Text>
            <View style={estilos.checklistItemButtons}>
                <TouchableOpacity
                    style={[estilos.optionButton, valorSelecionado === 'SIM' && estilos.optionButtonSim]}
                    onPress={() => aoSelecionar(item.id, 'SIM')}
                >
                    <Text style={[estilos.optionButtonText, valorSelecionado === 'SIM' && estilos.optionButtonTextSelected]}>SIM</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[estilos.optionButton, valorSelecionado === 'NÃO' && estilos.optionButtonNao]}
                    onPress={() => aoSelecionar(item.id, 'NÃO')}
                >
                    <Text style={[estilos.optionButtonText, valorSelecionado === 'NÃO' && estilos.optionButtonTextSelected]}>NÃO</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ChecklistItem;

const estilos = StyleSheet.create({
    checklistItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', alignItems: 'center' },
    checklistItemText: { fontSize: 15, color: '#444', marginBottom: 10, flex: 1, textAlign: 'center' },
    checklistItemButtons: { flexDirection: 'row', justifyContent: 'center' },
    optionButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 10, borderWidth: 1, borderColor: '#BDBDBD', marginLeft: 10 },
    optionButtonText: { fontSize: 14, fontWeight: 'bold', color: '#666' },
    optionButtonSim: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
    optionButtonNao: { backgroundColor: '#F44336', borderColor: '#F44336' },
    optionButtonTextSelected: { color: '#FFF' },
});