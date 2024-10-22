import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

export default function Footer() {
    return (
        <View style={styles.container}>
            <View style={styles.contactInfo}>
                <Text style={styles.title}>Liên hệ</Text>
                <Text>Email: support@example.com</Text>
                <Text>Điện thoại: 1900 6750</Text>
                <Text>Địa chỉ: 266 Đội Cấn, P.Liễu Giai, Q.Ba Đình, TP Hà Nội</Text>
            </View>
            <View style={styles.socialLinks}>
                <Text style={styles.title}>Kết nối với chúng tôi</Text>
                <View style={styles.iconContainer}>
                    <TouchableOpacity>
                        <Icon name="facebook" size={30} color="#3b5998" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="twitter" size={30} color="#1da1f2" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="instagram" size={30} color="#e1306c" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.newsletter}>
                <Text style={styles.title}>Đăng ký nhận bản tin</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập email của bạn"
                        keyboardType="email-address"
                    />
                    <TouchableOpacity style={styles.subscribeButton}>
                        <Text style={styles.buttonText}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    contactInfo: {
        marginBottom: 20,
    },
    socialLinks: {
        marginBottom: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    newsletter: {},
    inputContainer: {
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },
    subscribeButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});