import { ScrollView, Text, View, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

import styles from "./index.style.js";
import { useTheme } from "../../theme/ThemeProvider";

const ConvertScreen = () => {
  const [euro, setEuro] = useState("");
  const [dollard, setDollard] = useState("");
  const [yoan, setYoan] = useState("");
  const [bmi, setBmi] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const allForm = euro !== "" && dollard !== "" && yoan !== "";

  const theme = useTheme();

  useEffect(() => {
    setBmi(euro !== "" && dollard !== "" && yoan !== "");
  }, [euro, dollard, yoan]);

  /**
   * A function that handles a change event and updates the state.
   *
   * @param {function} setState - The state setter function.
   * @param {Event} event - The event object.
   * @return {undefined} This function does not return a value.
   */
  const handleChange = (setState) => (event) => {
    setState(event);
  };

  /**
   * Handles the form submission.
   *
   * @return {undefined} No return value.
   */
  const handleSubmit = () => {
    if (euro !== "" || dollard !== "" || yoan !== "") {
      setBmi(true);
      setSubmitted(true);
    } else {
      alert("Veuillez remplir tous les champs");
    }
  };

  /**
   * Resets the state values for BMI calculation.
   *
   * @return {undefined} No return value.
   */
  const handleReset = () => {
    setBmi(false);
    setSubmitted(false);
    setEuro("");
    setDollard("");
    setYoan("");
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.title(theme)}>Convertisseur de devise </Text>
      </View>
      <View style={styles.container(theme)}>
        <Text style={styles.label(theme)}>Somme en $ </Text>
        <TextInput
          keyboardType="numeric"
          value={euro}
          style={styles.input(theme)}
          underlineColorAndroid={theme.colors.primary}
          placeholder="10 $"
          autoCapitalize="none"
          onChangeText={handleChange(setEuro)}
        />

        <Text style={styles.label(theme)}>Somme en € </Text>
        <TextInput
          keyboardType="numeric"
          value={dollard}
          style={styles.input(theme)}
          underlineColorAndroid={theme.colors.primary}
          placeholder="10 €"
          autoCapitalize="none"
          onChangeText={handleChange(setDollard)}
        />

        <Text style={styles.label(theme)}>Somme en £</Text>
        <TextInput
          keyboardType="numeric"
          value={yoan}
          style={styles.input(theme)}
          underlineColorAndroid={theme.colors.primary}
          placeholder="10 £"
          autoCapitalize="none"
          onChangeText={handleChange(setYoan)}
        />
        {!submitted ? (
          <Pressable
            style={styles.submitButton(theme, bmi)}
            disabled={!bmi}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText(theme)}>Convert</Text>
          </Pressable>
        ) : (
          <Pressable
            style={styles.submitButton(theme, bmi)}
            onPress={handleReset}
          >
            <Text style={styles.submitButtonText(theme)}>Réinitialiser</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};

export default ConvertScreen;
