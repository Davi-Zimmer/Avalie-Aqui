import { Text, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import Products from './pages/Products';
import FeedBack from './pages/FeedBack';
// import dotenv from 'dotenv' dotenv não é suportado, não sei o motivo >:(
// dotenv.config()

const { Navigator, Screen } = createStackNavigator() 
export default function App() {

    return (
        <View style={{flex:1}}>
            <StatusBar />
            <NavigationContainer>
                <Navigator>

                    <Screen name='Home' component={Home} options={{
                        header: () => <></> // isso aqui tira o menu
                    }} />

                    <Screen name='Products' component={Products} options={{
                        header: () => <></> // isso aqui tira o menu
                    }} />

                    <Screen name='FeedBack' component={FeedBack} options={{
                        header: () => <></> // isso aqui tira o menu
                    }} />

                </Navigator>
            </NavigationContainer>
        </View>
    );
}