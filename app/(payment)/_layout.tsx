import { Stack } from 'expo-router';

export default function PaymentLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="payment-method"
        options={{
          title: 'Select Payment Method',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="payment-details"
        options={{
          title: 'Payment Details',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="payment-success"
        options={{
          title: 'Payment Success',
          headerShown: true,
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
