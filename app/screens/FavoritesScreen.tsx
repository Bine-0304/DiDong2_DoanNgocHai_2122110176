import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../contexts/AppContext';
import ResponsiveMenu from '../components/layout/ResponsiveMenu';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/layout/Header';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation();
  const { favorites, removeFromFavorites } = useAppContext();
  const [selectedItems, setSelectedItems] = useState<number[]>(favorites && favorites.map(item => item.id));

  const handleRemoveFavorite = (product: Product) => {
    removeFromFavorites(product.id);
    alert(`Đã xóa ${product.title} khỏi mục yêu thích`);
  };

  const handleProductPress = (productId: number) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const toggleItemSelection = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    } else {
      setSelectedItems(prev => [...prev, itemId]);
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
  
      <TouchableOpacity
        style={styles.productContent}
        onPress={() => handleProductPress(item.id)}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.title}</Text>
          <Text style={styles.productPrice}>{item.price.toLocaleString('vi-VN')}đ</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sản phẩm yêu thích</Text>
        </View>

        {favorites && favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có sản phẩm yêu thích</Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContainer}/>
        )}
      </View>
      <View style={styles.menuWrapper}>
        <ResponsiveMenu />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
    top: -6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  productContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#e91e63',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  menuWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  favoriteButton: {
    padding: 10,
  },
});

export default FavoritesScreen;