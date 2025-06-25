import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDelivery } from "../context/DeliveryContext";

const DeliveryTrackingScreen = () => {
  const router = useRouter();
  const { 
    trackingNumber, 
    deliveryStatus, 
    estimatedDelivery,
    address,
    generateTrackingNumber,
    updateDeliveryStatus
  } = useDelivery();

  useEffect(() => {
    // Simulate delivery status updates
    if (trackingNumber && deliveryStatus !== 'delivered') {
      const statuses: Array<'pending' | 'processing' | 'shipped' | 'delivered'> = 
        ['pending', 'processing', 'shipped', 'delivered'];
      const currentIndex = statuses.indexOf(deliveryStatus || 'pending');
      
      if (currentIndex < statuses.length - 1) {
        const timer = setTimeout(() => {
          updateDeliveryStatus(statuses[currentIndex + 1]);
        }, 5000); // Update status every 5 seconds for demo purposes
        
        return () => clearTimeout(timer);
      }
    }
  }, [trackingNumber, deliveryStatus]);

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'pending':
        return '#FF9500';
      case 'processing':
        return '#007AFF';
      case 'shipped':
        return '#5856D6';
      case 'delivered':
        return '#4CD964';
      default:
        return '#8E8E93';
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'pending':
        return 'time-outline';
      case 'processing':
        return 'sync-outline';
      case 'shipped':
        return 'car-outline';
      case 'delivered':
        return 'checkmark-circle-outline';
      default:
        return 'help-circle-outline';
    }
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
        <Text style={styles.headerTitle}>Track Delivery</Text>
        <View style={styles.placeholder} />
      </View>

      {trackingNumber ? (
        <View style={styles.content}>
          <View style={styles.trackingCard}>
            <View style={styles.trackingHeader}>
              <Ionicons 
                name={getStatusIcon(deliveryStatus)} 
                size={32} 
                color={getStatusColor(deliveryStatus)} 
              />
              <View style={styles.trackingInfo}>
                <Text style={styles.trackingNumber}>Tracking: {trackingNumber}</Text>
                <Text style={[styles.trackingStatus, { color: getStatusColor(deliveryStatus) }]}>
                  {deliveryStatus ? deliveryStatus.charAt(0).toUpperCase() + deliveryStatus.slice(1) : 'Pending'}
                </Text>
              </View>
            </View>

            {address && (
              <View style={styles.addressSection}>
                <Text style={styles.sectionTitle}>Delivery Address</Text>
                <View style={styles.addressCard}>
                  <Text style={styles.addressText}>{address.street}</Text>
                  <Text style={styles.addressText}>
                    {address.city}, {address.state} {address.postalCode}
                  </Text>
                  <Text style={styles.addressText}>{address.country}</Text>
                </View>
              </View>
            )}

            {estimatedDelivery && (
              <View style={styles.estimatedDelivery}>
                <Text style={styles.sectionTitle}>Estimated Delivery</Text>
                <Text style={styles.deliveryDate}>{estimatedDelivery}</Text>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="car-outline" size={64} color="#666" />
          <Text style={styles.emptyText}>No active delivery</Text>
          <TouchableOpacity 
            style={styles.trackButton}
            onPress={generateTrackingNumber}
          >
            <Text style={styles.trackButtonText}>Generate Tracking Number</Text>
          </TouchableOpacity>
        </View>
      )}
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
  },
  trackingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
    marginBottom: 24,
  },
  trackingInfo: {
    marginLeft: 16,
  },
  trackingNumber: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  trackingStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  addressSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  addressCard: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  estimatedDelivery: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  deliveryDate: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
  },
  trackButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DeliveryTrackingScreen; 