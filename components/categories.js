import React, { useState, useEffect } from 'react';
import { Image, Alert, StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigationBar from './BottomNavbar';
import { FontFamily, FontSize } from '../GlobalStyles';
import { images, gifs } from '../config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const Categories = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [likedItems, setLikedItems] = useState(new Set());

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
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
      const likedItemsSet = new Set(wishlistIds);
      setLikedItems(likedItemsSet);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  };

  const handlePress = () => {
    navigation.navigate('Navmenu');
  };

  const handleImagePress = (selectedImage, selectedGif, selectedId, selectedPrice, selectedCategory, selectedTitle) => {
    navigation.navigate('ProductPage', { selectedImage, selectedGif, selectedId, selectedPrice, selectedCategory, selectedTitle });
  };
  const handleHeartPress = async (itemId) => {
    const isItemInWishlist = likedItems.has(itemId);
    const newLikedItems = new Set(likedItems);

    if (isItemInWishlist) {
      newLikedItems.delete(itemId);
    } else {
      newLikedItems.add(itemId);
    }
    setLikedItems(newLikedItems);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        Alert.alert('Error', 'No access token found. Please log in again.');
        return;
      }

      const response = await fetch('http://192.168.10.41:5000/wishlist', {
        method: isItemInWishlist ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ glasses_id: itemId }),
      });

      if (!response.ok) {
        Alert.alert('Error', 'Failed to update wishlist.');
      } else {
        const responseData = await response.json();
        Alert.alert('Success', responseData.message);
        fetchWishlistItems(); // Refresh wishlist
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const renderGlassesItem = (item) => {
    const isLiked = likedItems.has(item.id);

    return (
      <TouchableOpacity key={item.id} onPress={() => handleImagePress(item.image, item.gif, item.id,item.price,item.category,item.title)}>
        <View style={styles.glassesItem}>
          <TouchableOpacity style={styles.heartButton} onPress={() => handleHeartPress(item.id)}>
            <FontAwesome name="heart" size={30} color={isLiked ? 'blue' : 'white'} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.ARButton}>
            <Image source={require('../assets/ar_button.png')} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.glassesDetails}>
            <Image source={item.image} style={styles.glassesImage} />
            <View style={styles.row}>
              <Text style={styles.glassesCategory}>{item.category}</Text>
              <Text style={styles.glassesPrice}>{item.price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderGlassesItem2 = (item) => {
    const isLiked = likedItems.has(item.id);

    return (
      <TouchableOpacity key={item.id} onPress={() => handleImagePress(item.image, item.gif, item.id,item.price,item.category,item.title)}>
        <View style={styles.glassesItem2}>
          <TouchableOpacity style={styles.heartButton} onPress={() => handleHeartPress(item.id)}>
            <FontAwesome name="heart" size={30} color={isLiked ? 'blue' : 'white'} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.ARButton}>
            <Image source={require('../assets/ar_button.png')} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.glassesDetails2}>
            <View style={styles.glassesImageContainer}>
              <View style={styles.glassesInfo}>
                <Text style={styles.glassesCategory2}>{item.category}</Text>
                <Text style={styles.glassesPrice2}>{item.price}</Text>
              </View>
              <Image source={item.image} style={styles.glassesImage2} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const menGlasses = [
    { id: 1, image: images.man1, gif: gifs.mangif1, price: 'RS200', category: 'Men Glasses', title: 'Men Black Rim' },
    { id: 2, image: images.man2, gif: gifs.mangif2, price: 'RS150', category: 'Men Glasses', title: 'Men White Pattern' },
    { id: 3, image: images.man3, gif: gifs.mangif3, price: 'RS200', category: 'Men Glasses', title: 'Men Blue' },
    { id: 4, image: images.man4, gif: gifs.mangif4, price: 'RS150', category: 'Men Glasses', title: 'Men Transparent' },
  ];
  
  const womenGlasses = [
    { id: 5, image: images.wm1, gif: gifs.womengif1, price: 'RS180', category: 'Women Glasses', title: 'Women Glass 1' },
    { id: 6, image: images.wm2, gif: gifs.womengif2, price: 'RS220', category: 'Women Glasses', title: 'Women Glass 2' },
    { id: 7, image: images.wm3, gif: gifs.womengif3, price: 'RS180', category: 'Women Glasses', title: 'Women Glass 3' },
    { id: 8, image: images.wm4, gif: gifs.womengif4, price: 'RS220', category: 'Women Glasses', title: 'Women Glass 4' },
    { id: 9, image: images.wm5, gif: gifs.womengif5, price: 'RS220', category: 'Women Glasses', title: 'Women Glass 5' },
  ];
  
  const kidsGlasses = [
    { id: 10, image: images.kid1, gif: gifs.kidgif1, price: 'RS120', category: 'Kids Glasses', title: 'Kids Glass 1' },
    { id: 11, image: images.kid2, gif: gifs.kidgif2, price: 'RS100', category: 'Kids Glasses', title: 'Kids Glass 2' },
    { id: 12, image: images.kid3, gif: gifs.kidgif3, price: 'RS120', category: 'Kids Glasses', title: 'Kids Glass 3' },
    { id: 13, image: images.kid4, gif: gifs.kidgif4, price: 'RS100', category: 'Kids Glasses', title: 'Kids Glass 4' },
    { id: 14, image: images.kid5, gif: gifs.kidgif5, price: 'RS120', category: 'Kids Glasses', title: 'Kids Glass 5' },
  ];
  

  const glassesData = activeFilter === 'Men' ? menGlasses :
    activeFilter === 'Women' ? womenGlasses :
      activeFilter === 'Kids' ? kidsGlasses :
        [...menGlasses, ...womenGlasses, ...kidsGlasses];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.Header}>
        <TouchableOpacity onPress={handlePress}>
          <Image source={require('../assets/Hamburger.png')} style={styles.hamburgerIcon} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        {['All', 'Women', 'Kids', 'Men'].map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.button,
              activeFilter === filter ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[
              styles.text,
              activeFilter === filter ? styles.activeText : null,
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.newCollection}>
        <Text style={styles.newCollectionText}>NEW COLLECTION</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.glassesContainer}>
        {glassesData.map((item) => renderGlassesItem(item))}
      </ScrollView>
      <View style={styles.newCollection2}>
        <Text style={styles.newCollectionText2}>POPULAR 🔥</Text>
      </View>
      <ScrollView vertical contentContainerStyle={styles.glassesContainer2}>
        {glassesData.map((item) => renderGlassesItem2(item))}
      </ScrollView>
      <BottomNavigationBar navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  Header: {
    marginTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  hamburgerIcon: {
    width: 33,
    height: 24,
    top: 8,
  },
  logoContainer: {
    marginTop: 5,
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 50,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 13,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 5,
    marginLeft: 10,
  },
  activeButton: {
    backgroundColor: '#6069d1',
  },
  inactiveButton: {
    backgroundColor: '#DCE6F6',
  },
  text: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    fontSize: 16,
    color: 'blue',
  },
  activeText: {
    color: '#FFF',
  },
  newCollection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  newCollectionText: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: 18,
    color: '#000000',
  },
  glassesContainer: {
    marginTop: 2,
    paddingLeft: 20,
    paddingBottom: 0,
    flexDirection: 'row',
  },
  ARButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
  heartButton: {
    position: 'absolute',
    top: 5,
    left: 10,
    zIndex: 1,
  },
  glassesItem: {
    backgroundColor: '#DCE6F6',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    width: width - 100,
    height: 365,
    position: 'relative',
    overflow: 'hidden',
  },
  glassesImage: {
    marginTop: 20,
    marginLeft: 30,
    width: width - 175, 
    height: 90,
    borderRadius: 10,
  },
  newCollectionButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
  icon: {
    width: 35,
    height: 30,
  },
  glassesDetails: {
    padding: 10,
  },
  glassesCategory: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: 14,
    color: '#FFFFFF',
    backgroundColor: '#6069d1',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  glassesPrice: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: 14,
    color: '#FFFFFF',
    backgroundColor: '#6069d1',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  row: {
    marginTop:30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  glassesImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  newCollection2: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  newCollectionText2: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: 18,
    color: '#000000',
  },
  glassesContainer2: {
    marginTop: 21,
    paddingLeft: 12,
    paddingBottom: 80,
    flexDirection: 'column',
  },

  glassesItem2: {
    backgroundColor: '#DCE6F6',
    borderRadius: 20,
    marginRight: 1,
    marginBottom: 20,
    width: width - 70, // Utilize full width with some padding
    height: 120,
    position: 'relative',
    overflow: "visible",
    marginLeft: 20, // Adjust the left margin for responsiveness
  },
  glassesDetails2: {
    padding: 10,
  },
  glassesImage2: {
    width: width - 210, // Adjust the width for responsiveness
    height: 83,
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 20,
  },
  glassesCategory2: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: 14,
    color: '#0000FF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  glassesPrice2: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: 14,
    color: '#0000FF',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});

export default Categories;
