import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import 'react-native-url-polyfill/auto';
import { StatusBar } from 'expo-status-bar';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { HomeScreen } from './screens/HomeScreen';
import { ArticleDetailsScreen } from './screens/ArticleDetailsScreen';

const Stack = createSharedElementStackNavigator<RootStackParamList>();

const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress
      }
    };
  }
};

export default function App() {
  return (
    <>
    <StatusBar style='light'/>
    <View style={{ backgroundColor: 'black', height: 50 }}/>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home' headerMode="none">
            <Stack.Screen name="Home" component={HomeScreen} options={() => options}/>
            <Stack.Screen name="ArticleDetails" component={ArticleDetailsScreen} options={() => options}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      </>
  );
}
