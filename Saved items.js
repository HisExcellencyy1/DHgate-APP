import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // install if not already

const initialSavedItems = [
  {
    id: '1',
    name: 'Bluetooth Earbuds',
    price: 24.99,
    category: 'Electronics',
    isAvailable: true,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 59.99,
    category: 'Electronics',
    isAvailable: false,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Nike Air Max Sneakers',
    price: 89.99,
    category: 'Fashion',
    isAvailable: true,
    image: 'https://via.placeholder.com/150',
  },
];

const SavedItemsScreen = () => {
  const [savedItems, setSavedItems] = useState(initialSavedItems);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...new Set(initialSavedItems.map(item => item.category))];

  const filteredItems =
    categoryFilter === 'All'
      ? savedItems
      : savedItems.filter(item => item.category === categoryFilter);

  const handleRemove = (id) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddToCart = (item) => {
    Alert.alert('Added to Cart', `${item.name} has been added to your cart.`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <Text style={item.isAvailable ? styles.available : styles.unavailable}>
        {item.isAvailable ? 'In Stock' : 'Out of Stock'}
      </Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: item.isAvailable ? '#007bff' : '#aaa' }]}
          onPress={() => handleAddToCart(item)}
          disabled={!item.isAvailable}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#dc3545' }]}
          onPress={() => handleRemove(item.id)}
        >
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Items</Text>

      <View style={styles.filter}>
        <Text style={styles.filterLabel}>Sort by Category:</Text>
        <Picker
          selectedValue={categoryFilter}
          style={styles.picker}
          onValueChange={(itemValue) => setCategoryFilter(itemValue)}
        >
          {categories.map((cat, i) => (
            <Picker.Item label={cat} value={cat} key={i} />
          ))}
        </Picker>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};

export default SavedItemsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filter: {
    marginBottom: 15,
  },
  filterLabel: {
    fontWeight: '600',
    marginBottom: 4,
  },
  picker: {
    backgroundColor: '#f0f0f0',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 6,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#333',
    marginVertical: 4,
  },
  available: {
    color: 'green',
    fontWeight: '600',
  },
  unavailable: {
    color: 'red',
    fontWeight: '600',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
