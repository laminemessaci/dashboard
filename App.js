import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import AppStackNavigator from "./src/navigation/StackNavigator.js";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <AppStackNavigator/>
      
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
  },
});
