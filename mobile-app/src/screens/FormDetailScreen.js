import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFormById } from '../data/forms';
import {
  GOVT_GREEN,
  GOVT_GREEN_LIGHT,
  GOVT_GOLD,
  PAGE_BG,
  CARD_BG,
  TEXT_SECONDARY,
} from '../theme/colors';

export default function FormDetailScreen({ navigation, route }) {
  const form = getFormById(route.params?.formId);

  if (!form) {
    return (
      <View style={styles.center}>
        <Text>Form not found.</Text>
      </View>
    );
  }

  const handleDownload = async () => {
    try {
      const supported = await Linking.canOpenURL(form.pdfUrl);
      if (!supported) {
        Alert.alert('Error', 'Cannot open this form link on your device.');
        return;
      }
      await Linking.openURL(form.pdfUrl);
    } catch {
      Alert.alert('Error', 'Could not open the PDF. Check your internet connection.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerIconWrap}>
          <Ionicons name={form.icon} size={36} color="#fff" />
        </View>
        <Text style={styles.headerTitle}>{form.title}</Text>
        <Text style={styles.headerSubtitle}>{form.subtitle}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.descCard}>
          <Text style={styles.descText}>{form.description}</Text>
          <View style={styles.sourceRow}>
            <Ionicons name="globe-outline" size={16} color={GOVT_GREEN} />
            <Text style={styles.sourceText}>Source: {form.pdfSource}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Choose an option</Text>

        <TouchableOpacity style={styles.optionCard} activeOpacity={0.85} onPress={handleDownload}>
          <View style={[styles.optionIcon, { backgroundColor: '#e3f2fd' }]}>
            <Ionicons name="download-outline" size={32} color="#1565c0" />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Download Form (PDF)</Text>
            <Text style={styles.optionDesc}>
              Download the official PDF from ecp.gov.pk, print, fill manually and submit to ECP office.
            </Text>
          </View>
          <Ionicons name="open-outline" size={20} color="#1565c0" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('OnlineForm', { formId: form.id })}
        >
          <View style={[styles.optionIcon, { backgroundColor: '#e8f5e9' }]}>
            <Ionicons name="create-outline" size={32} color={GOVT_GREEN} />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Fill Online Form</Text>
            <Text style={styles.optionDesc}>
              Complete the form in-app and submit electronically. Your application will be sent for processing.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={GOVT_GREEN} />
        </TouchableOpacity>

        <View style={styles.noteCard}>
          <Ionicons name="shield-checkmark" size={20} color={GOVT_GOLD} />
          <Text style={styles.noteText}>
            Online submissions are securely forwarded. For official processing, also submit a signed copy with CNIC to your District Election Commissioner / Registration Officer.
          </Text>
        </View>
      </ScrollView>
    </View>
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
    paddingBottom: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    top: 48,
    padding: 8,
  },
  headerIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: GOVT_GREEN_LIGHT,
    fontSize: 15,
    marginTop: 4,
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  descCard: {
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 1,
  },
  descText: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    lineHeight: 22,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  sourceText: {
    fontSize: 12,
    color: GOVT_GREEN,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  optionDesc: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    marginTop: 4,
    lineHeight: 18,
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fffde7',
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    gap: 10,
    borderWidth: 1,
    borderColor: '#fff9c4',
  },
  noteText: {
    flex: 1,
    fontSize: 12,
    color: '#6d5c00',
    lineHeight: 18,
  },
});
