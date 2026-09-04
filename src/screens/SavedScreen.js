import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors, fonts } from '../constants/theme';

const SavedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Saved
      </Text>
    </View>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ink,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: colors.text,
    fontSize: 24,
    fontFamily: fonts.display,
  },
});