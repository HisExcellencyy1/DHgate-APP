import { Stack } from 'expo-router';

export default function DeliveryLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="country-select"
        options={{
          title: 'Select Country',
        }}
      />
      <Stack.Screen
        name="delivery-address"
        options={{
          title: 'Delivery Address',
        }}
      />
      <Stack.Screen
        name="delivery-tracking"
        options={{
          title: 'Track Delivery',
        }}
      />
    </Stack>
  );
} 