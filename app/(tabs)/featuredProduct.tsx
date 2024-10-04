import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const featuredProducts = [
    { id: '1', title: 'Pijama Lụa Cao Cấp', price: 599000, salePrice: 499000, image: require('../../assets/images/do-ngu-pijama-lua-tay-ngan-a006.jpg') },
    { id: '2', title: 'Bộ Đôi Pijama', price: 799000, salePrice: null, image: require('../../assets/images/pijima23.jpg') },
    { id: '3', title: 'Pijama Mùa Đông', price: 449000, salePrice: 399000, image: require('../../assets/images/pijima24.jpg') },
];

const ProductItem = ({ title, price, salePrice, image }) => (
    <TouchableOpacity style={styles.productItem}>
        <Image source={image} style={styles.productImage} />
        <Text style={styles.productName}>{title}</Text>
        <View style={styles.priceContainer}>
            {salePrice ? (
                <>
                    <Text style={styles.salePrice}>{salePrice.toLocaleString()}đ</Text>
                    <Text style={styles.originalPrice}>{price.toLocaleString()}đ</Text>
                </>
            ) : (
                <Text style={styles.price}>{price.toLocaleString()}đ</Text>
            )}
        </View>
    </TouchableOpacity>
);

export default function FeaturedProducts() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pijama Nổi Bật</Text>
            <FlatList
                data={featuredProducts}
                renderItem={({ item }) => (
                    <ProductItem 
                        title={item.title} 
                        price={item.price} 
                        salePrice={item.salePrice} 
                        image={item.image} 
                    />
                )}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

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
        height: 200,
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
        color: 'green',
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