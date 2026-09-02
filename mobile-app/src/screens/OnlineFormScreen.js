import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FormField from '../components/FormField';
import { getFormById } from '../data/forms';
import { formsAPI } from '../api/forms';
import {
  GOVT_GREEN,
  GOVT_GREEN_LIGHT,
  PAGE_BG,
} from '../theme/colors';

export default function OnlineFormScreen({ navigation, route }) {
  const form = getFormById(route.params?.formId);
  const [values, setValues] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (!form) {
    return (
      <View style={styles.center}>
        <Text>Form not found.</Text>
      </View>
    );
  }

  const updateField = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const missing = form.fields
      .filter((field) => field.required && !values[field.key]?.trim())
      .map((field) => field.label);

    if (missing.length > 0) {
      Alert.alert(
        'Required Fields',
        `Please fill in:\n\n• ${missing.join('\n• ')}`
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      const fields = form.fields.map((field) => ({
        label: field.label,
        value: values[field.key]?.trim() || '',
      }));

      const phoneField = values.phone || values.contact_phone;
      const emailField = values.email;

      await formsAPI.submit({
        form_id: form.id,
        form_title: `${form.title} – ${form.subtitle}`,
        submitter_name: values.full_name || values.applicant_name || null,
        submitter_email: emailField || null,
        submitter_phone: phoneField || null,
        fields,
      });

      Alert.alert(
        'Form Submitted',
        `Your ${form.title} has been submitted successfully. You will be contacted if further action is required.`,
        [{ text: 'OK', onPress: () => navigation.popToTop() }]
      );
    } catch (error) {
      Alert.alert('Submission Failed', error.message || 'Could not submit form. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{form.title} – Online</Text>
        <Text style={styles.headerSubtitle}>{form.subtitle}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formIntro}>
          <Ionicons name="document-text-outline" size={22} color={GOVT_GREEN} />
          <Text style={styles.formIntroText}>
            Fill all required fields marked with * and submit your application.
          </Text>
        </View>

        {form.fields.map((field) => (
          <FormField
            key={field.key}
            label={field.label}
            value={values[field.key] || ''}
            onChangeText={(text) => updateField(field.key, text)}
            placeholder={field.placeholder}
            required={field.required}
            multiline={field.multiline}
            keyboardType={field.keyboardType}
            type={field.type}
            options={field.options}
          />
        ))}

        <TouchableOpacity
          style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="send" size={20} color="#fff" style={styles.submitIcon} />
              <Text style={styles.submitText}>Submit Form</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PAGE_BG,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: GOVT_GREEN,
    paddingTop: 48,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    top: 48,
    padding: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: GOVT_GREEN_LIGHT,
    fontSize: 14,
    marginTop: 4,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  formIntro: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    gap: 10,
  },
  formIntroText: {
    flex: 1,
    fontSize: 13,
    color: '#2e5a32',
    lineHeight: 20,
  },
  submitBtn: {
    flexDirection: 'row',
    backgroundColor: GOVT_GREEN,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    elevation: 3,
  },
  submitBtnDisabled: {
    opacity: 0.7,
  },
  submitIcon: {
    marginRight: 8,
  },
  submitText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
