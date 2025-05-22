import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'; // Removed unused Button import
import { Camera } from 'expo-camera';
import axios from 'axios';

const CameraScreen = ({ route }) => {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [responseImage, setResponseImage] = useState(null); 

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const sendFrameToServer = async (base64Frame) => {
    console.log('Sending frame to server...');
    try {
      const response = await axios.post('http://192.168.17.17:5002/process_lens', {
        image: base64Frame, // Changed 'frame' to 'image'
      });
      setResponseImage(response.data.image); // Changed 'frame' to 'image'
    } catch (error) {
      console.error('Error sending frame to server:', error);
    }
  };

  const captureFrame = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      sendFrameToServer(photo.base64);
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {responseImage ? ( 
        <Image
          source={{ uri: `data:image/jpeg;base64,${responseImage}` }}
          style={[styles.camera, { transform: [{ scaleX: -1 }] }]}
        />
      ) : (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.front}
          ref={cameraRef}
        />
      )}

      <TouchableOpacity style={styles.captureButton} onPress={captureFrame}>
        <View style={styles.innerButton} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
    aspectRatio: 3 / 4,
  },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  innerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5, 
    borderColor: 'white', 
    backgroundColor: 'transparent', 
  },
});

export default CameraScreen;
