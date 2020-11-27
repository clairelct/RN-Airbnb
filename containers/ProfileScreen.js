import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Image,
  View,
  Button,
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
          <MaterialIcons name="photo-library" size={28} color="black" />
        </TouchableHighlight>

        <View style={styles.photo}>
          {/* Si l'utilisateur n'a pas de photo */}
          {console.log(picture)}
          {!userData.photo && !picture ? (
            <FontAwesome5 name="user" size={50} color={colors.lightgrey} />
          ) : (
            <Image
              source={{ uri: picture }}
              style={styles.displayUserPic}
            ></Image>
          )}

          {/* Si l'utilisateur a chargé une photo depuis la galerie */}
        </View>

        <TouchableHighlight
          style={styles.btnUploadPic}
          style={styles.btnTakePic}
        >
          <MaterialIcons name="photo-camera" size={28} color="black" />
        </TouchableHighlight>
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
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    backgroundColor: colors.lightgrey,
    flex: 1,
  },
  photoContainer: {
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
    backgroundColor: "pink",
    width: 30,
    height: 30,
  },
  btnTakePic: {
    backgroundColor: "lightblue",
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
