import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors, fonts } from '../constants/theme';
import SearchResultCard from '../components/SearchResultCard';
import { fetchMovieById } from '../services/movieApi';

const SavedScreen = ({ navigation, favorites, toggleFavorite }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const moviePromises = favorites.map(id => fetchMovieById(id));
      const results = await Promise.all(moviePromises);
      setFavoriteMovies(results);
    };
    loadFavorites();
  }, [favorites]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headingText}>SAVE<Text style={{ color: colors.gold }}>HUB</Text> </Text>
        <View style={styles.avatar}></View>
      </View>
      {favoriteMovies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteMovies}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <SearchResultCard
              movie={item}
              navigation={navigation}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          )}
        />
      )}
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  headerRow: { padding: 26, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headingText: { color: colors.text, fontSize: 30, fontFamily: fonts.display },
  avatar: { height: 50, width: 50, borderRadius: 50, backgroundColor: colors.gold },
  list: { padding: 18, marginTop: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: colors.muted, fontSize: 18, fontFamily: fonts.body },
});