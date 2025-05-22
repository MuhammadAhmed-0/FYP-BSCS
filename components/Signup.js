import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Alert } from 'react-native';
const eyeSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M11.8125 9C11.8125 9.74592 11.5162 10.4613 10.9887 10.9887C10.4613 11.5162 9.74592 11.8125 9 11.8125C8.25408 11.8125 7.53871 11.5162 7.01126 10.9887C6.48382 10.4613 6.1875 9.74592 6.1875 9C6.1875 8.25408 6.48382 7.53871 7.01126 7.01126C7.53871 6.48382 8.25408 6.1875 9 6.1875C9.74592 6.1875 10.4613 6.48382 10.9887 7.01126C11.5162 7.53871 11.8125 8.25408 11.8125 9Z" fill="url(#paint0_linear_73_65)"/>
      <path d="M0 9C0 9 3.375 2.8125 9 2.8125C14.625 2.8125 18 9 18 9C18 9 14.625 15.1875 9 15.1875C3.375 15.1875 0 9 0 9ZM9 12.9375C10.0443 12.9375 11.0458 12.5227 11.7842 11.7842C12.5227 11.0458 12.9375 10.0443 12.9375 9C12.9375 7.95571 12.5227 6.95419 11.7842 6.21577C11.0458 5.47734 10.0443 5.0625 9 5.0625C7.95571 5.0625 6.95419 5.47734 6.21577 6.21577C5.47734 6.95419 5.0625 7.95571 5.0625 9C5.0625 10.0443 5.47734 11.0458 6.21577 11.7842C6.95419 12.5227 7.95571 12.9375 9 12.9375Z" fill="url(#paint1_linear_73_65)"/>
      <defs>
        <linearGradient id="paint0_linear_73_65" x1="9" y1="6.1875" x2="9" y2="11.8125" gradientUnits="userSpaceOnUse">
          <stop stop-color="#292739"/>
          <stop offset="1"/>
        </linearGradient>
        <linearGradient id="paint1_linear_73_65" x1="9" y1="2.8125" x2="9" y2="15.1875" gradientUnits="userSpaceOnUse">
          <stop stop-color="#292739"/>
          <stop offset="1"/>
        </linearGradient>
      </defs>
    </svg>
    `;

    export default function Signup() {
      const navigation = useNavigation();
      const [showPassword, setShowPassword] = useState(false);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [rememberMe, setRememberMe] = useState(false);
      const [emailError, setEmailError] = useState('');
      const [passwordError, setPasswordError] = useState('');
      const [confirmPasswordError, setConfirmPasswordError] = useState('');
    
      const validateForm = () => {
        let isValid = true;
    
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          setEmailError('Please enter a valid email address.');
          isValid = false;
        } else {
          setEmailError('');
        }
    
        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!password || !passwordRegex.test(password)) {
          setPasswordError(
            'Password must be at least 6 characters long and contain one uppercase letter and one number.'
          );
          isValid = false;
        } else {
          setPasswordError('');
        }
    
        if (password !== confirmPassword) {
          setConfirmPasswordError('Passwords do not match.');
          isValid = false;
        } else {
          setConfirmPasswordError('');
        }
    
        return isValid;
      };
    
      const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    
      const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
      };
    
      const handleSignup = async () => {
        if (validateForm()) {
          const requestBody = {
            email: email,
            password: password,
          };
      
          try {
            const response = await fetch('http://192.168.10.41:5000/signup', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            });
            if (response.ok) {
              const responseData = await response.json();
              console.log('User ID:', responseData.user_id);
              Alert.alert('Success', 'Signup successful!', [
                { text: 'OK', onPress: () => navigation.navigate('Navmenu') },
              ]);
            } else if (response.status === 422) {
              const errorData = await response.json();
              console.error('Validation Error:', errorData);
              Alert.alert('Error', 'Invalid input. Please check your information.');
            } else {
              console.error('Error response:', response.status, response.statusText);
              Alert.alert('Error', 'An error occurred. Please try again later.');
            }
          } catch (error) {
            console.error('Error during signup:', error);
            Alert.alert('Error', 'An error occurred. Please try again later.');
          }
        }
      };
  return (
    <SafeAreaView style={styles.container}>
 
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Create an Account</Text>
          <Text style={styles.text}>Create Account to get started</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.placeholderText}>Email Address</Text>
            <TextInput
              style={[styles.input, emailError && styles.inputError]}
              placeholder="Please Enter Your Email Address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.placeholderText}>Password</Text>
            <View style={[styles.passwordInput, passwordError && styles.inputError]}>
              <TextInput
                style={styles.passwordTextInput}
                placeholder="Please Enter Your Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <SvgXml xml={eyeSvg} width={18} height={18} />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.placeholderText}>Confirm Password</Text>
            <TextInput
              style={[styles.input, confirmPasswordError && styles.inputError]}
              placeholder="Please Confirm Your Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {confirmPasswordError ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : null}
          </View>

          <View style={styles.row}>
            <View style={styles.rememberMeContainer}>
              <TouchableOpacity style={styles.checkBox} onPress={toggleRememberMe}>
                {rememberMe && <SvgXml xml={tickMarkSvg} width={20} height={20} />}
              </TouchableOpacity>
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>

         
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>


          

          <View style={styles.signUpContainer}>
            <Text style={styles.dontHaveAccountText}>Already Have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signUpLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C6C6C6',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'space-between', 
  },
  passwordTextInput: {
    flex: 1, 
  },
  eyeIcon: {
    marginLeft: 10, 
  },
  formContainer: {
    width: width * 0.8,
    marginTop: 20,
  },
  forgotPassword: {
    color: '#FB344F',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#000000',
  },
  text: {
    fontSize: 14,
    color: '#999EA1',
    marginBottom: 50,
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
    borderWidth: 1,
    borderColor: '#C6C6C6',
    borderRadius: 8,
    padding: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    width: 14,
    height: 14,
    backgroundColor: '#007BFF',
    borderRadius: 3,
  },
  rememberMeText: {
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#0062FF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#000000',
  },
  orText: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#999EA1',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  socialLoginButton: {
    borderWidth: 0.5,
    borderColor: '#CDD1E0',
    backgroundColor: '#FFF',
    color: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    width: '50%',
    marginRight: 10,
    marginLeft: 10,
  },
  socialLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialLoginButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  dontHaveAccountText: {
    fontSize: 16,
  },
  signUpLink: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
