import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config'; // Ensure you have the correct path to your config file

const ExpireSoonScreen = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const medicinesCollection = collection(db, 'medicine');
        const medicinesSnapshot = await getDocs(medicinesCollection);
        const medicinesList = medicinesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMedicines(medicinesList);
      } catch (error) {
        console.error('Error fetching medicines: ', error);
      }
    };

    fetchMedicines();
  }, []);
  
  const getExpiryDateColor = (expirydate) => {
    const currentDate = new Date();
    const expirydateObj = new Date(expirydate.seconds * 1000);

    const timeDifference = expirydateObj.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    console.log('Current Date:', currentDate);
    console.log('Expiry Date:', expirydateObj);
    console.log('Days Difference:', daysDifference);
  
    if (daysDifference <= 0) {
      return 'red'; // Expired
    } else if (daysDifference <= 30) {
      return 'orange'; // Close to expiry
    } else {
      return 'green'; // More than one month away from expiry
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={[styles.circle, { backgroundColor: getExpiryDateColor(item.expirydate) }]} />
      <View style={{marginLeft:14}}>
      <Text style={styles.cell}>{item.medicineid}</Text>
      </View>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{new Date(item.expirydate.seconds * 1000).toDateString()}</Text>
      <Text style={styles.cell}>{item.formula}</Text>
      <Text style={styles.cell}>{item.manufacturer}</Text>
      <Text style={styles.cell}>{item.price}</Text>
      <Text style={styles.cell}>{item.qty}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicine Stock</Text>
      <FlatList
        data={medicines}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <View style={styles.headerRow}>
            <View style={{marginRight:0}}>
            <Text style={styles.headerCell}>Status</Text>
            </View>
            <View style={{marginLeft:15}}>
            <Text style={styles.headerCell}>Name</Text>
            </View>
            <View style={{marginLeft:15}}>
            <Text style={styles.headerCell}>Expiry</Text>
            </View>
            <View style={{marginLeft:15}}>
            <Text style={styles.headerCell}>Formula</Text>
            </View>
            <View style={{marginLeft:15}}>
            <Text style={styles.headerCell}>Manuf.</Text>
            </View>
            <View style={{marginLeft:15}}>
            <Text style={styles.headerCell}>Price</Text>
            </View>
            <Text style={styles.headerCell}>Quantity</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    marginTop:30,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
  },
  headerCell: {
    fontSize: 10,
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  cell: {
    fontSize: 8,
    flex: 1,
    textAlign: 'center',
    marginRight:0,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default ExpireSoonScreen;
