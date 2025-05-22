import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import bg from '../assets/Splashbg.png';

export default function SplashScreen() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={bg} style={styles.backgroundImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Try your
          {'\n'}
          Fashion glasses!
        </Text>
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Let’s Go</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  contentContainer: {
    marginTop:190,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 34,
    color: '#1E90FF',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
  },
});
