import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index';
import { Ionicons } from '@expo/vector-icons';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const windowWidth = Dimensions.get('window').width;

export default function LoginScreen({ navigation }: Props) {
  const [rememberPassword, setRememberPassword] = useState(false);
  const loginBoxWidth = windowWidth > 768 ? '35%' : '80%';
  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };


  return (
    <LinearGradient
      colors={['#e66465', '#9198e5']}
      style={styles.container}>
      <View style={[styles.loginBox, { width: loginBoxWidth }]}>
        <Text style={styles.title}>Đăng Nhập</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tên đăng nhập:</Text>
          <TextInput
            style={styles.input}
            placeholder="Tên đăng nhập hoặc email"
            placeholderTextColor="#999"/>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Mật khẩu:</Text>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            placeholderTextColor="#999"
            secureTextEntry/>
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => setRememberPassword(!rememberPassword)}
          >
            {rememberPassword && <Ionicons name="checkmark" size={18} color="#4CAF50" />}
          </TouchableOpacity>
          <Text style={styles.rememberText}>Nhớ mật khẩu</Text>
          <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => console.log('Quên mật khẩu')}>
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Đăng nhập')}>
          <Text style={styles.buttonText}>Đăng Nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
          <Text style={styles.registerButtonText}>Đăng Ký</Text>
        </TouchableOpacity>
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
  loginBox: {
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
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotText: {
    fontSize: 14,
    color: '#4CAF50',
    textDecorationLine: 'underline',
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
  registerButton: {
    marginTop: 15,
  },
  registerButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  rememberText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  forgotPasswordButton: {
    alignItems: 'flex-end',
  },
});