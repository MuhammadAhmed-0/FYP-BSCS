import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfileScreen = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [accessToken, setAccessToken] = useState("");

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
        setPhone(userData.phone);
        setGender(userData.gender);
        setAge(userData.age);
      } else {
        Alert.alert('Error', 'An error occurred while fetching user data.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while fetching user data.');
    }
  };
  
  const handleEditSave = async () => {
    try {
      const requestBody = {
        name,
        phone,
        gender,
        age,
      };

      const response = await fetch('http://192.168.10.41:5000/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholderText}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholderText}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholderText}>Gender</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={setGender}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.placeholderText}>Age</Text>
        <TextInput
          style={styles.input}
          value={age.toString()}
          onChangeText={(text) => {
            const numericValue = Number(text);
            if (!isNaN(numericValue)) {
              setAge(numericValue);
            }
          }}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEditSave}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  inputContainer: {
    marginBottom: 15,
  },
  placeholderText: {
    color: '#0062FF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#F3F3F3",
  },
  button: {
    backgroundColor: "#0062FF",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
