import { registerRootComponent } from 'expo';



import App from './App';

import { LocalizationContext } from 'react-native-paper-dates';
import { en } from 'date-fns/locale';

// Add this line to register the 'en' locale
LocalizationContext._addLocale('en', en);

import { en, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en', en)

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
