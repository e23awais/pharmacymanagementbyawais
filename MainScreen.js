import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>  PHARMACY MANAGEMENT </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#64dd17' }]}
          onPress={() => navigation.navigate('ManagerScreen')}>
          <Ionicons name="person" size={24} color="white" />
          <Text style={styles.buttonText}>Manager</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ffd600' }]}
          onPress={() => navigation.navigate('PharmacistScreen')}>
          <Ionicons name="flask" size={24} color="white" />
          <Text style={styles.buttonText}>Pharmacist</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ff6d00' }]}
          onPress={() => navigation.navigate('CashierScreen')}>
          <Ionicons name="cash" size={24} color="white" />
          <Text style={styles.buttonText}>Cashier</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ff1744' }]}
          onPress={() => navigation.navigate('InvoiceScreen')}>
          <Ionicons name="basket" size={24} color="white" />
          <Text style={styles.buttonText}>Invoice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#2979ff' }]}
          onPress={() => navigation.navigate('SalesReportScreen')}>
          <Ionicons name="document-text" size={24} color="white" />
          <Text style={styles.buttonText}>Sales Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
  style={[styles.button, { backgroundColor: '#a64dff' }]}
  onPress={() => navigation.navigate('ExpireSoonScreen')}>
  <Ionicons name="hourglass-outline" size={24} color="white" />
  <Text style={styles.buttonText}>Expire Soon</Text>
</TouchableOpacity>

      </View>
      {/* Bottom tabs */}
      <View style={styles.bottomTabs}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('AddMedicine')}>
          <Ionicons name="add-circle-outline" size={24} color="white" />
          <Text style={styles.tabButtonText}>Add Medicine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('UpdateMedicine')}>
          <Ionicons name="create-outline" size={24} color="white" />
          <Text style={styles.tabButtonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('DeleteMedicine')}>
          <Ionicons name="trash-outline" size={24} color="white" />
          <Text style={styles.tabButtonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('SearchMedicine')}>
          <Ionicons name="search-outline" size={24} color="white" />
          <Text style={styles.tabButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#072dee',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 100,
  },
  button: {
    width: '48%',
    backgroundColor: '#007bff',
    paddingVertical: 30,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  bottomTabs: {
    
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '118%',
    borderTopWidth: 1,
    borderTopColor: '#fff',
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor : '#0099ff',
  },
  tabButton: {
    alignItems: 'center',
    
    
  },
  tabButtonText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
});

export default MainScreen;
