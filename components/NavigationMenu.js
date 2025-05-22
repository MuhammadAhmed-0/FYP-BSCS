import React, { useState, useEffect } from 'react';
import { SafeAreaView, Image, Button, StyleSheet, FlatList, TouchableOpacity, Text, View, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navmenu = ({ navigation }) => {
  const [name, setName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const menuItems = [
    { icon: "heart", name: "Wishlist", link: "Wishlist" },
    { icon: "th", name: "Category", link: "Categories" },
    { icon: "camera", name: "Frame Recommend", link: "FrameRecommendation" },
    { icon: "camera", name: "TryOn Lens", link: "Lens" },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigateToLink(item.link)}>
      <Icon name={item.icon} size={20} style={styles.icon} />
      <Text style={styles.itemText}>{item.name}</Text>
      <Icon name="chevron-right" size={20} style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  useEffect(() => {
    fetchAccessToken();
  }, []);

  const fetchAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        setAccessToken(token);
        fetchUserData(token);
      } else {
        Alert.alert('Error', 'Access token not found.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while fetching the access token.');
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://192.168.10.41:5000/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setName(userData.name);
      } else {
        Alert.alert('Error', 'An error occurred while fetching user data.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while fetching user data.');
    }
  };

  const navigateToLink = (link) => {
    console.log(`Navigating to ${link}`);
    navigation.navigate(link);
  };

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  const handleLogout = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
  
      const response = await fetch('http://192.168.10.41:5000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        await AsyncStorage.removeItem('accessToken');
        console.log('Logged out successfully');
        navigation.navigate("Login");
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require("./icon.png")} style={styles.icon1} />
        <Text style={styles.profileName}>{name}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={navigateToEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
        <Icon name="arrow-right" size={20} style={styles.arrowIconWhite} />
      </TouchableOpacity>
      
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.flatListContainer}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '78%', 
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon1: {
    width: 258,
    height: 107,
    marginBottom: 20,
  },
  profileName: {
    color: '#000',
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 36,
    marginBottom: 12,
  },
  editButton: {
    width: 209,
    height: 53,
    borderRadius: 20,
    backgroundColor: "#0062FF",
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  icon: {
    marginRight: 12,
    width: 40,
    textAlign: "center",
  },
  itemText: {
    flex: 1,
    fontSize: 24,
    marginLeft: 20,
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  flatListContainer: {
    marginTop: 40,
    flexGrow: 0.295,
    justifyContent: 'space-between',
  },
  logoutButton: {
    width: 150,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Navmenu;
