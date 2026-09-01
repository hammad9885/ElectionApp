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
import { authAPI } from '../api/auth';
import PasswordInput, { PLACEHOLDER_COLOR } from '../components/PasswordInput';
import AppLogo from '../components/AppLogo';

const GOVT_GREEN = '#006233';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !phone) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (password !== passwordConfirmation) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await authAPI.register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        phone,
      });

      Alert.alert(
        'Account Created',
        res.otp
          ? `Your account is ready. OTP (dev): ${res.otp}\n\nPlease login with your email and password.`
          : 'Your account is ready. Please login with your email and password.',
        [
          {
            text: 'Go to Login',
            onPress: () =>
              navigation.navigate('Auth', {
                email: res.email,
              }),
          },
        ]
      );
    } catch (e) {
      Alert.alert('Registration Failed', e.message);
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
        <Text style={styles.heading}>Create Account</Text>
        <Text style={styles.subHeading}>Register for ECP services</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          placeholderTextColor={PLACEHOLDER_COLOR}
          editable={!loading}
        />

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

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="03XX XXXXXXX"
          placeholderTextColor={PLACEHOLDER_COLOR}
          keyboardType="phone-pad"
          maxLength={11}
          editable={!loading}
        />

        <Text style={styles.label}>Password</Text>
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder="Minimum 8 characters"
          editable={!loading}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <PasswordInput
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          placeholder="Re-enter your password"
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.login}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.link}>Login</Text>
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
  login: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 15,
    color: '#666',
  },
  link: {
    color: GOVT_GREEN,
    fontWeight: 'bold',
  },
});
