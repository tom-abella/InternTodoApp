import React from 'react'
import Calculator from './components/calculator';
import HomeScreen from './components/homeScreen';

//NAvigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Selection from './components/Selection';
import Trainer from './components/Trainer';
import Trainee from './components/Trainee';
import MyDatePicker from './components/MyDatePicker';

const Stack = createNativeStackNavigator();
const Home = () =>{
  
    return(
      
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Selection" component={Selection} />
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="MyDatePicker" component={MyDatePicker} />
        
        <Stack.Screen name="Trainer" component={Trainer} />
        
      </Stack.Navigator>
    </NavigationContainer>
       
    )
}


export default Home;