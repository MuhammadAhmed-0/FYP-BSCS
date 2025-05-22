import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  errorLabel: {
    fontWeight: 'bold',
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    margintop:80,
  },
  formContainer: {
    width: width * 0.8,
    marginTop:10,
  },
  forgotPassword:{
    color:'#FB344F',
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
    backgroundColor:'#FFFFFF',
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
    justifyContent: 'space-between', 
    marginTop: 10,
  },
  socialLoginButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CDD1E0',
    backgroundColor: '#FFF',
    color: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    width: '50%', 
    marginRight: 10,
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
    marginTop: 200,
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
export default styles;