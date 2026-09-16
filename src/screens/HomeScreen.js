import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { colors, fonts } from '../constants/theme';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import SectionHeader from '../components/SectionHeader';
import HeroCard from '../components/HeroCard';
import { fetchTrendingMovies } from '../services/movieApi';
import { RefreshControl } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
  setRefreshing(true);
  const data = await fetchTrendingMovies();
  setMovies(data);
  setRefreshing(false);
  };
  useEffect(() => {
    fetchTrendingMovies()
      .then(data => setMovies(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={colors.gold} size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>Something went wrong.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}
    refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={colors.gold}/>}
    >
      <View style={styles.headerRow}>
        <Text style={styles.headingText}>MOVIE<Text style={{ color: colors.gold }}>HUB</Text></Text>
        <View style={styles.avatar}></View>
      </View>
      <SearchBar onFocus={() => navigation.getParent()?.navigate('SearchTab')} />
      <HeroCard movie={movies[0]} navigation={navigation} />
      <SectionHeader title="Trending Now" />
      <FlatList
        data={movies}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 18 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} navigation={navigation} />}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: colors.ink, flex: 1 },
  headerRow: { padding: 26, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headingText: { color: colors.text, fontSize: 30, fontFamily: fonts.display },
  avatar: { height: 50, width: 50, borderRadius: 50, backgroundColor: colors.gold },
});