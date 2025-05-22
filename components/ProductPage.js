import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, SafeAreaView, ScrollView, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontFamily, FontSize } from '../GlobalStyles';
import BottomNavigationBar from './BottomNavbar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProductDetail = ({ navigation, route }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  const { selectedImage, selectedGif, selectedId, selectedPrice, selectedCategory, selectedTitle } = route.params;

  useEffect(() => {
    checkWishlistStatus();
  }, []);

  const checkWishlistStatus = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        Alert.alert('Error', 'No access token found. Please log in again.');
        return;
      }

      const response = await fetch('http://192.168.10.41:5000/wishlist', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch wishlist items');
      }

      const wishlistResponseText = await response.text();
      const wishlistData = JSON.parse(wishlistResponseText);

      if (!Array.isArray(wishlistData.wishlist)) {
        throw new Error('Fetched wishlist is not an array');
      }

      const wishlistIds = wishlistData.wishlist.map(item => item.glasses_id);
      setIsInWishlist(wishlistIds.includes(selectedId));
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  };

  const handlePress = () => {
    navigation.navigate('Navmenu');
  };

  const handleCameraPress = (selectedId) => {
    navigation.navigate('Camera', { selectedId });
  };

  const handleWishlistToggle = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        Alert.alert('Error', 'No access token found. Please log in again.');
        return;
      }

      const response = await fetch('http://192.168.10.41:5000/wishlist', {
        method: isInWishlist ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ glasses_id: selectedId }),
      });

      if (!response.ok) {
        Alert.alert('Error', 'Failed to update wishlist.');
      } else {
        const responseData = await response.json();
        Alert.alert('Success', responseData.message);
        setIsInWishlist(!isInWishlist);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePress}>
          <Image source={require('../assets/Hamburger.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => handleCameraPress(selectedId)}>
              <Image source={selectedImage} style={styles.productImage} />
            </TouchableOpacity>
            <Image source={selectedGif} style={styles.productgif} />
          </View>
        </ScrollView>
        <View style={styles.productDetails}>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={() => handleCameraPress(selectedId)}>
              <Image style={styles.icon} source={require('../assets/ar_button.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleWishlistToggle}>
              <FontAwesome name="heart" size={30} color={isInWishlist ? 'blue' : 'white'} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>{selectedTitle}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.title}>Price</Text>
            <Text style={styles.priceNumber}>{selectedPrice}</Text>
          </View>
          <View style={styles.colorContainer}>
            <Text style={styles.title}>Category</Text>
            <Text style={styles.category}>{selectedCategory}</Text>
          </View>
          <View style={styles.colorContainer}>
            <Text style={styles.title}>Color</Text>
            <Image style={styles.iconColor} source={require('../assets/Black.png')} />
          </View>
          <View style={styles.colorContainer}>
            <Text style={styles.title}>Lens</Text>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ color: 'black' }}>Simple lens</Text>
              <View style={{ borderBottomWidth: 1, borderBottomColor: 'blue', width: '23%' }} />
            </View>
          </View>
          <View style={styles.tryOnContainer}>
            <Pressable
              style={styles.tryOnButton}
              onPress={() => handleCameraPress(selectedId)}
            >
              <Text style={styles.tryOnText}>Try On</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <BottomNavigationBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'white',
  },
  header: {
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
  scrollContainer: {
    flexGrow: 1,
  },
  mainProduct: {
    alignItems: 'center',
    marginBottom: windowHeight * 0.02,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
  },
  productImage: {
    width: windowWidth * 0.63, 
    height: windowHeight * 0.16, 
    borderRadius: 30,
    marginLeft:40, 
  },
  productgif:{
    width: windowWidth * 0.99, 
    height: windowHeight * 0.20, 
    borderRadius: 30,
    marginLeft:30, 
  },
  productDetails: {
    backgroundColor: '#E4EBF6',
    padding: 10,
    marginBottom: windowHeight * 0.03,
    width: '100%',
    borderRadius: windowHeight * 0.05,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    fontSize: FontSize.large,
    color: 'black',
  },
  icon: {
    marginTop: 10,
    marginLeft: 20,
    width: 35,
    height: 35,
    marginBottom: 10,
  },
  rating: {
    color: 'blue',
  },
  description: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    fontSize: FontSize.small,
    color: 'blue',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceNumber: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: FontSize.medium,
    color: '#FFFFFF',
    backgroundColor: '#0000FF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  colorContainer: {
    flexDirection: 'column',
  },
  category: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: FontSize.medium,
    color: '#000',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  iconColor: {
    marginLeft:5,
    marginTop:3,
    width: 20,
    height: 20,
  },
  tryOnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  tryOnButton: {
    backgroundColor: '#0000FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom:18,
  },
  tryOnText: {
    color: '#FFFFFF',
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
});

export default ProductDetail;
