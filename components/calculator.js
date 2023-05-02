import {useState, React, useCallback} from 'react'
import {SafeAreaView, StyleSheet, TouchableOpacity, Text, TextInput, View} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
const Calculator = (props) =>{

  //Input Field Value
  const [num1, setNum1] = useState()
  const [num2, setNum2] = useState()
  const [ans, setAns] = useState()

  const [input, setInput] = useState()
  //Radio button useState
  const [value, setValue] = useState()

  //RadioButton Values
  const radio_props = [
    {label: 'Add',value:0},
    {label: 'Subtract',value:1},
    {label: 'Multiply',value:2},
    {label: 'Divide',value:3}
  ]
  const clearInput = useCallback(()=> setNum1(''), [])
  //function of the operation
  const operation = (a,b) =>{
    let c
    if(value === 0){
      c = a + b
      setAns(c)
    }
    else if(value ===1){
      c = a - b
      setAns(c)
    }
    else if(value ===2){
      c = a * b
      setAns(c)
    }
    else if(value ===3){
      c = a / b
      setAns(c)
    }
  }
    return(
      <SafeAreaView
        style={styles.container}>
          <TouchableOpacity
              onPress={()=>props.navigation.navigate("HomeScreen")}>
            <Text>
                Back
            </Text>
          </TouchableOpacity>
        <Text style={styles.text}> Calculator </Text>
          <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText ={v => {setNum1(Number.parseInt(v))}}
              placeholder='Enter a value'
              />
            <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText ={v => {setNum2(Number.parseInt(v))}}
              placeholder='Enter a value'/>


            <RadioForm
            style={{margin:20}}
              radio_props={radio_props} 
              onPress={(value) => setValue(value)} 
              selectedButtonColor='green'
              selectedLabelColor="green"
              buttonColor='gray'
              buttonInnerColor="green"
                />

          <View style={styles.buttonContainer}>
              <TouchableOpacity
                 style={styles.buttonReset}
                onPress={()=>setAns("")}>
                <Text>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                
                style={styles.buttonGood}
                onPress={()=>operation(num1,num2)}>
                <Text>Compute</Text>
              </TouchableOpacity>
          </View>

          <Text style={styles.text}>Total Value: {ans}</Text>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
 input: {
  height:40,
  margin:12,
  borderWidth:1,
  padding:10,
  width:'100%',
  borderRadius:20,
  borderColor:'gray'
 },
 container:{
  alignItems:'center',
  justifyContent:'center',
  padding:30,
  textAlign:'center',
  height:'100%',
  backgroundColor:'#111b31'
 },
 text:{
  margin:50,
  fontSize:25,
 },
 buttonReset:{
  backgroundColor:'red',
  paddingHorizontal:10,
  paddingVertical:5,
  borderRadius:10,
 },
 buttonGood:{
  backgroundColor:'blue',
  paddingHorizontal:10,
  paddingVertical:5,
  borderRadius:10,
 },
 buttonContainer:{
  flexDirection:'row',
  justifyContent:'space-evenly',
  width:'100%'
 }
})
export default Calculator;