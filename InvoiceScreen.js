import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, FlatList, Alert, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from './config.js'; // Ensure you have your Firebase config set up
import { collection, getDocs, getDoc, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';

const Invoice = () => {
  const [invoiceid, setInvoiceId] = useState('');
  const [name, setName] = useState('');
  const [medicineid, setMedicineId] = useState('');
  const [cashierid, setCashierId] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [total, setTotal] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [cashierOptions, setCashierOptions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    fetchCashierOptions();
  }, []);

  const fetchCashierOptions = async () => {
    try {
      const cashierSnapshot = await getDocs(collection(db, 'cashier'));
      const options = cashierSnapshot.docs.map(doc => ({
        label: doc.data().name,
        value: doc.id
      }));
      setCashierOptions(options);
    } catch (error) {
      console.error('Error fetching cashier options:', error);
    }
  };

  const handleCashierSelect = (cashierid) => {
    setCashierId(cashierid);
    setModalVisible(false);
  };

  useEffect(() => {
    if(qty=='')
      {
        setTotal(price);    
      }
      else
    setTotal(qty * price);
  }, [qty, price]);

  const handleSearchMedicine = async (text) => {
    setName(text);
    if (text.length > 0) {
      const medicineCollection = collection(db, 'medicine');
      const medicineSnapshot = await getDocs(medicineCollection);
      const medicineList = medicineSnapshot.docs.map(doc => ({
        name: doc.data().name,
        medicineid: doc.id,
        price: doc.data().price
      }));
      const filteredMedicines = medicineList.filter(med => med.name.toLowerCase().startsWith(text.toLowerCase()));
      setSuggestions(filteredMedicines);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectMedicine = (medicine) => {
    setName(medicine.name);
    setMedicineId(medicine.medicineid);
    setPrice(medicine.price);
    setSuggestions([]);
  };

  const handleAdd = () => {
    if (!medicineid) {
      Alert.alert('Error', 'Please select a medicine.');
      return;
    }
  
    setDoc(doc(db, 'invoice', invoiceid), {
      name: name,
      medicineid: medicineid,
      cashierid: cashierid,
      price: price,
      qty: qty,
      total: total,
      date: currentDate
    })
    .then(() => {
      Alert.alert('Message', 'Invoice Added Successfully');
      clearFields();
    })
    .catch((error) => {
      console.log(error);
    });
  };
  

  const handleCancel = () => {
    clearFields();
  };

  const handleModify = () => {
    if (!invoiceid) {
      Alert.alert('Error', 'Please enter Invoice ID to modify.');
      return;
    }

    updateDoc(doc(db, 'invoice', invoiceid), {
      name: name,
      medicineid: medicineid,
      cashierid: cashierid,
      price: price,
      qty: qty,
      total: total,
      date: currentDate
    })
    .then(() => {
      Alert.alert('Message', 'Invoice Modified Successfully');
      clearFields();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleDelete = () => {
    if (!invoiceid) {
      Alert.alert('Error', 'Please enter Invoice ID to delete.');
      return;
    }

    deleteDoc(doc(db, 'invoice', invoiceid))
    .then(() => {
      Alert.alert('Message', 'Invoice Deleted Successfully');
      clearFields();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleSearch = async () => {
    try {
      if (!invoiceid) {
        Alert.alert('Error', 'Please enter Invoice ID to search.');
        return;
      }

      const invoiceRef = doc(db, 'invoice', invoiceid);
      const docSnap = await getDoc(invoiceRef);

      if (docSnap.exists()) {
        const invoiceData = docSnap.data();
        if (invoiceData) {
          setName(invoiceData.name || '');
          setMedicineId(invoiceData.medicineid || '');
          setCashierId(invoiceData.cashierid || '');
          setPrice(invoiceData.price || '');
          setQty(invoiceData.qty || '');
          setTotal(invoiceData.total || '');
        } else {
          Alert.alert('Error', 'No data found for the provided Invoice ID.');
        }
      } else {
        Alert.alert('Error', 'No document found for the provided Invoice ID.');
      }
    } catch (error) {
      console.error('Error searching document:', error);
      Alert.alert('Error', 'An error occurred while searching for the document.');
    }
  };

  const clearFields = () => {
    setInvoiceId('');
    setName('');
    setMedicineId('');
    setPrice('');
    setQty('');
    setTotal('');
    setSuggestions([]);
  };
  return (
    <FlatList
      data={[{ key: 'form' }]}
      renderItem={() => (
        <View style={styles.container}>
          <View style={{ marginTop: 60 }}>
            <Icon name="file" type="font-awesome" size={140} color="red" />
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={styles.inputContainer}>
              <Icon name="id-badge" type="font-awesome" color="red" />
              <TextInput
                style={styles.input}
                placeholder="Invoice ID"
                value={invoiceid}
                onChangeText={text => setInvoiceId(text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="medkit" type="font-awesome" color="red" />
              <TextInput
                style={styles.input}
                placeholder="Medicine Name"
                value={name}
                onChangeText={text => handleSearchMedicine(text)}
              />
            </View>
            {suggestions.length > 0 && (
              <FlatList
                data={suggestions}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectMedicine(item)}>
                    <Text style={styles.suggestion}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.medicineid}
                style={styles.suggestionsContainer}
              />
            )}
            <View style={styles.inputContainer}>
              <Icon name="sort-numeric-asc" type="font-awesome" color="red" />
              <TextInput
                style={styles.input}
                placeholder="Medicine ID"
                value={medicineid}
                editable={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="dollar" type="font-awesome" color="red" />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={price.toString()}
                editable={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="sort-numeric-asc" type="font-awesome" color="red" />
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                value={qty.toString()}
                onChangeText={text => setQty(parseInt(text))}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="calculator" type="font-awesome" color="red" />
              <TextInput
                style={styles.input}
                placeholder="Total"
                value={total.toString()}
                editable={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="calendar" type="font-awesome" color="red" />
              <Text style={styles.input}>{currentDate}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Icon name="user" type="font-awesome" color="red" />
              <TouchableOpacity
                style={styles.input}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.cashierText}>
                  {cashierid ? cashierOptions.find(option => option.value === cashierid)?.label : 'Cashier'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
              
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modifyButton} onPress={handleModify}>
              <Text style={styles.buttonText}>Modify</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <FlatList
                  data={cashierOptions}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.option}
                      onPress={() => handleCashierSelect(item.value)}
                    >
                      <Text style={styles.optionText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.value}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}
      keyExtractor={item => item.key}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: '100%',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: 'black',
  },
  cashierText: {
    flex: 1,
    marginLeft: 10,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '115%',
    marginTop: 10,
    paddingHorizontal:10,
  },
  addButton: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  searchButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  modifyButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
    buttonText: {
    color: 'white',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#32CD32',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    
    fontSize: 16,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  suggestionsContainer: {
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: 140,
    zIndex: 1,
    maxHeight: 200,
  },
});

export default Invoice;
