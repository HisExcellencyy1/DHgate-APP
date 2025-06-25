import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useDelivery } from "../context/DeliveryContext";

const DeliveryAddressScreen = () => {
  const router = useRouter();
  const { selectedCountry, setAddress } = useDelivery();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSubmit = () => {
    if (!street || !city || !state || !postalCode) {
      return;
    }

    setAddress({
      street,
      city,
      state,
      country: selectedCountry,
      postalCode,
    });

    router.push('/delivery-tracking');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Street Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your street address"
            value={street}
            onChangeText={setStreet}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your city"
              value={city}
              onChangeText={setCity}
            />
          </View>
          <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>State/Province</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your state"
              value={state}
              onChangeText={setState}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Postal Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your postal code"
            value={postalCode}
            onChangeText={setPostalCode}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Country</Text>
          <View style={styles.countryDisplay}>
            <Text style={styles.countryText}>{selectedCountry}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!street || !city || !state || !postalCode) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!street || !city || !state || !postalCode}
        >
          <Text style={styles.submitButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  countryDisplay: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f8f8f8',
  },
  countryText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
    marginBottom: 80,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DeliveryAddressScreen; 