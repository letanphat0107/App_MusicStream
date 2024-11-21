import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./AppNavigator";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider, UserContext } from "./screens/UserContext";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
