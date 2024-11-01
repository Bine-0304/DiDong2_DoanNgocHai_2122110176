import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../layout/Header';
import { useAppContext } from '../../contexts/AppContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import ResponsiveMenu from '../layout/ResponsiveMenu';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
    const { cartItems, updateCartItemQuantity, removeFromCart } = useAppContext();
    const navigation = useNavigation();

    const [selectedItems, setSelectedItems] = useState(cartItems.map(item => item.id));
    const toggleItemSelection = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(prevSelectedItems => prevSelectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems(prevSelectedItems => [...prevSelectedItems, itemId]);
        }
    };
    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <TouchableOpacity
                style={[styles.checkboxContainer, selectedItems.includes(item.id) && styles.selectedCheckbox]}
                onPress={() => toggleItemSelection(item.id)}>
                <Icon
                    name={selectedItems.includes(item.id) ? 'check-square' : 'square-o'}
                    size={20}
                    color={selectedItems.includes(item.id) ? '#007bff' : '#ccc'}/>
            </TouchableOpacity>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemPrice}>{item.price.toLocaleString('vi-VN')} ₫</Text>
                <View style={styles.quantityControl}>
                    <TouchableOpacity onPress={() => updateCartItemQuantity(item.id, item.quantity - 1)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateCartItemQuantity(item.id, item.quantity + 1)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
                <Icon name="trash" size={20} color="#ff0000" />
            </TouchableOpacity>
        </View>
    );
    

    const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
    const totalAmount = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        navigation.navigate('Checkout', { cartItems: selectedCartItems });
    };
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Icon name="arrow-left" size={20} color="darkgray" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Giỏ hàng của bạn</Text>
                    </View>
                    {cartItems.length > 0 ? (
                        <>
                            <FlatList
                                data={cartItems}
                                renderItem={renderCartItem}
                                keyExtractor={(item) => item.id.toString()}
                                scrollEnabled={false}
                            />
                            <View style={styles.totalContainer}>
                                <Text style={styles.totalText}>Tổng cộng:</Text>
                                <Text style={styles.totalAmount}>{totalAmount.toLocaleString('vi-VN')} ₫</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.checkoutButton}
                                onPress={handleCheckout}>
                                <Text style={styles.checkoutButtonText}>Thanh toán</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <View style={styles.emptyCart}>
                            <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống</Text>
                        </View>
                    )}
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
        marginTop: 20,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    selectAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 10,
    },
    selectAllText: {
        marginLeft: 10,
        fontSize: 16,
    },
    removeButton: {
        padding: 5,
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    emptyCart: {
        padding: 20,
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 16,
        color: '#666',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    removeButton: {
        padding: 5,
        marginLeft: 10,

    },
    emptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    emptyCartText: {
        fontSize: 16,
        color: '#666',
    },
    menuWrapper: {
        bottom: -40,
    },
    checkboxContainer: {
        padding: 5,
        marginRight: 10,
    },
    selectedCheckbox: {
        borderRadius: 5,
    },
});

export default Cart;