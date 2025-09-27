import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FaqItem from '../../componentes/FaqItem';
import USUARIO_LOGADO from '../../mocks/usuarios';
import { adicionarFaq, buscarFaq, removerFaq } from '../../servicos/faq';

const LOGO_COMPESA_CONECTA = require('../../../assets/images/compesa_conecta_logo_horizontal.png');

function Faq() {
    const [faq, setFaq] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
    const [novaPergunta, setNovaPergunta] = useState('');
    const [novaResposta, setNovaResposta] = useState('');
    const [enviandoFaq, setEnviandoFaq] = useState(false);

    const handleRemoverFaq = async (faqId) => {
        try {
            await removerFaq(faqId);
            setFaq(faqAtual => faqAtual.filter(item => item.id !== faqId));
            Alert.alert("Sucesso", "Pergunta removida do FAQ.");
        } catch (error) {
            Alert.alert("Erro", "Não foi possível remover a pergunta.");
            console.error(error);
        }
    };

    const carregarFaqLista = useCallback(async () => {
        setCarregando(true);
        try {
            const dados = await buscarFaq();
            setFaq(dados);
        } catch (error) {
            console.error("Erro ao carregar FAQ:", error);
        } finally {
            setCarregando(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarFaqLista();
        }, [carregarFaqLista])
    );

    const handleAdicionarFaq = async () => {
        if (USUARIO_LOGADO.nivel < 2) {
            Alert.alert('Permissão Negada', 'Você não tem permissão para adicionar perguntas ao FAQ.');
            return;
        }
        if (!novaPergunta.trim() || !novaResposta.trim()) {
            Alert.alert('Erro', 'Por favor, preencha a pergunta e a resposta.');
            return;
        }

        setEnviandoFaq(true);
        try {
            const novoFaqItem = { pergunta: novaPergunta, resposta: novaResposta };
            await adicionarFaq(novoFaqItem);
            Alert.alert('Sucesso', 'Pergunta adicionada ao FAQ!');
            setNovaPergunta('');
            setNovaResposta('');
            setMostrandoFormulario(false);
            carregarFaqLista();
        } catch (error) {
            Alert.alert('Erro', 'Houve um erro ao adicionar a pergunta ao FAQ.');
            console.error("Erro ao adicionar FAQ:", error);
        } finally {
            setEnviandoFaq(false);
        }
    };

    if (carregando) {
        return (
            <View style={estilos.centerContainer}>
                <ActivityIndicator size="large" color="#0D47A1" />
                <Text style={{ paddingTop: 15 }}>Carregando ...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={estilos.safeArea}>
            <StatusBar barStyle={"dark-content"} />

            <View style={estilos.header}>
                <Image source={LOGO_COMPESA_CONECTA} style={estilos.logoAppHeader} />
                {(USUARIO_LOGADO.nivel >= 2) && (
                    <TouchableOpacity onPress={() => setMostrandoFormulario(!mostrandoFormulario)}>
                        <FontAwesome name={mostrandoFormulario ? "minus-square-o" : "plus-square-o"} size={35} color="#1A237E" />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView contentContainerStyle={estilos.container}>
                <Text style={estilos.tituloPagina}>Perguntas Frequentes (FAQ)</Text>

                {mostrandoFormulario && (
                    <View style={estilos.formFaqContainer}>
                        <TextInput
                            style={estilos.input}
                            placeholder="Nova Pergunta"
                            placeholderTextColor="#999"
                            value={novaPergunta}
                            onChangeText={setNovaPergunta}
                            editable={!enviandoFaq}
                        />
                        <TextInput
                            style={[estilos.input, estilos.textArea]}
                            placeholder="Resposta"
                            placeholderTextColor="#999"
                            value={novaResposta}
                            onChangeText={setNovaResposta}
                            multiline
                            numberOfLines={4}
                            editable={!enviandoFaq}
                        />
                        <TouchableOpacity
                            style={estilos.botaoAdicionarFaq}
                            onPress={handleAdicionarFaq}
                            disabled={enviandoFaq || !novaPergunta.trim() || !novaResposta.trim()}
                        >
                            {enviandoFaq ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={estilos.textoBotaoAdicionarFaq}>Adicionar Pergunta</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}

                {faq.map(item => (
                    <FaqItem
                        key={item.id}
                        titulo={item.pergunta}
                        onRemove={() => handleRemoverFaq(item.id)}
                    >
                        <Text style={estilos.resposta}>{item.resposta}</Text>
                    </FaqItem>
                ))}
                {faq.length === 0 && !carregando && (
                    <Text style={estilos.emptyFaqText}>Nenhuma pergunta frequente ainda.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default Faq;

const estilos = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F4F6F8' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#E0E0E0', backgroundColor: '#FFF' },
    logoAppHeader: { width: 150, height: 50, resizeMode: 'contain' },
    container: { padding: 20 },
    tituloPagina: { fontSize: 22, fontWeight: 'bold', color: '#1A237E', marginBottom: 20 },
    resposta: { fontSize: 15, lineHeight: 22, color: '#333' },
    formFaqContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 10,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    botaoAdicionarFaq: {
        backgroundColor: '#2E7D32',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        minWidth: 150,
    },
    textoBotaoAdicionarFaq: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    emptyFaqText: {
        fontSize: 16,
        color: '#888',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 30,
    },
});