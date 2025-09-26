import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CartaoUnidade from "../../componentes/CartaoUnidade";
import listarUnidades from "../../servicos/unidades";

function UnidadesCadastradas() {
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const [unidades, setUnidades] = useState([]);

    const [filtroBusca, setFiltroBusca] = useState("");
    const [dadosFiltrados, setDadosFiltrados] = useState([]);

    const buscarUnidades = async () => {
        await listarUnidades(setUnidades, setCarregando, setErro);
    }

    useEffect(() => {
        buscarUnidades();
    }, []);

    useEffect(() => {
        const busca = filtroBusca.toLowerCase();
        if (busca === '') {
            setDadosFiltrados(unidades);
        } else {
            const dados = unidades.filter((unidade) => (
                unidade.nome.toLowerCase().includes(busca) ||
                unidade.municipio.toLowerCase().includes(busca)
            ));
            setDadosFiltrados(dados);
        }
    }, [filtroBusca, unidades]);

    if (carregando) {
        return (
            <View style={estilos.centerContainer}>
                <ActivityIndicator size={"large"} color={"#0D47A1"} />
                <Text>Carregando unidades...</Text>
            </View>
        )
    }

    if (erro) {
        return (
            <View style={estilos.centerContainer}>
                <Text style={estilos.errorText}>Falha ao carregar os dados.</Text>
                <TouchableOpacity style={estilos.button}>
                    <Text style={estilos.buttonText} onPress={buscarInspecoes}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={estilos.safeArea}>
            <StatusBar barStyle={"dark-content"} />

            <View style={estilos.header}>
                <TouchableOpacity style={estilos.backButton} onPress={() => router.back()}>
                    <FontAwesome name="arrow-circle-left" size={30} color={'#1A237E'} />
                </TouchableOpacity>
                <Text style={estilos.title}>Unidades Cadastradas</Text>
            </View>

            <View style={estilos.searchSection}>
                <TextInput
                    style={estilos.searchInput}
                    placeholder="Buscar pelo nome ou município..."
                    placeholderTextColor={'#888'}
                    value={filtroBusca}
                    onChangeText={setFiltroBusca}
                />
            </View>

            <FlatList
                data={dadosFiltrados}
                renderItem={({ item }) => <CartaoUnidade item={item} router={router} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={estilos.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={estilos.listaVazia}>
                        <Text style={estilos.listaVaziaTexto}>Nenhuma unidade encontrada.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

export default UnidadesCadastradas;

const estilos = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#F4F6F8',
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        color: '#1A237E',
        fontWeight: 'bold'
    },
    listContainer: {
        paddingHorizontal: 20,
    },
    listaVazia: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    listaVaziaTexto: {
        fontSize: 16,
        color: '#888'
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#0D47A1',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        marginBottom: 20
    },
    backButton: {
        padding: 5,
        marginRight: 15
    },
    backButtonText: {
        fontSize: 24,
        color: '#1A237E',
        fontWeight: 'bold'
    },
    searchSection: {
        paddingHorizontal: 20,
        marginBottom: 15
    },
    searchInput: {
        height: 50,
        backgroundColor: "#FFF",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0'
    }
});