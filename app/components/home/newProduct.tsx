import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductItem = ({ item }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('ProductDetail', { productId: item.id });
    };

    const formatPrice = (price) => {
        const vndPrice = Math.round(price * 23000);
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

const NewProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNewProducts();
    }, []);

    const fetchNewProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://fakestoreapi.com/products?limit=5');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching new products:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Sản Phẩm Mới</Text>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#0000ff" />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sản Phẩm Mới</Text>
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductItem item={item} />}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    loadingContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
    },
    productItem: {
        width: 150,
        marginHorizontal: 10,
    },
    productImage: {
        width: 150,
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

export default NewProducts;