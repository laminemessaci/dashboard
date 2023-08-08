import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, StatusBar } from "react-native";

import { Provider } from "react-redux";

import { SafeAreaProvider } from "react-native-safe-area-context";
import AppStackNavigator from "./src/navigation/StackNavigator.js";
import { store } from "./src/redux/store.js";

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Provider store={store}>
        <NavigationContainer>
          <AppStackNavigator />
        </NavigationContainer>
      </Provider>
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
