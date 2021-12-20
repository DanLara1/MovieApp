import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Detail from './screens/Detail';
import NavBar from './components/Navbar';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Home' 
          component={Home} 
          options={{
            headerTransparent: true,
            header: ({navigation}) => <NavBar navigation={navigation} main={true} />
          }} 
        />
        <Stack.Screen 
          name='Detail' 
          component={Detail}
          options={{
            headerTransparent: true,
            header: ({navigation}) => <NavBar navigation={navigation} />
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;