import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => {
  return (
    <Image
      style={styles.logo}
      source={require("../assets/img/logo.png")}
    ></Image>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginBottom: 10,
  },
});
