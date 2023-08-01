import { Text, View, Image } from "react-native";

import React from "react";
import { Badge } from "@rneui/themed";
import styles from "./index.style";
import { useTheme } from "../../theme/ThemeProvider";
import { logo } from "../../constants.js";

/**
 * Renders the Home Screen component.
 *
 * @return {JSX.Element} The rendered Home Screen component.
 */
const HomeScreen = () => {
  const theme = useTheme();

  return (
    <View style={styles.container(theme)}>
      <View style={styles.imageContainer(theme)}>
        <Image style={styles.image(theme)} source={logo} />
      </View>
      <Text> Cegefos est une société de formation en ligne. </Text>
      <View style={styles.description(theme)}>
        <Text>
          <Badge status="success" value="" /> Raison social : Cegefos
        </Text>
        <Text>
          <Badge value="" status="success" /> Type de structure : SARL
        </Text>
        <Text>
          <Badge value="" status="success" />
          Adresse : 28 Rue Xavier Bichat,72000 Le Mans, France
        </Text>

        <Text>
          <Badge value="" status="success" />
          Téléphone : +33 2 43 52 36 45
        </Text>
      </View>
      <Text>
        {" "}
        Mission: la société est spécialisée dans les formations numériques en
        ligne; Elle assure un contenu pédagogique et varié ainsi qu'une
        assistance aux apprenants.{" "}
      </Text>
    </View>
  );
};

export default HomeScreen;
