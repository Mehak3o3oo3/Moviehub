import { View, Text ,Image, StyleSheet} from 'react-native';
import React from 'react';
import { colors, fonts } from '../constants/theme';

const HeroCard = ({movie}) => {
  return (
    <View  style={styles.hero}>
      <Image
       source={{uri:movie.image}}
       style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.tag}>POPULAR</Text>

        <Text style={styles.title}>
          {movie.title}
        </Text>

        <Text style={styles.year}>
          {movie.year}
        </Text>
      </View>
    </View>
  );
};

export default HeroCard;

const styles = StyleSheet.create({
  hero: {
    marginHorizontal: 18,
    marginTop: 25,
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.surface2,
    elevation: 15,
    shadowColor: colors.gold,
  },

  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    
  },

  info: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },

  tag: {
    color: colors.gold,
    fontSize: 13,
    fontFamily:fonts.mono
  },

  title: {
    color: colors.text,
    fontSize: 28,
    marginTop: 4,
    fontFamily:fonts.display
  },

  year: {
    color: colors.muted,
    marginTop: 4,
    fontFamily:fonts.mono
  },
});
