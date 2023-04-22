import {Route, Redirect} from 'react-router-dom'
import {useAuthValue} from './AuthContext'
import { useNavigation } from '@react-navigation/native'

export default function PrivateRoute({component:Component, ...rest}) {
  const {currentUser} = useAuthValue()
  const navigation = useNavigation()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser?.emailVerified ? <Component {...props} /> : <Redirect to='/login' />
    }}>
    </Route>
  )
}

// After verifying email, user is redirected to the dashboard
//this is done by replacing the <Redirect to='/login' with the navigate function
//previously this was done by using the following html tag: <TouchableOpacity onPress={() => navigation.navigate('HistoryScreen')}>
//and then inside a function it looks like this: const handleNext = () => { navigation.navigate('HomeScreen'); };
//also sometimes we declare the navigation variable like this: const navigation = useNavigation();
//or sometimes we pass it in as a prop like this: const SubjectAddScreen = ({ navigation }) => {
//not sure why we use both methods but it seems to work
//anyway explain how the navigate function works and how it is different from the redirect function
//also explain why we sometimes declare the navigation variable and sometimes pass it in as a prop
//also return a version of this script without the comments that navigates to the dashboard after verifying email,
//the name of the screen that needs to be navigated to is 'RegisterInfoScreen'