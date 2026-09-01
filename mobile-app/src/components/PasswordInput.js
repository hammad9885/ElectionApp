import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const PLACEHOLDER_COLOR = '#999';

export default function PasswordInput({
  style,
  placeholder,
  value,
  onChangeText,
  ...rest
}) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.wrapper, style]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={PLACEHOLDER_COLOR}
        secureTextEntry={!visible}
        autoCapitalize="none"
        {...rest}
      />
      <TouchableOpacity
        style={styles.eyeButton}
        onPress={() => setVisible((current) => !current)}
        accessibilityLabel={visible ? 'Hide password' : 'Show password'}
      >
        <Ionicons
          name={visible ? 'eye-off-outline' : 'eye-outline'}
          size={22}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    paddingRight: 48,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
});
