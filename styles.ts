//import create from 'tailwind-rn';
import generatedStyles from './styles.json';
import { TailwindProvider } from 'tailwind-rn/dist';
import { StyleSheet, Text, View } from 'react-native';
import customStyles from './customStyles';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
  },
  logoContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Vikendi',
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Vikendi',
  },
  inputContainer: {
    marginTop: 50,
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  inputField: {
    height: 50,
    borderColor: '#2196F3',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontFamily: 'SF',
  },
  passwordVisibilityContainer: {
    position: 'absolute',
    right: 20,
  },
  errorText: {
    color: 'red',
    fontFamily: 'SF',
    marginTop: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontFamily: 'SF',
  },
  linkContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  linkText: {
    color: '#FFFFFF',
    fontFamily: 'SF',
  },
  link: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 5,
    fontFamily: 'SF',
  },
});


export default styles;