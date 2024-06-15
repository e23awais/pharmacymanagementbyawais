import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Modal, TouchableOpacity, Alert, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { collection, getDocs, getDoc, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from './config.js';

const CashierScreen = () => {
    const [cashierid, SetCashierId] = useState('');
    const [name, setName] = useState('');
    const [managerid, setManagerId] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [managerOptions, setManagerOptions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
   
    useEffect(() => {
        fetchManagerOptions();
    }, []);

    const fetchManagerOptions = async () => {
        try {
            const managerSnapshot = await getDocs(collection(db, 'manager'));
            const options = managerSnapshot.docs.map(doc => ({
                label: doc.data().name,
                value: doc.id
            }));
            setManagerOptions(options);
        } catch (error) {
            console.error('Error fetching manager options:', error);
        }
    };

    const handleManagerSelect = (managerid) => {
        setManagerId(managerid);
        setModalVisible(false);
    };

   

    const handleAdd = () => {
        if (!cashierid)
            {
              Alert.alert("Enter Cashier Id");
            }
            else if (!name)
              {
                Alert.alert("Enter Name");
              }
              else
        setDoc(doc(db, 'cashier', cashierid), {
            name: name,
            managerid: managerid,
            email: email,
            contact: contact
        })
            .then(() => {
                Alert.alert('Message', 'Data Added Successfully');
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
        if (!cashierid) {
            Alert.alert('Error', 'Please enter Cashier ID to modify.');
            return;
        }

        updateDoc(doc(db, 'cashier', cashierid), {
            name: name,
            managerid: managerid,
            email: email,
            contact: contact
        })
            .then(() => {
                Alert.alert('Message', 'Data Modified Successfully');
                clearFields();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = () => {
        if (!cashierid) {
            Alert.alert('Error', 'Please enter Cashier ID to delete.');
            return;
        }

        deleteDoc(doc(db, 'cashier', cashierid))
            .then(() => {
                Alert.alert('Message', 'Data Deleted Successfully');
                clearFields();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSearch = async () => {
        try {
            if (!cashierid) {
                Alert.alert('Error', 'Please enter Cashier ID to search.');
                return;
            }

            const cashierRef = doc(db, 'cashier', cashierid);
            const docSnap = await getDoc(cashierRef);

            if (docSnap.exists()) {
                const cashierData = docSnap.data();
                if (cashierData) {
                    setName(cashierData.name || '');
                    setManagerId(cashierData.managerid || '');
                    setEmail(cashierData.email || '');
                    setContact(cashierData.contact || '');
                } else {
                    Alert.alert('Error', 'No data found for the provided Cashier ID.');
                }
            } else {
                Alert.alert('Error', 'No document found for the provided Cashier ID.');
            }
        } catch (error) {
            console.error('Error searching document:', error);
            Alert.alert('Error', 'An error occurred while searching for the document.');
        }
    };

    const clearFields = () => {
        SetCashierId('');
        setName('');
        setManagerId('');
        setEmail('');
        setContact('');
    };

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 100 }}>
                <Icon name="user-md" type="font-awesome" size={100} color="#FFA500" />
            </View>
            <View style={{ marginTop: 10 }}>
                <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() => setModalVisible(true)}
                >
                    <Icon name="id-badge" type="font-awesome" color="#FFA500" />
                    <Text style={styles.managerText}>
                        {managerid ? managerOptions.find(option => option.value === managerid)?.label : 'Manager'}
                    </Text>
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                <Icon name="id-badge" type="font-awesome" color="#FFA500" />
                    <TextInput
                        style={styles.input}
                        placeholder="Cashier ID"
                        value={cashierid}
                        onChangeText={text => SetCashierId(text)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="user" type="font-awesome" color="#FFA500" />
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                </View>
                
                    <View style={styles.inputContainer}>
                    <Icon name="envelope" type="font-awesome" color="#FFA500" />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="phone" type="font-awesome" color="#FFA500" />
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
                <Button title="Add" onPress={handleAdd} buttonStyle={styles.addButton} />
                <Button title="Cancel" onPress={handleCancel} buttonStyle={styles.cancelButton} />
                <Button title="Search" onPress={handleSearch} buttonStyle={styles.searchButton} />
                <Button title="Modify" onPress={handleModify} buttonStyle={styles.modifyButton} />
                <Button title="Delete" onPress={handleDelete} buttonStyle={styles.deleteButton} />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {managerOptions.map(option => (
                            <TouchableOpacity
                                key={option.value}
                                style={styles.managerOption}
                                onPress={() => handleManagerSelect(option.value)}
                                >
                                <Text>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>
           
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
        borderColor: '#FFA500', // Yellow border
        borderRadius: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginBottom: 10,
        width: 300,
        height: 40,
    },
    managerText: {
        flex: 1,
        marginLeft: 10,
        color: '#DC143C', // Crimson color
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    managerOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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
        marginBottom: 100,
    },
    addButton: {
        backgroundColor: '#32CD32', // Lime green
        borderRadius: 50,
        marginVertical: 5,
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 100,
    },
    cancelButton: {
        backgroundColor: '#FF6347', // Tomato red
        borderRadius: 50,
        marginVertical: 5,
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 100,
    },
    modifyButton: {
        backgroundColor: '#FFD700', // Yellow
        borderRadius: 50,
        marginVertical: 5,
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 100,
    },
    deleteButton: {
        backgroundColor: '#DC143C', // Crimson red
        borderRadius: 50,
        marginVertical: 5,
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 100,
    },
    searchButton: {
        backgroundColor: '#4682B4', // Steel blue
        borderRadius: 50,
        marginVertical: 5,
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 100,
    },
});

export default CashierScreen;
