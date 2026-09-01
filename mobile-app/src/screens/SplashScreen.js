import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';

const GOVT_GREEN = '#006233';
const ecpLogo = require('../assets/ecp-logo.png');

export default function SplashScreen({ navigation }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={GOVT_GREEN} />
      <Animated.View style={[styles.content, { opacity, transform: [{ scale }] }]}>
        <View style={styles.logoCard}>
          <Image source={ecpLogo} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={styles.title}>Election Commission{'\n'}of Pakistan</Text>
        <Text style={styles.subtitle}>Official Mobile Application</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GOVT_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
  },
  logoCard: {
    width: 220,
    height: 260,
    backgroundColor: '#fff',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 24,
  },
  logo: {
    width: 180,
    height: 220,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 15,
    color: '#d4e6d4',
    marginTop: 10,
    textAlign: 'center',
  },
});
