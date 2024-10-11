import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ResponsiveMenu from './ResponsiveMenu';

const allProducts = [
    { id: '1', title: 'Product 1', price: 299000, salePrice: 199000, image: require('../assets/images/pijima05.jpg') },
    { id: '2', title: 'Product 2', price: 399000, salePrice: 290000, image: require('../assets/images/pijima06.jpg') },
    { id: '3', title: 'Product 3', price: 499000, salePrice: null, image: require('../assets/images//pijima20.jpeg') },
    { id: '4', title: 'Product 4', price: 299000, salePrice: 199000, image: require('../assets/images/pijima15.jpg') },
    { id: '5', title: 'Product 5', price: 199000, salePrice: null, image: require('../assets/images/pijima21.jpg') },
    { id: '6', title: 'Product 6', price: 399000, salePrice: 299000, image: require('../assets/images/pijima22.jpg') },
];

const ProductItem = ({ item }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('ProductDetail', { product: item });
    };

    return (
        <TouchableOpacity style={styles.productItem} onPress={handlePress}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.title}</Text>
            <View style={styles.priceContainer}>
                {item.salePrice ? (
                    <>
                        <Text style={styles.salePrice}>{item.salePrice}đ</Text>
                        <Text style={styles.originalPrice}>{item.price}đ</Text>
                    </>
                ) : (
                    <Text style={styles.price}>{item.price}đ</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const ProductList = () => {
    const [sortState, setSortState] = useState({ order: null, active: false });
    const [products, setProducts] = useState(allProducts);

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
                const priceA = a.salePrice || a.price;
                const priceB = b.salePrice || b.price;
                return newOrder === 'asc' ? priceA - priceB : priceB - priceA;
            });
            setProducts(sortedProducts);
        } else {
            setProducts(allProducts);
        }

        setSortState({ order: newOrder, active: newOrder !== null });
    };

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
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row} />
            <ResponsiveMenu />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
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
        flex: 1,
        justifyContent: 'space-between',
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