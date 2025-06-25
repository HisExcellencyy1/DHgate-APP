import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { usePayment } from "../context/PaymentContext";

const PaymentMethodScreen = () => {
  const router = useRouter();
  const { setPaymentMethod } = usePayment();
  const [selectedType, setSelectedType] = useState<'card' | 'mobile_money' | 'bank_transfer'>('card');
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [network, setNetwork] = useState<'Airtel Cash' | 'Telecel Cash' | 'Momo'>('Momo');

  const handleSave = () => {
    if (!name || !details || (selectedType === 'mobile_money' && !network)) return;

    setPaymentMethod({
      id: Math.random().toString(36).substr(2, 9),
      type: selectedType,
      name,
      details: selectedType === 'mobile_money' ? `${details} (${network})` : details,
    });

    router.push('/payment-details');
  };

  const renderPaymentForm = () => {
    switch (selectedType) {
      case 'card':
        return (
          <>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              value={details}
              onChangeText={setDetails}
              keyboardType="numeric"
              maxLength={19}
            />
            <Text style={styles.label}>Cardholder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
            />
          </>
        );
      case 'mobile_money':
        return (
          <>
            <Text style={styles.label}>Network</Text>
            <View style={styles.networkContainer}>
              {['Airtel Cash', 'Telecel Cash', 'Momo'].map((n) => (
                <TouchableOpacity
                  key={n}
                  style={[styles.networkButton, network === n && styles.selectedNetworkButton]}
                  onPress={() => setNetwork(n as 'Airtel Cash' | 'Telecel Cash' | 'Momo')}
                >
                  <Text style={[styles.networkButtonText, network === n && styles.selectedNetworkButtonText]}>{n}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+233 XX XXX XXXX"
              value={details}
              onChangeText={setDetails}
              keyboardType="phone-pad"
            />
            <Text style={styles.label}>Account Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
            />
          </>
        );
      case 'bank_transfer':
        return (
          <>
            <Text style={styles.label}>Account Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234567890"
              value={details}
              onChangeText={setDetails}
              keyboardType="numeric"
            />
            <Text style={styles.label}>Account Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
            />
          </>
        );
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
        <Text style={styles.headerTitle}>Payment Method</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Select Payment Type</Text>
        
        <View style={styles.paymentTypes}>
          <TouchableOpacity 
            style={[
              styles.paymentType,
              selectedType === 'card' && styles.selectedPaymentType
            ]}
            onPress={() => setSelectedType('card')}
          >
            <Ionicons 
              name="card-outline" 
              size={24} 
              color={selectedType === 'card' ? '#007AFF' : '#666'} 
            />
            <Text style={[
              styles.paymentTypeText,
              selectedType === 'card' && styles.selectedPaymentTypeText
            ]}>Card</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.paymentType,
              selectedType === 'mobile_money' && styles.selectedPaymentType
            ]}
            onPress={() => setSelectedType('mobile_money')}
          >
            <Ionicons 
              name="phone-portrait-outline" 
              size={24} 
              color={selectedType === 'mobile_money' ? '#007AFF' : '#666'} 
            />
            <Text style={[
              styles.paymentTypeText,
              selectedType === 'mobile_money' && styles.selectedPaymentTypeText
            ]}>Mobile Money</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.paymentType,
              selectedType === 'bank_transfer' && styles.selectedPaymentType
            ]}
            onPress={() => setSelectedType('bank_transfer')}
          >
            <Ionicons 
              name="cash-outline" 
              size={24} 
              color={selectedType === 'bank_transfer' ? '#007AFF' : '#666'} 
            />
            <Text style={[
              styles.paymentTypeText,
              selectedType === 'bank_transfer' && styles.selectedPaymentTypeText
            ]}>Bank Transfer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          {renderPaymentForm()}
        </View>

        <TouchableOpacity 
          style={[
            styles.saveButton,
            (!name || !details) && styles.saveButtonDisabled
          ]}
          disabled={!name || !details}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Continue</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  paymentTypes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  paymentType: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  selectedPaymentType: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  paymentTypeText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  selectedPaymentTypeText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  networkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  networkButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedNetworkButton: {
    backgroundColor: '#007AFF',
  },
  networkButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedNetworkButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default PaymentMethodScreen; 