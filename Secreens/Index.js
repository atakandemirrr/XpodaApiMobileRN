import React, { useState }  from 'react'
import LoginScreen from './Login'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
const Stack = createNativeStackNavigator();

export default function Index() {
  const [ticket, setTicket] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen" options={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" options={{ headerShown: false }}>
          {props => <LoginScreen {...props} setTicket={setTicket} setUsername={setUsername} setPassword={setPassword} />}
        </Stack.Screen>
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }}>
          {props => <HomeScreen {...props} ticket={ticket} username={username} password={password} />}
        </Stack.Screen>
      </Stack.Navigator>
  
    </NavigationContainer>
  )
}
