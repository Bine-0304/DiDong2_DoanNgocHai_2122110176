import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../contexts/AppContext';
import Header from '../layout/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import ResponsiveMenu from '../layout/ResponsiveMenu';

const Checkout = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { clearCart } = useAppContext();

    const initialOrderItems = route.params?.cartItems || [
    ];

    const [orderItems] = useState(initialOrderItems);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        phone: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleInputChange = (field, value) => {
        setShippingInfo(prev => ({ ...prev, [field]: value }));
    };

    const handlePlaceOrder = () => {
        console.log('Order placed', { orderItems, shippingInfo, totalAmount, paymentMethod });
        clearCart();
        navigation.navigate('OrderConfirmation', { orderId: 'SOME-ORDER-ID' });
    };

    const renderOrderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemInfo}>
                    Số lượng: {item.quantity}
                </Text>
                <Text style={styles.itemPrice}>{(item.price * item.quantity).toLocaleString('vi-VN')} ₫</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Icon name="arrow-left" size={20} color="darkgray" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Thanh toán</Text>
                    </View>

                    <View style={styles.orderSummary}>
                        <Text style={styles.sectionTitle}>Tóm tắt đơn hàng</Text>
                        <FlatList
                            data={orderItems}
                            renderItem={renderOrderItem}
                            keyExtractor={(item) => item.id}
                            scrollEnabled={false}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Họ tên:</Text>
                        <TextInput
                            style={styles.input}
                            value={shippingInfo.name}
                            onChangeText={(text) => handleInputChange('name', text)}
                            placeholder="Nhập họ tên"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Địa chỉ:</Text>
                        <TextInput
                            style={styles.input}
                            value={shippingInfo.address}
                            onChangeText={(text) => handleInputChange('address', text)}
                            placeholder="Nhập địa chỉ giao hàng"
                            multiline
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Số điện thoại:</Text>
                        <TextInput
                            style={styles.input}
                            value={shippingInfo.phone}
                            onChangeText={(text) => handleInputChange('phone', text)}
                            placeholder="Nhập số điện thoại"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Phương thức thanh toán:</Text>
                        <View style={styles.paymentMethods}>
                            <TouchableOpacity
                                style={[styles.paymentMethod, paymentMethod === 'cod' && styles.selectedPayment]}
                                onPress={() => setPaymentMethod('cod')}>
                                <Text style={[styles.paymentMethodText, paymentMethod === 'cod' && styles.selectedPaymentText]}>COD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.paymentMethod, paymentMethod === 'bank' && styles.selectedPayment]}
                                onPress={() => setPaymentMethod('bank')}>
                                <Text style={[styles.paymentMethodText, paymentMethod === 'bank' && styles.selectedPaymentText]}>Chuyển khoản</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.summaryContainer}>
                        <Text style={styles.summaryText}>Tổng cộng:</Text>
                        <Text style={styles.summaryAmount}>{totalAmount.toLocaleString('vi-VN')} ₫</Text>
                    </View>

                    <TouchableOpacity style={styles.checkoutButton} onPress={handlePlaceOrder}>
                        <Text style={styles.checkoutButtonText}>Đặt hàng</Text>
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
        backgroundColor: '#f8f8f8',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderSummary: {
        marginBottom: 20,
    },
    orderItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 4,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
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
        marginTop: 5,
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    paymentMethods: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    paymentMethod: {
        flex: 1,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    selectedPayment: {
        backgroundColor: '#007bff',
    },
    paymentMethodText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedPaymentText: {
        color: '#fff',
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    summaryText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    summaryAmount: {
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
    menuWrapper: {
        bottom: -40,
    },
});

export default Checkout;