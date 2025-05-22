import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import { images, gifs } from '../config';
import BottomNavigationBar from './BottomNavbar';

const FrameRecommendation = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [responseImage, setResponseImage] = useState(null);
  const [gender, setGender] = useState(null);
  const [faceShape, setFaceShape] = useState(null);
  const [age, setAge] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recommendedGlasses, setRecommendedGlasses] = useState([]);
  const [showHeadings, setShowHeadings] = useState(true);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'web') {
        setHasCameraPermission(true);
      } else {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(status === 'granted');
      }
    })();
  }, []);

  const captureFrame = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      sendFrameToServer(photo.base64);
    }
  };

  const sendFrameToServer = async (base64Frame) => {
    console.log('Sending frame to server...');
    setIsProcessing(true);
    try {
      const response = await axios.post('http://192.168.10.41:5003/process_image', {
        image: base64Frame,
      });
      setResponseImage(response.data.frame);
      setGender(response.data.Gender[0]);
      setFaceShape(response.data.faceshape);
      setAge(response.data.Age);
      console.log(response.data);
      setIsProcessing(false);
      setIsCameraOpen(false);
      setShowHeadings(true);
      setRecommendedGlasses(getRecommendedGlasses(response.data.Age, response.data.Gender[0], response.data.faceshape));
    } catch (error) {
      console.error('Error sending frame to server:', error);
      setIsProcessing(false);
      setShowHeadings(true);
    }
  };
  const handleimagePress = (selectedImage, selectedGif, selectedId,selectedPrice,selectedCategory,selectedTitle) => {
    navigation.navigate('ProductPage', { selectedImage, selectedGif, selectedId,selectedPrice,selectedCategory,selectedTitle });
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

  const getRecommendedGlasses = (age, gender, faceShape) => {
    let recommended = [];
    if (age < 13) {
      recommended = kidsGlasses;
    } else {
      if (gender === 'female') {
        recommended = womenGlasses;
      } else if (gender === 'male') {
        recommended = menGlasses;
      }
    }
    return recommended;
  };


  const handleCapture = () => {
    captureFrame();
    setShowHeadings(false);
  };

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
    setShowHeadings(false);
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {showHeadings && (
        <View style={styles.overlay}>
          <View style={styles.header}>
            {gender !== null && age !== null && (
              <>
                <Text style={styles.heading}>Your Gender: {gender}</Text>
                <Text style={styles.heading}>Your Face Shape: {faceShape}</Text>
                <Text style={styles.heading}>Your Age: {age}</Text>
              </>
            )}
          </View>
        </View>
      )}

      {isCameraOpen ? (
        <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={cameraRef} >
          <TouchableOpacity style={styles.captureButton} onPress={handleCapture} />
          {isProcessing && <ActivityIndicator size="large" color="blue" style={styles.activityIndicator} />}
          {responseImage && (
            <Image source={{ uri: `data:image/jpeg;base64,${responseImage}` }} style={styles.cameraImage} />
          )}
        </Camera>
      ) : (
        <>
          <BottomNavigationBar navigation={navigation} />
          <TouchableOpacity style={styles.recommendationsButton} onPress={handleOpenCamera}>
            <Text style={styles.buttonText}>Get Recommendations</Text>
          </TouchableOpacity>
        </>
      )}

      {!isCameraOpen && recommendedGlasses && recommendedGlasses.length > 0 && (
        <View style={styles.framesContainer}>
          <Text style={styles.framesHeading}>Recommended Frames</Text>
          <ScrollView style={styles.glassesContainer}>
            {recommendedGlasses.map((glass, index) => (
              <TouchableOpacity key={index} onPress={() => handleimagePress(glass.image, glass.gif, glass.id,glass.price,glass.category,glass.title)}>
                <View style={styles.glassItem}>
                  <Image source={glass.image} style={styles.glassImage} />
                  <Text style={styles.priceText}>{glass.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 30,
    zIndex: 1,
  },
  header: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
    camera: {
    flex: 1,
    aspectRatio: 3 / 4,
  },
  
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    marginBottom: 20,
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -35 }],
  },
  recommendationsButton: {
    position: 'absolute',
    bottom: 70,
    left: '50%',
    transform: [{ translateX: -100 }],
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    zIndex: 2, // Ensure button is above overlay
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  cameraImage: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  framesContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    zIndex: 0,

  },
  framesHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:30,
    marginBottom:10,
  },
  glassesContainer: {
    paddingHorizontal: 25,
    maxHeight: '72%',

  },
  glassItem: {
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#DCE6F6',
    padding: 30,
    paddingLeft: 29,
    borderRadius: 10,
  },
  glassImage: {
    width: 250,
    height: 180,
    resizeMode: 'contain',
  },
  priceText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});

export default FrameRecommendation;
