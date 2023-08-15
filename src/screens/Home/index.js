import { Text, View, Image, ScrollView } from "react-native";

import React from "react";
import { Badge } from "@rneui/themed";
import styles from "./index.style";
import { useTheme } from "../../theme/ThemeProvider";
import { logo } from "../../constants.js";
import CustomButton from "../../components/CustomButton/index.js";

/**
 * Renders the Home Screen component.
 *
 * @return {JSX.Element} The rendered Home Screen component.
 */
const HomeScreen = ({ navigation }) => {
  const theme = useTheme();

  const onPress = (page) => {
    navigation.navigate(page);
  };

  return (
    <ScrollView
      contentContainerStyle={{ margin: 8, top: 24, marginBottom: 48 }}
    >
      <View style={styles.imageContainer(theme)}>
        <Image style={styles.image(theme)} source={logo} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CustomButton
          label="Devise Hist"
          theme={theme}
          onPress={() => onPress("DeviseHistory")}
        />
        <CustomButton
          label="IMC Hist"
          theme={theme}
          onPress={() => onPress("IMCHistory")}
        />
        <CustomButton
          label="User Hist"
          theme={theme}
          onPress={() => onPress("HistoryDevise")}
        />
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
    </ScrollView>
  );
};

export default HomeScreen;
