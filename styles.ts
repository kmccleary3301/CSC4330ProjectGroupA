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
    marginTop: 30,
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
    marginTop: 20,
    width: '80%',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  inputField: {
    height: 50,
    borderColor: tan,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: tan,
    padding: 10,
    marginBottom: 20,
    fontFamily: 'SF',
  },
  passwordVisibilityContainer: {
    position: 'absolute',
    right: 30,
    top: 15,
  },
  errorText: {
    color: 'red',
    fontFamily: 'SF',
    marginTop: 10,
  },
  button: {
    width: '40%',
    height: 50,
    marginTop: 20,
    borderRadius: 60,
    borderColor: tan,
    borderWidth: 2,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: tan,
    fontWeight: 'bold',
    fontFamily: 'SFBold',
    fontSize: 20,
    marginTop: -5,
    marginBottom: -5,

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