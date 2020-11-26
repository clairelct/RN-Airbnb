import React, { useState, useEffect } from "react";
// import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Button,
  Text,
  Image,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import colors from "../assets/css/colors";

export default function HomeScreen({ navigation }) {
  // const navigation = useNavigation();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Requête axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        //console.log(response.data);
        setData(response.data); // { {..}, {..}, }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color={colors.red} />
  ) : (
    <View style={styles.container}>
      {/* ANNONCES */}
      <View style={styles.rooms}>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.roomContainer}
              onPress={() => {
                navigation.navigate("Room", { id: item._id });
              }}
            >
              {/* Image */}
              <View style={styles.imgView}>
                <Image
                  style={styles.img}
                  source={{ uri: item.photos[0].url }}
                ></Image>
                <View style={styles.priceView}>
                  <Text style={styles.price}>{item.price} €</Text>
                </View>
              </View>
              {/* Informations */}
              <View style={styles.infosHeader}>
                <View style={styles.infosView}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.reviewsContainer}>
                    <View style={styles.rating}>
                      <Entypo
                        name="star"
                        size={20}
                        color={
                          item.ratingValue >= 1 ? colors.yellow : colors.grey
                        }
                      />
                      <Entypo
                        name="star"
                        size={20}
                        color={
                          item.ratingValue >= 2 ? colors.yellow : colors.grey
                        }
                      />
                      <Entypo
                        name="star"
                        size={20}
                        color={
                          item.ratingValue >= 3 ? colors.yellow : colors.grey
                        }
                      />
                      <Entypo
                        name="star"
                        size={20}
                        color={
                          item.ratingValue >= 4 ? colors.yellow : colors.grey
                        }
                      />
                      <Entypo
                        name="star"
                        size={20}
                        color={
                          item.ratingValue >= 5 ? colors.yellow : colors.grey
                        }
                      />
                    </View>
                    <Text style={styles.ratingText}>
                      {item.reviews} reviews
                    </Text>
                  </View>
                </View>
                <View style={styles.avatar}>
                  <Image
                    style={styles.img}
                    source={{ uri: item.user.account.photo.url }}
                  ></Image>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  rooms: {
    margin: 20,
  },
  roomContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 2,
    borderBottomColor: colors.lightgrey,
    marginBottom: 25,
  },
  imgView: {
    width: "100%",
    height: 190,
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
  infosHeader: {
    flexDirection: "row",
    paddingBottom: 15,
    paddingTop: 15,
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
});
