
import AppNavigation from "./navigation/AppNavigation";
import AppContext from "./context/AppContext";

export default function App() {
  return (
    <AppContext>
      <AppNavigation />
    </AppContext>
  );
}
