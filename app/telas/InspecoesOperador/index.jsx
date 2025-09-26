import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Cartao from "../../componentes/Cartao";
import listarInspecoes from "../../servicos/inspecoes";

function InspecoesOperador() {
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const [inspecoes, setInspecoes] = useState([]);

    const [filtroAtivo, setFiltroAtivo] = useState("Todas");
    const [dadosFiltrados, setDadosFiltrados] = useState([]);

    const buscarInspecoes = async () => {
        await listarInspecoes(setInspecoes, setCarregando, setErro);
    }

    useEffect(() => {
        buscarInspecoes();
    }, []);

    useEffect(() => {
        if (filtroAtivo === 'Todas') {
            setDadosFiltrados(inspecoes);
        } else if (filtroAtivo === 'Concluídas') {
            const dados = inspecoes.filter(item => item.status === 'CONCLUIDA');
            setDadosFiltrados(dados);
        } else if (filtroAtivo === 'Pendentes') {
            const dados = inspecoes.filter(item => item.status === 'PENDENTE');
            setDadosFiltrados(dados);
        }
    }, [filtroAtivo, inspecoes]);

    if (carregando) {
        return (
            <View style={estilos.centerContainer}>
                <ActivityIndicator size={"large"} color={"#0D47A1"} />
                <Text>Carregando inspeções...</Text>
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

    const router = useRouter();

    const handleNovaInspecao = () => {
        router.push("/telas/UnidadesCadastradas");
    }

    return (
        <SafeAreaView style={estilos.safeArea}>
            <StatusBar barStyle={"dark-content"} />

            <View style={estilos.header}>
                <Text style={estilos.greeting}>Olá, Alexandre!</Text>
                <Text style={estilos.title}>Inspeções Realizadas</Text>
            </View>

            <View style={estilos.filterSection}>
                <Text style={estilos.filterTitle}>Filtros Rápidos</Text>
                <View style={estilos.filterButtonsContainer}>
                    <TouchableOpacity
                        style={[
                            estilos.filterButton,
                            filtroAtivo === 'Todas' && estilos.activeFilter
                        ]}
                        onPress={() => setFiltroAtivo("Todas")}
                    >
                        <Text style={[
                            estilos.filterButtonText,
                            filtroAtivo === 'Todas' && estilos.activeFilterText
                        ]}
                        >
                            Todas
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[estilos.filterButton, filtroAtivo === 'Concluídas' && estilos.activeFilter]}
                        onPress={() => setFiltroAtivo("Concluídas")}
                    >
                        <Text style={[estilos.filterButtonText, filtroAtivo === 'Concluídas' && estilos.activeFilterText]}>Concluídas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[estilos.filterButton, filtroAtivo === 'Pendentes' && estilos.activeFilter]}
                        onPress={() => setFiltroAtivo("Pendentes")}
                    >
                        <Text style={[estilos.filterButtonText, filtroAtivo === 'Pendentes' && estilos.activeFilterText]}>Pendentes</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={dadosFiltrados}
                renderItem={({ item }) => <Cartao item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={estilos.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={estilos.listaVazia}>
                        <Text style={estilos.listaVaziaTexto}>Nenhuma inspeção encontrada.</Text>
                    </View>
                }
            />

            <TouchableOpacity style={estilos.fab} onPress={handleNovaInspecao}>
                <FontAwesome name="plus" size={20} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default InspecoesOperador;

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
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A237E',
    },
    title: {
        fontSize: 18,
        color: '#333',
        marginTop: 4,
    },
    filterSection: {
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    filterTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        marginBottom: 10,
    },
    filterButtonsContainer: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        marginRight: 10,
    },
    activeFilter: {
        backgroundColor: '#1A237E',
    },
    filterButtonText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    activeFilterText: {
        color: '#FFFFFF',
    },
    listContainer: {
        paddingHorizontal: 20,
    },
    fab: {
        position: 'absolute',
        right: 40,
        bottom: 40,
        width: 60,
        height: 60,
        borderRadius: 40,
        backgroundColor: '#4CAF50', // Verde
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
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
    }
});