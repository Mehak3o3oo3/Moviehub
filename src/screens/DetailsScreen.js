import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';

import PillRow from '../components/PillRow';
import { colors, fonts } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

import {
  fetchMovieCredits,
  fetchMovieById,
  fetchMovieTrailer,
} from '../services/movieApi';

const DetailsScreen = ({
  route,
  navigation,
  favorites,
  toggleFavorite,
  watchlist,
  toggleWatchlist,
}) => {
  const { movie: initialMovie } = route.params;

  const [movie, setMovie] = useState(initialMovie);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  const isFavorite = favorites.includes(movie.id);
  const isInWatchlist = watchlist.includes(movie.id);

  useEffect(() => {
    fetchMovieTrailer(movie.id)
      .then((key) => setTrailerKey(key))
      .catch((err) => console.log('Trailer error:', err));
  }, [movie.id]);

  useEffect(() => {
    const loadFullDetails = async () => {
      try {
        const fullMovie = await fetchMovieById(initialMovie.id);
        setMovie(fullMovie);
      } catch (error) {
        console.log('Error loading full movie details:', error);
      }
    };

    loadFullDetails();
  }, [initialMovie.id]);

  useEffect(() => {
    const loadCast = async () => {
      try {
        const data = await fetchMovieCredits(movie.id);
        setCast(data.slice(0, 5));
      } catch (error) {
        console.log('Error loading cast:', error);
      }
    };

    loadCast();
  }, [movie.id]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroWrap}>
        <Image
          source={{ uri: movie.backdropImage }}
          style={styles.heroImage}
        />

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => toggleFavorite(movie.id)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={26}
            color={isFavorite ? colors.ticket : colors.text}
          />
        </TouchableOpacity>

        {/* Watchlist Button */}
        <TouchableOpacity
          style={styles.bookmarkBtn}
          onPress={() => toggleWatchlist(movie.id)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={
              isInWatchlist
                ? 'bookmark'
                : 'bookmark-outline'
            }
            size={26}
            color={isInWatchlist ? colors.gold : colors.text}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>
          {movie.title}
        </Text>

        <PillRow
          items={[
            `★ ${movie.rating}`,
            movie.year,
            movie.genre,
            movie.runtime,
          ]}
        />

        {/* Trailer */}
        <TouchableOpacity
          style={[
            styles.trailerBtn,
            !trailerKey && { opacity: 0.5 },
          ]}
          disabled={!trailerKey}
          onPress={() =>
            Linking.openURL(
              `https://www.youtube.com/watch?v=${trailerKey}`
            )
          }
          activeOpacity={0.8}
        >
          <Text style={styles.trailerBtnText}>
            {trailerKey
              ? '▶ Watch trailer'
              : 'No trailer available'}
          </Text>
        </TouchableOpacity>

        {/* About */}
        <Text style={styles.sectionTitle}>
          About Movie
        </Text>

        <Text style={styles.description}>
          {movie.overview || 'No description available.'}
        </Text>

        {/* Cast */}
        <Text style={styles.sectionTitle}>
          Cast
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {cast.map((actor) => (
            <View
              key={actor.id}
              style={styles.castItem}
            >
              {actor.profile_path ? (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w185${actor.profile_path}`,
                  }}
                  style={styles.castAvatar}
                />
              ) : (
                <View style={styles.castAvatar}>
                  <Ionicons
                    name="person"
                    size={28}
                    color={colors.muted}
                  />
                </View>
              )}

              <Text
                style={styles.castName}
                numberOfLines={2}
              >
                {actor.name}
              </Text>
            </View>
          ))}
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
    right: 75,
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: 'rgba(10, 13, 19, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bookmarkBtn: {
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
    width: 75,
  },

  castAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface2,
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  castName: {
    color: colors.muted,
    fontSize: 11,
    fontFamily: fonts.mono,
    textAlign: 'center',
  },
});