import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ResponsiveMenu from '../layout/ResponsiveMenu';

const ProductItem = ({ item }:{ item:any }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('ProductDetail', { productId: item.id });
    };

    // Format giá về dạng VND và tính giá sale
    const formatPrice = (price) => {
        const vndPrice = Math.round(price * 23000); // Chuyển USD sang VND
        // Tạo giá sale (giả lập) cho một số sản phẩm
        const salePrice = item.id % 2 === 0 ? Math.round(vndPrice * 0.8) : null;
        return { originalPrice: vndPrice, salePrice };
    };

    const prices = formatPrice(item.price);

    return (
        <TouchableOpacity style={styles.productItem} onPress={handlePress}>
            <Image 
                source={{ uri: item.image }} 
                style={styles.productImage}
                resizeMode="cover"
            />
            <Text style={styles.productName} numberOfLines={2}>{item.title}</Text>
            <View style={styles.priceContainer}>
                {prices.salePrice ? (
                    <>
                        <Text style={styles.salePrice}>{prices.salePrice}đ</Text>
                        <Text style={styles.originalPrice}>{prices.originalPrice}đ</Text>
                    </>
                ) : (
                    <Text style={styles.price}>{prices.originalPrice}đ</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const ProductList = () => {
    const [sortState, setSortState] = useState({ order: null, active: false });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    useEffect(() => {
        fetchProducts();
    }, [selectedCategory]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const sortProducts = () => {
        let newOrder;
        if (!sortState.active) {
            newOrder = 'asc';
        } else if (sortState.order === 'asc') {
            newOrder = 'desc';
        } else {
            newOrder = null;
        }

        if (newOrder) {
            const sortedProducts = [...products].sort((a, b) => {
                return newOrder === 'asc' ? a.price - b.price : b.price - a.price;
            });
            setProducts(sortedProducts);
        } else {
            fetchProducts();
        }

        setSortState({ order: newOrder, active: newOrder !== null });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tất Cả Sản Phẩm</Text>
            <View style={styles.sortContainer}>
                <Text style={styles.sortLabel}>Sắp xếp:</Text>
                <TouchableOpacity
                    style={[styles.sortButton, sortState.active && styles.activeSortButton]}
                    onPress={sortProducts}>
                    <Text style={styles.sortButtonText}>Giá</Text>
                    {sortState.order === 'asc' && <Text style={styles.arrow}>▲</Text>}
                    {sortState.order === 'desc' && <Text style={styles.arrow}>▼</Text>}
                    {!sortState.order && <Text style={styles.arrow}>▲▼</Text>}
                </TouchableOpacity>
            </View>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductItem item={item} />}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}/>
            <ResponsiveMenu />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 10,
    },
    sortLabel: {
        marginRight: 10,
        fontSize: 16,
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    activeSortButton: {
    },
    sortButtonText: {
        color: 'black',
        marginRight: 5,
    },
    arrow: {
        fontSize: 16,
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    productItem: {
        width: '48%',
        marginBottom: 20,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    productName: {
        fontSize: 16,
        marginTop: 5,
        height: 40, // Giới hạn chiều cao cho 2 dòng
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    price: {
        fontSize: 14,
        color: 'black',
    },
    salePrice: {
        fontSize: 14,
        color: 'red',
        marginRight: 5,
    },
    originalPrice: {
        fontSize: 12,
        color: 'gray',
        textDecorationLine: 'line-through',
    },
});

export default ProductList;