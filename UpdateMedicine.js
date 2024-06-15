import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './config.js';

const UpdateMedicine = () => {
  const [medicineid, setMedicineId] = useState('');  
  const [name, setName] = useState('');
  const [expirydate, setExpiryDate] = useState(new Date());
  const [formula, setFormula] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSearch = async () => {
    if (!medicineid) {
      Alert.alert('Error', 'Please enter a Medicine ID to search.');
      return;
    }

    try {
      const docRef = doc(db, "medicine", medicineid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setExpiryDate(data.expirydate.toDate());  // Convert Firestore timestamp to Date object
        setFormula(data.formula);
        setManufacturer(data.manufacturer);
        setPrice(data.price);
        setQty(data.qty);
      } else {
        Alert.alert('Message', 'No Record Found');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while searching for the record.');
    }
  };

  const handleUpdate = async () => {
    if (!medicineid) {
      Alert.alert('Error', 'Please enter a Medicine ID to update.');
      return;
    }
      else

    try {
      const docRef = doc(db, "medicine", medicineid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          name,
          expirydate,
          formula,
          manufacturer,
          price,
          qty,
        });
        Alert.alert('Success', 'Medicine record updated successfully.');
      } else {
        Alert.alert('Message', 'No Record Found');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while updating the record.');
    }
  };

  const handleCancel = () => {
    clearFields();
  };

  const clearFields = () => {
    setMedicineId('');
    setName('');
    setExpiryDate(new Date());
    setFormula('');
    setManufacturer('');
    setPrice('');
    setQty('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Record</Text>
      
      <View style={styles.inputContainer}>
        <Icon name="local-hospital" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Medicine ID"
          value={medicineid}
          onChangeText={setMedicineId}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Icon name="label" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Icon name="date-range" size={20} color="#000" />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={[styles.input,{ color: '#333' }]}
            placeholder="Expiry Date"
            value={expirydate.toDateString()}
            editable={false}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={expirydate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || expirydate;
              setShowDatePicker(false);
              setExpiryDate(currentDate);
            }}
          />
        )}
      </View>
      
      <View style={styles.inputContainer}>
        <Icon name="science" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Formula"
          value={formula}
          onChangeText={setFormula}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Icon name="business" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Manufacturer"
          value={manufacturer}
          onChangeText={setManufacturer}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Icon name="attach-money" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Icon name="inventory" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={qty}
          onChangeText={setQty}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop:30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  searchButton: {
    backgroundColor: '#32CD32', // Lime green
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  updateButton: {
    backgroundColor: '#4169E1', // Royal blue
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: '#FF6347', // Tomato red
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateMedicine;
