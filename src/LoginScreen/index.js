import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser, loginUser, clearAuthError } from "../../store/actions";
import { useFocusEffect } from "@react-navigation/native";

import { LogoText, showToast } from "../utils/tools";
import { Button, Input } from "@rneui/base";
import { useTheme } from "../theme/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";

import styles from "./index.style.js";
import CustomButton from "../components/CustomButton/index.js";
import { getUsers } from "../api/index.js";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  console.log(navigation);
  //   const error = useSelector((state) => state.auth.error);
  const theme = useTheme();
  const [formType, setFormType] = useState(true);
  const [securEntry, setSecurEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([
    {
      firstName: "messaci",
      email: "lamine@gmail.com",
      birthDate: {
        seconds: 1691999548,
        nanoseconds: 532000000,
      },
      address: "Rue Michelet",
      postalCode: "76600",
      password: "12345",
      createdAt: "14/08/2023 09:52:08",
      country: "Le Havre",
      lastName: "Lamine",
      updatedAt: "14/08/2023 09:52:08",
    },
  ]);

  const handleSubmit = (values) => {
    const { email, password } = values;
    setLoading(true);
    if (password && email) {
      users?.map((user) => {
        if (user.email === email) {
          if (user.password === password) {
            setLoading(false);

            alert("Connexion réussie", "success");
            navigation.replace("Home");
          } else {
            setLoading(false);
            alert("Mot de passe incorrect", "danger");
          }
        }
      });
    } else {
      alert("Veuillez remplir tous les champs", "danger");
    }
  };

  console.log(users);

  useEffect(() => {
    const loadData = async () => {
      const result = [];
      const data = await getUsers();
      await data.forEach((query) =>
        result.push({ key: query.id, users: query.data() })
      );
      const resultData = result.map((doc) => {
        return doc.users;
      });
      resultData.map((result) => {});
      setUsers(resultData);
    };
    //loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // return () => dispatch(clearAuthError());
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.contentContainer(theme)}>
      <View style={styles.container(theme)}>
        <LogoText />
        <Formik
          initialValues={{
            email: "lamine@gmail.com",
            password: "12345",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("The email is required"),
            password: Yup.string()
              .max(20, "Must be 10 or less")
              .required("The lastname is required"),
          })}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <>
              <Input
                placeholder="Email"
                leftIcon={{
                  type: "antdesign",
                  name: "mail",
                  color: theme.colors.white,
                }}
                inputStyle={styles.inputStyle(theme)}
                placeholderTextColor={theme.colors.lightGrey}
                inputContainerStyle={styles.inputContainerStyle(theme)}
                renderErrorMessage={errors.email && touched.email}
                errorMessage={errors.email}
                errorStyle={{ color: theme.colors.danger }}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <Input
                placeholder="Password"
                secureTextEntry={securEntry}
                leftIcon={{
                  type: "antdesign",
                  name: "lock",
                  color: theme.colors.white,
                }}
                inputStyle={styles.inputStyle(theme)}
                placeholderTextColor={theme.colors.lightGrey}
                inputContainerStyle={styles.inputContainerStyle(theme)}
                rightIcon={{
                  type: "antdesign",
                  name: securEntry ? "eye" : "eyeo",
                  onPress: () => setSecurEntry(!securEntry),
                }}
                renderErrorMessage={errors.password && touched.password}
                errorMessage={errors.password}
                errorStyle={{ color: theme.colors.danger }}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <CustomButton
                label={"Connecter"}
                theme={theme}
                onPress={handleSubmit}
              />
              <Button
                type="clear"
                title={"Need to sign in?"}
                buttonStyle={{
                  marginTop: 20,
                }}
                titleStyle={{
                  color: theme.colors.white,
                }}
                onPress={() => navigation.navigate("Register")}
              />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
