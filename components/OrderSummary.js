import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import BottomNavigationBar from './BottomNavbar';

const OrderSummary = ({ navigation, route }) => {
  const [fullName, setFullName] = useState('Dummy1');
  const [address, setAddress] = useState('Dummy2');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [totalAmount, setTotalAmount] = useState(120.0);
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.itemLabel}>Full Name:</Text>
            <Text style={styles.itemValue}>{fullName}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.itemLabel}>Phone Number:</Text>
            <Text style={styles.itemValue}>{phoneNumber}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.itemLabel}>Address:</Text>
            <Text style={styles.itemValue}>{address}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.itemLabel}>Payment Method:</Text>
            <Text style={styles.itemValue}>{paymentMethod}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.itemLabel}>Total Amount:</Text>
            <Text style={styles.totalAmount}>Rs {totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('MainScreen')}>
        <Text style={styles.checkoutButtonText}>Back to Home</Text>
      </TouchableOpacity>
      <BottomNavigationBar navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    padding: 16,
  },
  summarySection: {
    padding: 16,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemLabel: {
    fontWeight: 'bold',
    color: 'gray',
  },
  itemValue: {
    flex: 1,
    textAlign: 'right',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'right',
  },
  checkoutButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderSummary;
