import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Image,
  View,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
// import { useRoute } from "@react-navigation/core";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/css/colors";

export default function ProfileScreen({
  userToken,
  setToken,
  userId,
  setUser,
}) {
  // const { params } = useRoute();
  const [picture, setPicture] = useState();
  const [photo, setPhoto] = useState();
  const [userData, setUserData] = useState({});
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
        //console.log("PROFILE DATA: ", response.data);
        setUserData(response.data);
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

  // Fonction pour demander permission et upload photo gallery
  const getPermissionAndCamRollAccess = async () => {
    try {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status === "granted") {
        const result = await ImagePicker.launchImageLibraryAsync();
        //console.log({ result }); // Infos photo (uri, type, height, et cancelled:false)

        if (result.cancelled === false) {
          // Enregistrer l'uri de l'image
          setPicture(result.uri);
        } else {
          alert("Upload annulé");
        }
      } else {
        alert("Permission refusée");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fonction pour demander permission et prendre photo camero
  const getPermissionAndCameraAccess = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === "granted") {
        const result = await ImagePicker.launchCameraAsync();
        console.log(result);
      } else {
        alert("Camera unauthorized");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <TouchableHighlight
          style={styles.btnUploadPic}
          onPress={getPermissionAndCamRollAccess}
        >
          <MaterialIcons name="photo-library" size={34} color="black" />
        </TouchableHighlight>

        <View style={styles.photo}>
          {console.log(photo)}
          {/* Si l'utilisateur n'a pas de photo... */}
          {!userData.photo && !picture ? (
            <FontAwesome5 name="user" size={50} color={colors.lightgrey} />
          ) : (
            <Image
              source={{ uri: picture }}
              style={styles.displayUserPic}
            ></Image>
          )}
        </View>

        <TouchableHighlight
          style={styles.btnTakePic}
          onPress={getPermissionAndCameraAccess}
        >
          <MaterialIcons name="photo-camera" size={34} color="black" />
        </TouchableHighlight>
      </View>
      {/* FORM */}

      <View style={styles.formContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={colors.paleRed}
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={username}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.paleRed}
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />

        <Text style={styles.label}>Description</Text>
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
      </View>
      {/* BUTTONS */}
      <View style={styles.buttonArea}>
        <TouchableHighlight
          style={styles.buttonDark}
          onPress={() => {
            alert("Update!");
          }}
        >
          <Text style={styles.buttonDarkText}>Update</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            setToken(null);
            setUser(null);
          }}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    backgroundColor: colors.lightgrey,
    flex: 1,
  },
  photoContainer: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 130,
    height: 130,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 65,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
  },
  displayUserPic: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  btnUploadPic: {
    width: 36,
    height: 36,
  },
  btnTakePic: {
    width: 36,
    height: 36,
  },
  formContainer: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: "center",
  },
  input: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    paddingLeft: 10,
    height: 40,
    marginBottom: 20,
  },
  label: {
    color: "#666666",
  },
  largeTextInput: {
    marginTop: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    height: 80,
    padding: 10,
    width: 300,
    textAlign: "center",
  },
  buttonArea: {
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: "55%",
    height: 55,
    borderRadius: 50,
    borderColor: colors.red,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.red,
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 20,
  },
  buttonDark: {
    marginTop: 10,
    marginBottom: 10,
    width: "55%",
    height: 55,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.red,
  },
  buttonDarkText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 20,
  },
});
