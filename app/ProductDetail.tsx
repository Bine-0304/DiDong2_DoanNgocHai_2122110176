import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import ResponsiveMenu from './ResponsiveMenu';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetail = () => {
    const navigation = useNavigation();
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Dữ liệu mẫu cho sản phẩm
    const product = {
        id: '1',
        name: 'Áo thun cao cấp',
        price: 299000,
        salePrice: 249000,
        image: require('../assets/images/pijima15.jpg'),
        description: 'Áo thun chất lượng cao, làm từ 100% cotton, thoáng mát và bền đẹp. Phù hợp cho mọi dịp, từ đi chơi đến đi làm.',
        sizes: ['S', 'M', 'L', 'XL'],
    };

    // Dữ liệu mẫu cho sản phẩm liên quan
    const relatedProducts = [
        { id: '2', name: 'Áo polo', price: 349000, image: require('../assets/images/logo.png') },
        { id: '3', name: 'Áo sơ mi', price: 399000, image: require('../assets/images/logo.png') },
        { id: '4', name: 'Áo khoác', price: 599000, image: require('../assets/images/logo.png') },
    ];

    const renderRelatedProduct = ({ item }) => (
        <View style={styles.relatedProductItem}>
            <Image source={item.image} style={styles.relatedProductImage} />
            <Text style={styles.relatedProductName}>{item.name}</Text>
            <Text style={styles.relatedProductPrice}>{item.price.toLocaleString('vi-VN')} ₫</Text>
        </View>
    );

    const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
    const decreaseQuantity = () => setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));

    const handleBuyNow = () => {
        const cartItem = {
            id: product.id,
            name: product.name,
            qty: quantity,
            size: selectedSize,
            price: product.salePrice || product.price,
        };
        navigation.navigate('Checkout', { cartItems: [cartItem] });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <Image source={product.image} style={styles.productImage} />
                <View style={styles.infoContainer}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={[styles.price, product.salePrice && styles.strikethrough]}>
                            {product.price.toLocaleString('vi-VN')} ₫
                        </Text>
                        {product.salePrice && (
                            <Text style={styles.salePrice}>{product.salePrice.toLocaleString('vi-VN')} ₫</Text>
                        )}
                    </View>
                    <Text style={styles.sectionTitle}>Chọn kích cỡ:</Text>
                    <View style={styles.sizeContainer}>
                        {product.sizes.map((size) => (
                            <TouchableOpacity
                                key={size}
                                style={[
                                    styles.sizeButton,
                                    selectedSize === size && styles.selectedSizeButton,
                                ]}
                                onPress={() => setSelectedSize(size)}>
                                <Text style={[
                                    styles.sizeButtonText,
                                    selectedSize === size && styles.selectedSizeButtonText,
                                ]}>
                                    {size}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.sectionTitle}>Số lượng:</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.sectionTitle}>Mô tả sản phẩm:</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    <Text style={styles.sectionTitle}>Sản phẩm liên quan:</Text>
                    <FlatList
                        data={relatedProducts}
                        renderItem={renderRelatedProduct}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false} />
                    <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
                        <Text style={styles.buyButtonText}>Mua ngay</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.menuWrapper}>
                <ResponsiveMenu />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 15,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        color: '#888',
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        marginRight: 10,
    },
    salePrice: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 6,
    },
    sizeContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    sizeButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginRight: 10,
    },
    selectedSizeButton: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    sizeButtonText: {
        fontSize: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    quantityButton: {
        backgroundColor: '#e0e0e0',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    selectedSizeButtonText: {
        color: '#fff',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
    },
    relatedProductItem: {
        marginRight: 15,
        width: 120,
    },
    relatedProductImage: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    relatedProductName: {
        fontSize: 14,
        marginTop: 5,
    },
    relatedProductPrice: {
        fontSize: 14,
        color: '#888',
    },
    buyButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,

    },
    buyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    menuWrapper: {
        bottom: -33,
    },
});

export default ProductDetail;