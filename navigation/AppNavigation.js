import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import WeatherDetails from "../screens/WeatherDetails";
import Favourites from "../screens/Favourites";
import Recents from "../screens/Recents";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ffffb3",
        },
        headerShadowVisible: false,
        drawerActiveTintColor: "black",
        drawerContentStyle: {
          backgroundColor: "#ffffb3",
        },
        drawerLabelStyle: {
          fontSize: 17,
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: "" }}
      />
      <Drawer.Screen
        name="Favourites"
        component={Favourites}
        options={{
          headerTitle: "Locations",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 25, fontWeight: "bold" },
        }}
      />
      <Drawer.Screen name="Recent searches" component={Recents} />
    </Drawer.Navigator>
  );
};
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ffffb3",
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="DrawerStack"
          component={DrawerStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Current Weather"
          component={WeatherDetails}
          options={{
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 25,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
