import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../api/auth';

const GOVT_GREEN = '#006233';
const LIGHT_GREEN = '#e8f5e9';

export default function LoginScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('email'); // 'email' or 'phone'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      const res = await authAPI.login({ email, password });
      await AsyncStorage.setItem('token', res.token);
      await AsyncStorage.setItem('user', JSON.stringify(res.user));
      navigation.replace('Home');
    } catch (e) {
      Alert.alert('Login Failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = async () => {
    if (!phone || !otp) {
      Alert.alert('Error', 'Please enter phone and OTP');
      return;
    }
    setLoading(true);
    try {
      const res = await authAPI.login({ phone, otp });
      await AsyncStorage.setItem('token', res.token);
      await AsyncStorage.setItem('user', JSON.stringify(res.user));
      navigation.replace('Home');
    } catch (e) {
      Alert.alert('Login Failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!phone) {
      Alert.alert('Error', 'Please enter phone number');
      return;
    }
    setLoading(true);
    try {
      const res = await authAPI.sendOtp(phone);
      Alert.alert('OTP Sent', `Your OTP is: ${res.otp}\n(For demo only - send via SMS in production)`);
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>🛡️</Text>
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subHeading}>Login to continue</Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'email' && styles.activeTab]}
            onPress={() => setActiveTab('email')}
          >
            <Text style={[styles.tabText, activeTab === 'email' && styles.activeTabText]}>
              Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'phone' && styles.activeTab]}
            onPress={() => setActiveTab('phone')}
          >
            <Text style={[styles.tabText, activeTab === 'phone' && styles.activeTabText]}>
              Phone + OTP
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        {activeTab === 'email' ? (
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleEmailLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="e.g. 03XXXXXXXXX"
              keyboardType="phone-pad"
              maxLength={11}
            />
            <Text style={styles.label}>OTP</Text>
            <TextInput
              style={styles.input}
              value={otp}
              onChangeText={setOtp}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              maxLength={6}
            />
            <TouchableOpacity style={styles.otpButton} onPress={handleSendOtp} disabled={loading}>
              <Text style={styles.otpButtonText}>Send OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} disabled={loading} onPress={handlePhoneLogin}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Create account link */}
        <TouchableOpacity
          style={styles.createAccount}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.createAccountText}>
            Don't have an account? <Text style={styles.link}>Create Account</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#fff' },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: GOVT_GREEN,
  },
  subHeading: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: LIGHT_GREEN,
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: GOVT_GREEN,
  },
  tabText: {
    color: GOVT_GREEN,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: GOVT_GREEN,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  otpButton: {
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GOVT_GREEN,
  },
  otpButtonText: {
    color: GOVT_GREEN,
    fontSize: 15,
    fontWeight: '600',
  },
  createAccount: {
    marginTop: 20,
    alignItems: 'center',
  },
  createAccountText: {
    fontSize: 15,
    color: '#666',
  },
  link: {
    color: GOVT_GREEN,
    fontWeight: 'bold',
  },
});
