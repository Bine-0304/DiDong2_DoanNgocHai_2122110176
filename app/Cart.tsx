import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import ResponsiveMenu from './ResponsiveMenu';

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        { id: '1',image: '../../assets/images/pijima08.jpg' , name: 'Product 1', qty: 2, size: 'M', price: 249000 },
        { id: '2',image: '../../assets/images/pijima12.jpg', name: 'Product 2', qty: 1, size: 'L', price: 599000 },
        { id: '3',image: '../../assets/images/pijima15.jpg', name: 'Product 3', qty: 1, size: 'S', price: 799000 },
    ]);

    const updateQuantity = (id, change) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, qty: Math.max(1, item.qty + change) }
                    : item
            )
        );
    };

    const renderCartItem = ({ item, index }) => (
        <View style={styles.cartItem}>
            <Text style={styles.itemIndex}>{index + 1}</Text>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemInfo}>Size: {item.size}</Text>
                <View style={styles.quantityControl}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.qty}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.itemPrice}>{(item.price * item.qty).toLocaleString('vi-VN')} ₫</Text>
        </View>
    );

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <Text style={styles.title}>Giỏ hàng của bạn</Text>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                    />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Tổng cộng:</Text>
                        <Text style={styles.totalAmount}>{totalAmount.toLocaleString('vi-VN')} ₫</Text>
                    </View>
                    <TouchableOpacity style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>Thanh toán</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ResponsiveMenu />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 15,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
    },
    itemIndex: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemInfo: {
        fontSize: 14,
        color: '#666',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    quantityButton: {
        width: 23,
        height: 23,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    quantity: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007bff',
    },
    checkoutButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Cart;