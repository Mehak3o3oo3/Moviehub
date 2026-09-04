import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchScreen from '../screens/SearchScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function SearchStack({
  favorites,
  toggleFavorite,
}) {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Search">
        {(props) => (
          <SearchScreen
            {...props}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Details">
        {(props) => (
          <DetailsScreen
            {...props}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}
      </Stack.Screen>

    </Stack.Navigator>
  );
}