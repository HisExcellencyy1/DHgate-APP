import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const categoryData = {
  Electronics: [
    { id: 1, name: "Smartphone", price: 999.99, image: "phone-outline" },
    { id: 2, name: "Laptop", price: 1299.99, image: "laptop-outline" },
    { id: 3, name: "Headphones", price: 199.99, image: "headset-outline" },
    { id: 4, name: "Smartwatch", price: 299.99, image: "watch-outline" },
  ],
  Fashion: [
    { id: 1, name: "T-Shirt", price: 29.99, image: "shirt-outline" },
    { id: 2, name: "Sneakers", price: 89.99, image: "walk-outline" },
    { id: 3, name: "Handbag", price: 59.99, image: "bag-outline" },
    { id: 4, name: "Watch", price: 199.99, image: "watch-outline" },
  ],
  Home: [
    { id: 1, name: "Sofa", price: 499.99, image: "bed-outline" },
    { id: 2, name: "Lamp", price: 39.99, image: "bulb-outline" },
    { id: 3, name: "Cookware Set", price: 79.99, image: "restaurant-outline" },
    { id: 4, name: "Vacuum Cleaner", price: 149.99, image: "aperture-outline" },
  ],
  Beauty: [
    { id: 1, name: "Lipstick", price: 19.99, image: "rose-outline" },
    { id: 2, name: "Perfume", price: 49.99, image: "flask-outline" },
    { id: 3, name: "Face Cream", price: 24.99, image: "water-outline" },
    { id: 4, name: "Makeup Kit", price: 59.99, image: "color-palette-outline" },
  ],
  Sports: [
    { id: 1, name: "Football", price: 39.99, image: "football-outline" },
    { id: 2, name: "Tennis Racket", price: 89.99, image: "tennisball-outline" },
    { id: 3, name: "Basketball", price: 49.99, image: "basketball-outline" },
    { id: 4, name: "Gym Bag", price: 29.99, image: "bag-outline" },
  ],
};

export default function CategoryScreen() {
  const { name } = useLocalSearchParams();
  const products = categoryData[name as keyof typeof categoryData] || [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.productsGrid}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.productImage}>
              <Ionicons name={product.image as any} size={40} color="#333" />
            </View>
            <Text style={styles.productTitle}>{product.name}</Text>
            <Text style={styles.productPrice}>GHc{product.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  productImage: {
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
}); 