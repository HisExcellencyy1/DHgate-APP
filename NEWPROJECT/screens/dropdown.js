import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DropdownScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.item}>Home</Text>
      <Text style={styles.item}>All Categories</Text>
      <Text style={styles.item}>Buy Again</Text>
      <Text style={styles.item}>Stores</Text>
      <Text style={styles.item}>Exclusive</Text>
      <Text style={styles.item}>My Orders</Text>
      <Text style={styles.item}>My Messages</Text>
      <Text style={styles.item}>My Favourite</Text>
      <Text style={styles.item}>My Coupons</Text>
      <Text style={styles.item}>My Account</Text>
      <Text style={styles.item}>Payment Verification</Text>
      {/* Add more options as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  item: {
    fontSize: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
