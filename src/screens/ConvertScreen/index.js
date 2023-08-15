import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

import { useTheme } from "../../theme/ThemeProvider";
import styles from "./index.style.js";

import { TouchableHighlight } from "react-native";
import { mockedData } from "../../mockData.js";
import { timestamp } from "../../utils/formatter";
import { generateUniqueId } from "../../utils/generatePosts.js";
import { createDevise } from "../../api";

const ConvertScreen = () => {
  const [eur, setEuro] = useState("");
  const [dollar, setDollar] = useState("");
  const [yuan, setYuan] = useState("");

  const [data, setData] = useState({});

  const [inputValue, setInputValue] = useState();
  const [amount, setAmount] = useState();

  const [currency, setCurrency] = useState("null");

  const isInputValue = eur != "" || dollar != "" || yuan != "";

  const theme = useTheme();

  /**
   * Converts the amount to other currencies based on the selected currency.
   *
   * @param {string} currency - The selected currency.
   * @param {number} amount - The amount to be converted.
   */
  const convertToOtherCurrencies = () => {
    let result = {};
    const { rates } = data;
    const parsedAmount = parseInt(amount);

    switch (currency) {
      case "EUR":
        setEuro(parsedAmount);
        setAmount(parsedAmount);
        setCurrency("EUR");
        setYuan(parsedAmount * rates.CNY);
        setDollar(parsedAmount * rates.USD);
        return (result = {
          dollar: parsedAmount * rates.USD,
          yuan: parsedAmount * rates.CNY,
        });
        break;
      case "USD":
        setDollar(parsedAmount);
        setAmount(parsedAmount);
        setYuan(parsedAmount * rates.CNY);
        setEuro(parsedAmount * rates.EUR);
        return (result = {
          euro: parsedAmount * rates.EUR,
          yuan: parsedAmount * rates.CNY,
        });
        break;
      case "CNY":
        setYuan(parsedAmount);
        setAmount(parsedAmount);
        setEuro(parsedAmount * rates.EUR);
        setDollar(parsedAmount * rates.USD);
        return (result = {
          euro: parsedAmount * rates.EUR,
          dollar: parsedAmount * rates.USD,
        });
        break;
    }
  };

  const handleChangeEuro = (text) => {
    // convertToOtherCurrencies(text, "eur");
    setEuro(text);
    setInputValue("eur");
    setCurrency("EUR");
    setAmount(parseInt(text));
  };

  const handleChangeDollar = (text) => {
    // convertToOtherCurrencies(text, "usd");
    setDollar(text);
    setInputValue("usd");
    setCurrency("USD");
    setAmount(parseInt(text));
  };

  const handleChangeYuan = (text) => {
    //  convertToOtherCurrencies(text, "yuan");
    setYuan(text);
    setInputValue("yuan");
    setCurrency("CNY");
    setAmount(parseInt(text));
  };

  useEffect(() => {
    console.log(mockedData[1]);
    if (currency === "EUR") {
      setData(mockedData[1]);
    }
    if (currency === "USD") {
      setData(mockedData[2]);
    }
    if (currency === "CNY") {
      setData(mockedData[0]);
    }
  }, [data, currency, amount]);

  /**
   * Handles the form submission.
   *
   * @return {undefined} No return value.
   */
  const handleSubmit = () => {
    const { rates } = data;
    const parsedAmount = parseInt(amount);
    const result = convertToOtherCurrencies();
    createDevise({
      id: generateUniqueId(),
      amount: amount,
      currency: currency,
      result,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  };

  /**
   * Resets the state values for BMI calculation.
   *
   * @return {undefined} No return value.
   */
  const handleReset = () => {
    setEuro("");
    setDollar("");
    setYuan("");
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
          value={`${dollar}`}
          style={styles.input(theme)}
          underlineColorAndroid={theme.colors.primary}
          placeholder="10 $"
          autoCapitalize="none"
          onChangeText={handleChangeDollar}
        />

        <Text style={styles.label(theme)}>Somme en € </Text>
        <TextInput
          keyboardType="numeric"
          value={`${eur}`}
          style={styles.input(theme)}
          underlineColorAndroid={theme.colors.primary}
          placeholder="10 €"
          autoCapitalize="none"
          onChangeText={handleChangeEuro}
        />

        <Text style={styles.label(theme)}>Somme en ¥</Text>
        <TextInput
          keyboardType="numeric"
          value={`${yuan}`}
          style={styles.input(theme)}
          underlineColorAndroid={theme.colors.primary}
          placeholder="10 ¥"
          autoCapitalize="none"
          onChangeText={handleChangeYuan}
        />
      </View>

      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <TouchableHighlight
          style={styles.submitButton(theme, isInputValue)}
          disabled={!isInputValue}
          onPress={handleSubmit}
          title="Convert"
        >
          <Text style={styles.submitButtonText(theme, isInputValue)}>
            Convert
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.submitButton(theme, isInputValue)}
          disabled={!isInputValue}
          onPress={handleReset}
          title="Convert"
        >
          <Text style={styles.submitButtonText(theme, isInputValue)}>
            reset
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

export default ConvertScreen;
