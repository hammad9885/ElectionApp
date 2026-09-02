import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { GOVT_GREEN, BORDER, TEXT_MUTED } from '../theme/colors';

export default function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  required,
  multiline,
  keyboardType,
  type,
  options = [],
}) {
  if (type === 'select') {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          {label}
          {required ? <Text style={styles.required}> *</Text> : null}
        </Text>
        <View style={styles.optionsRow}>
          {options.map((option) => {
            const selected = value === option;
            return (
              <TouchableOpacity
                key={option}
                style={[styles.optionChip, selected && styles.optionChipSelected]}
                onPress={() => onChangeText(option)}
              >
                <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={TEXT_MUTED}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        keyboardType={keyboardType || 'default'}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#d32f2f',
  },
  input: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#222',
  },
  inputMultiline: {
    minHeight: 100,
    paddingTop: 14,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#fafafa',
    marginRight: 8,
    marginBottom: 8,
  },
  optionChipSelected: {
    backgroundColor: GOVT_GREEN,
    borderColor: GOVT_GREEN,
  },
  optionText: {
    fontSize: 13,
    color: '#444',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#fff',
  },
});
