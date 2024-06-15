import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Modal, TouchableOpacity, Alert, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { collection, getDocs, getDoc, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from './config.js';

const PharmacistScreen = () => {
    const [pharmacistid, setPharmacistId] = useState('');
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [licenseno, setLicenseNo] = useState('');
    const [managerid, setManagerId] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [managerOptions, setManagerOptions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [specializationModalVisible, setSpecializationModalVisible] = useState(false);

    const specializationOptions = [
        { label: 'Neurology', value: 'Neurology' },
        { label: 'Ambulatory care', value: 'Ambulatory care' },
        { label: 'Pediatric', value: 'Pediatric' },
        { label: 'Oncology', value: 'Oncology' },
        { label: 'Infectious Disease', value: 'Infectious Disease' },
        { label: 'Academic', value: 'Academic' },
        { label: 'Managed care', value: 'Managed care' }
    ];

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

    const handleSpecializationSelect = (specialization) => {
        setSpecialization(specialization);
        setSpecializationModalVisible(false);
    };

    const handleAdd = () => {
        if (!pharmacistid)
            {
              Alert.alert("Enter Pharmacist Id");
            }
            else if (!name)
              {
                Alert.alert("Enter Name");
              }
              else
        setDoc(doc(db, 'pharmacist', pharmacistid), {
            name: name,
            specialization: specialization,
            licenseno: licenseno,
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
        if (!pharmacistid) {
            Alert.alert('Error', 'Please enter Pharmacist ID to modify.');
            return;
        }

        updateDoc(doc(db, 'pharmacist', pharmacistid), {
            name: name,
            specialization: specialization,
            licenseno: licenseno,
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
        if (!pharmacistid) {
            Alert.alert('Error', 'Please enter Pharmacist ID to delete.');
            return;
        }

        deleteDoc(doc(db, 'pharmacist', pharmacistid))
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
            if (!pharmacistid) {
                Alert.alert('Error', 'Please enter Pharmacist ID to search.');
                return;
            }

            const pharmacistRef = doc(db, 'pharmacist', pharmacistid);
            const docSnap = await getDoc(pharmacistRef);

            if (docSnap.exists()) {
                const pharmacistData = docSnap.data();
                if (pharmacistData) {
                    setName(pharmacistData.name || '');
                    setSpecialization(pharmacistData.specialization || '');
                    setLicenseNo(pharmacistData.licenseno || '');
                    setManagerId(pharmacistData.managerid || '');
                    setEmail(pharmacistData.email || '');
                    setContact(pharmacistData.contact || '');
                } else {
                    Alert.alert('Error', 'No data found for the provided Pharmacist ID.');
                }
            } else {
                Alert.alert('Error', 'No document found for the provided Pharmacist ID.');
            }
        } catch (error) {
            console.error('Error searching document:', error);
            Alert.alert('Error', 'An error occurred while searching for the document.');
        }
    };

    const clearFields = () => {
        setPharmacistId('');
        setName('');
        setSpecialization('');
        setLicenseNo('');
        setManagerId('');
        setEmail('');
        setContact('');
    };

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 100 }}>
                <Icon name="user-md" type="font-awesome" size={100} color="#FFD700" />
            </View>
            <View style={{ marginTop: 10 }}>
                <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() => setModalVisible(true)}
                >
                    <Icon name="id-badge" type="font-awesome" color="#FFD700" />
                    <Text style={styles.managerText}>
                        {managerid ? managerOptions.find(option => option.value === managerid)?.label : 'Manager'}
                    </Text>
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                <Icon name="id-badge" type="font-awesome" color="#FFD700" />
                    <TextInput
                        style={styles.input}
                        placeholder="Pharmacist ID"
                        value={pharmacistid}
                        onChangeText={text => setPharmacistId(text)}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="user" type="font-awesome" color="#FFD700" />
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                </View>
                <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() => setSpecializationModalVisible(true)}
                >
                    <Icon name="star" type="font-awesome" color="#FFD700" />
                    <Text style={styles.specializationText}>
                        {specialization ? specialization : 'Specialization'}
                    </Text>
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <Icon name="credit-card" type="font-awesome" color="#FFD700" />
                    <TextInput
                        style={styles.input}
                        placeholder="License No."
                        value={licenseno}
                        onChangeText={text => setLicenseNo(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="envelope" type="font-awesome" color="#FFD700" />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="phone" type="font-awesome" color="#FFD700" />
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={specializationModalVisible}
                onRequestClose={() => setSpecializationModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {specializationOptions.map(option => (
                            <TouchableOpacity
                                key={option.value}
                                style={styles.specializationOption}
                                onPress={() => handleSpecializationSelect(option.value)}
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
        borderColor: '#FFD700', // Yellow border
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
    specializationText: {
        flex: 1,
        marginLeft: 10,
        color: '#4682B4', // Steel blue color
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
    specializationOption: {
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

export default PharmacistScreen;
