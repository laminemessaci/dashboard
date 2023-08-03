import { Text, View, ActivityIndicator } from "react-native";
import { Image } from "@rneui/themed";
import React from "react";

import { useTheme } from "../../theme/ThemeProvider";
import { maigre, normal, obese, surpoids } from "../../constants.js";

import styles from "./index.style.js";

/**
 * Calculate the IMC and display the category based on the calculated IMC.
 *
 * @param {object} params - The parameters needed for the calculation.
 *   @param {string} params.name - The name of the person.
 *   @param {number} params.height - The height of the person in centimeters.
 *   @param {number} params.weight - The weight of the person in kilograms.
 * @return {JSX.Element} - The JSX element containing the IMC and category information.
 */
const CalculIMC = ({ name, height, weight }) => {
  const theme = useTheme();
  // Calculate the IMC
  const IMC = weight / (height / 100) ** 2;

  // Define the IMC category based on the calculated IMC
  let category, imageSource, message;
  if (IMC < 18.5) {
    category = "Maigre";
    imageSource = maigre;
    message = "Vous ête maigre";
  } else if (IMC < 25) {
    category = "Normal";
    imageSource = normal;
    message = "Vous avez une corpulence normale";
  } else if (IMC < 30) {
    category = "Surpoids";
    imageSource = surpoids;
    message = "Vous ête en surpoids!";
  } else {
    category = "Obese";
    imageSource = obese;
    message = "vous etes obèse!";
  }

  // Return the IMC and category
  return (
    <View style={styles.container(theme)}>
      <Text>Bonjour {name}</Text>
      <Text>Votre IMC est : {IMC.toFixed(2)}</Text>
      <Text>{message}</Text>
      <Image
        source={imageSource}
        style={styles.image(theme)}
        onLoad={() => <ActivityIndicator color={theme.colors.primaryDark} size={"small"} />}
      />
    </View>
  );
};

export default CalculIMC;
