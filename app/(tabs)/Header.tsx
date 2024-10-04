import React from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.authContainer}>
          <TouchableOpacity>
            <Text style={styles.authText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>|</Text>
          <TouchableOpacity>
            <Text style={styles.authText}>ĐĂNG KÝ</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart-outline" size={24} color="black" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>0</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    padding: 8,
  },
  searchButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authText: {
    fontSize: 12,
    marginHorizontal: 5,
  },
  separator: {
    fontSize: 12,
    marginHorizontal: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
    marginRight: 10,
  },
  cartButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 5,
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
  },
});

export default Header;