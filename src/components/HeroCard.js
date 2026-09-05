import { View, Text ,Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { colors, fonts } from '../constants/theme';
import PillRow from './PillRow';
import { LinearGradient } from 'expo-linear-gradient';

const HeroCard = ({ movie, navigation }) => {
  return (
    <TouchableOpacity  style={styles.hero}
    onPress={() => navigation.navigate('Details', { movie })}>
      <Image
       source={{uri:movie.image}}
       style={styles.image}
      />
        <LinearGradient
    colors={['transparent', colors.ink]}
    style={styles.gradient}
  />
      <View style={styles.info}>
        <Text style={styles.tag}>POPULAR</Text>

        <Text style={styles.title}>
          {movie.title}
        </Text>

        <PillRow items={[`★ ${movie.rating}`, movie.year, movie.genre, movie.runtime]} />
      </View>
    </TouchableOpacity>
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
  gradient: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: '100%',
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
});
