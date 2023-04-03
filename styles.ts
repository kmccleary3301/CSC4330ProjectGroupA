//import create from 'tailwind-rn';
import generatedStyles from './styles.json';
import { TailwindProvider } from 'tailwind-rn/dist';
import { StyleSheet, Text, View } from 'react-native';
//import customStyles from './customStyles';

const blue = '#182640';
const tan = '#FAE8CD';  

const stylesFrancisBacon = StyleSheet.create({
  subtitle: {
    marginTop: 20, // Decreased marginTop to move Francis Bacon text upward
    fontSize: 18,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
  },
});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: blue,
    paddingTop: 120, // Increased paddingTop to move everything more downward
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

  subtitle: {
    marginTop: 40, // Keep the same margin to move the lower elements more upward
    fontSize: 18,
    fontWeight: 'bold',
    color: tan,
    fontFamily: 'Vikendi',
  },

  
  logoWrapper: {
    width: "50%",
    aspectRatio: 1,
  },
  logo: {
    width: "100%",
    height: "100%",
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
    marginTop: 20,
    borderRadius: 60,
    borderColor: tan,
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  backButton: {
  position: 'absolute',
  top: '50%',
  left: 20,
  width: '120%',
  transform: [{translateY: -50}],

  },

});

export { stylesFrancisBacon };
export default styles;