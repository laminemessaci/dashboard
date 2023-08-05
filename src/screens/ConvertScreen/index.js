import { ScrollView, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";

import styles from "./index.style.js";
import { useTheme } from "../../theme/ThemeProvider";

import { API_CURRENCY_BASE, API_CURRENCY_CONVERT } from "../../utils/urls";
import { formatUrlWithParams } from "../../utils/formatUrl";
import useApi from "../../hooks/useApi";
import { API_KEY_CURRENCY } from "@env";
import { TouchableHighlight } from "react-native";
import { mockedData } from "../../mockData.js";

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

  // const baseEurUrl = formatUrlWithParams(API_CURRENCY_BASE, {
  //   currency: "EUR",
  //   apikey: API_KEY_CURRENCY,
  // });

  // const { data: dataFromEur } = useApi(baseEurUrl);
  // const baseUsdUrl = formatUrlWithParams(API_CURRENCY_BASE, {
  //   currency: "USD",
  //   apikey: API_KEY_CURRENCY,
  // });

  // const { data: dataFromUsd } = useApi(baseUsdUrl);
  // const baseCnyUrl = formatUrlWithParams(API_CURRENCY_BASE, {
  //   currency: "CNY",
  //   apikey: API_KEY_CURRENCY,
  // });

  // const { data: dataFromCny } = useApi(baseCnyUrl);

  const convertToOtherCurrencies = () => {
    switch (currency) {
      case "EUR":
        setEuro(amount);
        setAmount(parseInt(amount));
        setCurrency("EUR");
        setYuan(parseInt(amount) * data?.rates?.CNY);
        setDollar(parseInt(amount) * data?.rates?.USD);
        break; //rates.AFN
      case "USD":
        setDollar(amount);
        setAmount(parseInt(amount));
        setYuan(parseInt(amount) * data?.rates?.CNY);
        setEuro(parseInt(amount) * data?.rates?.EUR);
        break;
      case "CNY":
        setYuan(amount);
        setAmount(parseInt(amount));
        setEuro(parseInt(amount) * data?.rates?.EUR);
        setDollar(parseInt(amount) * data?.rates?.USD);
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
  }, [data, currency]);

  // if (loading) {
  //   return (
  //     <ActivityIndicator
  //       style={styles.centered()}
  //       size={"large"}
  //       color={theme.colors.primaryDark}
  //     />
  //   );
  // }

  /**
   * Handles the form submission.
   *
   * @return {undefined} No return value.
   */
  const handleSubmit = () => {
    convertToOtherCurrencies();
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
    // setSubmitted(false);
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

//  const eurToUsdUrl = formatUrlWithParams(API_CURRENCY_CONVERT, {
//     toCurrency: "EUR",
//     fromCurrency: "USD",
//     amount: amount,
//     apikey: API_KEY_CURRENCY,
//   });

//   const eurToCnyUrl = formatUrlWithParams(API_CURRENCY_CONVERT, {
//     toCurrency: "EUR",
//     fromCurrency: "CNY",
//     amount: amount,
//     apikey: API_KEY_CURRENCY,
//   });

//   const { data: fromEurToUsdData } = useApi(eurToUsdUrl);
//   const { data: fromEurToChyUrlData } = useApi(eurToCnyUrl);

//   // const { data: fromEurToUsdData } = useApi(url);

//   const usdToEurUrl = formatUrlWithParams(API_CURRENCY_CONVERT, {
//     toCurrency: "USD",
//     fromCurrency: "EUR",
//     amount: amount,
//     apikey: API_KEY_CURRENCY,
//   });

//   const usdToCnyUrl = formatUrlWithParams(API_CURRENCY_CONVERT, {
//     toCurrency: "USD",
//     fromCurrency: "CNY",
//     amount: amount,
//     apikey: API_KEY_CURRENCY,
//   });
//   // const { data: fromUsdToEuroData } = useApi(url2);
//   const { data: fromUsdToEurData } = useApi(usdToEurUrl);
//   const { data: fromUsdToCnyData } = useApi(usdToCnyUrl);

//   const cnyToEurUrl = formatUrlWithParams(API_CURRENCY_CONVERT, {
//     toCurrency: "CNY",
//     fromCurrency: "EUR",
//     amount: amount,
//     apikey: API_KEY_CURRENCY,
//   });

//   const cnyToUsdUrl = formatUrlWithParams(API_CURRENCY_CONVERT, {
//     toCurrency: "CNY",
//     fromCurrency: "USD",
//     amount: amount,
//     apikey: API_KEY_CURRENCY,
//   });

//   const { data: fromCnyToEurData } = useApi(cnyToEurUrl);
//   const { data: fromCnyToUsdData } = useApi(usdToCnyUrl);

//   // const { data: fromCnyToEuroData } = useApi(url3);

//   console.log("dollar, eur, yuan", dollar, eur, yuan);
