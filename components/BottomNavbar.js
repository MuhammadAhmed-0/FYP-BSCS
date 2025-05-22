import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
const BottomNavigationBar = ({ activeIcon }) => {
  const navigation = useNavigation();

  const handleIconPress = (iconName, route) => {
 
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
     <TouchableOpacity onPress={() => handleIconPress('home', 'MainScreen')}>
        <Icon name="home" size={30} color={activeIcon === 'home' ? '#0000FF' : '#808080'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleIconPress('heart', 'Wishlist')}>
        <Icon name="heart" size={30} color={activeIcon === 'heart' ? '#0000FF' : '#808080'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleIconPress('cart', 'MyCart')}>
        <Icon name="shopping-cart" size={30} color={activeIcon === 'cart' ? '#0000FF' : '#808080'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: '15%',
  },
});

export default BottomNavigationBar;
