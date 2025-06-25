import { Stack } from "expo-router";
import React from "react";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
        }}
      />
      <Stack.Screen
        name="personal-info"
        options={{
          title: "Personal Information",
        }}
      />
      <Stack.Screen
        name="addresses"
        options={{
          title: "Addresses",
        }}
      />
      <Stack.Screen
        name="payment-methods"
        options={{
          title: "Payment Methods",
        }}
      />
      <Stack.Screen
        name="orders"
        options={{
          title: "Order History",
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          title: "Notifications",
        }}
      />
      <Stack.Screen
        name="support"
        options={{
          title: "Support",
        }}
      />
      <Stack.Screen
        name="add-payment"
        options={{
          title: "Add Payment Method",
        }}
      />
      <Stack.Screen
        name="edit-payment"
        options={{
          title: "Edit Payment Method",
        }}
      />
    </Stack>
  );
} 