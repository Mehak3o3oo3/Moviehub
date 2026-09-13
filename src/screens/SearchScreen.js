import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import { colors, fonts } from '../constants/theme';
import SearchResultCard from '../components/SearchResultCard';

import { searchMovies } from '../services/movieApi';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
  const timer = setTimeout(() => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setError('');
      setPage(1);
      setTotalPages(1);
      return;
    }

    const search = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await searchMovies(searchQuery, 1);

        setMovies(data.results);
        setTotalPages(data.totalPages);
        setPage(1);

      } catch (err) {
        console.log(err);
        setError('Something went wrong. Please try again.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, 500);

  return () => clearTimeout(timer);
}, [searchQuery]);
const loadNextPage = async () => {
  if (page >= totalPages) {
    return;
  }

  try {
    setLoadingMore(true);
    const nextPage = page + 1;

    const data = await searchMovies(searchQuery, nextPage);

    setMovies(prev => [...prev, ...data.results]);
    setPage(nextPage);

  } catch (err) {
    console.log(err);
  } finally {
    setLoadingMore(false);
  }
};

  return (
    <View style={styles.container}>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <View style={styles.messageContainer}>
          <ActivityIndicator
            size="large"
            color={colors.gold}
          />

          <Text style={styles.messageText}>
            Loading movies...
          </Text>
        </View>

      ) : error ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            {error}
          </Text>
        </View>

      ) : movies.length === 0 ? (
        <View style={styles.messageContainer}>
          <Text style={styles.emptyText}>
            No movies found
          </Text>
        </View>

      ) : (
        <FlatList
  data={movies}
  keyExtractor={(item) => item.id.toString()}
  contentContainerStyle={styles.list}
  onEndReached={() => {
    if (page < totalPages) {
      loadNextPage();
    }
  }}
  onEndReachedThreshold={0.5}
  ListFooterComponent={
    loadingMore ? <ActivityIndicator color={colors.gold} style={{ marginVertical: 20 }} /> : null
  }
  renderItem={({ item }) => (
    <SearchResultCard
      movie={item}
      navigation={navigation}
    />
  )}
/>
      )}

    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ink,
    paddingTop: 30,
  },

  list: {
    padding: 18,
    marginTop: 10,
  },

  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  messageText: {
    color: colors.muted,
    fontSize: 16,
    fontFamily: fonts.body,
    marginTop: 10,
  },

  emptyText: {
    color: colors.muted,
    fontSize: 18,
    fontFamily: fonts.body,
  },
});