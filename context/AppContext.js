
import { useState, createContext } from "react";

export const FavouritesContext = createContext();
export default function AppContext({ children }) {
  const [favourites, setFavourites] = useState([]);
  const [recents, setRecents] = useState([]);
  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites ,recents,setRecents }}>
      {children} 
    </FavouritesContext.Provider>
  );
}
