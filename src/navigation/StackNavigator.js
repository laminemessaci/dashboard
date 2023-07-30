import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "@screens";
import BottomTabsNavigator from "./BottomTabsNavigator.js";

const Stack = createStackNavigator();

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
            <Ionicons name="mmenu" color="black" size={26} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
