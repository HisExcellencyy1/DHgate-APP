import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../context/CartContext";
import { usePayment } from "../context/PaymentContext";

const CheckoutScreen = () => {
  const router = useRouter();
  const { cartItems, getTotalPrice } = useCart();
  const { selectedMethod } = usePayment();

  const handlePayment = () => {
    router.push('/payment-method');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>GHc{(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>GHc{getTotalPrice().toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity 
            style={styles.paymentCard}
            onPress={handlePayment}
          >
            {selectedMethod ? (
              <View style={styles.selectedPayment}>
                <Ionicons 
                  name={selectedMethod.type === 'card' ? 'card-outline' : 
                        selectedMethod.type === 'mobile_money' ? 'phone-portrait-outline' : 
                        'cash-outline'} 
                  size={24} 
                  color="#007AFF" 
                />
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentName}>{selectedMethod.name}</Text>
                  <Text style={styles.paymentDetails}>{selectedMethod.details}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.selectPayment}>
                <Ionicons name="add-circle-outline" size={24} color="#666" />
                <Text style={styles.selectPaymentText}>Select Payment Method</Text>
              </View>
            )}
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity 
          style={[
            styles.checkoutButton,
            !selectedMethod && styles.checkoutButtonDisabled
          ]}
          disabled={!selectedMethod}
          onPress={handlePayment}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
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
  content: {
    padding: 16,
    marginBottom: 80,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
  },
  selectedPayment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentInfo: {
    marginLeft: 12,
    flex: 1,
  },
  paymentName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  paymentDetails: {
    fontSize: 14,
    color: '#666',
  },
  selectPayment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectPaymentText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  checkoutButtonDisabled: {
    backgroundColor: '#ccc',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CheckoutScreen; 