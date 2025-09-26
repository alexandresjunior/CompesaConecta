import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function CartaoUnidade({ item, router }) {
    return (
        <TouchableOpacity style={estilos.card} onPress={() => router.push({ pathname: "/telas/InspecaoChecklist", params: { nome: item.nome }})}>
            <View style={estilos.cardInfo}>
                <Text style={estilos.cardText}>
                    <Text style={estilos.bold}>Nome: </Text>
                    {item.nome}
                </Text>
                <Text style={estilos.cardText}>
                    <Text style={estilos.bold}>Tipo: </Text>
                    {item.tipo}
                </Text>
                <Text style={estilos.cardText}>
                    <Text style={estilos.bold}>Centro de Custo: </Text>
                    {item.centroCusto}
                </Text>
                <Text style={estilos.cardText}>
                    <Text style={estilos.bold}>Município: </Text>
                    {item.municipio}
                </Text>
                <Text style={estilos.cardText}>
                    <Text style={estilos.bold}>Data da Última Inspeção: </Text>
                    {item.dataUltimaInspecao}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default CartaoUnidade;

const estilos = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 18,
        marginBottom: 15,
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