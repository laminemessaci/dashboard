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
  let category, imageSource;
  if (IMC < 18.5) {
    category = "Maigre";
    imageSource = maigre;
  } else if (IMC < 25) {
    category = "Normal";
    imageSource = normal;
  } else if (IMC < 30) {
    category = "Surpoids";
    imageSource = surpoids;
  } else {
    category = "Obese";
    imageSource = obese;
  }

  // Return the IMC and category
  return (
    <View style={styles.container(theme)}>
      <Text>Nom: {name}</Text>
      <Text>Poids : {weight}</Text>
      <Text>Taille: {height}</Text>
      <Text>IMC: {IMC.toFixed(2)}</Text>
      <Text>Category: {category}</Text>
      <Image source={imageSource} style={styles.image(theme)} />
    </View>
  );
};

export default CalculIMC;
