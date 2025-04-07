import { Text, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  Home from './pages/Home';
import Products from './pages/Products';
import FeedBack from './pages/FeedBack';

const Stack = createStackNavigator() 
export default function App() {
  return (
    <View style={{flex:1}}>
      <StatusBar />
      
        <NavigationContainer>
          <Stack.Navigator>

            <Stack.Screen name='Home' component={Home} options={{
                header: () => <></> // isso aqui tira o menu
            }}></Stack.Screen>

            <Stack.Screen name='Products' component={Products} options={{
                header: () => <></> // isso aqui tira o menu
            }}></Stack.Screen>

            <Stack.Screen name='FeedBack' component={FeedBack} options={{
                header: () => <></> // isso aqui tira o menu
            }}></Stack.Screen>


          </Stack.Navigator>
        </NavigationContainer>

    </View>
  );
}