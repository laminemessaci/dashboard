import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabsNavigator from "./BottomTabsNavigator.js";

const Stack = createStackNavigator();

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
        name="Home"
        component={BottomTabsNavigator}
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
