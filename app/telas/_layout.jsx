import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#0D47A1',
            tabBarInactiveTintColor: 'gray',
        }}>
            <Tabs.Screen
                name="Feed/index"
                options={{
                    title: 'Feed',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="Faq/index"
                options={{
                    title: 'FAQ',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="question-circle" color={color} />,
                }}
            />
            <Tabs.Screen
                name="Perfil/index"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color }) => <FontAwesome size={25} name="user-circle" color={color} />,
                }}
            />
        </Tabs>
    );
}