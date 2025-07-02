import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './ChatScreen';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

function SellerMain({ navigation }) {
  const [selectedTwin, setSelectedTwin] = useState('left');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Example Seller', preview: 'Hello, about your order...', unread: true }
  ]);

  return (
    <View style={styles.container}>
      {/* Twin Icon Buttons */}
      <View style={styles.twinButtonContainer}>
        <Pressable
          style={[styles.twinButton, selectedTwin === 'left' && styles.selectedButton]}
          onPress={() => setSelectedTwin('left')}
        >
          <AntDesign
            name="message1"
            size={24}
            color={selectedTwin === 'left' ? 'white' : 'black'}
          />
        </Pressable>

        <Pressable
          style={[styles.twinButton, selectedTwin === 'right' && styles.selectedButton]}
          onPress={() => setSelectedTwin('right')}
        >
          <MaterialCommunityIcons
            name="message-processing-outline"
            size={24}
            color={selectedTwin === 'right' ? 'white' : 'black'}
          />
        </Pressable>
      </View>

      {/* Message list */}
      {messages.map(msg => (
        <Pressable 
          key={msg.id}
          style={styles.messageItem}
          onPress={() => navigation.navigate('Chat', { sender: msg.sender })}
        >
          <Text style={styles.sender}>{msg.sender}</Text>
          <Text style={styles.preview}>{msg.preview}</Text>
          {msg.unread && <View style={styles.unreadBadge} />}
        </Pressable>
      ))}
    </View>
  );
}

export default function SellerTab() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SellerMain" component={SellerMain} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  twinButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  twinButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    borderRadius: 8
  },
  selectedButton: {
    backgroundColor: '#2196F3'
  },
  messageItem: { 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee',
    position: 'relative'
  },
  sender: { 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  preview: { 
    color: 'gray' 
  },
  unreadBadge: { 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    backgroundColor: 'blue',
    position: 'absolute',
    right: 15,
    top: 20
  }
});
