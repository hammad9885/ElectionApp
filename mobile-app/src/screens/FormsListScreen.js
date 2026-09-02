import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppLogo from '../components/AppLogo';
import { ECP_FORMS } from '../data/forms';
import {
  GOVT_GREEN,
  GOVT_GREEN_LIGHT,
  PAGE_BG,
  CARD_BG,
  TEXT_SECONDARY,
} from '../theme/colors';

export default function FormsListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <AppLogo size={56} style={styles.logo} />
        <Text style={styles.headerTitle}>ECP Official Forms</Text>
        <Text style={styles.headerSubtitle}>
          Election Commission of Pakistan · ecp.gov.pk
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle" size={22} color={GOVT_GREEN} />
          <Text style={styles.infoText}>
            Download official PDF forms or fill and submit online directly from this app.
          </Text>
        </View>

        {ECP_FORMS.map((form) => (
          <TouchableOpacity
            key={form.id}
            style={styles.formCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('FormDetail', { formId: form.id })}
          >
            <View style={styles.formIconWrap}>
              <Ionicons name={form.icon} size={28} color={GOVT_GREEN} />
            </View>
            <View style={styles.formContent}>
              <View style={styles.formTitleRow}>
                <Text style={styles.formNumber}>{form.title}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Official</Text>
                </View>
              </View>
              <Text style={styles.formSubtitle}>{form.subtitle}</Text>
              <Text style={styles.formDesc} numberOfLines={2}>
                {form.description}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#bbb" />
          </TouchableOpacity>
        ))}

        <View style={styles.footerNote}>
          <Text style={styles.footerText}>
            Forms sourced from the official ECP website. Online submissions are forwarded for processing.
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
  header: {
    backgroundColor: GOVT_GREEN,
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    top: 48,
    padding: 8,
  },
  logo: {
    marginBottom: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: GOVT_GREEN_LIGHT,
    fontSize: 13,
    marginTop: 4,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#2e5a32',
    lineHeight: 20,
  },
  formCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  formIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  formContent: {
    flex: 1,
  },
  formTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  formNumber: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
  },
  badge: {
    backgroundColor: GOVT_GREEN,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  formSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: GOVT_GREEN,
    marginTop: 2,
  },
  formDesc: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    marginTop: 4,
    lineHeight: 18,
  },
  footerNote: {
    marginTop: 8,
    padding: 12,
  },
  footerText: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 18,
  },
});
