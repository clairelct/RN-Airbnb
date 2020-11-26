import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
// Containers
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import AroundMeScreen from "./containers/AroundMeScreen";
import RoomScreen from "./containers/RoomScreen";
// Components
import Logo from "./components/Logo";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen
            name="SignUp"
            options={{ header: () => null, animationEnabled: false }}
          >
            {(props) => <SignUpScreen {...props} setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignIn"
            options={{ header: () => null, animationEnabled: false }}
          >
            {(props) => <SignInScreen {...props} setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in

        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          {/* ONGLET 1: HOME */}
          <Tab.Screen
            name="Home"
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"ios-home"} size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                {/* Page: HOME */}
                <Stack.Screen
                  name="Home"
                  options={{
                    headerStyle: {
                      backgroundColor: "white",
                    },
                    headerTitle: () => <Logo />,
                  }}
                >
                  {(props) => <HomeScreen {...props} />}
                </Stack.Screen>

                {/* Page: ROOM */}
                <Stack.Screen
                  name="Room"
                  options={{
                    headerStyle: {
                      backgroundColor: "white",
                    },
                    headerTitle: () => <Logo />,
                  }}
                >
                  {(props) => <RoomScreen {...props} />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>
          {/* ONGLET 2: AROUND ME */}
          <Tab.Screen
            name="Map"
            options={{
              tabBarLabel: "Around me",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"ios-options"} size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Map"
                  options={{
                    headerStyle: {
                      backgroundColor: "white",
                    },
                    headerTitle: () => <Logo />,
                  }}
                >
                  {() => <AroundMeScreen />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>
          {/* ONGLET 3: MY PROFILE */}
          <Tab.Screen
            name="Profile"
            options={{
              tabBarLabel: "My profile",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={"ios-options"} size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Profile"
                  options={{
                    headerStyle: {
                      backgroundColor: "white",
                    },
                    headerTitle: () => <Logo />,
                  }}
                >
                  {() => <ProfileScreen setToken={setToken} />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
