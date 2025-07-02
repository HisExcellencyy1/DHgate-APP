import React, { useMemo } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { useColorScheme, SafeAreaView, Pressable } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SellerTab from './screens/SellerTab';
import DHGateTab from './screens/DHGateTab';
import DisputeTab from './screens/DisputeTab';
import DropdownScreen from './screens/dropdown'; // ✅ Add this
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function CustomHeader({ navigation }) {
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={() => navigation.navigate('Dropdown')}>
        <Ionicons name="menu" size={24} style={styles.icon} />
      </Pressable>
      <Text style={styles.headerTitle}>My Messages</Text>
      <Ionicons name="search" size={24} style={styles.icon} />
    </View>
  );
}

function BottomNavigationBar() {
  return (
    <View style={styles.space3}>
      <View style={styles.iconWithLabel}>
        <MaterialCommunityIcons name="home" size={24} color="black" />
        <Text style={styles.label}>Home</Text>
      </View>

      <View style={styles.iconWithLabel}>
        <MaterialIcons name="video-library" size={24} color="black" />
        <Text style={styles.label}>DHShorts</Text>
      </View>

      <View style={styles.iconWithLabel}>
        <MaterialIcons name="message" size={24} color="black" />
        <Text style={styles.label}>Messages</Text>
      </View>

      <View style={styles.iconWithLabel}>
        <Entypo name="shopping-cart" size={24} color="black" />
        <Text style={styles.label}>Cart</Text>
      </View>

      <View style={styles.iconWithLabel}>
        <MaterialCommunityIcons name="account" size={24} color="black" />
        <Text style={styles.label}>Account</Text>
      </View>
    </View>
  );
}

function MainTabs({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader navigation={navigation} />
      <Tab.Navigator
        initialRouteName="Seller"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === 'Seller') {
              iconName = 'person-circle-outline';
            } else if (route.name === 'DHGate') {
              iconName = 'mail-outline';
            } else if (route.name === 'Dispute') {
              iconName = 'alert-circle-outline';
            }
            return <Ionicons name={iconName} size={20} color={color} />;
          },
          tabBarShowIcon: true,
          tabBarIndicatorStyle: { backgroundColor: 'blue' },
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: '#fff' },
        })}
      >
        <Tab.Screen name="Seller" component={SellerTab} />
        <Tab.Screen name="DHGate" component={DHGateTab} />
        <Tab.Screen name="Dispute" component={DisputeTab} />
      </Tab.Navigator>
      <BottomNavigationBar />
    </SafeAreaView>
  );
}

export default function App() {
  const colorScheme = useColorScheme();
  const theme = useMemo(
    () => (colorScheme === 'dark' ? DarkTheme : DefaultTheme),
    [colorScheme]
  );

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Dropdown" component={DropdownScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  icon: {
    color: 'black',
  },
  space3: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  iconWithLabel: {
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: 'black',
  },
});
