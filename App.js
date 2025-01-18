import { StatusBar } from "react-native";
import AppNavigation from "./navigation/AppNavigation";
import AppContext from "./context/AppContext";

export default function App() {
  return (
    <AppContext>
      <StatusBar backgroundColor="black"/>
      <AppNavigation />
    </AppContext>
  );
}
