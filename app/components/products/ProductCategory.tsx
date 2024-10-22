import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ResponsiveMenu from '../layout/ResponsiveMenu';

const ProductItem = ({ item }) => {
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
            <View style={styles.productCard}>
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
            </View>
        </TouchableOpacity>
    );
};

const ProductCategory = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const navigation = useNavigation();
    const { category } = route.params;

    useEffect(() => {
        fetchCategoryProducts();
        // Cập nhật tiêu đề của trang
        navigation.setOptions({
            title: `${category.charAt(0).toUpperCase() + category.slice(1)}`,
        });
    }, [category]);

    const fetchCategoryProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching category products:', error);
        } finally {
            setLoading(false);
        }
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
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductItem item={item} />}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent} />
                <ResponsiveMenu />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 10,
    },
    row: {
        justifyContent: 'space-between',
    },
    productItem: {
        width: '48%',
        marginBottom: 20,
    },
    productCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    productName: {
        fontSize: 16,
        marginTop: 5,
        height: 40,
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

export default ProductCategory;