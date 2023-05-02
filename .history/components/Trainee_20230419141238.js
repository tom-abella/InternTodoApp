import {React,useEffect,useState} from 'react'
import { SafeAreaView, Text, StyleSheet,TouchableOpacity,FlatList,View } from 'react-native';

//amplify
import { Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);
import 'core-js/full/symbol/async-iterator';
import { DataStore } from '@aws-amplify/datastore';
import { TodoTask } from '../src/models';
import { CompletedTask } from '../src/models';

import moment from "moment";


const Trainer = () =>{

     //Read Data 
  useEffect(() => {
    //TodoTask Model
    async function fetchItem() {
      const items = await DataStore.query(TodoTask);
      setRead(items);
      
    }
    //CompletedTask Model
    async function fetchItem2() {
        const items = await DataStore.query(CompletedTask);
        setRead2(items);
        
        
      }
    fetchItem();
    fetchItem2();

    //observing the Data Store TodoTask when changes occur
    const subscription = DataStore.observe(TodoTask).subscribe(() => {
      fetchItem();
    });
    const subscription2 = DataStore.observe(CompletedTask).subscribe(() => {
        fetchItem2();
      });
  
    return () => subscription.unsubscribe();


  }, []);
  
  //read state
  const [read, setRead] = useState()
  const [read2, setRead2] = useState()


  //Create Data in AWS Amplify
//   const [newTask, setNewTask] = useState()
//   const [newDeadline, setNewDeadline] = useState()
  const submit = async (Task, Deadline,id) =>{
    //return value if the inputvalue is empty
      await DataStore.save(
        new CompletedTask({
        "Task": Task,
        "Deadline": Deadline

      })
      );
      console.log(Task,isoDate)
      handleDelete(id)
      console.log(Deadline)
      
      // setTask('')
      // setDeadline('')
  }

    //Delete
    async function handleDelete(id) {
        const itemToDelete = await DataStore.query(TodoTask, id);
        if (!itemToDelete) return; // item with ID not found
      
        await DataStore.delete(itemToDelete);
      }

      const undo = async(Task, Deadline,id)=>{
      await DataStore.save(
        new TodoTask({
        "Task": Task,
        "Deadline": isoDate
      })
      );
      const itemToDelete = await DataStore.query(CompletedTask, id);
        if (!itemToDelete) return; // item with ID not found
        await DataStore.delete(itemToDelete);
      
      // setTask('')
      // setDeadline('')

      }


    return(
        <SafeAreaView
            style={styles.container}>
                <Text>
                    Pending Task
                </Text>
                      <FlatList
          style={{marginTop:100}}
            data={read}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.table}>
                <Text>{moment(item.Deadline).format('MM/DD/YYYY')}</Text>
                <Text>{item.Task}</Text>
                {/* DeleteButton */}
                <TouchableOpacity 
                  style={styles.button}
                  onPress={()=>submit(item.Task, item.Deadline, item.id)}>
                  <Text>Complete</Text>
                </TouchableOpacity>
              </View>
            )}
          /> 
          <Text>
                    Completed Task
                </Text>
                <FlatList
          style={{marginTop:100}}
            data={read2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.table}>
                <Text>{moment(item.Deadline).format('MM/DD/YYYY')}</Text>
                <Text>{item.Task}</Text>
                {/* DeleteButton */}
                <TouchableOpacity 
                  style={styles.button}
                  onPress={()=>undo(item.Task, item.Deadline, item.id)}>
                  <Text>Undo</Text>
                </TouchableOpacity>
              </View>
            )}
          /> 
        </SafeAreaView>
    )
    
}
const styles = StyleSheet.create({
    container:{
      backgroundColor:'#111b31',
      height:'100%', 
      justifyContent:'center',
      alignItems:"center",
      justifyContent:'center',
      paddingVertical:50,
      paddingHorizontal:25,
      gap:10,
    },
    header:{
      alignSelf:'flex-start'
    },
    textInput:{ 
      width:'100%',
      borderWidth:1,
      borderColor:'#f5f5f5',
      borderRadius:10,
    },
    button:{
      padding:10,
      backgroundColor:'#0080ff',
      borderRadius:10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      gap:10,
    },
    modalContent: {
      backgroundColor: '#111b31',
      padding: 16,
      borderRadius: 8,
      width:350,
      height:300,
      gap:10,
      justifyContent:'center'
    },
    text:{
      color:'#f5f5f5'
    },
    modal:{
      backgroundColor:'gray'
    },
    table:{
      flexDirection:'row', 
      justifyContent:'space-evenly',
      width:'100%', 
      alignItems:'center',
      borderWidth:1,
      borderColor:'#f5f5f5',
      padding:10,
      gap:10
  }
  })
export default Trainer

