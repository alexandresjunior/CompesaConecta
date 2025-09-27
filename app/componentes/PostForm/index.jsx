import { AntDesign, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

function PostForm({ onSubmit, onCancel, isLoading }) {
    const [legenda, setLegenda] = useState('');
    const [tipoPublicacao, setTipoPublicacao] = useState('TEXTO');
    const [midiaUri, setMidiaUri] = useState([]);
    const [perguntaEnquete, setPerguntaEnquete] = useState('');
    const [opcoesEnquete, setOpcoesEnquete] = useState(['', '']);

    const pickMedia = async (mediaType) => {
        if (mediaType === 'imagem' && midiaUri.length >= 10) {
            Alert.alert('Limite Atingido', 'Você pode selecionar no máximo 10 imagens.');
            return;
        }

        const options = {
            mediaTypes: mediaType === 'imagem' ? ['images'] : ['videos'],
            quality: 1,
            allowsMultipleSelection: mediaType === 'imagem',
            selectionLimit: mediaType === 'imagem' ? (10 - midiaUri.length) : 1,
        };

        let result = await ImagePicker.launchImageLibraryAsync(options);

        if (!result.canceled) {
            if (mediaType === 'imagem') {
                const novosAssets = result.assets;
                if (midiaUri.length + novosAssets.length > 10) {
                    Alert.alert('Limite Atingido', `Você só pode adicionar mais ${10 - midiaUri.length} imagens. Apenas as primeiras foram selecionadas.`);
                    const assetsPermitidos = novosAssets.slice(0, 10 - midiaUri.length);
                    setMidiaUri([...midiaUri, ...assetsPermitidos.map(asset => asset.uri)]);
                } else {
                    setMidiaUri([...midiaUri, ...novosAssets.map(asset => asset.uri)]);
                }
            } else if (mediaType === 'video' && result.assets && result.assets.length > 0) {
                setMidiaUri([result.assets[0].uri]);
            }
        }
    };

    const handleRemoveMedia = (uriToRemove) => {
        setMidiaUri(midiaUri.filter(uri => uri !== uriToRemove));
    };

    const handleAddOption = () => {
        if (opcoesEnquete.length < 5) {
            setOpcoesEnquete([...opcoesEnquete, '']);
        } else {
            Alert.alert('Limite de Opções', 'Você pode adicionar no máximo 5 opções.');
        }
    };

    const handleRemoveOption = (indexToRemove) => {
        if (opcoesEnquete.length > 2) {
            setOpcoesEnquete(opcoesEnquete.filter((_, index) => index !== indexToRemove));
        } else {
            Alert.alert('Limite de Opções', 'A enquete deve ter no mínimo 2 opções.');
        }
    };

    const handleOptionChange = (text, indexToChange) => {
        const novasOpcoes = [...opcoesEnquete];
        novasOpcoes[indexToChange] = text;
        setOpcoesEnquete(novasOpcoes);
    };


    const handleSubmit = () => {
        if (!legenda.trim() && tipoPublicacao === 'TEXTO') {
            Alert.alert('Erro', 'Por favor, insira uma legenda para a publicação.');
            return;
        }

        const novaPublicacao = { legenda, tipo: tipoPublicacao };

        if (tipoPublicacao === 'IMAGEM') {
            if (midiaUri.length === 0) {
                Alert.alert('Erro', 'Por favor, selecione ao menos uma imagem.');
                return;
            }
            novaPublicacao.imagens = midiaUri;
        } else if (tipoPublicacao === 'VIDEO') {
            if (midiaUri.length === 0) {
                Alert.alert('Erro', 'Por favor, selecione um vídeo.');
                return;
            }
            // Para simulação, precisamos de um link do YouTube.
            // Para um app real, o vídeo seria carregado e depois teríamos um link para ele.
            // Aqui, vamos apenas usar o URI selecionado como um "placeholder" ou pedir um URL.
            // Para o mock, estamos pedindo um URL direto do YouTube.
            Alert.alert('Aviso', 'Para vídeos, o mock simula um link do YouTube. No app real, o vídeo seria enviado e um link gerado.');
            const youtubeUrl = prompt('Insira o URL do vídeo do YouTube (ex: https://www.youtube.com/watch?v=...)');
            if (!youtubeUrl) {
                return;
            }
            novaPublicacao.videoUrl = youtubeUrl;
        } else if (tipoPublicacao === 'ENQUETE') {
            if (!perguntaEnquete.trim()) {
                Alert.alert('Erro', 'Por favor, insira a pergunta da enquete.');
                return;
            }
            const opcoesValidas = opcoesEnquete.filter(opt => opt.trim() !== '');
            if (opcoesValidas.length < 2) {
                Alert.alert('Erro', 'Uma enquete deve ter ao menos duas opções.');
                return;
            }
            novaPublicacao.enquete = {
                pergunta: perguntaEnquete,
                opcoes: opcoesValidas.map(texto => ({ texto, votos: 0 }))
            };
        }

        onSubmit(novaPublicacao);
    };


    return (
        <View style={estilos.container}>
            <ScrollView contentContainerStyle={estilos.scrollContent}>
                <Text style={estilos.titulo}>Criar Nova Publicação</Text>

                <TextInput
                    style={[estilos.input, estilos.textArea]}
                    placeholder="O que você deseja compartilhar?"
                    placeholderTextColor="#666"
                    value={legenda}
                    onChangeText={setLegenda}
                    multiline
                    numberOfLines={4}
                />

                <View style={estilos.tipoSelector}>
                    <TouchableOpacity
                        style={[estilos.tipoBotao, tipoPublicacao === 'TEXTO' && estilos.tipoBotaoAtivo]}
                        onPress={() => { setTipoPublicacao('TEXTO'); setMidiaUri([]); setPerguntaEnquete(''); setOpcoesEnquete(['', '']); }}
                        disabled={isLoading}
                    >
                        <FontAwesome name="text-width" size={25} color={tipoPublicacao === 'TEXTO' ? '#FFF' : '#333'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[estilos.tipoBotao, tipoPublicacao === 'IMAGEM' && estilos.tipoBotaoAtivo]}
                        onPress={() => { setTipoPublicacao('IMAGEM'); setPerguntaEnquete(''); setOpcoesEnquete(['', '']); }}
                        disabled={isLoading}
                    >
                        <FontAwesome name="image" size={25} color={tipoPublicacao === 'IMAGEM' ? '#FFF' : '#333'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[estilos.tipoBotao, tipoPublicacao === 'VIDEO' && estilos.tipoBotaoAtivo]}
                        onPress={() => { setTipoPublicacao('VIDEO'); setPerguntaEnquete(''); setOpcoesEnquete(['', '']); }}
                        disabled={isLoading}
                    >
                        <FontAwesome name="video-camera" size={25} color={tipoPublicacao === 'VIDEO' ? '#FFF' : '#333'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[estilos.tipoBotao, tipoPublicacao === 'ENQUETE' && estilos.tipoBotaoAtivo]}
                        onPress={() => { setTipoPublicacao('ENQUETE'); setMidiaUri([]); }}
                        disabled={isLoading}
                    >
                        <FontAwesome name="bar-chart" size={25} color={tipoPublicacao === 'ENQUETE' ? '#FFF' : '#333'} />
                    </TouchableOpacity>
                </View>

                {(tipoPublicacao === 'IMAGEM' || tipoPublicacao === 'VIDEO') && (
                    <TouchableOpacity style={estilos.botaoAnexo} onPress={() => pickMedia(tipoPublicacao === 'IMAGEM' ? 'imagem' : 'video')} disabled={isLoading}>
                        <FontAwesome name="upload" size={20} color="#0D47A1" />
                        <Text style={estilos.textoBotaoAnexo}>
                            {tipoPublicacao === 'IMAGEM' ? `Selecionar Imagem(ns) (${midiaUri.length})` : `Selecionar Vídeo (${midiaUri.length})`}
                        </Text>
                    </TouchableOpacity>
                )}

                {tipoPublicacao === 'ENQUETE' && (
                    <View style={estilos.enqueteSection}>
                        <TextInput
                            style={estilos.input}
                            placeholder="Pergunta da enquete"
                            placeholderTextColor="#666"
                            value={perguntaEnquete}
                            onChangeText={setPerguntaEnquete}
                            disabled={isLoading}
                        />
                        {opcoesEnquete.map((opcao, index) => (
                            <View key={index} style={estilos.opcaoInputContainer}>
                                <TextInput
                                    style={[estilos.input, estilos.opcaoInput]}
                                    placeholder={`Opção ${index + 1}`}
                                    placeholderTextColor="#666"
                                    value={opcao}
                                    onChangeText={(text) => handleOptionChange(text, index)}
                                    disabled={isLoading}
                                />
                                {opcoesEnquete.length > 2 && (
                                    <TouchableOpacity onPress={() => handleRemoveOption(index)} style={estilos.removerOpcaoBtn} disabled={isLoading}>
                                        <AntDesign name="minus-circle" size={20} color="#D32F2F" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                        <TouchableOpacity style={estilos.botaoAddOpcao} onPress={handleAddOption} disabled={isLoading}>
                            <Text style={estilos.textoAddOpcao}>Adicionar Opção</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={estilos.footer}>
                    <TouchableOpacity
                        style={[estilos.botaoAcaoSecundario, { marginRight: 10 }]}
                        onPress={onCancel} disabled={isLoading}>
                        <Text style={estilos.textoBotaoAcaoSecundario}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilos.botaoAcaoPrincipal} onPress={handleSubmit} disabled={isLoading}>
                        {isLoading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={estilos.textoBotaoAcaoPrincipal}>Publicar</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

export default PostForm;

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6F8',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A237E',
        marginVertical: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 15,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    tipoSelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tipoBotao: {
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tipoBotaoAtivo: {
        backgroundColor: '#0D47A1',
    },
    tipoTexto: {
        marginLeft: 5,
        color: '#333',
        fontWeight: 'bold',
    },
    tipoTextoAtivo: {
        color: '#FFF',
    },
    botaoAnexo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3F2FD',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#90CAF9',
        marginBottom: 20,
    },
    textoBotaoAnexo: {
        marginLeft: 10,
        color: '#0D47A1',
        fontWeight: 'bold',
        fontSize: 16,
    },
    enqueteSection: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 20,
    },
    opcaoInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    opcaoInput: {
        flex: 1,
        marginBottom: 0,
    },
    removerOpcaoBtn: {
        padding: 5,
        marginStart: 10,
    },
    botaoAddOpcao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8F5E9',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#A5D6A7',
        marginTop: 10,
    },
    textoAddOpcao: {
        marginLeft: 10,
        color: '#2E7D32',
        fontWeight: 'bold',
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    botaoAcaoSecundario: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
    },
    textoBotaoAcaoSecundario: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
    },
    botaoAcaoPrincipal: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: '#0D47A1',
        minWidth: 100,
        alignItems: 'center',
    },
    textoBotaoAcaoPrincipal: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});