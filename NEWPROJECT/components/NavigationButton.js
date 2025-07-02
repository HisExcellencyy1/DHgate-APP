import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export function NavigationButton({ title, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    margin: 8,
    backgroundColor: '#2196F3',
    borderRadius: 6
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
