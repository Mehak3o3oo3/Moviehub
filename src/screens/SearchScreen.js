import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import SearchBar from '../components/SearchBar';

import { colors, fonts } from '../constants/theme';

import SearchResultCard from '../components/SearchResultCard';

import { fetchPopularMovies } from '../services/movieApi';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const filteredMovies = movies.filter((movie) =>
    movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await fetchPopularMovies();
        setMovies(data);
      } catch (err) {
        console.log(err);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <ScrollView style={styles.container}>

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

      ) : filteredMovies.length === 0 ? (
        <View style={styles.messageContainer}>
          <Text style={styles.emptyText}>
            No movies found
          </Text>
        </View>

      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <SearchResultCard
              movie={item}
              navigation={navigation}
            />
          )}
        />
      )}

    </ScrollView>
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