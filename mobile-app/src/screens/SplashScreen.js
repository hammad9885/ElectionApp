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

export default function SplashScreen({ navigation }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Show logo for 3-4 seconds then go to auth
    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={GOVT_GREEN} />
      <Animated.View style={[styles.logoContainer, { opacity, transform: [{ scale }] }]}>
        {/* Placeholder govt logo - replace with your actual logo image */}
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmblem}>🛡️</Text>
        </View>
        <Text style={styles.title}>Government of Pakistan</Text>
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
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  logoEmblem: {
    fontSize: 60,
    color: GOVT_GREEN,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#d4e6d4',
    marginTop: 8,
    textAlign: 'center',
  },
});
