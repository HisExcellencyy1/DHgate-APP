import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const user = {
  name: 'Jane Doe',
  email: 'jane.doe@email.com',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
};

const settingsOptions = [
  { label: 'Profile', icon: 'person-outline', onPress: () => Alert.alert('Profile', 'Profile settings tapped!') },
  { label: 'Notifications', icon: 'notifications-outline', onPress: () => Alert.alert('Notifications', 'Notification settings tapped!') },
  { label: 'Privacy', icon: 'lock-closed-outline', onPress: () => Alert.alert('Privacy', 'Privacy settings tapped!') },
  { label: 'Help', icon: 'help-circle-outline', onPress: () => Alert.alert('Help', 'Help tapped!') },
  { label: 'Logout', icon: 'log-out-outline', onPress: () => Alert.alert('Logout', 'Logged out!') },
];

export default function SettingsScreen() {
  return (
    <LinearGradient colors={["#f8fafc", "#e0e7ef"]} style={styles.gradient}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>

          {/* Settings Options */}
          <View style={styles.optionsList}>
            {settingsOptions.map((option, idx) => (
              <TouchableOpacity
                key={option.label}
                style={styles.optionItem}
                onPress={option.onPress}
                activeOpacity={0.85}
              >
                <View style={styles.iconWrap}>
                  <Ionicons name={option.icon as any} size={22} color="#5a6cff" />
                </View>
                <Text style={styles.optionLabel}>{option.label}</Text>
                <Ionicons name="chevron-forward" size={20} color="#bfc6d1" style={styles.chevron} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginBottom: 32,
    shadowColor: '#bfc6d1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#e0e7ef',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  profileEmail: {
    fontSize: 15,
    color: '#7b869a',
    marginBottom: 2,
  },
  optionsList: {
    backgroundColor: 'transparent',
    borderRadius: 18,
    gap: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
    shadowColor: '#bfc6d1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 2,
  },
  iconWrap: {
    backgroundColor: '#e0e7ef',
    borderRadius: 10,
    padding: 8,
    marginRight: 18,
  },
  optionLabel: {
    fontSize: 17,
    color: '#222',
    flex: 1,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  chevron: {
    marginLeft: 8,
  },
});