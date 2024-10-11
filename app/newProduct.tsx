import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const newProducts = [
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

const NewProducts = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sản Phẩm Mới</Text>
            <FlatList
                data={newProducts}
                renderItem={({ item }) => <ProductItem item={item} />}
                keyExtractor={item => item.id}
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