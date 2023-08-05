import { TextInput, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../theme/ThemeProvider";
import styles from "./index.style.js";

const ConvertiseurDevise = ({dollar, euro, yuan}) => {

  const theme = useTheme();

    const handleChange = (setState) => (value) => {
      setState(value);
      setInputValue(value);
    };

  return (
    <View style={styles.container(theme)}>
      <Text style={styles.label(theme)}>Somme en $ </Text>
      <TextInput
        keyboardType="numeric"
        value={dollar}
        style={styles.input(theme)}
        underlineColorAndroid={theme.colors.primary}
        placeholder="10 $"
        autoCapitalize="none"
        onChangeText={handleChange}
      />

      <Text style={styles.label(theme)}>Somme en € </Text>
      <TextInput
        keyboardType="numeric"
        value={euro}
        style={styles.input(theme)}
        underlineColorAndroid={theme.colors.primary}
        placeholder="10 €"
        autoCapitalize="none"
        onChangeText={handleChange}
      />

      <Text style={styles.label(theme)}>Somme en ¥</Text>
      <TextInput
        keyboardType="numeric"
        value={yuan}
        style={styles.input(theme)}
        underlineColorAndroid={theme.colors.primary}
        placeholder="10 ¥"
        autoCapitalize="none"
        onChangeText={handleChange}
      />
    </View>
  );
};

export default ConvertiseurDevise;
