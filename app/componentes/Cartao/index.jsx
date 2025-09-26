import { StyleSheet, Text, View } from "react-native";

function Cartao({ item }) {
    return (
        <View style={[
            estilos.card,
            { borderRightColor: (item.status === 'CONCLUIDA') ? '#4CAF50' : '#FFC107' }
        ]}>
            <View style={estilos.cardInfo}>
                <Text style={estilos.cardText}>
                    <Text style={estilos.bold}>Nome: </Text>
                    {item.unidade.nome}
                </Text>
                <Text style={estilos.cardText}>
                    <Text style={estilos.bold}>Tipo: </Text>
                    {item.unidade.tipo}
                </Text>
                <Text style={estilos.cardText}>
                    <Text style={estilos.bold}>Data da Inspeção: </Text>
                    {item.data}
                </Text>
                <Text style={estilos.cardText}>
                    <Text style={estilos.bold}>Município: </Text>
                    {item.unidade.municipio}
                </Text>
            </View>
        </View>
    )
}

export default Cartao;

const estilos = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 18,
        marginBottom: 15,
        borderRightWidth: 7,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardInfo: {
        flex: 1,
    },
    cardText: {
        fontSize: 14,
        color: '#444',
        marginBottom: 5,
        lineHeight: 20,
    },
    bold: {
        fontWeight: 'bold',
        color: '#000',
    }
});