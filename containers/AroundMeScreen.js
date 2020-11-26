import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, View, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import colors from "../assets/css/colors";

const AroundMeScreen = () => {
  const [errorMap, setErrorMap] = useState();
  // const [coords, setCoords] = useState(); // Coordonnées utilisateur
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Requête Expo Location : coordonnées GPS utilisateur
  useEffect(() => {
    const askPermission = async () => {
      try {
        const response = await Location.requestPermissionsAsync();
        //console.log(response);
        if (response.status === "granted") {
          let location = await Location.getCurrentPositionAsync({});
          //console.log(location);
          // const obj = {
          //   latitude: location.coords.latitude,
          //   longitude: location.coords.longitude,
          // };
          // setCoords(obj);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        } else {
          setError(true);
        }
        //setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    askPermission();
  }, []);

  // Requête Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${latitude}&longitude=${longitude}`
        );
        console.log("ROOMS AROUND", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [latitude, longitude]);

  return isLoading ? (
    <ActivityIndicator size="large" color={colors.red} />
  ) : (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude, // Center sur loc. de l'utilisateur
          longitude: longitude, // Center sur loc. de l'utilisateur
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        {data &&
          data.map((room, index) => {
            return (
              <MapView.Marker
                key={room._id}
                coordinate={{
                  latitude: room.location[1],
                  longitude: room.location[0],
                }}
                title={room.title}
                description={room.description}
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
