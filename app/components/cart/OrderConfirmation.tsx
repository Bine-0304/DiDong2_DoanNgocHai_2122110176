import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

type OrderConfirmationRoutePrams = {
    orderId?: string;
    returnToCart?: boolean;
};
const OrderConfirmation = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { orderId = 'N/A', returnToCart = false } = route.params as OrderConfirmationRoutePrams;
    useEffect(() => {
        if (returnToCart) {
            const timer = setTimeout(() => {
                navigation.reset({
                    routes: [{ name: 'Cart' }],
                });
            }, 2000); 

            return () => clearTimeout(timer);
        }
    }, [returnToCart, navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Icon name="check-circle" size={100} color="#4CAF50" style={styles.successIcon} />
                <Text style={styles.title}>Đặt hàng thành công!</Text>
                <View style={styles.orderDetails}>
                    <Text style={styles.orderText}>Mã đơn hàng: {orderId}</Text>
                    {returnToCart && (
                        <Text style={styles.autoNavText}>
                            Bạn sẽ được chuyển về giỏ hàng trong giây lát...
                        </Text>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        padding: 20,
        width: '100%',
    },
    successIcon: {
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 20,
        textAlign: 'center',
    },
    orderDetails: {
        alignItems: 'center',
        marginBottom: 30,
    },
    orderText: {
        fontSize: 16,
        marginBottom: 10,
    },
    autoNavText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    backToCartButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
    },
    backToCartButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default OrderConfirmation;