import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../api/auth';

const GOVT_GREEN = '#006233';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.replace('Auth');
        return;
      }
      const stored = await AsyncStorage.getItem('user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        await authAPI.logout(token);
      }
    } catch (e) {
      // ignore logout API error
    }
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    navigation.replace('Auth');
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={GOVT_GREEN} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🛡️</Text>
        <Text style={styles.headerTitle}>Government Portal</Text>
        <Text style={styles.headerSubtitle}>
          Welcome to Official Services
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.welcome}>Welcome</Text>
        {user && <Text style={styles.userName}>{user.name}</Text>}
        {user && <Text style={styles.userEmail}>{user.email}</Text>}
        {user && user.phone && (
          <Text style={styles.userPhone}>Phone: {user.phone}</Text>
        )}
      </View>

      <View style={styles.dashboard}>

        <TouchableOpacity style={styles.dashCard}>
          <Text style={styles.dashIcon}>📋</Text>
          <Text style={styles.dashText}>My Services</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dashCard}>
          <Text style={styles.dashIcon}>🗂️</Text>
          <Text style={styles.dashText}>Documents</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dashCard}>
          <Text style={styles.dashIcon}>🔔</Text>
          <Text style={styles.dashText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dashCard}>
          <Text style={styles.dashIcon}>ℹ️</Text>
          <Text style={styles.dashText}>Help & Support</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f0',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4f0',
  },
  header: {
    backgroundColor: GOVT_GREEN,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 40,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  headerSubtitle: {
    color: '#d4e6d4',
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginTop: -25,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  welcome: {
    fontSize: 14,
    color: '#888',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 4,
  },
  userEmail: {
    fontSize: 15,
    color: GOVT_GREEN,
    marginTop: 4,
  },
  userPhone: {
    fontSize: 15,
    color: '#555',
    marginTop: 2,
  },
  dashboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  dashCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  dashIcon: {
    fontSize: 32,
  },
  dashText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  logoutButton: {
    marginHorizontal: 20,
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
