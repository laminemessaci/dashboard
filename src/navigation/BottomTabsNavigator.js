import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { HomeScreen, SettingScreen, ConvertScreen, IMCScreen } from "@screens";
import { useTheme } from "../theme/ThemeProvider";

const Tab = createMaterialBottomTabNavigator();

/**
 * Render the bottom tabs navigator.
 *
 * @param {object} props - The props for the component.
 * @return {ReactNode} The rendered bottom tabs navigator.
 */
const BottomTabsNavigator = (props) => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={theme.colors.white}
      inactiveColor={theme.colors.darkGrey}
      barStyle={{ backgroundColor: theme.colors.primaryDark }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={IMCScreen}
        options={{
          tabBarLabel: "IMC",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="human-male-height"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Conversion"
        component={ConvertScreen}
        options={{
          tabBarLabel: "convert",
          tabBarIcon: ({ color }) => (
            <Fontisto name="euro" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-settings" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
