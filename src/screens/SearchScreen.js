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

import { searchMovies } from '../services/movieApi';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
  const timer = setTimeout(() => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setError('');
      return;
    }

    const search = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await searchMovies(searchQuery);
        setMovies(data);
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