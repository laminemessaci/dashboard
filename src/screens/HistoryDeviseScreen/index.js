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
import { getDevises } from "../../api/index.js";

const HistoryDevise = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const numbers = [0, 1, 2];

  const [history, setHistory] = useState([]);

  const loadData = async () => {
    const result = [];
    const data = await getDevises();
    await data.forEach((query) => result.push({ devises: query.data() }));
    const resultData = result.map((doc) => {
      return doc.devises;
    });

    setHistory(resultData);
  };

  useEffect(() => {
    // loadData();
  }, []);

  // const tableData = history.map((item, index) => {
  //   return [
  //     [
  //       <Text style={{ fontWeight: "bold" }}>{"Devise"}</Text>,
  //       <Text style={{ fontWeight: "bold" }}>{"montant"}</Text>,
  //       <Text style={{ fontWeight: "bold" }}>{"Date"}</Text>,
  //     ],
  //     [
  //       <Text style={{ fontWeight: "bold" }}>{item.currency}</Text>,
  //       <Text
  //         style={{
  //           fontWeight: "bold",
  //           backgroundColor: theme.colors.primaryLight,
  //         }}
  //       >
  //         {item.amount}
  //       </Text>,
  //       <Text
  //         style={{
  //           fontWeight: "bold",
  //           backgroundColor: theme.colors.primaryLight,
  //         }}
  //       >
  //         {item.createdAt}
  //       </Text>,
  //     ],
  //     [
  //       <Text style={{ fontWeight: "bold" }}>
  //         {Object.keys(item.result).slice(0, 1) +
  //           "-" +
  //           Object.keys(item.result).slice(1)}
  //       </Text>,
  //       Object.values(item.result).map((obj) => (
  //         <Text
  //           style={{
  //             fontWeight: "bold",
  //             backgroundColor: theme.colors.primaryLight,
  //           }}
  //         >
  //           {obj.toFixed(2) + " - "}
  //         </Text>
  //       )),
  //       <Text
  //         style={{
  //           fontWeight: "bold",
  //           backgroundColor: theme.colors.primaryLight,
  //         }}
  //       >
  //         {item.createdAt}
  //       </Text>,
  //     ],
  //   ];
  // });

  //console.log(tableData);

  const renderItem = (item) => {
    return (
      <View style={styles.container}>
        {tableData?.map((rowData, rowIndex) => {
          // console.log(rowData);
          return (
            <View key={rowIndex} style={styles.row}>
              {rowData[rowIndex]?.map((cellData, cellIndex) => {
                console.log(cellData);
                return (
                  <View key={cellIndex} style={styles.cell}>
                    <Text>{cellData}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}

        <Divider width={5} color={theme?.colors?.primary} />
      </View>
    );
  };

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
        <Text style={styles.screenTitle}>Historique des conversions: </Text>
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
                <Text style={styles.cell}>{"Amount"}</Text>
                <Text style={styles.cell}>{"Currency"}</Text>
                <Text style={styles.cell}>{"Result 1"}</Text>
                <Text style={styles.cell}>{"Result 2"}</Text>

                <Text style={styles.cell}>{"Date"}</Text>
              </View>
              <View
                style={[
                  styles.row,
                  { backgroundColor: theme.colors.darkGrey, padding: 4 },
                ]}
              >
                <Text style={styles.cell}>{item.amount}</Text>
                <Text style={styles.cell}>{item.currency}</Text>

                {item.currency == "EUR" && (
                  <>
                    <Text style={styles.cell}>
                      Dollar: {item.result.dollar.toFixed(2)}
                    </Text>
                    <Text style={styles.cell}>
                      Yuan: {item.result.yuan.toFixed(2)}
                    </Text>
                  </>
                )}
                {item.currency == "USD" && (
                  <>
                    <Text style={styles.cell}>
                      Yuan: {item.result.yuan.toFixed(2)}
                    </Text>
                    <Text style={styles.cell}>
                      Euro: {item.result.euro.toFixed(2)}
                    </Text>
                  </>
                )}
                {item.currency == "CNY" && (
                  <>
                    <Text style={styles.cell}>
                      Dollar: {item.result.dollar.toFixed(2)}
                    </Text>
                    <Text style={styles.cell}>
                      Euro: {item.result.euro.toFixed(2)}
                    </Text>
                  </>
                )}

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

export default HistoryDevise;
