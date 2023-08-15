import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { Divider } from "@rneui/themed";
import { useTheme } from "../../theme/ThemeProvider";
import { getDevises, getImcs } from "../../api/index.js";

const IMCHistory = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [history, setHistory] = useState([]);

  const loadData = async () => {
    const result = [];
    const data = await getImcs();
    await data.forEach((query) => result.push({ imcs: query.data() }));
    const resultData = result.map((doc) => {
      return doc.imcs;
    });

    setHistory(resultData);
  };

  useEffect(() => {
    loadData();
  }, [

  ]);


  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 24,
          justifyContent: "flex-start",
          marginVertical: 24,
        }}
      >
        <TouchableOpacity style={{ alignItems: "center" }}>
          <AntDesign
            style={{ marginRight: 55 }}
            name="back"
            size={32}
            color={theme.colors.primaryDark}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Historique des IMC: </Text>
      </View>
      <View style={{ bottom: 24, top: 12 }}>
        <FlatList
          data={history}
          keyExtractor={(item, id) => id}
          contentContainerStyle={{
            marginBottom: 68,
          }}
          renderItem={({ item }) => (
            <>
              <View
                style={[
                  styles.row,
                  {
                    backgroundColor: theme.colors.primaryDark,
                    padding: 4,
                    marginVertical: 4,
                  },
                ]}
              >
                <Text style={styles.cell}>{"Nom"}</Text>
                <Text style={styles.cell}>{"taille"}</Text>
                <Text style={styles.cell}>{"poids"}</Text>
                <Text style={styles.cell}>{"IMC"}</Text>
                <Text style={styles.cell}>{"Date"}</Text>
              </View>
              <View
                style={[
                  styles.row,
                  { backgroundColor: theme.colors.darkGrey, padding: 4 },
                ]}
              >
                <Text style={styles.cell}>{item.name}</Text>
                <Text style={styles.cell}>{item.height}</Text>
                <Text style={styles.cell}>{item.weight}</Text>
                <Text style={styles.cell}>{item.bmi}</Text>
                <Text style={styles.cell}>{item.updatedAt}</Text>
              </View>
              <Divider width={12} color={theme?.colors?.primaryLight} />
            </>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    color: "white",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingVertical: 8,
  },
  cell: {
    color: "white",
    flex: 1,
    borderWidth: 1,
    padding: 8,
    alignItems: "center",
  },
});

export default IMCHistory;
