import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { colors, fonts } from '../constants/theme';

const MovieCard = ({ movie }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: movie.image }}
        style={styles.image}
      />

      <Text style={styles.title} numberOfLines={1}>
        {movie.title}
      </Text>

      <Text style={styles.year}>
        {movie.year}
      </Text>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 10,
    elevation:15,
    shadowColor: colors.gold,
  },

  image: {
    width: 150,
    height: 220,
    borderRadius: 12,
  },

  title: {
    color:colors.text,
    fontSize: 16,
    marginTop: 8,
    fontFamily:fonts.body
  },

  year: {
    color: colors.muted,
    marginTop: 4,
    fontFamily:fonts.mono
  },
});