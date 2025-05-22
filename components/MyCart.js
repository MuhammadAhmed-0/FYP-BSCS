import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import BottomNavigationBar from './BottomNavbar';

const MyCart = ({ navigation }) => {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);

  
  const sampleProductData = [
    {
      id: 1,
      productName: 'Sample Product 1',
      productPrice: 100,
      productImage: require('./assets/1.png'),
    },
    {
      id: 2,
      productName: 'Sample Product 2',
      productPrice: 150,
      productImage: require('./assets/2.png'),
    },
  ];

  useEffect(() => {
    setProduct(sampleProductData);
    calculateTotal(sampleProductData);
  }, []);


  const calculateTotal = (productData) => {
    const total = productData.reduce((acc, product) => acc + product.productPrice, 0);
    setTotal(total);
  };


  const removeItem = (productId) => {
    const updatedProduct = product.filter((item) => item.id !== productId);
    setProduct(updatedProduct);
    calculateTotal(updatedProduct);
  };

  const renderProducts = (data) => (
    <View
      key={data.id}
      style={{
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
      }}
    >
      <Image
        source={data.productImage}
        style={{
          width: '30%',
          height: '100%',
          resizeMode: 'contain',
        }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>{data.productName}</Text>
        <Text style={{ fontSize: 14 }}>
          Price: RS {data.productPrice.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={() => removeItem(data.id)}>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const checkOut = () => {
    
    console.log('Checkout clicked');
    navigation.navigate('Checkout')
  };

  return (
    <View style={{ flex: 1 }}>
      
      <ScrollView>{product.map(renderProducts)}</ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => (total !== 0 ? checkOut() : null)}
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: 'blue',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: 'white',
              textTransform: 'uppercase',
            }}
          >
            CHECKOUT ({total})
          </Text>
        </TouchableOpacity>
      </View>
      <BottomNavigationBar navigation={navigation}/>
    </View>
  );
};

export default MyCart;
