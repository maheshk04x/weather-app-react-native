import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WeatherDetails from "../screens/WeatherDetails";

const Stack = createNativeStackNavigator();
export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Current Weather" component={WeatherDetails}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}