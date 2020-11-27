import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRoute } from "@react-navigation/core";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import colors from "../assets/css/colors";

export default function ProfileScreen({
  userToken,
  setToken,
  userId,
  setUser,
}) {
  // const { params } = useRoute();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Récupérer les données de l'utilisateur
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("userToken ProfileScreen:", userToken);
        // console.log("userId ProfileScreen:", userId);

        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        console.log("YES: ", response.data);
        //setData(response.data);

        // Pré-remplir les champs :
        setEmail(response.data.email);
        setUsername(response.data.username);
        setDescription(response.data.description);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Modifier les données de l'utilisateur
  useEffect(() => {}, []);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={colors.red} />
    </View>
  ) : (
    <View style={styles.container}>
      {/* PHOTO */}
      <View style={styles.photoContainer}>
        <View style={styles.btnUploadPic}></View>
        <View style={styles.photo}>
          <FontAwesome5 name="user" size={24} color="black" />
        </View>
        <View style={styles.btnTakePic}></View>
      </View>
      {/* FORM */}
      <View style={styles.formContainer}>
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
          placeholder="Username"
          placeholderTextColor={colors.paleRed}
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={username}
        />
        <TextInput
          style={styles.largeTextInput}
          placeholder="Description"
          placeholderTextColor={colors.paleRed}
          multiline={true}
          numberOfLines={10}
          maxLength={200}
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
        ></TextInput>
        <Text>
          {username} {email} {description}
        </Text>
      </View>
      {/* BUTTONS */}
      <View style={styles.buttonsContainer}>
        <Button
          title="Update"
          onPress={() => {
            alert("Update!");
          }}
        />
        <Button
          title="Log Out"
          onPress={() => {
            setToken(null);
            setUser(null);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
  },
  photoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    backgroundColor: "grey",
    width: 130,
    height: 130,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 65,
  },
  btnUploadPic: {
    backgroundColor: "pink",
    width: 30,
    height: 30,
  },
  btnTakePic: {
    backgroundColor: "blue",
    width: 30,
    height: 30,
  },
  formContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  input: {
    color: "black",
    paddingLeft: 10,
    height: 40,
    marginBottom: 10,
    borderBottomColor: colors.red,
    borderBottomWidth: 1,
  },
  largeTextInput: {
    color: "black",
    height: 80,
    padding: 10,
    borderColor: colors.red,
    borderWidth: 1,
  },
  buttonsContainer: {
    backgroundColor: "lightgrey",
  },
});
