import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../context/CartContext";
import { useDelivery } from "../context/DeliveryContext";

const CartScreen = () => {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { selectedCountry } = useDelivery();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    if (!selectedCountry) {
      router.push('/country-select');
      return;
    }
    router.push('/payment-method');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <View style={styles.placeholder} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={64} color="#ccc" />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <TouchableOpacity 
            style={styles.continueShoppingButton}
            onPress={() => router.back()}
          >
            <Text style={styles.continueShoppingText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView style={styles.cartItems}>
            {/* Delivery Information */}
            <View style={styles.deliveryInfo}>
              <View style={styles.deliveryHeader}>
                <Ionicons name="globe-outline" size={24} color="#007AFF" />
                <Text style={styles.deliveryTitle}>Delivery Information</Text>
              </View>
              {selectedCountry ? (
                <TouchableOpacity 
                  style={styles.selectedCountry}
                  onPress={() => router.push('/country-select')}
                >
                  <View style={styles.countryInfo}>
                    <Text style={styles.countryLabel}>Delivery Country:</Text>
                    <Text style={styles.countryValue}>{selectedCountry}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#007AFF" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={styles.selectCountryButton}
                  onPress={() => router.push('/country-select')}
                >
                  <Text style={styles.selectCountryText}>Select Delivery Country</Text>
                  <Ionicons name="chevron-forward" size={20} color="#007AFF" />
                </TouchableOpacity>
              )}
            </View>

            {/* Cart Items */}
            <View style={styles.cartItemsHeader}>
              <Text style={styles.cartItemsTitle}>Items in Cart</Text>
            </View>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemImage}>
                  <Ionicons name={item.image as any} size={32} color="#333" />
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>GHc{item.price.toFixed(2)}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Ionicons name="remove" size={20} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Ionicons name="add" size={20} color="#333" />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalAmount}>GHc{getTotalPrice().toFixed(2)}</Text>
            </View>
            <TouchableOpacity 
              style={[
                styles.checkoutButton, 
                (cartItems.length === 0 || !selectedCountry) && styles.checkoutButtonDisabled
              ]}
              onPress={handleCheckout}
              disabled={cartItems.length === 0 || !selectedCountry}
            >
              <Text style={styles.checkoutButtonText}>
                {!selectedCountry ? 'Select Country First' : 'Proceed to Checkout'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  continueShoppingButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueShoppingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  cartItems: {
    flex: 1,
  },
  cartItemsHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cartItemsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  deliveryInfo: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliveryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#007AFF',
  },
  selectedCountry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
  },
  countryInfo: {
    flex: 1,
  },
  countryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  countryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
  selectCountryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
  },
  selectCountryText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 12,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
    marginBottom: 80,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonDisabled: {
    opacity: 0.5,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen; 