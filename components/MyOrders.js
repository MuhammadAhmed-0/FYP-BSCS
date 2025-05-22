import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import BottomNavigationBar from './BottomNavbar';

const MyOrders = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  const sampleOrderData = [
    {
      id: 1,
      productName: 'Sample Order 1',
      productPrice: 100,
      productImage: require('./assets/1.png'),
    },
    {
      id: 2,
      productName: 'Sample Order 2',
      productPrice: 150,
      productImage: require('./assets/2.png'),
    },
  ];

  useEffect(() => {
    setOrders(sampleOrderData);
    calculateTotal(sampleOrderData);
  }, []);

  const calculateTotal = (orderData) => {
    const total = orderData.reduce((acc, order) => acc + order.productPrice, 0);
    setTotal(total);
  };

  const renderOrders = (data) => (
    <View key={data.id} style={styles.orderContainer}>
      <Image source={data.productImage} style={styles.image} />
      <View style={styles.orderDetails}>
        <Text style={styles.productName}>{data.productName}</Text>
        <Text style={styles.productPrice}>Price: RS {data.productPrice.toFixed(2)}</Text>
      </View>
    </View>
  );

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView>{orders.map(renderOrders)}</ScrollView>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: RS {total.toFixed(2)}</Text>
        <TouchableOpacity
          onPress={() => console.log('Reorder clicked')}
          style={styles.reorderButton}
        >
          <Text style={styles.reorderButtonText}>REORDER</Text>
        </TouchableOpacity>
      </View>
      <BottomNavigationBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderContainer: {
    width: '100%',
    height: 120,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  image: {
    width: '30%',
    height: '100%',
    resizeMode: 'contain',
  },
  orderDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
  },
  productPrice: {
    fontSize: 14,
  },
  totalContainer: {
    position: 'absolute',
    bottom: 10,
    height: '8%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  reorderButton: {
    width: '86%',
    height: '8%',
    backgroundColor: 'blue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reorderButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
    color: 'white',
    textTransform: 'uppercase',
  },
});

export default MyOrders;
