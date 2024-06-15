import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './config'; // Ensure you have the correct path to your config file

const SalesReportScreen = () => {
  const [invoices, setInvoices] = useState([]);
  const [cashiers, setCashiers] = useState({});

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const invoiceCollection = collection(db, 'invoice');
        const invoiceSnapshot = await getDocs(invoiceCollection);
        const invoiceList = invoiceSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInvoices(invoiceList);
      } catch (error) {
        console.error('Error fetching invoices: ', error);
      }
    };

    const fetchCashiers = async () => {
      try {
        const cashierCollection = collection(db, 'cashier');
        const cashierSnapshot = await getDocs(cashierCollection);
        const cashierData = {};
        cashierSnapshot.forEach(doc => {
          const cashierId = doc.id;
          const cashierInfo = doc.data();
          cashierData[cashierId] = cashierInfo.name; // Assuming the name field is available in the cashier document
        });
        setCashiers(cashierData);
      } catch (error) {
        console.error('Error fetching cashiers: ', error);
      }
    };

    fetchInvoices();
    fetchCashiers();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={{ marginLeft: 65 }}>
        <Text style={styles.cell}>{item.invoiceid}</Text>
      </View>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.price}</Text>
      <Text style={styles.cell}>{item.qty}</Text>
      <Text style={styles.cell}>{item.total}</Text>
      <Text style={styles.cell}>{new Date(item.date.seconds * 1000).toDateString()}</Text>
      <Text style={styles.cell}>{cashiers[item.cashierid]}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sales Report</Text>
      <FlatList
        data={invoices}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}></Text>
            <View style={{ marginLeft: 15 }}>
            <Text style={styles.headerCell}>Name</Text>
            </View>
            <View style={{ marginLeft: 25 }}>
            <Text style={styles.headerCell}>Price</Text>
            </View>
            <Text style={styles.headerCell}>Qty</Text>
            <Text style={styles.headerCell}>Total</Text>
            <Text style={styles.headerCell}>Date</Text>
            <Text style={styles.headerCell}>Cashier</Text>
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
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  cell: {
    fontSize: 8,
    flex: 1,
    textAlign: 'center',
    marginRight: 0,
  },
});

export default SalesReportScreen;
