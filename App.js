import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { Manrope_500Medium, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { colors } from './src/constants/theme';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  const [fontsLoaded]=useFonts({
    BebasNeue_400Regular,
    Manrope_500Medium,
    Manrope_700Bold
  });
  if(!fontsLoaded){
    return <View style={{flex:1, backgroundColor:colors.ink}}/>
  }
  return (
    <View style={styles.container}>
      <RootNavigator/>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ink,

  },
});
