import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const categoryDetailsData = {
  Electronics: {
    description: "Find the latest and greatest in electronics, from smartphones to smartwatches.",
    banner: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    products: [
      { id: 1, name: "Smartphone", price: 999.99, image: "phone-outline" },
      { id: 2, name: "Laptop", price: 1299.99, image: "laptop-outline" },
      { id: 3, name: "Headphones", price: 199.99, image: "headset-outline" },
      { id: 4, name: "Smartwatch", price: 299.99, image: "watch-outline" },
    ],
  },
  Fashion: {
    description: "Stay trendy with the latest in fashion, shoes, and accessories.",
    banner: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    products: [
      { id: 1, name: "T-Shirt", price: 29.99, image: "shirt-outline" },
      { id: 2, name: "Sneakers", price: 89.99, image: "walk-outline" },
      { id: 3, name: "Handbag", price: 59.99, image: "bag-outline" },
      { id: 4, name: "Watch", price: 199.99, image: "watch-outline" },
    ],
  },
  Home: {
    description: "Everything you need for a cozy and stylish home.",
    banner: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    products: [
      { id: 1, name: "Sofa", price: 499.99, image: "bed-outline" },
      { id: 2, name: "Lamp", price: 39.99, image: "bulb-outline" },
      { id: 3, name: "Cookware Set", price: 79.99, image: "restaurant-outline" },
      { id: 4, name: "Vacuum Cleaner", price: 149.99, image: "aperture-outline" },
    ],
  },
  Beauty: {
    description: "Discover beauty products to help you look and feel your best.",
    banner: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    products: [
      { id: 1, name: "Lipstick", price: 19.99, image: "rose-outline" },
      { id: 2, name: "Perfume", price: 49.99, image: "flask-outline" },
      { id: 3, name: "Face Cream", price: 24.99, image: "water-outline" },
      { id: 4, name: "Makeup Kit", price: 59.99, image: "color-palette-outline" },
    ],
  },
  Sports: {
    description: "Gear up for your favorite sports and outdoor activities.",
    banner: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    products: [
      { id: 1, name: "Football", price: 39.99, image: "football-outline" },
      { id: 2, name: "Tennis Racket", price: 89.99, image: "tennisball-outline" },
      { id: 3, name: "Basketball", price: 49.99, image: "basketball-outline" },
      { id: 4, name: "Gym Bag", price: 29.99, image: "bag-outline" },
    ],
  },
};

const categories = [
  { name: 'Electronics', icon: 'phone-portrait-outline' },
  { name: 'Fashion', icon: 'shirt-outline' },
  { name: 'Home', icon: 'home-outline' },
  { name: 'Beauty', icon: 'rose-outline' },
  { name: 'Sports', icon: 'football-outline' },
];

export default function CategoryDetailsScreen() {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const details = categoryDetailsData[name as keyof typeof categoryDetailsData];

  // Occasionally render the category list at the top (e.g., for every odd category)
  const showCategoryList = categories.findIndex(c => c.name === name) % 2 === 1;

  if (!details) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Category Not Found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {showCategoryList && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryItem}
              onPress={() => router.push({ pathname: '/category-details', params: { name: category.name } })}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name={category.icon as any} size={24} color="#333" />
              </View>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <Text style={styles.title}>{name}</Text>
      <Image source={{ uri: details.banner }} style={styles.banner} />
      <Text style={styles.description}>{details.description}</Text>
      <Text style={styles.sectionTitle}>Products</Text>
      <View style={styles.productsGrid}>
        {details.products.map((product) => (
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
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  banner: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 16,
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
  categoriesScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
}); 