import React from 'react'
import { SafeAreaView, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
const Selection =(props) => {
  return (
    <SafeAreaView 
        style={styles.container}>
        <TouchableOpacity 
            style={styles.button}
            onPress={() => props.navigation.navigate("Trainer")}>
            <Text style={styles.buttonText}>
                Trainer
            </Text>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => props.navigation.navigate("MyDatePicker")}
            style={styles.button}>
            <Text style={styles.buttonText}>Trainee</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
//Push data to AWS Amplify
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#0080ff',
        padding:10,
        borderRadius:10
    },
    buttonText:{
        fontSize:30
    },
    container:{
        backgroundColor:'#111b31',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        gap:100
    }
  })
export default Selection
