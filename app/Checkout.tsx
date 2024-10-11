import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import Header from './Header';
import ResponsiveMenu from './ResponsiveMenu';

const Checkout = () => {
    const route = useRoute();
    
    // Sử dụng dữ liệu từ params nếu có, nếu không sử dụng dữ liệu mẫu
    const initialOrderItems = route.params?.cartItems || [
        { id: '1', name: 'Product 1', qty: 2, size: 'M', price: 249000 },
        { id: '2', name: 'Product 2', qty: 1, size: 'L', price: 599000 },
        { id: '3', name: 'Product 3', qty: 1, size: 'S', price: 799000 },
    ];

    const [orderItems] = useState(initialOrderItems);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    const handleCheckout = () => {
        console.log('Đặt hàng với thông tin:', { name, address, phone, paymentMethod, totalAmount });
        // Xử lý đặt hàng ở đây
    };

    const renderOrderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>
                Size: {item.size}, Số lượng: {item.qty}
            </Text>
            <Text style={styles.itemPrice}>{(item.price * item.qty).toLocaleString('vi-VN')} ₫</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <Text style={styles.title}>Thanh toán</Text>
                    
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
                            value={name}
                            onChangeText={setName}
                            placeholder="Nhập họ tên"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Địa chỉ:</Text>
                        <TextInput
                            style={styles.input}
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Nhập địa chỉ giao hàng"
                            multiline
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Số điện thoại:</Text>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="Nhập số điện thoại"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Phương thức thanh toán:</Text>
                        <View style={styles.paymentMethods}>
                            <TouchableOpacity
                                style={[styles.paymentMethod, paymentMethod === 'cod' && styles.selectedPayment]}
                                onPress={() => setPaymentMethod('cod')}
                            >
                                <Text style={[styles.paymentMethodText, paymentMethod === 'cod' && styles.selectedPaymentText]}>COD</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.paymentMethod, paymentMethod === 'bank' && styles.selectedPayment]}
                                onPress={() => setPaymentMethod('bank')}
                            >
                                <Text style={[styles.paymentMethodText, paymentMethod === 'bank' && styles.selectedPaymentText]}>Chuyển khoản</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.summaryContainer}>
                        <Text style={styles.summaryText}>Tổng cộng:</Text>
                        <Text style={styles.summaryAmount}>{totalAmount.toLocaleString('vi-VN')} ₫</Text>
                    </View>

                    <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderSummary: {
        marginBottom: 20,
    },
    orderItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemDetails: {
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
        bottom: -33,
    },
});

export default Checkout;