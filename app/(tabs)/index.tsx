import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import React from "react";
import { ActionSheetIOS, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCart } from "../context/CartContext";
import { useDelivery } from "../context/DeliveryContext";
import { useUser } from "../context/UserContext";

const { width } = Dimensions.get('window');

const sampleProducts = [
  { id: 1, name: "Smartphone", price: 999.99, image: "phone-outline" },
  { id: 2, name: "Laptop", price: 1299.99, image: "laptop-outline" },
  { id: 3, name: "Headphones", price: 199.99, image: "headset-outline" },
  { id: 4, name: "Smartwatch", price: 299.99, image: "watch-outline" },
];

// Define categories with icons
const categories = [
  { name: 'Electronics', icon: 'phone-portrait-outline' },
  { name: 'Fashion', icon: 'shirt-outline' },
  { name: 'Home', icon: 'home-outline' },
  { name: 'Beauty', icon: 'rose-outline' },
  { name: 'Sports', icon: 'football-outline' },
];

const HomeScreen = () => {
  const router = useRouter();
  const { addToCart, getTotalItems } = useCart();
  const { trackingNumber, deliveryStatus } = useDelivery();
  const { user } = useUser();

  // Camera handler
  const handleCamera = async () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        async (buttonIndex) => {
          if (buttonIndex === 1) {
            await takePhoto();
          } else if (buttonIndex === 2) {
            await pickImage();
          }
        }
      );
    } else {
      // For Android, use a simple prompt
      const choice = window.confirm('Take Photo? (Cancel for Library)');
      if (choice) {
        await takePhoto();
      } else {
        await pickImage();
      }
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== 'granted') {
      alert('Camera permission is required!');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      alert('Picture taken!');
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      alert('Media library permission is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      alert('Image selected!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DhGate</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={() => router.push('/delivery-tracking')}
          >
            <Ionicons name="car-outline" size={24} color="black" />
            {trackingNumber && (
              <View style={styles.deliveryBadge}>
                <Ionicons name="checkmark" size={12} color="white" />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/cart')}>
            <Ionicons name="cart-outline" size={24} color="black" />
            {getTotalItems() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={() => router.push('/settings')}
          >
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
            ) : (
              <Ionicons name="person-circle-outline" size={28} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity onPress={handleCamera} style={styles.cameraButton}>
          <Ionicons name="camera-sharp" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Delivery Tracking */}
      {trackingNumber && (
        <TouchableOpacity 
          style={styles.trackingCard}
          onPress={() => router.push('/delivery-tracking')}
        >
          <View style={styles.trackingHeader}>
            <Ionicons name="car-outline" size={24} color="#007AFF" />
            <Text style={styles.trackingTitle}>Track Your Delivery</Text>
          </View>
          <View style={styles.trackingInfo}>
            <Text style={styles.trackingNumber}>Tracking: {trackingNumber}</Text>
            <Text style={styles.trackingStatus}>
              Status: {deliveryStatus ? deliveryStatus.charAt(0).toUpperCase() + deliveryStatus.slice(1) : 'Pending'}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryItem}
              onPress={() => router.push({ pathname: '/category', params: { name: category.name } })}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name={category.icon} size={24} color="#333" />
              </View>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Products */}
      <View style={styles.featuredContainer}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <View style={styles.productsGrid}>
          {sampleProducts.map((product) => (
            <TouchableOpacity 
              key={product.id} 
              style={styles.productCard}
              onPress={() => addToCart(product)}
            >
              <View style={styles.productImage}>
                <Ionicons name={product.image as any} size={40} color="#333" />
              </View>
              <Text style={styles.productTitle}>{product.name}</Text>
              <Text style={styles.productPrice}>GHc{product.price.toFixed(2)}</Text>
              <TouchableOpacity 
                style={styles.addToCartButton}
                onPress={() => addToCart(product)}
              >
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  deliveryBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#4CD964',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoriesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoriesScroll: {
    flexDirection: 'row',
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
  featuredContainer: {
    padding: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  addToCartText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
  trackingCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trackingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  trackingTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#007AFF',
  },
  trackingInfo: {
    marginLeft: 32,
  },
  trackingNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  trackingStatus: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  cameraButton: {
    marginLeft: 8,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;