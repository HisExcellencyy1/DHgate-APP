import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../context/CartContext";
import { usePayment } from "../context/PaymentContext";

const PaymentDetailsScreen = () => {
  const router = useRouter();
  const { getTotalPrice } = useCart();
  const { selectedMethod, processPayment, isProcessing } = usePayment();
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async () => {
    const success = await processPayment(getTotalPrice());
    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/payment-success');
      }, 1500);
    } else {
      Alert.alert(
        'Payment Failed',
        'There was an error processing your payment. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  if (!selectedMethod) {
    router.back();
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Details</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.paymentCard}>
          <View style={styles.paymentHeader}>
            <Ionicons 
              name={selectedMethod.type === 'card' ? 'card-outline' : 
                    selectedMethod.type === 'mobile_money' ? 'phone-portrait-outline' : 
                    'cash-outline'} 
              size={32} 
              color="#007AFF" 
            />
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentName}>{selectedMethod.name}</Text>
              <Text style={styles.paymentDetails}>{selectedMethod.details}</Text>
            </View>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Amount to Pay</Text>
            <Text style={styles.amount}>GHc{getTotalPrice().toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[
              styles.payButton,
              (isProcessing || isSuccess) && styles.payButtonDisabled
            ]}
            disabled={isProcessing || isSuccess}
            onPress={handlePayment}
          >
            {isProcessing ? (
              <ActivityIndicator color="#fff" />
            ) : isSuccess ? (
              <Ionicons name="checkmark" size={24} color="#fff" />
            ) : (
              <Text style={styles.payButtonText}>Pay Now</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  content: {
    flex: 1,
    padding: 16,
    marginBottom: 80,
  },
  paymentCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  paymentInfo: {
    marginLeft: 16,
    flex: 1,
  },
  paymentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  paymentDetails: {
    fontSize: 16,
    color: '#666',
  },
  amountContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  amountLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  actions: {
    marginTop: 'auto',
  },
  payButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default PaymentDetailsScreen; 