import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontFamily, FontSize } from '../GlobalStyles';
import BottomNavigationBar from './BottomNavbar';
const CheckoutPage = () => {
  const [fullName, setFullName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [city, setCity] = React.useState('');
  const [streetAddress, setStreetAddress] = React.useState('');
  const [postalCode, setPostalCode] = React.useState('');

  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Navmenu');
  };
  const handleSubmit = () => {
    navigation.navigate('OrderSummary');
  };

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePress}>
            <Image source={require('../assets/Hamburger.png')} style={styles.headerIcon} />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
          </View>

        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Checkout</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Fullname"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter PhoneNumber"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter City"
              value={city}
              onChangeText={setCity}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Street Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Address"
              value={streetAddress}
              onChangeText={setStreetAddress}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Postal Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Post Code"
              value={postalCode}
              onChangeText={setPostalCode}
            />
          </View>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleSubmit}
          >
            <Text style={styles.confirmButtonText}>Confirm Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavigationBar navigation={navigation} />
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  main:{
    backgroundColor:'#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    marginTop:13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  headerIcon: {
    width: 33,
    height: 24,
    top: 8,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 120,
    height: 50,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  title: {
    marginTop:7,
    fontSize: 30,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    color: 'blue',
    marginLeft:5,
  },
  
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    color: 'black',
  },
  input: {
    width: 330,
    height: 45,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: 'rgba(0, 98, 255, 0.07)',
    borderRadius: 20,
  },
  confirmButton: {
    backgroundColor: 'blue',
    padding: 8,
    paddingHorizontal:50,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
   borderRadius:20,
  },
  confirmButtonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',

  },
});

export default CheckoutPage;