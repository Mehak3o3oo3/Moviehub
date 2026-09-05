import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SavedScreen from '../screens/SavedScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

const SavedStack = ({ favorites, toggleFavorite }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Saved">
        {(props) => (
          <SavedScreen
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
};

export default SavedStack;