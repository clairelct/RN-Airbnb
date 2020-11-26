import React from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View, Button } from "react-native";

export default function ProfileScreen({ setToken }) {
  const { params } = useRoute();
  return (
    <View>
      {/* <Text>PROFILE user id : {params.userId}</Text> */}
      <Text>PROFILE</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
