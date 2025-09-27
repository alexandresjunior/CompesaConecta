import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="telas/Login/index" />
      <Stack.Screen name="telas/Comentarios/index" />
      <Stack.Screen name="telas/NovaPublicacao/index" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}