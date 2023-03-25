//import create from 'tailwind-rn';
import generatedStyles from './styles.json';
import { TailwindProvider } from 'tailwind-rn/dist';
import { StyleSheet, Text, View } from 'react-native';
import customStyles from './customStyles';

const blue = '#182640';
const tan = '#FAE8CD';  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: blue,
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
    color: tan,
    fontFamily: 'Vikendi',
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
  },
  inputContainer: {
    marginTop: 50,
    width: '80%',
    backgroundColor: tan,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  inputField: {
    height: 50,
    borderColor: blue,
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
    backgroundColor: tan,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: blue,
    fontWeight: 'bold',
    fontFamily: 'SF',
  },
  linkContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  linkText: {
    color: tan,
    fontFamily: 'SF',
  },
  link: {
    color: tan,
    fontWeight: 'bold',
    marginLeft: 5,
    fontFamily: 'SF',
  },
});


export default styles;