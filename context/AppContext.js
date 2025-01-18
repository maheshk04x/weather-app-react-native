
import { useState, createContext } from "react";

export const FavouritesContext = createContext();
export default function AppContext({ children }) {
  const [favourites, setFavourites] = useState([]);
  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      {children} 
    </FavouritesContext.Provider>
  );
}
