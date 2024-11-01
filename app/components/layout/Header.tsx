import React, { useState, useEffect } from 'react';
import { 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet,
  FlatList,
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { DancingScript_400Regular, DancingScript_700Bold } from '@expo-google-fonts/dancing-script';
import AppLoading from 'expo-app-loading';
import { useAppContext } from '../../contexts/AppContext';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const [fontsLoaded] = useFonts({
    DancingScript_400Regular,
    DancingScript_700Bold,
  });
  
  const { cartItems, isLoggedIn, user } = useAppContext();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setShowResults(false);
      return;
    }

    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(text.toLowerCase()) ||
      product.description.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
    setShowResults(true);
  };

  const handleProductPress = (product) => {
    setShowResults(false);
    setSearchQuery('');
    navigation.navigate('ProductDetail', { productId: product.id });
  };

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

  const renderProductItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => handleProductPress(item)}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>
          ${item.price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.nameshop}>BijiHouse</Text>
      <View style={styles.topRow}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
        />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Results */}
      {showResults && (
        <View style={styles.searchResults}>
          {loading ? (
            <ActivityIndicator size="large" color="#ff6347" />
          ) : (
            <FlatList
              data={filteredProducts}
              renderItem={renderProductItem}
              keyExtractor={item => item.id.toString()}
              ListEmptyComponent={
                <Text style={styles.noResults}>Không tìm thấy sản phẩm</Text>
              }
            />
          )}
        </View>
      )}

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
    zIndex: 1,
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
  searchResults: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    maxHeight: 300,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  productItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 12,
    color: '#ff6347',
    fontWeight: 'bold',
  },
  noResults: {
    padding: 20,
    textAlign: 'center',
    color: '#666',
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