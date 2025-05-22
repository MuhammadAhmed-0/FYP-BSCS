import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { FontFamily, FontSize, Color } from "../GlobalStyles";
import BottomNavigationBar from "./BottomNavbar";
import { images, gifs } from '../config';

const MainScreen = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('Navmenu');
  };
  const ExploreMore = () => {
    navigation.navigate('Categories');
  };
  const handleimagePress = (selectedImage, selectedGif,selectedId,selectedCategory,selectedPrice,selectedTitle) => {
    navigation.navigate('ProductPage', { selectedImage, selectedGif,selectedId,selectedCategory,selectedPrice,selectedTitle });
  };

  const products = [
    { id: 1, image: images.man1, gif:gifs.mangif1, price: 'PKR200',category: 'Men Glasses', title: 'Men Black Rim' },
    { id: 2, image: images.man2, gif:gifs.mangif2, price: 'PKR150',category: 'Men Glasses', title: 'Men White Pattern' },
    { id: 3, image: images.kid1, gif:gifs.kidgif1, price: 'PKR120',category: 'Kids Glasses', title: 'Kids Glass 1' },
    { id: 4, image: images.kid2, gif:gifs.kidgif2, price: 'PKR200',category: 'Kids Glasses', title: 'Kids Glass 2' },
    { id: 5, image: images.wm1, gif: gifs.womengif1, price: 'PKR150',category: 'Women Glasses', title: 'Women Glass 1' },
    { id: 6, image: images.wm2, gif: gifs.womengif2, price: 'PKR120', category: 'Women Glasses', title: 'Women Glass 2'},
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePress}>
          <Image source={require('../assets/Hamburger.png')} style={styles.hamburgerIcon} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
      </View>

      <View style={styles.mainImageContainer}>
        <Image source={require('../assets/main.png')} style={styles.mainImage} />
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>ARMANI</Text>
          <Text style={[styles.textStyle, styles.freeShippingText]}>100% pure crystal glasses</Text>
          <Text style={styles.textStyle}>Lorem ipsum dolor sit amet,{'\n'} consectetur adipiscing elit.</Text>
        </View>
      </View>

      <View style={styles.infoIconsContainer}>
        <View style={styles.infoIcon}>
          <Image source={require('../assets/freeshipping.png')} style={styles.icon} />
          <Text style={styles.infoText}>Free Shipping</Text>
        </View>
        <View style={styles.infoIcon}>
          <Image source={require('../assets/delivery.png')} style={styles.icon} />
          <Text style={styles.infoText}>Delivery on Time</Text>
        </View>
        <View style={styles.infoIcon}>
          <Image source={require('../assets/payment.png')} style={styles.icon} />
          <Text style={styles.infoText}>Secure Payment</Text>
        </View>
      </View>

      <View style={styles.arTryContainer}>
        <Text style={styles.arTryText}>AR Tryon</Text>
        <Image source={require('../assets/banner2.gif')} style={styles.arImage} />
        <TouchableOpacity style={styles.arButton}>
          <Text style={styles.arButtonText}>Try On</Text>
        </TouchableOpacity>
      </View>
        <ScrollView>
      <View style={styles.featuredProductsContainer}>
        <Text style={styles.featuredProductsText}>FEATURED PRODUCTS</Text>
        <View style={styles.productsList}>
          {products.map((product) => (
            <View key={product.id} style={styles.product} >
               <TouchableOpacity onPress={() => handleimagePress(product.image, product.gif,product.id,product.category,product.price,product.title)}>
              <Image source={product.image} style={styles.productImage} />
              <Text style={styles.productPrice}>{product.price}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity  onPress={ExploreMore} style={styles.ExploreMore}>
  <Text style={styles.arButtonText}>Explore More</Text>
</TouchableOpacity>

      </View>

      <View style={styles.aboutContainer}>
        <View style={styles.aboutHeader}>
          <Text style={styles.aboutHeaderText}>ABOUT OUR SHOP</Text>
        </View>
        <View style={styles.aboutContent}>
          <Text style={styles.aboutText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum felis ac sapien consectetur, sed ultricies lorem malesuada. Phasellus vehicula nisi id tortor sodales, ac consequat enim tempor.
          </Text>
          <Image source={require('../assets/image1.png')} style={styles.aboutImage} />
        </View>
      </View>
      </ScrollView>
      <BottomNavigationBar navigation={navigation}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  hamburgerIcon: {
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
  mainImageContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  mainImage: {
    width: '111%',
    height: 250,
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 30,
    top: 10,
  },
  textStyle: {
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: 11,
    left: 180,
  },
  freeShippingText: {
    color: Color.colorMediumslateblue_100,
    letterSpacing: 0.4,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  infoIconsContainer: {
    marginTop: 10,
    marginLeft: -14,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoIcon: {
    height: 60,
    width: 129,
    margin: 3,
    borderRadius: 10,
    backgroundColor: "rgba(0, 98, 255, 0.1)",
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  infoText: {
    marginTop: 2,
    fontSize: 9,
    color: Color.colorMediumslateblue_100,
    letterSpacing: 0.4,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  arTryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arTryText: {
    fontSize: 24,
    marginTop: 15,
    marginBottom: 5,
  },
  arImage: {
    width: '110%',
    height: 218,
  },
  arButton: {
    marginVertical: 30,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  ExploreMore: {
    marginVertical: 30,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    width: "40%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    marginLeft:120,
  },
  
  arButtonText: {
    color: 'white',
    fontSize: 16,

  },
  featuredProductsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DCE6F6',
    borderRadius: 10,
    width: '110%',
    marginLeft: -18,
  },
  featuredProductsText: {
    fontSize: 20,
    color: Color.colorMediumslateblue_100,
    letterSpacing: 0.4,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  productsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  product: {
    width: '35%',
    height: 110,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginLeft: -18,
    marginRight: -16,
  },
  productImage: {
    marginTop: 25,
    height: 45,
    width: 100,
    marginLeft:10,
  },
  productPrice: {
    marginLeft:20,
    marginTop: 10,
    color: Color.colorMediumslateblue_100,
    letterSpacing: 0.4,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  aboutContainer: {
    marginTop: 10,
    marginBottom: 65,
  },
  aboutHeader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutHeaderText: {
    fontSize: 15,
    letterSpacing: 0.4,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorMediumslateblue_100,
  },
  aboutContent: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aboutText: {
    marginTop: 12,
    width: 200,
    marginRight: 30,
    fontSize: 10,
    left: 20,
    color: '#7CACC6',
  },
  aboutImage: {
    width: '60%',
    height: 118,
  },
});

export default MainScreen;
