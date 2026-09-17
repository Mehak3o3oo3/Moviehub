import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import SavedStack from './SavedStack';
import ProfileScreen from '../screens/ProfileScreen';

import { colors } from '../constants/theme';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  // WATCHLIST
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistLoaded, setWatchlistLoaded] = useState(false);

  // Load favorites
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');

        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.log('Error loading favorites:', error);
      } finally {
        setFavoritesLoaded(true);
      }
    };

    loadFavorites();
  }, []);

  // Save favorites
  useEffect(() => {
    if (!favoritesLoaded) return;

    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify(favorites)
        );
      } catch (error) {
        console.log('Error saving favorites:', error);
      }
    };

    saveFavorites();
  }, [favorites, favoritesLoaded]);

  // Load watchlist
  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const storedWatchlist = await AsyncStorage.getItem('watchlist');

        if (storedWatchlist) {
          setWatchlist(JSON.parse(storedWatchlist));
        }
      } catch (error) {
        console.log('Error loading watchlist:', error);
      } finally {
        setWatchlistLoaded(true);
      }
    };

    loadWatchlist();
  }, []);

  // Save watchlist
  useEffect(() => {
    if (!watchlistLoaded) return;

    const saveWatchlist = async () => {
      try {
        await AsyncStorage.setItem(
          'watchlist',
          JSON.stringify(watchlist)
        );
      } catch (error) {
        console.log('Error saving watchlist:', error);
      }
    };

    saveWatchlist();
  }, [watchlist, watchlistLoaded]);

  // Toggle favorite
  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  // Toggle watchlist
  const toggleWatchlist = (movieId) => {
    setWatchlist((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
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
              watchlist={watchlist}
              toggleWatchlist={toggleWatchlist}
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
              watchlist={watchlist}
              toggleWatchlist={toggleWatchlist}
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
              watchlist={watchlist}
              toggleWatchlist={toggleWatchlist}
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
              watchlist={watchlist}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}