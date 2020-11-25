import React, { useState } from "react";
//import { useNavigation } from "@react-navigation/core";
import colors from "../assets/css/colors";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignInScreen({ navigation, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    if (email && password) {
      // Requête Axios
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("RESPONSE", response.data);
        if (response.data.token) {
          // Stocker Token
          const userToken = response.data.token;
          setToken(userToken);
        } else {
          alert("An error occurred");
        }
      } catch (error) {
        //console.log("ERROR", error.message);
        setErrorMessage(error.response.data.error);
      }
    } else {
      setErrorMessage("All fields must be completed");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <View style={styles.header}>
            <Image
              style={styles.image}
              source={require("../assets/img/logo_airbnb_white.png")}
            ></Image>
            <Text style={styles.title}>Sign In</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.paleRed}
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.paleRed}
            // secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />

          <View style={styles.buttonArea}>
            <View style={styles.warningView}>
              <Text style={styles.warningText}>{errorMessage}</Text>
            </View>
            <TouchableHighlight style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.link}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.linkText}>No account? Register</Text>
            </TouchableHighlight>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: colors.red,
    flex: 1,
  },
  scrollView: {
    // flex: 1,
    //backgroundColor: colors.red,
  },
  formContainer: {
    marginLeft: 30,
    marginRight: 30,
  },
  header: {
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
  image: {
    width: "50%",
    height: 150,
    resizeMode: "contain",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    paddingLeft: 10,
    color: colors.white,
    height: 40,
    marginBottom: 10,
    borderTopColor: colors.red,
    borderLeftColor: colors.red,
    borderRightColor: colors.red,
    borderBottomColor: colors.white,
    borderWidth: 1,
  },
  description: {
    color: colors.white,
    textAlignVertical: "top",
    marginBottom: 10,
    borderTopColor: colors.red,
    borderLeftColor: colors.red,
    borderRightColor: colors.red,
    borderBottomColor: colors.white,
    borderWidth: 1,
  },
  buttonArea: {
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: "55%",
    height: 55,
    borderRadius: 50,
    borderColor: colors.white,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 20,
  },
  link: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  linkText: {
    color: colors.paleRed,
  },
  warningView: {
    height: 25,
    justifyContent: "center",
  },
  warningText: {
    color: colors.white,
    fontWeight: "bold",
  },
});
