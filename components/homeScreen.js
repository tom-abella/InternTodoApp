import React from "react"
import { SafeAreaView, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Logo from '../asset/img/datadynamixLogo.png'
const HomeScreen = (props) =>{
    
    
    return(
    <SafeAreaView style={styles.container
    }>
    <Text style={styles.title}>Internship Todo App</Text>
    <Image 
        source={Logo}
        style={styles.logo}/>
    
       <TouchableOpacity
            onPress={() => props.navigation.navigate("Selection")}
            style={styles.button}>
            <Text style={styles.buttonText}>Start</Text>
       </TouchableOpacity>
  </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#111b31',
        height:'100%'
    },
    button:{
        backgroundColor:'#0080ff',
        padding:10,
        borderRadius:10,
        paddingVertical:5,
        marginTop:10
    },
    buttonText:{
        color:'#f5f5f5',
        fontSize:20,
        textTransform:'uppercase'
    },
    logo:{
        width:250,
        resizeMode:'contain'
    },
    title:{
        fontSize:35
    }
})

export default HomeScreen