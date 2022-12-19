import Login from './screen/Login';
import Register from './screen/Register';
import Profile from './screen/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {Button} from 'react-native';

const Stack = createNativeStackNavigator();
const App = () => {
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Edit Profile',
            headerStyle: {
              backgroundColor: '#F5F5F5',
            },
            headerTitleStyle: {
              color: '#1F1D1D',
              fontSize: 18,
            },
            headerShadowVisible: false,
            headerBackVisible: false,
            headerRight: () => (
              <Button
                title="Log Out"
                color="#FFC612"
                onPress={() => navigationRef.goBack()}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
