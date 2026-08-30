import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors, fonts } from '../constants/theme';

const SectionHeader = ({ title }) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 30,
    color: colors.text,
    fontFamily: fonts.display,
    padding: 15,
  },
});