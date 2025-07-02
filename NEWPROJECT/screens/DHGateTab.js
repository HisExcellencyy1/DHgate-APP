import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function DHGateTab() {
  const [activeTab, setActiveTab] = useState('system');

  return (
    <View style={styles.container}>
      <View style={styles.subTabs}>
        <Pressable
          style={[styles.tab, activeTab === 'system' && styles.activeTab]}
          onPress={() => setActiveTab('system')}
        >
          <Text>System</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'nonSystem' && styles.activeTab]}
          onPress={() => setActiveTab('nonSystem')}
        >
          <Text>Non-System</Text>
        </Pressable>
      </View>

      <Text style={styles.content}>
        {activeTab === 'system' ? 'System messages' : 'Non-system messages'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  subTabs: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  tab: { 
    flex: 1, 
    padding: 15, 
    alignItems: 'center' 
  },
  activeTab: { 
    borderBottomWidth: 2, 
    borderBottomColor: 'blue' 
  },
  content: { 
    padding: 15, 
    color: 'gray',
    fontSize: 16 
  }
});
