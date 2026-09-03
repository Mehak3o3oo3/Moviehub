import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SearchScreen from '../screens/SearchScreen';


const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={SearchScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name='Search' component={SearchScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}