import { View, Text, Image,StyleSheet,TouchableOpacity,} from 'react-native';
import React from 'react';
import { colors, fonts } from '../constants/theme';
import PillRow from './PillRow';

const SearchResultCard = ({ movie, navigation }) => {

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

    </TouchableOpacity>
  );
};

export default SearchResultCard;


const styles = StyleSheet.create({

  card: {
    width: 320,
    marginRight: 10,
    elevation: 15,
    shadowColor: colors.gold,
  },

  image: {
    width: 320,
    height: 220,
    borderRadius: 12,
  },
    body: {
    paddingTop: 20,
  },

  title: {
    color: colors.text,
    fontSize: 18,
    fontFamily: fonts.display,
    marginBottom: 8,
  },
});