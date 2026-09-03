import React, { useState } from 'react';
import {View, Text, FlatList, StyleSheet,} from 'react-native';
import SearchBar from '../components/SearchBar';
import movies from '../data/movies';
import { colors, fonts } from '../constants/theme';
import SearchResultCard from '../components/SearchResultCard';

const SearchScreen = ({ navigation }) => {

  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = movies.filter((movie) =>
    movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredMovies.length === 0 ? (
        <View style={styles.emptyContainer}>
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
    marginTop:10
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    color: colors.muted,
    fontSize: 18,
    fontFamily: fonts.body,
  },
});