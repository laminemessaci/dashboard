import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabsNavigator from "./BottomTabsNavigator.js";
import { NewPostScreen } from "@screens";
import { RegistrationScreen } from "../screens/index.js";
import LoginScreen from "../LoginScreen/index.js";
import HistoryDevise from "../screens/HistoryDeviseScreen/index.js";

const Stack = createStackNavigator();
//NewPostScreen

/**
 * Initializes and returns the AppStackNavigator component.
 *
 * @return {ReactNode} The rendered AppStackNavigator component.
 */
export default function AppStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        headerShown={true}
        options={{
          headerLeft: ({ color }) => (
            <Ionicons name="menu" color="black" size={26} />
          ),
        }}
      />
      <Stack.Screen
        name="Home"
        component={BottomTabsNavigator}
        headerShown={true}
        options={{
          headerLeft: ({ color }) => (
            <Ionicons name="menu" color="black" size={26} />
          ),
        }}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPostScreen}
        headerShown={true}
        options={{
          headerLeft: ({ color }) => (
            <Ionicons name="menu" color="black" size={26} />
          ),
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegistrationScreen}
        headerShown={true}
        options={{
          headerLeft: ({ color }) => (
            <Ionicons name="menu" color="black" size={26} />
          ),
        }}
      />
      <Stack.Screen
        name="DeviseHistory"
        component={HistoryDevise}
        headerShown={true}
        options={{
          headerLeft: ({ color }) => (
            <Ionicons name="menu" color="black" size={26} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
