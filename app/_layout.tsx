import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="telas/Login/index" options={{}} />
            <Stack.Screen name="telas/InspecoesOperador/index" options={{}} />
            <Stack.Screen name="telas/UnidadesCadastradas/index" options={{}} />
            <Stack.Screen name="telas/InspecaoChecklist/index" options={{}} />
        </Stack>
    );
}
