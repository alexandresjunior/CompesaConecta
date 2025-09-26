import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { useCameraPermissions } from "expo-camera";
import { launchCameraAsync, launchImageLibraryAsync, useMediaLibraryPermissions } from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CheckMarkBlue from "../../../assets/lottie/check-mark-blue.json";
import AccordionItem from "../../componentes/AccordionItem";
import ChecklistItem from "../../componentes/ChecklistItem";
import MiniaturaImagem from "../../componentes/MiniaturaImagem";
import buscarChecklist from "../../servicos/checklists";

const CHAVE_RASCUNHO = 'Rascunho14082025';

function InspecaoChecklist() {
    const { nome } = useLocalSearchParams();

    const netInfo = useNetInfo();

    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [checklist, setChecklist] = useState({});
    const [respostas, setRespostas] = useState({});
    const [fotos, setFotos] = useState([]);
    const [processandoFotos, setProcessandoFotos] = useState(false);
    const [processandoEnvio, setProcessandoEnvio] = useState(false);
    const [envioFinalizado, setEnvioFinalizado] = useState(false);

    const [permissaoCamera, solicitarPermissaoCamera] = useCameraPermissions();
    const [permissaoGaleria, solicitarPermissaoGaleria] = useMediaLibraryPermissions();

    useEffect(() => {
        const carregarRascunho = async () => {
            try {
                const rascunhoSalvo = await AsyncStorage.getItem(CHAVE_RASCUNHO);

                if (rascunhoSalvo !== null) {
                    const rascunhoJson = JSON.parse(rascunhoSalvo);

                    setRespostas(rascunhoJson.respostas || {});
                    setFotos(rascunhoJson.fotos || []);
                }
            } catch (erro) {
                console.error("Falha ao carregar o rascunho: ", erro);
                Alert.alert("Erro", "Não foi possível carregar o rascunho salvo.");
            }
        }

        carregarRascunho();

        buscarChecklist(setChecklist, setCarregando, setErro);
    }, []);

    useEffect(() => {
        const salvarRascunho = async () => {
            if (carregando) return;

            try {
                const rascunho = { respostas, fotos }
                await AsyncStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(rascunho));
            } catch (erro) {
                console.error("Falha ao salvar rascunho: ", erro);
            }
        }

        salvarRascunho();
    }, [respostas, fotos]);

    const handleFinalizarInspecao = async () => {
        // TODO: Chamada à API para enviar o formulário ao servidor
        setProcessandoEnvio(true);

        try {
            // REMOVE: Simula o envio para a API com um delay de 5 segundos
            await new Promise(resolve => setTimeout(resolve, 5000));

            await AsyncStorage.removeItem(CHAVE_RASCUNHO);

            setProcessandoEnvio(false);
            setEnvioFinalizado(true);

            setTimeout(() => {
                router.push({ pathname: "telas/InspecoesOperador" });
            }, 3000);
        } catch (erro) {
            console.error("Falha ao enviar inspeção: ", erro);
            Alert.alert("Erro", "Falha ao enviar inspeção. Tente novamente.");
        } finally {
            setProcessandoEnvio(false);
        }
    }

    if (carregando) {
        return (
            <View style={estilos.centerContainer}>
                <ActivityIndicator size={"large"} color={"#0D47A1"} />
                <Text>Carregando checklist...</Text>
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

    const handleSelecionarResposta = (itemId, resposta) => {
        setRespostas(anteriores => ({ ...anteriores, [itemId]: resposta }));
    }

    const handleAnexarFoto = async (fonte) => {
        try {
            setProcessandoFotos(true);

            let permissao;
            let resultado;

            const opcoes = {
                mediaTypes: ['images'],
                quality: 0.7,
                allowsEditing: false
            }

            if (fonte === 'camera') {
                permissao = await verificarPermissao(permissaoCamera, solicitarPermissaoCamera, "câmera");
                if (!permissao) return;

                resultado = await launchCameraAsync({ ...opcoes, saveToPhotos: true });
            } else {
                permissao = await verificarPermissao(permissaoGaleria, solicitarPermissaoGaleria, "galeria de fotos");
                if (!permissao) return;

                resultado = await launchImageLibraryAsync({ ...opcoes, allowsMultipleSelection: true });
            }

            if (!resultado.canceled) {
                const urisNovos = resultado.assets.map((asset) => asset.uri);
                setFotos((fotosJaAnexadas) => [...fotosJaAnexadas, ...urisNovos]);
            }
        } catch (erro) {
            Alert.alert("Erro", "Não foi possível anexar sua foto. Tente novamente.");
        } finally {
            setProcessandoFotos(false);
        }
    }

    const verificarPermissao = async (statusPermissao, funcaoSolicitacaoPermissao, nomeFonte) => {
        if (!!statusPermissao) {
            const { status } = await funcaoSolicitacaoPermissao();
            return status === 'granted';
        }

        if (!statusPermissao.granted) {
            Alert.alert(
                "Permissão Necessária",
                `O acesso à ${nomeFonte} foi negado. Por favor, habilite nas configurações do seu dispositivo.`
            );
            return false;
        }

        return true;
    }

    const handleExcluirFoto = (uriADeletar) => {
        setFotos(anexos => anexos.filter(uri => uri !== uriADeletar));
    }

    return (
        <SafeAreaView style={estilos.safeArea}>
            <StatusBar barStyle={"dark-content"} />

            <View style={estilos.header}>
                <TouchableOpacity style={estilos.backButton} onPress={() => router.back()}>
                    <FontAwesome name="arrow-circle-left" size={30} color={'#1A237E'} />
                </TouchableOpacity>
                <View>
                    <Text style={estilos.title}>Inspeção de Unidade</Text>
                    <Text style={estilos.subtitle}>{nome}</Text>
                </View>
            </View>

            <ScrollView style={estilos.listContainer} showsVerticalScrollIndicator={false}>
                {checklist?.categorias?.map((categoria) => (
                    <AccordionItem titulo={categoria.titulo} key={categoria.id}>
                        {categoria.itens?.map((item) => (
                            <ChecklistItem
                                item={item}
                                aoSelecionar={handleSelecionarResposta}
                                valorSelecionado={respostas[item.id]}
                                key={item.id}
                            />
                        ))}
                    </AccordionItem>
                ))}

                <View style={estilos.photoSection}>
                    <Text style={estilos.sectionTitle}>Evidências Fotográficas</Text>
                    <FlatList
                        data={fotos}
                        renderItem={({ item }) => <MiniaturaImagem uri={item} handleExcluir={handleExcluirFoto} />}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        style={fotos.length > 0 && estilos.photoListSection}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={<Text style={estilos.emptyPhotoText}>Nenhuma foto anexada.</Text>}
                    />
                    <View style={estilos.photoActionsContainer}>
                        <TouchableOpacity style={estilos.attachButton} onPress={() => handleAnexarFoto("camera")}>
                            <FontAwesome name="camera" size={30} color={"white"} />
                        </TouchableOpacity>
                        <TouchableOpacity style={estilos.attachButton} onPress={() => handleAnexarFoto("galeria")}>
                            <FontAwesome name="image" size={30} color={"white"} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={estilos.actionsContainer}>
                    {!netInfo.isConnected && (
                        <Text style={estilos.offlineText}>
                            Você está offline. Suas alterações foram salvas localmente e serão enviadas ao servidor quando você estiver conectado à internet novamente.
                        </Text>
                    )}
                    <TouchableOpacity
                        style={[
                            estilos.submitButton,
                            !netInfo.isConnected && estilos.submitButtonDisabled
                        ]}
                        onPress={handleFinalizarInspecao}
                        disabled={!netInfo.isConnected}
                    >
                        <Text style={estilos.submitButtonText}>Finalizar e Enviar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {processandoFotos && (
                <View style={estilos.loadingOverlay}>
                    <ActivityIndicator size="large" color="#FFF" />
                    <Text style={estilos.loadingText}>Processando imagens...</Text>
                </View>
            )}

            {(processandoEnvio || envioFinalizado) && (
                <View style={estilos.loadingOverlay}>
                    {processandoEnvio ? (
                        <>
                            <ActivityIndicator size={100} color="#FFF" />
                            <Text style={estilos.loadingText}>Enviando inspeção...</Text>
                        </>
                    ) : (
                        <>
                            <LottieView
                                source={CheckMarkBlue}
                                autoPlay
                                loop={true}
                                style={estilos.lottieAnimation}
                            />
                            <Text style={estilos.successText}>Envio finalizado com sucesso!</Text>
                            <Text style={estilos.redirectText}>Você será redirecionado para a tela inicial.</Text>
                        </>
                    )}
                </View>
            )}
        </SafeAreaView>
    );
}

export default InspecaoChecklist;

const estilos = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F4F6F8', paddingTop: 20 },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorText: { fontSize: 16, color: 'red' },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
    backButton: { padding: 5, marginRight: 15 },
    title: { fontSize: 22, fontWeight: 'bold', color: '#1A237E' },
    subtitle: { fontSize: 16, color: '#555' },
    listContainer: { padding: 20 },
    accordionContainer: { backgroundColor: '#FFF', borderRadius: 10, marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#E0E0E0' },
    accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#F9F9F9' },
    accordionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    accordionIcon: { fontSize: 22, fontWeight: 'bold', color: '#1A237E' },
    accordionContent: { padding: 15, borderTopWidth: 1, borderTopColor: '#E0E0E0' },
    checklistItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    checklistItemText: { fontSize: 15, color: '#444', marginBottom: 10, flex: 1 },
    checklistItemButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
    optionButton: { paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20, borderWidth: 1, borderColor: '#BDBDBD', marginLeft: 10 },
    optionButtonText: { fontSize: 14, fontWeight: 'bold', color: '#666' },
    optionButtonSim: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
    optionButtonNao: { backgroundColor: '#F44336', borderColor: '#F44336' },
    optionButtonTextSelected: { color: '#FFF' },
    photoSection: { padding: 15, marginBottom: 15, backgroundColor: '#FFF', borderRadius: 10, borderWidth: 1, borderColor: '#E0E0E0' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    photoListSection: { paddingVertical: 10 },
    photoThumbnail: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
    emptyPhotoText: { color: '#888', fontStyle: 'italic' },
    attachButton: { flex: 1, backgroundColor: '#4CAF50', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 15 },
    photoActionsContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 15 },
    actionsContainer: { justifyContent: 'center', marginBottom: 15 },
    submitButton: { flex: 1, backgroundColor: '#1A237E', padding: 18, borderRadius: 10, alignItems: 'center', borderWidth: 2, borderColor: "#1A237E", marginBottom: 50 },
    submitButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
    submitButtonDisabled: { backgroundColor: '#1a227e79', borderColor: '#1A237E' },
    offlineText: { textAlign: 'center', color: '#F44336', fontStyle: 'italic', marginBottom: 20 },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject, // Ocupa toda a tela
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    },
    loadingText: {
        color: '#FFF',
        marginTop: 15,
        fontSize: 18,
        fontWeight: 'bold'
    },
    lottieAnimation: {
        width: 300,
        height: 300,
    },
    successText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    redirectText: {
        fontSize: 16,
        color: '#E0E0E0',
        textAlign: 'center',
        marginTop: 8,
    }
});