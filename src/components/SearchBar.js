import { View, Text, StyleSheet ,TextInput} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {colors, fonts} from '../constants/theme';

const SearchBar = () => {
  return (
     <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color={colors.muted} />
         <TextInput
         placeholder='Search movies'
         placeholderTextColor={colors.muted}
         style={styles.search}
        />
      </View>
  );
};

export default SearchBar;

const styles=StyleSheet.create({
    searchContainer: {
        marginHorizontal: 18,
        height: 55,
        borderWidth: 1,
        borderColor: colors.muted,
        borderRadius: 18,
        backgroundColor: colors.surface2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        
      },
       search: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
        color: colors.text,
      },
})