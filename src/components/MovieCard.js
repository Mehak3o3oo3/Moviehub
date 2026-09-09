import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PillRow from './PillRow';
import React from 'react';

import { colors, fonts } from '../constants/theme';

const MovieCard = ({ movie, navigation }) => {

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { movie })}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: movie.backdropImage }}
        style={styles.image}
      />

      <View style={styles.body}>
              <Text style={styles.title} numberOfLines={1}>
                {movie.title}
              </Text>
              <PillRow items={[movie.year, movie.genre]} />
              </View>

    </TouchableOpacity>
  );
};

export default MovieCard;


const styles = StyleSheet.create({

  card: {
    width: 150,
    marginRight: 10,
    elevation: 15,
    shadowColor: colors.gold,
  },

  image: {
    width: 150,
    height: 220,
    borderRadius: 12,
  },

  body: {
    paddingTop: 15,
  },

  title: {
    color: colors.text,
    fontSize: 20,
    fontFamily: fonts.display,
    marginBottom: 8,
  },

});