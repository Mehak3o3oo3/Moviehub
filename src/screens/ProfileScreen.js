import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors, fonts } from '../constants/theme';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Profile
      </Text>
    </View>
  );
};

export default ProfileScreen;

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