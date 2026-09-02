import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../api/auth';
import AppLogo from '../components/AppLogo';
import { ECP_FORMS } from '../data/forms';
import {
  GOVT_GREEN,
  GOVT_GREEN_LIGHT,
  GOVT_GOLD,
  PAGE_BG,
  CARD_BG,
  TEXT_SECONDARY,
} from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.replace('Auth');
        return;
      }
      const stored = await AsyncStorage.getItem('user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        await authAPI.logout(token);
      }
    } catch (e) {
      // ignore logout API error
    }
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    navigation.replace('Auth');
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={GOVT_GREEN} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppLogo size={70} style={styles.headerLogo} />
        <Text style={styles.headerTitle}>Election Commission of Pakistan</Text>
        <Text style={styles.headerSubtitle}>Official Voter Services Portal</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.welcome}>Welcome</Text>
          {user && <Text style={styles.userName}>{user.name}</Text>}
          {user && <Text style={styles.userEmail}>{user.email}</Text>}
        </View>

        <TouchableOpacity
          style={styles.heroCard}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('FormsList')}
        >
          <View style={styles.heroLeft}>
            <View style={styles.heroIconWrap}>
              <Ionicons name="documents" size={32} color="#fff" />
            </View>
            <View style={styles.heroText}>
              <Text style={styles.heroTitle}>ECP Official Forms</Text>
              <Text style={styles.heroSubtitle}>
                Form 21 · 22 · 23 · Postal Ballot
              </Text>
              <Text style={styles.heroDesc}>
                Download PDF or fill online & submit
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Available Forms</Text>
        <View style={styles.formsGrid}>
          {ECP_FORMS.map((form) => (
            <TouchableOpacity
              key={form.id}
              style={styles.formTile}
              onPress={() => navigation.navigate('FormDetail', { formId: form.id })}
            >
              <Ionicons name={form.icon} size={26} color={GOVT_GREEN} />
              <Text style={styles.formTileTitle}>{form.title}</Text>
              <Text style={styles.formTileSub} numberOfLines={2}>
                {form.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.servicesRow}>
          <TouchableOpacity style={styles.serviceCard}>
            <Ionicons name="search-outline" size={28} color={GOVT_GREEN} />
            <Text style={styles.serviceText}>Check Registration</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceCard}>
            <Ionicons name="help-circle-outline" size={28} color={GOVT_GREEN} />
            <Text style={styles.serviceText}>Help & Support</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.officialBanner}>
          <Ionicons name="shield-checkmark" size={18} color={GOVT_GOLD} />
          <Text style={styles.officialText}>
            Official forms from ecp.gov.pk · Election Commission of Pakistan
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
    backgroundColor: PAGE_BG,
  },
  header: {
    backgroundColor: GOVT_GREEN,
    padding: 20,
    paddingTop: 44,
    paddingBottom: 36,
    alignItems: 'center',
  },
  headerLogo: {
    marginBottom: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
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
    paddingBottom: 24,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginTop: -24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  welcome: {
    fontSize: 14,
    color: '#888',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 4,
  },
  userEmail: {
    fontSize: 15,
    color: GOVT_GREEN,
    marginTop: 4,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GOVT_GREEN,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 18,
    elevation: 4,
  },
  heroLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  heroText: {
    flex: 1,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  heroSubtitle: {
    color: GOVT_GREEN_LIGHT,
    fontSize: 13,
    marginTop: 2,
    fontWeight: '600',
  },
  heroDesc: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  formsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    justifyContent: 'space-between',
  },
  formTile: {
    width: '48%',
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  formTileTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    marginTop: 8,
  },
  formTileSub: {
    fontSize: 11,
    color: TEXT_SECONDARY,
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 16,
  },
  servicesRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 8,
  },
  serviceCard: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    elevation: 1,
  },
  serviceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  officialBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 12,
    backgroundColor: '#fffde7',
    borderRadius: 10,
    gap: 8,
  },
  officialText: {
    flex: 1,
    fontSize: 11,
    color: '#6d5c00',
    lineHeight: 16,
  },
  logoutButton: {
    marginHorizontal: 20,
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
