import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FaqItem from '../../componentes/FaqItem';
import buscarFaq from '../../servicos/faq';

const LOGO_COMPESA_CONECTA = require('../../../assets/images/compesa_conecta_logo_horizontal.png');

function Faq() {
    const [faq, setFaq] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarFaq() {
            const dados = await buscarFaq();
            setFaq(dados);
            setCarregando(false);
        }
        carregarFaq();
    }, []);

    if (carregando) {
        return (
            <View style={estilos.centerContainer}>
                <ActivityIndicator size="large" color="#0D47A1" />
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={estilos.safeArea}>
            <StatusBar barStyle={"dark-content"} />

            <View style={estilos.header}>
                <Image source={LOGO_COMPESA_CONECTA} style={estilos.logoAppHeader} />
            </View>

            <ScrollView contentContainerStyle={estilos.container}>
                <Text style={estilos.tituloPagina}>Perguntas Frequentes (FAQ)</Text>
                {faq.map(item => (
                    <FaqItem key={item.id} titulo={item.pergunta}>
                        <Text style={estilos.resposta}>{item.resposta}</Text>
                    </FaqItem>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

export default Faq;

const estilos = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F4F6F8' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#E0E0E0', backgroundColor: '#FFF', alignItems: 'center' },
    logoAppHeader: { width: 150, height: 50, resizeMode: 'contain' },
    container: { padding: 20 },
    tituloPagina: { fontSize: 22, fontWeight: 'bold', color: '#1A237E', marginBottom: 20 },
    resposta: { fontSize: 15, lineHeight: 22, color: '#333' }
});