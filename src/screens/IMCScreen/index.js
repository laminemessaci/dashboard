import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import CalculIMC from "../../components/CalculIMC";
import { useTheme } from "../../theme/ThemeProvider";

import styles from "./index.style.js";
import { createIMC } from "../../firebase/index.js";
import { generateUniqueId } from "../../utils/generatePosts.js";

/**
 * Generates the function comment for the given function body.
 *
 * @param {function} setState - The state setter function.
 * @param {Event} event - The event object.
 * @return {undefined} This function does not return a value.
 */
const IMCScreen = () => {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const allForm = name !== "" && height !== "" && weight !== "";

  const theme = useTheme();

  useEffect(() => {
    setBmi(name !== "" && height !== "" && weight !== "");
  }, [name, height, weight]);

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
    if (name !== "" && height !== "" && weight !== "") {
      setBmi(true);
      setSubmitted(true);
      createIMC({
        id: generateUniqueId(),
        height: height,
        weight: weight,
        name: name,
        bmi: weight / (height / 100) ** 2,
      });
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
    setName("");
    setHeight("");
    setWeight("");
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.title(theme)}>IMC Calculator</Text>
      </View>
      <View style={styles.container(theme)}>
        <Text style={styles.label(theme)}>Enter Your Name </Text>
        <TextInput
          value={name}
          style={styles.input(theme)}
          underlineColorAndroid={theme.colors.primary}
          placeholder="Votre Nom"
          autoCapitalize="none"
          onChangeText={handleChange(setName)}
        />

        <Text style={styles.label(theme)}>Votre Poid </Text>
        <TextInput
          keyboardType="numeric"
          value={weight}
          style={styles.input(theme)}
          underlineColorAndroid={theme.colors.primary}
          placeholder="Poid (kg)"
          autoCapitalize="none"
          onChangeText={handleChange(setWeight)}
        />

        <Text style={styles.label(theme)}>Votre taille</Text>
        <TextInput
          keyboardType="numeric"
          value={height}
          style={styles.input(theme)}
          underlineColorAndroid={theme.colors.primary}
          placeholder="Taille (Cm)"
          autoCapitalize="none"
          onChangeText={handleChange(setHeight)}
        />
        {!submitted ? (
          <Pressable
            style={styles.submitButton(theme, bmi)}
            disabled={!bmi}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText(theme)}>Calculer</Text>
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
      {submitted && allForm ? (
        <CalculIMC name={name} height={height} weight={weight} />
      ) : null}
    </ScrollView>
  );
};

export default IMCScreen;
