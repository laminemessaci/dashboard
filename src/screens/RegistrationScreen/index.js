import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";

import { Formik } from "formik";
import * as yup from "yup";

import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
  Zocial,
} from "@expo/vector-icons";

import FacebookSVG from "../../assets/images/misc/facebook.js";
import RegistrationSVG from "../../assets/images/misc/registration.js";
import TwitterSVG from "../../assets/images/misc/twitter.js";
import GoogleSVG from "../../assets/images/misc/googleSvg.js";
import { useTheme } from "../../theme/ThemeProvider";
import styles from "./index.style.js";

const RegistrationScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDate, setBirthDate] = useState(new Date("2012-01-01"));
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [date, setDate] = useState(new Date("2012-01-01"));
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState("Date de naissance");
  const [show, setShow] = useState(false);

  const theme = useTheme();

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Le prénom est requis"),
    lastName: yup.string().required("Le nom est requis"),
    email: yup.string().email("Email invalide").required("L'email est requis"),
    password: yup
      .string()
      .min(5, "Le mot de passe doit avoir au moins 5 caractères")
      .required("Le mot de passe est requis"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe ne correspondent pas"
      )
      .required("Confirme !"),
    birthDate: yup
      .date()
      .required("La date de naissance est requise")
      .typeError("La date de naissance doit être une date"),
    address: yup.string().required("L'adresse est requise"),
    postalCode: yup.string().required("Le code postal est requis"),
    country: yup
      .string()
      .required("Le pays est requis")
      .matches(/^[a-zA-Z ]*$/, "Le pays doit contenir uniquement des lettres"),
  });

  useEffect(() => {
    setOpen();
  }, [validationSchema]);
  const handleRegistration = (values, actions) => {
    // Logic to handle registration
    console.log(actions);
    actions.resetForm();
    setBirthDate("Date de naissance");
    setDobLabel("Date de naissance");
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate || date;
      let tempDate = new Date(currentDate);
      let fDate =
        tempDate.getDate() +
        "/" +
        (tempDate.getMonth() + 1) +
        "/" +
        tempDate.getFullYear();
      setDobLabel(fDate);
      setDate(currentDate);
      setShow(false);
    }
    setShow(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        {/* <View style={{ alignItems: "center" }}>
          <RegistrationSVG
            height={300}
            width={300}
            style={{ transform: [{ rotate: "-5deg" }]}}
          />
        </View> */}

        <Text style={styles.mainContainer(theme)}>Register</Text>

        <View style={styles.socialContainer(theme)}>
          <TouchableOpacity onPress={() => {}} style={styles.imageSvg(theme)}>
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.imageSvg(theme)}>
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.imageSvg(theme)}>
            <TwitterSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <Text style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
          Or, register with email ...
        </Text>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",

            password: "",
            confirmPassword: "",
            birthDate: new Date(),
            address: "",
            country: "",
            postalCode: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegistration}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View>
              <View style={styles.inputContainer(theme)}>
                <Ionicons
                  name="person"
                  size={20}
                  color={errors.lastName ? "red" : "#666"}
                  style={{ marginRight: 5 }}
                />

                <TextInput
                  name="firstName"
                  placeholder="Nom"
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                />
                {errors.firstName && (
                  <Text style={styles.error(theme)}>{errors.firstName}</Text>
                )}
              </View>
              <View style={styles.inputContainer(theme)}>
                <Ionicons
                  name="person"
                  size={20}
                  color={errors.firstName ? "red" : "#666"}
                  style={{ marginRight: 5 }}
                />

                <TextInput
                  placeholder="Prénom"
                  name="lastName"
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                />

                {errors.lastName && (
                  <Text style={styles.error(theme)}>{errors.lastName}</Text>
                )}
              </View>
              <View style={styles.inputContainer(theme)}>
                <Ionicons
                  name="mail"
                  size={20}
                  color={errors.email ? "red" : "#666"}
                  style={{ marginRight: 5 }}
                />

                <TextInput
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  inputMode="email"
                  keyboardType="email-address"
                />
                {errors.email && (
                  <Text style={styles.error(theme)}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.inputContainer(theme)}>
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color={errors.password ? "red" : "#666"}
                  style={{ marginRight: 5 }}
                />
                <TextInput
                  style={{
                    ...styles.input,
                    position: "absolute",
                    marginLeft: 32,
                  }}
                  name="password"
                  placeholder="Mot de passe"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  secureTextEntry
                />
                {errors.email && (
                  <Text style={styles.error(theme)}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.inputContainer(theme)}>
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color={errors.confirmPassword ? "red" : "#666"}
                  style={{ marginRight: 5 }}
                />

                <TextInput
                  style={{
                    ...styles.input,
                    position: "absolute",
                    marginLeft: 32,
                  }}
                  name="confirmPassword"
                  placeholder="Confirmer le mot de passe"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  secureTextEntry
                />
                {errors.confirmPassword && (
                  <Text style={styles.error(theme)}>
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>

              <View style={styles.birthDate(theme)}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={errors.birthDate ? "red" : "#666"}
                  style={{ marginRight: 5 }}
                />
                <TouchableOpacity onPress={() => setShow(!show)}>
                  <Text style={{ color: "#666", marginLeft: 5, marginTop: 5 }}>
                    {dobLabel}
                  </Text>
                  {errors.birthDate && (
                    <Text style={styles.error(theme)}>{errors.birthDate}</Text>
                  )}
                </TouchableOpacity>
              </View>

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={values.birthDate}
                  name="birthDate"
                  mode="date"
                  display="spinner"
                  is24Hour={false}
                  minimumDate={new Date(2000, 0, 1)}
                  maximumDate={new Date(2050, 11, 31)}
                  locale="fr-FR"
                  timeZoneOffsetInMinutes={0}
                  onChange={onChange}
                />
              )}

              <View style={styles.inputContainer(theme)}>
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={errors.address ? "red" : "#666"}
                  style={{ marginRight: 5 }}
                />
                <TextInput
                  style={styles.input}
                  name="address"
                  placeholder="Adresse"
                  value={values.address}
                  onChangeText={handleChange("address")}
                />
                {errors.address && (
                  <Text style={styles.error(theme)}>{errors.address}</Text>
                )}
              </View>
              <View style={styles.inputContainer(theme)}>
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={errors.address ? "red" : "#666"}
                  style={{ marginRight: 5 }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Ville"
                  name="country"
                  value={values.country}
                  onChangeText={handleChange("country")}
                />
                {errors.country && (
                  <Text style={styles.error(theme)}>{errors.country}</Text>
                )}
              </View>
              <View style={styles.inputContainer(theme)}>
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={errors.postalCode ? "red" : "#666"}
                  style={{ marginRight: 5 }}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Code postal"
                  value={values.postalCode}
                  name="postalCode"
                  onChangeText={handleChange("postalCode")}
                  keyboardType="numeric"
                />
                {errors.postalCode && (
                  <Text style={styles.error(theme)}>{errors.postalCode}</Text>
                )}
              </View>
              <CustomButton
                label={"Valider"}
                theme={theme}
                type={"submit"}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};



export default RegistrationScreen;
