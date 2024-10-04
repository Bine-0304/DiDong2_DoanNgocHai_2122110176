import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const products = [
    { id: '1', title: 'Product 1', price: 10, salePrice: 8, image: require('../../assets/images/logo.png') },
    { id: '2', title: 'Product 2', price: 20, salePrice: 15, image: require('../../assets/images/logo.png') },
    { id: '3', title: 'Product 3', price: 30, salePrice: null, image: require('../../assets/images/logo.png') },
    { id: '4', title: 'Product 4', price: 40, salePrice: 35, image: require('../../assets/images/logo.png') },
    { id: '5', title: 'Product 5', price: 50, salePrice: null, image: require('../../assets/images/logo.png') },
    { id: '6', title: 'Product 6', price: 60, salePrice: 55, image: require('../../assets/images/logo.png') },
];

const ProductList = () => {
    const [numColumns, setNumColumns] = useState(2);
    const [favorites, setFavorites] = useState({});

    useEffect(() => {
        const updateColumns = () => {
            const screenWidth = Dimensions.get('window').width;
            if (screenWidth >= 768) {
                setNumColumns(4); 
            } else {
                setNumColumns(2);
            }
        };
        const subscription = Dimensions.addEventListener('change', updateColumns);
        return () => {
            subscription?.remove();
        };
    }, []);

    const toggleFavorite = (id) => {
        setFavorites(prev => ({...prev, [id]: !prev[id]}));
    };

    return (
        <FlatList
            data={products}
            renderItem={({ item }) => (
                <View style={styles.productContainer}>
                    <Image source={item.image} style={styles.productImage} />
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={[styles.productPrice, item.salePrice && styles.strikethrough]}>
                        ₫{item.price.toFixed(2)}
                        </Text>
                        {item.salePrice && (
                            <Text style={styles.salePrice}>${item.salePrice.toFixed(2)}</Text>
                        )}
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.addToCartButton}>
                            <Text style={styles.addToCartButtonText}>ADD TO CART</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.favoriteButton} 
                            onPress={() => toggleFavorite(item.id)}>
                            <Ionicons 
                                name={favorites[item.id] ? "heart" : "heart-outline"} 
                                size={24} 
                                color={favorites[item.id] ? "red" : "black"}/>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            numColumns={numColumns}
            contentContainerStyle={styles.productList}/>
    );
};

const styles = StyleSheet.create({
    productContainer: {
        flex: 1,
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        width: '100%',
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        marginRight: 5,
    },
    salePrice: {
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    addToCartButton: {
        backgroundColor: '#007bff',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
    },
    addToCartButtonText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },
    favoriteButton: {
        padding: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    productList: {
        paddingBottom: 50,
    },
});

export default ProductList;