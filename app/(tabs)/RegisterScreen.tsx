import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const windowWidth = Dimensions.get('window').width;

export default function RegisterScreen({ navigation }: Props) {
  const registerBoxWidth = windowWidth > 768 ? '40%' : '80%';
  const handleLoginPress = () => {
    navigation.navigate('Login');
  };
  return (
    <LinearGradient
      colors={['#e66465', '#9198e5']}
      style={styles.container}>
      <View style={[styles.registerBox, { width: registerBoxWidth }]}>
        <Text style={styles.title}>Đăng Ký</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tên đăng nhập:</Text>
          <TextInput
            style={styles.input}
            placeholder="Chọn tên đăng nhập"
            placeholderTextColor="#999" />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập địa chỉ email"
            placeholderTextColor="#999"
            keyboardType="email-address" />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Mật khẩu:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#999"
            secureTextEntry />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Xác nhận mật khẩu:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            placeholderTextColor="#999"
            secureTextEntry />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Đăng ký')}>
          <Text style={styles.buttonText}>Đăng Ký</Text>
        </TouchableOpacity>
        <Text>Đã có tài khoản?
          <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  formGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    textAlign: 'left',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 15,
  },
  loginButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    textDecorationLine: 'underline',
  },

});