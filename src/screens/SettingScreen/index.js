import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import styles from "./index.style.js";

const SettingScreen = () => {
  const theme = useTheme();
  return (
    <View style={styles.container(theme)}>
      <Text>SettingScreen</Text>
    </View>
  );
};

export default SettingScreen;
