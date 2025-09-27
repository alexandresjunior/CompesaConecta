import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="telas/Login/index" />
      <Stack.Screen name="telas/Comentarios/index" />
      <Stack.Screen name="telas/_layout" />
    </Stack>
  );
}