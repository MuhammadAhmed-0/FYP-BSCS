import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigationBar from './BottomNavbar';
import { images, gifs } from '../config';

const menGlasses = [
  { id: 1, image: images.man1, gif: gifs.mangif1, price: 'RS200', category: 'Men Glasses' },
  { id: 2, image: images.man2, gif: gifs.mangif2, price: 'RS150', category: 'Men Glasses' },
  { id: 3, image: images.man3, gif: gifs.mangif3, price: 'RS200', category: 'Men Glasses' },
  { id: 4, image: images.man4, gif: gifs.mangif4, price: 'RS150', category: 'Men Glasses' },
];

const womenGlasses = [
  { id: 5, image: images.wm1, gif: gifs.womengif1, price: 'RS180', category: 'Women Glasses' },
  { id: 6, image: images.wm2, gif: gifs.womengif2, price: 'RS220', category: 'Women Glasses' },
  { id: 7, image: images.wm3, gif: gifs.womengif3, price: 'RS180', category: 'Women Glasses' },
  { id: 8, image: images.wm4, gif: gifs.womengif4, price: 'RS220', category: 'Women Glasses' },
  { id: 9, image: images.wm5, gif: gifs.womengif5, price: 'RS220', category: 'Women Glasses' },
];

const kidsGlasses = [
  { id: 10, image: images.kid1, gif: gifs.kidgif1, price: 'RS120', category: 'Kids Glasses' },
  { id: 11, image: images.kid2, gif: gifs.kidgif2, price: 'RS100', category: 'Kids Glasses' },
  { id: 12, image: images.kid3, gif: gifs.kidgif3, price: 'RS120', category: 'Kids Glasses' },
  { id: 13, image: images.kid4, gif: gifs.kidgif4, price: 'RS100', category: 'Kids Glasses' },
  { id: 14, image: images.kid5, gif: gifs.kidgif5, price: 'RS120', category: 'Kids Glasses' },
];

const allGlasses = [...menGlasses, ...womenGlasses, ...kidsGlasses];

const Wishlist = ({ navigation }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const wishlistResponse = await fetch('http://192.168.10.41:5000/wishlist', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!wishlistResponse.ok) {
        throw new Error('Failed to fetch wishlist items');
      }

      const wishlistResponseText = await wishlistResponse.text();

      const wishlistData = JSON.parse(wishlistResponseText);

      if (!Array.isArray(wishlistData.wishlist)) {
        throw new Error('Fetched wishlist is not an array');
      }

      const wishlistIds = wishlistData.wishlist.map(item => item.glasses_id);

      const filteredItems = allGlasses.filter(item => wishlistIds.includes(item.id));
      setWishlistItems(filteredItems);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  };

  const handleWishlistToggle = async (item) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const isItemInWishlist = wishlistItems.some(wishlistItem => wishlistItem.id === item.id);
      const method = isItemInWishlist ? 'DELETE' : 'POST';
      const url = 'http://192.168.10.41:5000/wishlist';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ glasses_id: item.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to update wishlist');
      }

      fetchWishlistItems();
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.glassImage} />
      <Text style={styles.glassTitle}>{item.category}</Text>
      <Text style={styles.glassCategory}>{item.price}</Text>
      <TouchableOpacity onPress={() => handleWishlistToggle(item)}>
        <Text style={[styles.heart, wishlistItems.some(wishlistItem => wishlistItem.id === item.id) ? styles.heartFilled : styles.heartEmpty]}>
          ♥
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      <FlatList
        data={wishlistItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
      <BottomNavigationBar navigation={navigation} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    padding: 20,
  },
  flatListContent: {
    alignItems: 'center',
  },
  item: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  glassImage: {
    width: 200,
    height: 90,
    borderRadius: 10,
  },
  glassTitle: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  glassCategory: {
    marginTop: 2,
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
  },
  heart: {
    fontSize: 24,
    marginTop: 10,
  },
  heartEmpty: {
    color: '#ddd',
  },
  heartFilled: {
    color: 'red',
  },
});

export default Wishlist;
