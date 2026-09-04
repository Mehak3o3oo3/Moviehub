import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import PillRow from '../components/PillRow';
import { colors, fonts } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const DetailsScreen = ({ route, navigation,favorites,toggleFavorite,}) => {
  const { movie } = route.params;
  const isFavorite = favorites.includes(movie.id);
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroWrap}>

        <Image
          source={{ uri: movie.image }}
          style={styles.heroImage}
        />
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.backText}>
            ←
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => toggleFavorite(movie.id)}
          activeOpacity={0.8}
        >
          <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={28}
          color={isFavorite ? colors.ticket : colors.text}
          />
        </TouchableOpacity>

      </View>
      <View style={styles.body}>
        <Text style={styles.title}>
          {movie.title}
        </Text>
        <PillRow items={[`★ ${movie.rating}`, movie.year, movie.genre, movie.runtime]} />
        <TouchableOpacity
          style={styles.trailerBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.trailerBtnText}>
            ▶ Watch trailer
          </Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>
          About Movie
        </Text>

        <Text style={styles.description}>
          {movie.title} is a movie released in {movie.year}.
        </Text>
        <Text style={styles.sectionTitle}>Cast</Text>

    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.castItem}>
      <View style={styles.castAvatar} />
        <Text style={styles.castName}>Leo Actor</Text>
      </View>
      <View style={styles.castItem}>
      <View style={styles.castAvatar} />
        <Text style={styles.castName}>Jane Star</Text>
      </View>
      <View style={styles.castItem}>
      <View style={styles.castAvatar} />
        <Text style={styles.castName}>Sam Cast</Text>
      </View>
      </ScrollView>

      </View>

    </ScrollView>
  );
};

export default DetailsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ink,
  },

  heroWrap: {
    width: '100%',
    height: 450,
    position: 'relative',
  },

  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: 'rgba(10, 13, 19, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backText: {
    color: colors.text,
    fontSize: 28,
  },

  heartBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: 'rgba(10, 13, 19, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    padding: 20,
  },

  title: {
    color: colors.text,
    fontSize: 38,
    fontFamily: fonts.display,
    marginBottom: 8,
  },
  trailerBtn: {
    height: 55,
    borderRadius: 16,
    backgroundColor: colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },

  trailerBtnText: {
    color: colors.ink,
    fontSize: 16,
    fontFamily: fonts.body,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 26,
    fontFamily: fonts.display,
    marginBottom: 10,
  },

  description: {
    color: colors.muted,
    fontSize: 15,
    fontFamily: fonts.body,
    lineHeight: 24,
    marginBottom: 30,
  },
  castItem: {
  alignItems: 'center',
  marginRight: 18,
},
castAvatar: {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: colors.surface2,
  marginBottom: 6,
},
castName: {
  color: colors.muted,
  fontSize: 11,
  fontFamily: fonts.mono,
},
});