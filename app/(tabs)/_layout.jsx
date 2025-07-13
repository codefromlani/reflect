import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EntriesProvider } from '../../contexts/EntriesContext';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <EntriesProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#7C83FD', 
          tabBarInactiveTintColor: '#6B7280', 
          headerTitleStyle: {
            fontWeight: "600",
          },
          headerShadowVisible: false,
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB', 
            paddingTop: 5,
            paddingBottom: insets.bottom,
            height: 60 + insets.bottom,
            backgroundColor: '#F5F7FB', 
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </EntriesProvider>
  );
}
