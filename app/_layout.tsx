import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="telas/Login/index" />
      <Stack.Screen name="telas/Feed/index" />
    </Stack>
  );
}
