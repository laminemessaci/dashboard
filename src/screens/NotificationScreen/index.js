import { StyleSheet, Text, View } from "react-native";
import React from "react";

import styles from "./index.style.js";
import { useTheme } from "../../theme/ThemeProvider";

const NotificationScreen = () => {
  const theme = useTheme();
  return (
    <View style={styles.container(theme)}>
      <Text>NotificationScreen</Text>
    </View>
  );
};

export default NotificationScreen;
