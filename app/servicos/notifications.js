import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export async function registerForPushNotificationsAsync() {
    let token;

    if (!Device.isDevice) {
        alert('As notificações push só funcionam em dispositivos físicos.');
        return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        alert('Falha ao obter o token de push para notificações!');
        return;
    }

    try {
        const projectId = Constants.expoConfig?.extra?.eas?.projectId;
        if (!projectId) {
            throw new Error('O projectId não foi encontrado. Verifique seu app.json.');
        }

        token = (await Notifications.getExpoPushTokenAsync({
            projectId,
        })).data;

        console.log("Expo Push Token:", token);
        // AQUI: Você enviaria o 'token' para o seu backend (Ex: API Spring Boot)
        // await api.post('/registrar-token', { token, userId: USUARIO_LOGADO.id });

    } catch (e) {
        console.error("Erro ao obter o token de push:", e);
        alert('Não foi possível registrar para notificações push.');
    }


    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}