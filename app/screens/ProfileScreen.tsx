import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ResponsiveMenu from '../components/layout/ResponsiveMenu';

// Mock data for user profile
const userProfile = {
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  avatar: require('../../assets/images/logo.png'),
};

const ProfileScreen = () => {
  const renderMenuItem = (icon, title) => (
    <TouchableOpacity style={styles.menuItem}>
      <Ionicons name={icon} size={24} color="#333" />
      <Text style={styles.menuItemText}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image source={userProfile.avatar} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{userProfile.name}</Text>
            <Text style={styles.email}>{userProfile.email}</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          {renderMenuItem('person-outline', 'Thông tin cá nhân')}
          {renderMenuItem('cart-outline', 'Đơn hàng của tôi')}
          {renderMenuItem('heart-outline', 'Sản phẩm yêu thích')}
          {renderMenuItem('settings-outline', 'Cài đặt')}
          {renderMenuItem('help-circle-outline', 'Trợ giúp & Hỗ trợ')}
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
        <ResponsiveMenu />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 20,
    flex: 1,
    color: '#333',
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#e91e63',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});

export default ProfileScreen;