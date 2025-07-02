import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export function BackButton({ onPress }) {
  return (
    <Pressable style={styles.backButton} onPress={onPress}>
      <Text style={styles.backText}>← Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
    padding: 8
  },
  backText: {
    fontSize: 16,
    color: 'blue'
  }
});
