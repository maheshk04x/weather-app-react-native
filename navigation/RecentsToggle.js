import { View, Text , StyleSheet} from 'react-native'
import { DrawerContentScrollView ,DrawerItemList ,DrawerItem } from '@react-navigation/drawer'
import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { FavouritesContext } from '../context/AppContext'


const RecentsToggle = (props) => {
    const {recents} = useContext(FavouritesContext); 
    const [isDrawerOpen , setIsDrawerOpen] = useState(false)
    return (
      <DrawerContentScrollView {...props}>
        {/* default routes navigation*/}
        <DrawerItemList {...props} />
        <DrawerItem
          label="Recent Searches▼"
          onPress={() => setIsDrawerOpen(!isDrawerOpen)}
          labelStyle={{ fontSize: 17, fontWeight: "bold" }}
        />
        {isDrawerOpen && (
          <View>
            {recents.slice(-5).reverse().map((city, index) => (
              <Text key={index} style={styles.recents}>
                {" "}
                {index + 1}.{city}
              </Text>
            ))}
          </View>
        )}
      </DrawerContentScrollView>
    );
}

export default RecentsToggle

const styles = StyleSheet.create({
    recents: {
        fontSize: 17,
        marginLeft:20,
        fontWeight: "Italic",
    }
})