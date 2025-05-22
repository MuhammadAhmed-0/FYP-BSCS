import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { useFonts } from "expo-font";
import Login from './components/login';
import Signup from './components/Signup';
import Navmenu from './components/NavigationMenu';
import MainScreen from './components/mainscreen';
import Categories from './components/categories';
import CameraScreen from './components/camera';
import EditProfileScreen from './components/EditProfileScreen'
import Wishlist from './components/WishList';
import ProductPage from './components/ProductPage';
import MyCart from './components/MyCart';
import OrderSummary from './components/OrderSummary';
import MyOrders from './components/MyOrders';
import CheckoutPage from './components/CheckoutPage';
import FrameRecommendation from './components/FrameRecommendation';
import Lens from './components/Lens';
import SplashScreen from './components/SplashScreen';
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "PlusJakartaSans-SemiBold": require("./assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar hidden />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false, 
            headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation, 
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Navmenu" component={Navmenu}/>
          <Stack.Screen name="MainScreen" component={MainScreen}/> 
          <Stack.Screen name="Categories" component={Categories}/> 
          <Stack.Screen name="Camera" component={CameraScreen}/> 
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen}/> 
          <Stack.Screen name="Wishlist" component={Wishlist}/> 
          <Stack.Screen name="ProductPage" component={ProductPage}/> 
          <Stack.Screen name="MyCart" component={MyCart}/> 
          <Stack.Screen name="OrderSummary" component={OrderSummary}/>
          <Stack.Screen name="MyOrders" component={MyOrders}/> 
          <Stack.Screen name="CheckoutPage" component={CheckoutPage }/>  
          <Stack.Screen name="Lens" component={Lens }/>
          <Stack.Screen name="FrameRecommendation" component={FrameRecommendation }/>   
          <Stack.Screen name="SplashScreen" component={SplashScreen }/>      
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
