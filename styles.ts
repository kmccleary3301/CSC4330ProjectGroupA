import create from 'tailwind-rn';
import generatedStyles from './styles.json';
import { TailwindProvider } from 'tailwind-rn/dist';
import { StyleSheet, Text, View } from 'react-native';


const tailwind = StyleSheet.create({
  container: {  flex: 1,  justifyContent: 'center',  alignItems: 'center',},
  logoContainer: {  flex: 1,  justifyContent: 'center',  alignItems: 'center',},
  logo: {  width: 300,  height: 300, alignItems: 'center', alignSelf: 'center',},
  title: {  fontSize: 20, fontFamily: 'Vikendi', alignSelf: 'center',},
  subtitle: {  fontSize: 16,  fontWeight: 'normal', alignSelf: 'center', fontFamily: 'Vikendi',},
  separator: {  marginVertical: 30,  height: 1,  width: '80%',},
  input: {  height: 40,  margin: 12,  borderWidth: 1,},
  inputContainer: {  flexDirection: 'row',  justifyContent: 'center',  alignItems: 'center',  padding: 10, margin: 10,  borderWidth: 1,  borderRadius: 5, alignSelf: 'center',},
  inputField: {  borderWidth: 1,  flex: 1, borderRadius: 5,  padding: 10,  margin: 10,  borderColor: '#2196F3', fontFamily: 'SF',},
  button: {  backgroundColor: '#2196F3',  borderRadius: 5,  padding: 10,},
  buttonText: {  color: 'white',  fontWeight: 'bold', textAlign: 'center', fontFamily: 'SF',},
  link: {  color: '#2196F3',},
  linkText: {  fontWeight: 'bold',},
  error: {  color: 'red',},
  success: {  color: 'green',},
});


export { tailwind as styles };
