import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      marginTop: 20,
    },
    framesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 1,
      },
    flatListContent: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    contentContainer: {
      flex: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    h1: {
      textAlign: 'center',
      marginTop: 21,
      fontSize: 33,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    button1: {
      backgroundColor: '#0062FF',
      width: '44%',
      alignSelf: 'center',
      borderRadius: 20,
      marginTop: 40,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderColor: 'white',
      borderWidth: 2,
    },
    
    
    image: {
      margin: 5,
      marginRight: 13,
    },
    text: {
      marginTop: 15,
      marginLeft: 13,
      fontSize: 16,
      fontWeight: 'bold',
    },
    container2: {
      flexDirection: 'row',
      marginTop: 40,
      padding:19,
    },
    banner: {
      width: 386,
      height: 258,
      borderRadius: 20,
      marginBottom:18,
    },
    banner2: {
      width: '94%',
      marginLeft: 13,
    },
    flatListContent: {
      alignItems: 'center',
    },
    frameContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    frame: {
      width: 318,
      height: 378,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 1,
    },
    frameImage: {
      width: 165,
      height: 165,
      resizeMode: 'contain',
    },
    tryOnButton: {
      backgroundColor: '#0090FF',
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 14,
    },
    buttonText2: {
      color: '#FFF',
      fontWeight: '600',
      textAlign: 'center',
      
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#CCC',
      marginHorizontal: 5,
    },
    activeDot: {
      backgroundColor: '#0090FF',
    },
    rectangle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'black',
      padding: 10,
      borderRadius: 18,
      marginTop: 20,
      paddingHorizontal: 20,
      width:'90%',
      left:18,
    },
    button: {
      width: 80,
      height: 22,
      flexShrink: 0,
      backgroundColor: 'black',
      borderRadius: 8,
    },
  
    footer: {
      marginTop:30,
      padding: 30,
      paddingBottom:40,
      backgroundColor: '#0062FF',
    },
    footerHeading: {
      color: 'white',
      fontSize: 24,
      marginBottom: 20,
      fontWeight: 'bold',
    },
    footerContent: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    
    contactUs: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    contactText: {
      color: 'white',
      marginLeft: 5,
      fontSize:17,
    },
    contactEmail: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    emailText: {
      color: 'white',
      marginLeft: 5,
      fontSize:17,
    },
    button: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderWidth: 1,
    },
    firstButton: {
      borderTopLeftRadius: 30,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      borderRightWidth: 0,
    },
    secondButton: {
      borderRightWidth: 0,
      borderLeftWidth: 0,
    },
    thirdButton: {
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderLeftWidth: 0,
    },
    activeButton: {
      backgroundColor: 'black',
    },
    inactiveButton: {
      backgroundColor: 'white',
    },
    buttonText: {
      fontWeight: 'bold',
    },
    activeText: {
      color: 'white',
    },
    inactiveText: {
      color: 'black',
    },
  });
export default styles;  
