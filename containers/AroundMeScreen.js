import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, View, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import colors from "../assets/css/colors";

const AroundMeScreen = ({ navigation }) => {
  const [errorMap, setErrorMap] = useState();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Requête Expo Location : coordonnées GPS utilisateur
  useEffect(() => {
    const askPermission = async () => {
      try {
        const responseLoc = await Location.requestPermissionsAsync();
        //console.log(responseLoc);

        let response;

        if (responseLoc.status === "granted") {
          // Récupérer les données
          const location = await Location.getCurrentPositionAsync({});
          const latitude = location.coords.latitude;
          const longitude = location.coords.longitude;
          // Définir dans des states également sinon pas accessibles
          setLatitude(latitude);
          setLongitude(longitude);

          // Envoyer requête complète avec les queries lat,long.
          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${latitude}&longitude=${longitude}`
          );
        } else {
          // Envoyer requête simple
          response = await axios.get(
            "https://express-airbnb-api.herokuapp.com/rooms/around"
          );
        }
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    askPermission();
  }, []);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={colors.red} />
    </View>
  ) : (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude, // Centrer sur loc. de l'utilisateur
          longitude: longitude, // Centrer sur loc. de l'utilisateur
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        {data &&
          data.map((room) => {
            return (
              <MapView.Marker
                key={room._id}
                coordinate={{
                  latitude: room.location[1],
                  longitude: room.location[0],
                }}
                title={room.title}
                description={room.description}
                onPress={() => {
                  navigation.navigate("Room", { id: room._id });
                }}
              />
            );
          })}
      </MapView>
    </>
  );
};

export default AroundMeScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
