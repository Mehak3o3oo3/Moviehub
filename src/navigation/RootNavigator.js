import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import SavedStack from './SavedStack';

import ProfileScreen from '../screens/ProfileScreen';

import { colors } from '../constants/theme';


const Tab = createBottomTabNavigator();


export default function RootNavigator() {

  const [favorites, setFavorites] = useState([]);


  const toggleFavorite = (movieId) => {

    setFavorites(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );

  };


  return (

    <NavigationContainer>

      <Tab.Navigator
        screenOptions={{

          headerShown: false,

          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.surface2,
          },

          tabBarActiveTintColor: colors.gold,
          tabBarInactiveTintColor: colors.muted,

        }}
      >


        {/* HOME */}

        <Tab.Screen
          name="HomeTab"

          options={{
            title: 'Home',

            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="home"
                size={size}
                color={color}
              />
            ),
          }}
        >
          {() => (
            <HomeStack
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          )}
        </Tab.Screen>


        {/* SEARCH */}

        <Tab.Screen
          name="SearchTab"

          options={{
            title: 'Search',

            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="search"
                size={size}
                color={color}
              />
            ),
          }}
        >
          {() => (
            <SearchStack
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          )}
        </Tab.Screen>


        {/* SAVED */}

        <Tab.Screen
          name="SavedTab"

          options={{
            title: 'Saved',

            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="heart"
                size={size}
                color={color}
              />
            ),
          }}
        >
          {() => (
            <SavedStack
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          )}
        </Tab.Screen>


        {/* PROFILE */}

        <Tab.Screen
          name="ProfileTab"

          options={{
            title: 'Profile',

            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="person"
                size={size}
                color={color}
              />
            ),
          }}
        >
          {() => (
            <ProfileScreen
              favorites={favorites}
            />
          )}
        </Tab.Screen>


      </Tab.Navigator>

    </NavigationContainer>

  );
}