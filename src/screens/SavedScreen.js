import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors, fonts } from '../constants/theme';
import SearchResultCard from '../components/SearchResultCard';
import { fetchMovieById } from '../services/movieApi';

const SavedScreen = ({ navigation, favorites, toggleFavorite, watchlist, toggleWatchlist }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [activeTab, setActiveTab] = useState('favorites');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        setLoading(true);
        setError('');
        const moviePromises = watchlist.map(id => fetchMovieById(id));
        const results = await Promise.all(moviePromises);
        setWatchlistMovies(results);
      } catch (err) {
        console.log('Error loading watchlist:', err);
        setError('Something went wrong loading your watchlist.');
      } finally {
        setLoading(false);
      }
    };
    loadWatchlist();
  }, [watchlist]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        setError('');
        const moviePromises = favorites.map(id => fetchMovieById(id));
        const results = await Promise.all(moviePromises);
        setFavoriteMovies(results);
      } catch (err) {
        console.log('Error loading favorites:', err);
        setError('Something went wrong loading your favorites.');
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, [favorites]);

  const currentMovies = activeTab === 'favorites' ? favoriteMovies : watchlistMovies;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headingText}>SAVE<Text style={{ color: colors.gold }}>HUB</Text> </Text>
        <View style={styles.avatar}></View>
      </View>

      <View style={styles.segmentRow}>
        <TouchableOpacity
          style={[styles.segmentBtn, activeTab === 'favorites' && styles.segmentBtnActive]}
          onPress={() => setActiveTab('favorites')}
        >
          <Text style={[styles.segmentText, activeTab === 'favorites' && styles.segmentTextActive]}>
            Favorites
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.segmentBtn, activeTab === 'watchlist' && styles.segmentBtnActive]}
          onPress={() => setActiveTab('watchlist')}
        >
          <Text style={[styles.segmentText, activeTab === 'watchlist' && styles.segmentTextActive]}>
            Watchlist
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator color={colors.gold} size="large" />
        </View>
      ) : error ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{error}</Text>
        </View>
      ) : currentMovies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {activeTab === 'favorites' ? 'No favorites yet' : 'Your watchlist is empty'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={currentMovies}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <SearchResultCard
              movie={item}
              navigation={navigation}
              favorites={activeTab === 'favorites' ? favorites : watchlist}
              toggleFavorite={activeTab === 'favorites' ? toggleFavorite : toggleWatchlist}
              iconName={activeTab === 'favorites' ? 'heart' : 'bookmark'}
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
  segmentRow: {
    flexDirection: 'row',
    marginHorizontal: 18,
    marginBottom: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 4,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentBtnActive: {
    backgroundColor: colors.gold,
  },
  segmentText: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: 14,
  },
  segmentTextActive: {
    color: colors.ink,
    fontFamily: fonts.display,
  },
});