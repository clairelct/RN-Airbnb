import React, { useState } from "react";
import colors from "../assets/css/colors";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function SignUpScreen({ navigation, setToken, setUser }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              username,
              description,
              password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.token && response.data.id) {
            setToken(response.data.token);
            setUser(response.data.id);
          } else {
            alert("An error occurred");
            console.log(response);
          }
        } catch (error) {
          setErrorMessage(error.response.data.error);
        }
      } else {
        setErrorMessage("MDP doivent êtres identiques");
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs");
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
            <Text style={styles.title}>Sign up</Text>
          </View>

          {/* Inputs */}
          <View>
            <TextInput
              style={styles.input}
              placeholder="email"
              placeholderTextColor={colors.paleRed}
              keyboardType={"email-address"}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            ></TextInput>

            <TextInput
              style={styles.input}
              placeholder="username"
              placeholderTextColor={colors.paleRed}
              value={username}
              onChangeText={(text) => {
                setUsername(text);
              }}
            ></TextInput>
            <TextInput
              style={styles.largeTextInput}
              placeholder="description"
              placeholderTextColor={colors.paleRed}
              multiline={true}
              numberOfLines={10}
              maxLength={200}
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="password"
              placeholderTextColor={colors.paleRed}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="confirm password"
              placeholderTextColor={colors.paleRed}
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
            ></TextInput>
          </View>

          {/* Buttons */}
          <View style={styles.buttonArea}>
            <View style={styles.warningView}>
              <Text style={styles.warningText}>{errorMessage}</Text>
            </View>

            <TouchableHighlight style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.link}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.linkText}>Go to Sign In</Text>
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
    color: colors.white,
    height: 40,
    marginBottom: 10,
    borderTopColor: colors.red,
    borderLeftColor: colors.red,
    borderRightColor: colors.red,
    borderBottomColor: colors.white,
    borderWidth: 1,
  },
  largeTextInput: {
    color: colors.white,
    borderWidth: 1,
    borderTopColor: colors.red,
    borderLeftColor: colors.red,
    borderRightColor: colors.red,
    borderBottomColor: colors.white,
    marginTop: 10,
    marginBottom: 10,
    height: 80,
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
