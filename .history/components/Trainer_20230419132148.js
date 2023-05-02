import {React,useState,useEffect} from 'react'
import { SafeAreaView, Text, StyleSheet,TouchableOpacity,FlatList, TextInput, View, Modal, TouchableWithoutFeedback, Button } from 'react-native';

//amplify
import { Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);
import 'core-js/full/symbol/async-iterator';
import { DataStore } from '@aws-amplify/datastore';
import { TodoTask } from '../src/models';


//table components
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

function Trainer() {

  //date
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };
  //Create Data in AWS Amplify
  const submit = async () =>{
    const isoDate = date.toISOString();
    //return value if the inputvalue is empty
    if (task.trim() === '' && date.trim() === '') return;
      await DataStore.save(
        new TodoTask({
        "Task": task,
        "Deadline": isoDate
        
      })
      
      );
      console.log(isoDate)
      console.log(typeof(isoDate))
      setTask('')
  }
  
  //Create States
  const [task, setTask] = useState()
  const [deadline, setDeadline] = useState()



  //Read Data 
  useEffect(() => {
    async function fetchItem() {
      const items = await DataStore.query(TodoTask);
      setRead(items);
      
    }
  
    fetchItem();

    //observing the Data Store TodoTask when changes occur
    const subscription = DataStore.observe(TodoTask).subscribe(() => {
      fetchItem();
    });
  
    return () => subscription.unsubscribe();
  }, []);
  
  //read state
  const [read, setRead] = useState()
  
  
  // update 
  const [updatedTask, setUpdatedTask] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');

  const handleUpdate = async(id) => {
    const item = await DataStore.query(TodoTask, id);
    item.Task = updatedTask;
    item.Deadline = Number.parseInt(updatedDate);
    await DataStore.save(item);
    toggleModal()
    setUpdatedDate('')
    setUpdatedTask('')

  }

  

//modal
const [modalVisible, setModalVisible] = useState(false)
const toggleModal = () => {
  setModalVisible(!modalVisible);
};

const [modalVisible2, setModalVisible2] = useState(false)
const toggleModal2 = () => {
  setModalVisible2(!modalVisible2);
};


  const [deleteItem, setDeleteItem] = useState()
  //Delete
  async function handleDelete(id) {
    if(deleteItem === "DELETE"){
  const itemToDelete = await DataStore.query(TodoTask, id);
  if (!itemToDelete) return; // item with ID not found
  await DataStore.delete(itemToDelete);

  toggleModal2()
  console.log(deleteItem)
  setDeleteItem('')
    }
    else{
      return
    }
  // Update the state variable that holds the list of items
  // setItems(items.filter((item) => item.id !== id));
}


  return (
    <SafeAreaView style={styles.container}>

      <Text
        style={styles.header}>
        Input a Deadline: 
      </Text>
      <View>
      <Text onPress={() => setShowPicker(true)}>
        {date.toLocaleDateString()}
      </Text>
      {showPicker && (
        <DateTimePicker
          testID="datePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
      {/* <TextInput
              // keyboardType='numeric'
              // style={styles.textInput}
              // onChangeText ={v => {setDeadline(v)}}
              // placeholder='hh : mm'
              // maxLength={4}
              // value={deadline}
              value={date.toLocaleDateString()}
              onFocus={() => setShowPicker(true)}
              editable={false}
              /> */}
      <Text
        style={styles.header}>
        Input a Task: 
      </Text>
      <TextInput
              style={styles.textInput}
              onChangeText ={v => {setTask(v)}}
              placeholder='Enter a value'
              value={task}
              />
       
        <TouchableOpacity 
          style={styles.button}
          onPress={()=>submit()}>
          <Text>Submit</Text>
        </TouchableOpacity>
        {/* show Data */}
        
        
          <FlatList
          style={{marginTop:100}}
            data={read}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.table}>
                <Text>{moment(item.Deadline).format('MM/DD/YYYY')}</Text>
                <Text>{item.Task}</Text>
              <TouchableWithoutFeedback onPress={toggleModal}>
                <View style={styles.button}>
                  <Text>Update</Text>
                </View>
              </TouchableWithoutFeedback>
              {/* Model Content */}
              <Modal visible={modalVisible} transparent={true}
              >
                <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                <TouchableWithoutFeedback onPress={toggleModal} >
                            <View style={{alignSelf:'flex-end',marginRight:10}}>
                              <Text style={{fontSize:15}}>X</Text>
                            </View>
                          </TouchableWithoutFeedback>
                  <Text
                    style={styles.text}>
                      Input Updated Deadline:
                      </Text>
                      <TextInput
                          keyboardType='numeric'
                          style={styles.textInput}
                          onChangeText ={v => {setUpdatedDate((v))}}
                          placeholder='hh : mm'
                          maxLength={4}
                          value={updatedDate}
                          />
                          <Text
                    style={styles.text}>
                      Input Updated Task:
                      </Text>
                      <TextInput
                          style={styles.textInput}
                          onChangeText ={v => {setUpdatedTask((v))}}
                          placeholder='Updated Task....'
                          value={updatedTask}
                          />

                          {/* Modal Button  */}
                        <View style={{flexDirection:'row',alignSelf:'center'}}>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={()=>handleUpdate(item.id)}>
                            <Text>
                              Update
                            </Text>
                          </TouchableOpacity>
                          
                        </View>
                </View>
              </View>
              </Modal>

                {/* DeleteButton */}
                <TouchableOpacity 
                  style={styles.button}
                  onPress={toggleModal2}>
                  <Text>Delete</Text>
                </TouchableOpacity>
                {/* Model Content */}
              <Modal visible={modalVisible2} transparent={true}
              >
                <View style={styles.modalContainer}>
                <View style={styles.modalContent2}>
                <TouchableWithoutFeedback onPress={toggleModal2} >
                            <View style={{alignSelf:'flex-end',marginRight:10}}>
                              <Text style={{fontSize:15}}>X</Text>
                            </View>
                          </TouchableWithoutFeedback>
                  <Text
                    style={styles.text}>
                      Type 'DELETE' to delete task
                      </Text>
                      <TextInput
                          style={styles.textInput}
                          onChangeText ={v=> {setDeleteItem((v))}}
                          value={deleteItem}
                          />

                          {/* Modal Button  */}
                        <View style={{flexDirection:'row',alignSelf:'center'}}>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={()=>handleDelete(item.id)}>
                            <Text>
                              Delete
                            </Text>
                          </TouchableOpacity>
                          
                        </View>
                </View>
              </View>
              </Modal>
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
  modalContent2: {
    backgroundColor: '#111b31',
    padding: 16,
    borderRadius: 8,
    width:350,
    height:200,
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