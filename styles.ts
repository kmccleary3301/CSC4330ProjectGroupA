

import { StyleSheet, Text, View } from 'react-native';

const blue = '#182640';
const tan = '#FAE8CD';  

const styles = StyleSheet.create({
  picker: {
    height: 50,
    borderColor: tan,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: tan,
    marginBottom: 20,
  },
  boop: {
    marginTop: 20, // Decreased marginTop to move Francis Bacon text upward
    fontSize: 18,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: blue,
    paddingTop: 120,
  },

  registerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
  },

  registerBody: {
    width: '80%',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
    marginTop: 20,
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

  button: {
    width: '40%',
    height: 50,
    borderRadius: 30,
    borderColor: tan,
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  buttonText: {
    color: tan,
    fontWeight: 'bold',
    fontFamily: 'SFBold',
    fontSize: 24,
    marginTop: -1,
    marginBottom: -1,
  },

  linkContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
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
 
  logoWrapper: {
    width: "50%",
    aspectRatio: 1,
  },
  logo: {
    width: 200,
    height: 300,
    marginTop: 30, // Keep the same marginTop for the logo
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 30, // Keep the same marginTop for the logo
  },

  title: {
    position: 'absolute',
    top: 60, // Increased top value to move the title more downward
    zIndex: 1,
    fontSize: 40,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
  },
  welcomeBackTitle: {
    position: 'absolute',
    top: 100, // Adjust this value according to your needs
    zIndex: 1,
    fontSize: 40,
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
  
  headerButton: {
    width: '40%',
    height: 50,
    marginTop: 20,
    borderRadius: 60,
    borderColor: tan,
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerButtonText: {
    color: tan,
    fontWeight: 'bold',
    fontFamily: 'SFBold',
    fontSize: 20,
    marginTop: -5,
    marginBottom: -5,
  },
  loginButton: {
    width: '40%',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 30,
    borderColor: tan,
    borderWidth: 4.5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: 150,
  },
  backButton: {
  position: 'absolute',
  top: '50%',
  left: 20,
  width: '120%',
  transform: [{translateY: -50}],
  color: tan,

  },

});


export default styles;