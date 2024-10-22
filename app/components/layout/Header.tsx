import React from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { DancingScript_400Regular, DancingScript_700Bold } from '@expo-google-fonts/dancing-script';
import AppLoading from 'expo-app-loading';
import { useAppContext } from '../../contexts/AppContext';
import { useNavigation } from '@react-navigation/native';

const Header: React.FC = () => {
  let [fontsLoaded] = useFonts({
    DancingScript_400Regular,
    DancingScript_700Bold,
  });
  const { cartItems, isLoggedIn, user } = useAppContext();
  const navigation = useNavigation();

  const cartItemCount = cartItems ? new Set(cartItems.map(item => item.id)).size : 0;
  
  const handleCart = () => {
    navigation.navigate('Cart', { cartItems: cartItems });
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.nameshop}>BijiHouse</Text>
      <View style={styles.topRow}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}/>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."/>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.authContainer}>
          {isLoggedIn ? (
            <Text style={styles.welcomeText}>{user?.username}</Text>
          ) : (
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.authText}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.separator}>|</Text>
          <Text style={styles.authText}>Welcome to BijiHouse</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton} onPress={handleCart}>
            <Ionicons name="cart-outline" size={24} color="black" />
            {cartItemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItemCount}</Text>
              </View>
            )}
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
  nameshop:{
    textAlign: 'center', 
    fontSize: 26, 
    color: '#ff6347',
    fontWeight: 'bold',
    fontFamily: 'DancingScript_700Bold',
    marginBottom: 5,
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
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default Header;