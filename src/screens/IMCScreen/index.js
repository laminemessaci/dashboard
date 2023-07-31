import React, { useEffect, useState } from "react";
import {
  Button,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CalculIMC from "../../components/CalculIMC";
import { useTheme } from "../../theme/ThemeProvider";

import styles from "./index.style.js";

const IMCScreen = () => {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(false);
  const [submitted, setSubmited] = useState(false);
  const allForm = name != "" && height != "" && weight != "";
  console.log("all form: ", allForm);

  useEffect(() => {
    if (name && height && weight) {
      setBmi(true);
    } else {
      setBmi(false);
    }
  }, [height, weight, name, bmi, submitted]);

  const handleChange = (setState) => (event) => {
    setState(event);
  };

  const handleSubmit = () => {
    if (name != "" && height != "" && weight != "") {
      setBmi(true);
      setSubmited(true);
    } else {
      alert("Veuillez remplir tous les champs");
    }
  };
  const handleReset = () => {
    setBmi(false);
    setSubmited(false);
    setName("");
    setHeight("");
    setWeight("");
  };

  const theme = useTheme();
  return (
    <>
      <View>
        <Text style={styles.title(theme)}>BMI Calculator</Text>
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
          <Pressable style={styles.submitButton(theme, bmi)} onPress={handleReset}>
            <Text style={styles.submitButtonText(theme)}>Réinitialiser</Text>
          </Pressable>
        )}
      </View>
      {submitted && allForm ? (
        <CalculIMC name={name} height={height} weight={weight} />
      ) : null}
    </>
  );
};

export default IMCScreen;
