import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const services = [
    { icon: '🪪', title: 'CNIC Services', desc: 'Apply and renew your CNIC' },
    { icon: 'passport', title: 'Passport', desc: 'International passport services' },
    { icon: '🚗', title: 'Vehicle Registration', desc: 'Register your vehicle' },
    { icon: '🏠', title: 'Property Tax', desc: 'Pay your property taxes' },
    { icon: '🏥', title: 'Health Services', desc: 'Government health programs' },
    { icon: '🎓', title: 'Education', desc: 'Scholarships and admissions' },
  ];

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1a237e" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Assalam-o-Alaikum 👋</Text>
            <Text style={styles.welcomeText}>Welcome to Government Portal</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerIcon}>🏛️</Text>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Digital Pakistan</Text>
            <Text style={styles.bannerSubtitle}>
              All government services at one place
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <TouchableOpacity key={index} style={styles.serviceCard}>
              <View style={styles.serviceIconContainer}>
                <Text style={styles.serviceIcon}>{service.icon}</Text>
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDesc} numberOfLines={2}>
                {service.desc}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.announcementCard}>
          <Text style={styles.announcementIcon}>📢</Text>
          <View style={styles.announcementTextContainer}>
            <Text style={styles.announcementTitle}>New Announcement</Text>
            <Text style={styles.announcementDesc}>
              Check the latest government updates and announcements
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 Government of Pakistan</Text>
          <Text style={styles.footerVersion}>All Rights Reserved</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7ff',
  },
  header: {
    backgroundColor: '#1a237e',
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#bbdefb',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 25,
    padding: 18,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  bannerIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 3,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
  },
  serviceCard: {
    width: '31%',
    marginHorizontal: '1%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f3ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceIcon: {
    fontSize: 25,
  },
  serviceTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 3,
  },
  serviceDesc: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    lineHeight: 13,
  },
  announcementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3e0',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    borderRadius: 14,
  },
  announcementIcon: {
    fontSize: 25,
    marginRight: 12,
  },
  announcementTextContainer: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e65100',
    marginBottom: 3,
  },
  announcementDesc: {
    fontSize: 12,
    color: '#795548',
    lineHeight: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 3,
  },
  footerVersion: {
    fontSize: 11,
    color: '#bbb',
  },
});

export default HomeScreen;
