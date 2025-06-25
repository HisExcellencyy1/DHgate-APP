import { Stack } from 'expo-router';
import { CartProvider } from './context/CartContext';
import { DeliveryProvider } from './context/DeliveryContext';
import { PaymentProvider } from './context/PaymentContext';
import { UserProvider } from './context/UserContext';

export default function Layout() {
  return (
    <UserProvider>
      <CartProvider>
        <DeliveryProvider>
          <PaymentProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(payment)" options={{ headerShown: false }} />
              <Stack.Screen name="delivery-tracking" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
              <Stack.Screen  name='(delivery)' options={{ headerShown: false}} />
            </Stack>
          </PaymentProvider>
        </DeliveryProvider>
      </CartProvider>
    </UserProvider>
  );
}
