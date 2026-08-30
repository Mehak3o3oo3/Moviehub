import { View, Text ,StyleSheet,  ScrollView} from 'react-native';
import React from 'react';
import {colors, fonts} from '../constants/theme';
import { FlatList } from 'react-native';
import MovieCard from '../components/MovieCard';
import movies from '../data/movies';
import SearchBar from '../components/SearchBar';
import SectionHeader from '../components/SectionHeader';
import HeroCard from '../components/HeroCard';



const HomeScreen = () => {
   
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headingText}>MOVIE<Text style={{color:colors.gold}} >HUB</Text> </Text>
        <View style={styles.avatar}></View>
      </View>
        <SearchBar/>
        <HeroCard movie={movies[0]}/>
    <SectionHeader title="Trending Now" />
    <FlatList
      data={movies}
      horizontal
      contentContainerStyle={{ paddingHorizontal: 18 }} 
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
      <MovieCard movie={item} 
       />
  )}
/>
    </ScrollView>
  );
};

export default HomeScreen;

const styles=StyleSheet.create({
  container:{
    backgroundColor:colors.ink,
    flex:1
  },
  headerRow:{
    padding:26,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  headingText:{
    color:colors.text,
    fontSize:30,
    fontFamily:fonts.display 
  },
  avatar:{
    height:50,
    width:50,
    borderRadius:50,
    backgroundColor:colors.gold,
    
  },
  
})