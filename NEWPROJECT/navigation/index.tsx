import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DisputeTab from '../screens/DisputeTab';
import DHGateTab from '../screens/DHGateTab';
import SellerTab from '../screens/SellerTab';
import ChatScreen from '../screens/ChatScreen';
import { BackButton } from '../components/BackButton';
import DropdownScreen from 'screens/dropdown';

const Stack = createStackNavigator();

export default function Navigation({ theme }) {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dispute" component={DisputeTab} />
        <Stack.Screen name="DHGate" component={DHGateTab} />
        <Stack.Screen name="Seller" component={SellerTab} />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => <BackButton onPress={() => navigation.goBack()} />
          })}
        />
        <Stack.Screen name="Dropdown" component={DropdownScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
