import React, { useEffect, useState } from 'react';
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
import PasswordInput, { PLACEHOLDER_COLOR } from '../components/PasswordInput';
import AppLogo from '../components/AppLogo';

const GOVT_GREEN = '#006233';

export default function LoginScreen({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, [route.params?.email]);

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

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <AppLogo size={90} style={styles.logo} />
        <Text style={styles.orgName}>Election Commission of Pakistan</Text>
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subHeading}>Login to your account</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="example@email.com"
          placeholderTextColor={PLACEHOLDER_COLOR}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        <Text style={styles.label}>Password</Text>
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleEmailLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createAccount}
          onPress={() => navigation.navigate('Signup')}
          disabled={loading}
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
    marginBottom: 12,
  },
  orgName: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    color: GOVT_GREEN,
    marginBottom: 8,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: GOVT_GREEN,
  },
  subHeading: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
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
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
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
