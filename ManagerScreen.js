import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { collection, getDoc, query, deleteDoc, doc, updateDoc, setDoc } from "firebase/firestore"; 
import { db } from './config.js'; 

const ManagerScreen = () => {
  const [managerid, setManagerId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  const handleAdd = () => {
    if (!managerid)
      {
        Alert.alert("Enter Manager Id");
      }
      else if (!name)
        {
          Alert.alert("Enter Name");
        }
        else
    setDoc(doc(db, "manager",managerid), {
      name: name,
      email: email,
      contact : contact,
    }).then(() => {
      Alert.alert("Message", "Data Added Successfuly");
      setName('');
      setManagerId('');
      setEmail('');
      setContact('');
    }).catch((error) => {
      console.log(error);
    });
    // Add logic here to save the data to your database or perform other actions
  };

  const handleCancel = () => {
    // Clear all fields
    setName('');
    setManagerId('');
    setEmail('');
    setContact('');
  };

  const handleModify = () => {
    if (!managerid) {
      Alert.alert("Error", "Please enter Manager ID to modify.");
      return;
    }

    updateDoc(doc(db, "manager", managerid), {
      name: name,
      email: email,
      contact: contact,
    }).then(() => {
      Alert.alert("Message", "Data Modified Successfully");
      setName('');
      setManagerId('');
      setEmail('');
      setContact('');
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleDelete = () => {
    if (!managerid) {
      Alert.alert("Error", "Please enter Manager ID to delete.");
      return;
    }

    deleteDoc(doc(db, "manager", managerid)).then(() => {
      Alert.alert("Message", "Data Deleted Successfully");
      setName('');
      setManagerId('');
      setEmail('');
      setContact('');
    }).catch((error) => {
      console.log(error);
    });
  };

  //const handleSearch = () => {
    const handleSearch = async () => {
      try {
        // Check if manager ID is provided
        if (!managerid) {
          Alert.alert("Error", "Please enter Manager ID to search.");
          return;
        }
    
        // Get the document reference for the provided manager ID
        const managerRef = doc(db, "manager", managerid);
        const docSnap = await getDoc(managerRef);
    
        // Check if the document exists
        if (docSnap.exists()) {
          // Extract data from the document
          const managerData = docSnap.data();
          if (managerData) {
            // Set the data to the respective state variables
            setName(managerData.name || '');
            setEmail(managerData.email || '');
            setContact(managerData.contact || '');
            // Alert user that data has been fetched
          } else {
            Alert.alert("Error", "No data found for the provided Manager ID.");
          }
        } else {
          Alert.alert("Error", "No document found for the provided Manager ID.");
        }
      } catch (error) {
        console.error("Error searching document:", error);
        Alert.alert("Error", "An error occurred while searching for the document.");
      }
    };
    
  

  return (
   
    <View style={styles.container}>
      <View style={{marginTop:60}}>
      <Icon name="user-tie" type="font-awesome-5" size={140} color="#32CD32" />
      </View>
      <View style={{marginTop:30}}>
      <View style={styles.inputContainer}>
        <Icon name="id-badge" type="font-awesome" color="#32CD32" />
        <TextInput
          style={styles.input}
          placeholder="Manager ID"
          value={managerid}
          onChangeText={text => setManagerId(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="user" type="font-awesome" color="#32CD32" />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Icon name="envelope" type="font-awesome" color="#32CD32" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="phone" type="font-awesome" color="#32CD32" />
        <TextInput
          style={styles.input}
          placeholder="Contact"
          value={contact}
          onChangeText={text => setContact(text)}
          keyboardType="phone-pad"
          
        />
      </View>
      </View>
      
      <View style={styles.buttonContainer}>
  
        <Button title="Add" onPress={handleAdd} buttonStyle={styles.AddButton} />
        <Button title="Cancel" onPress={handleCancel} buttonStyle={styles.cancelButton} />
        <Button title="Search" onPress={handleSearch} buttonStyle={styles.searchButton} />
        <Button title="Modify" onPress={handleModify} buttonStyle={styles.modifyButton} />
        <Button title="Delete" onPress={handleDelete} buttonStyle={styles.deleteButton} />
       
        </View>
      </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0fff0', // Light green background
  },
  inputContainer: {
    
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#32CD32', // Green border
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 300,
    height: 40,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  buttonContainer: {
   flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '75%',
    marginBottom:100,
    
  },
  AddButton: {
    backgroundColor: '#32CD32',
    borderRadius: 50,
    marginVertical: 5,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal:100,
    
  },
  cancelButton: {
    backgroundColor: '#FF6347', // Tomato red
    borderRadius: 50,
    marginVertical: 5,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal:100,
  },
  modifyButton: {
    backgroundColor: '#FFD700', // Gold
    borderRadius: 50,
    marginVertical: 5,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal:100,
  },
  deleteButton: {
    backgroundColor: '#DC143C', // Crimson red
    borderRadius: 50,
    marginVertical: 5,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal:100,
  },
  searchButton: {
    backgroundColor: '#4682B4', // Steel blue
    borderRadius: 50,
    marginVertical: 5,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal:100,

  },
});

export default ManagerScreen;
