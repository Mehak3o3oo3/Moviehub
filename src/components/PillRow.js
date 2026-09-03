import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../constants/theme';

const PillRow = ({ items }) => {
  return (
    <View style={styles.pillRow}>
      {items.map((item, index) => (
        <View key={index} style={styles.pill}>
          <Text style={styles.pillText}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

export default PillRow;

const styles = StyleSheet.create({
  pillRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.muted,
  },
  pillText: {
    color: colors.muted,
    fontSize: 11,
    fontFamily: fonts.mono,
  },
});