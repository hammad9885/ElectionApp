import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const ecpLogo = require('../assets/ecp-logo.png');

export default function AppLogo({ size = 120, style }) {
  const height = Math.round(size * 1.4);

  return (
    <View style={[styles.card, { width: size + 28, minHeight: height + 28 }, style]}>
      <Image
        source={ecpLogo}
        style={{ width: size, height }}
        resizeMode="contain"
        accessibilityLabel="Election Commission of Pakistan logo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
});
