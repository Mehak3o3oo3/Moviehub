import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '../constants/theme';

import PillRow from './PillRow';

const SearchResultCard = ({
  movie,
  navigation,
  favorites,
  toggleFavorite,
  iconName = 'heart',
}) => {

  const isActive = favorites?.includes(movie.id);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { movie })}
      activeOpacity={0.8}
    >

      <Image
        source={{ uri: movie.image }}
        style={styles.image}
      />

      <View style={styles.body}>

        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>

        <PillRow items={[`★ ${movie.rating}`, movie.year, movie.genre, movie.runtime]} />

      </View>

      {toggleFavorite && (
        <TouchableOpacity
          style={styles.cardHeartBtn}
          onPress={() => toggleFavorite(movie.id)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isActive ? iconName : `${iconName}-outline`}
            size={20}
            color={isActive ? colors.ticket : colors.text}
          />
        </TouchableOpacity>
      )}

    </TouchableOpacity>
  );
};

export default SearchResultCard;


const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  body: {
    padding: 14,
  },

  title: {
    color: colors.text,
    fontSize: 18,
    fontFamily: fonts.display,
    marginBottom: 8,
  },

  cardHeartBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
});