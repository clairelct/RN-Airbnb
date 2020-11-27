import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, View, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";

import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import colors from "../assets/css/colors";

export default function RoomScreen({ navigation, route }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const id = route.params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        console.log(response.data.location);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={colors.red} />
    </View>
  ) : (
    <View style={styles.container}>
      <View>
        {/* Image */}
        <View style={styles.imgView}>
          <Image
            style={styles.img}
            source={{ uri: data.photos[0].url }}
          ></Image>
          <View style={styles.priceView}>
            <Text style={styles.price}>{data.price} €</Text>
          </View>
        </View>
        {/* Informations */}
        <View style={styles.infosContainer}>
          <View style={styles.infosHeader}>
            <View style={styles.infosView}>
              <Text style={styles.title} numberOfLines={1}>
                {data.title}
              </Text>
              <View style={styles.reviewsContainer}>
                <View style={styles.rating}>
                  <Entypo
                    name="star"
                    size={20}
                    color={data.ratingValue >= 1 ? colors.yellow : colors.grey}
                  />
                  <Entypo
                    name="star"
                    size={20}
                    color={data.ratingValue >= 2 ? colors.yellow : colors.grey}
                  />
                  <Entypo
                    name="star"
                    size={20}
                    color={data.ratingValue >= 3 ? colors.yellow : colors.grey}
                  />
                  <Entypo
                    name="star"
                    size={20}
                    color={data.ratingValue >= 4 ? colors.yellow : colors.grey}
                  />
                  <Entypo
                    name="star"
                    size={20}
                    color={data.ratingValue >= 5 ? colors.yellow : colors.grey}
                  />
                </View>
                <Text style={styles.ratingText}>{data.reviews} reviews</Text>
              </View>
            </View>
            <View style={styles.avatar}>
              <Image
                style={styles.img}
                source={{ uri: data.user.account.photo.url }}
              ></Image>
            </View>
          </View>
          <Text numberOfLines={3}>{data.description}</Text>
        </View>
        {/*  */}
      </View>
      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: data.location[1],
          longitude: data.location[0],
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
          title="Host's Room"
          description="Best place to rent !"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  imgView: {
    width: "100%",
    height: 280,
    position: "relative",
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  priceView: {
    position: "absolute",
    bottom: 10,
    left: 0,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  price: {
    color: colors.white,
    fontSize: 20,
  },
  infosContainer: {
    padding: 20,
  },
  infosHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infosView: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 15,
  },
  reviewsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    marginRight: 10,
  },
  ratingText: {
    color: colors.grey,
    fontSize: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: "hidden",
  },
  map: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 260,
  },
});
