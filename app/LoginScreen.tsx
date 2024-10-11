import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './(tabs)/index';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const windowWidth = Dimensions.get('window').width;

export default function LoginScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);

  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const savedCredentials = await AsyncStorage.getItem('savedCredentials');
      if (savedCredentials) {
        const { username, password } = JSON.parse(savedCredentials);
        setUsername(username);
        setPassword(password);
        setRememberPassword(true);
      }
    } catch (error) {
      console.error('Error loading saved credentials:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if ((user.username === username || user.email === username) && user.password === password) {
          if (rememberPassword) {
            await AsyncStorage.setItem('savedCredentials', JSON.stringify({ username, password }));
          } else {
            await AsyncStorage.removeItem('savedCredentials');
          }
          await AsyncStorage.setItem('isLoggedIn', 'true');
          Alert.alert('Thành công', 'Đăng nhập thành công!', [
            { text: 'OK', onPress: () => navigation.navigate('Home') }
          ]);
        } else {
          Alert.alert('Lỗi', 'Tên đăng nhập hoặc mật khẩu không đúng!');
        }
      } else {
        Alert.alert('Lỗi', 'Không tìm thấy tài khoản. Vui lòng đăng ký trước.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Thông báo', 'Chức năng quên mật khẩu sẽ được triển khai sau.');
  };

  return (
    <LinearGradient colors={['#e66465', '#9198e5']} style={styles.container}>
      <View style={[styles.loginBox, { width: windowWidth > 768 ? '35%' : '80%' }]}>
        <Text style={styles.title}>Đăng Nhập</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tên đăng nhập:</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Tên đăng nhập hoặc email"
            placeholderTextColor="#999"/>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Mật khẩu:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Mật khẩu"
            placeholderTextColor="#999"
            secureTextEntry/>
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity 
            style={styles.checkboxWrapper} 
            onPress={() => setRememberPassword(!rememberPassword)}>
            <View style={[styles.checkbox, rememberPassword && styles.checkboxChecked]}>
              {rememberPassword && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
            <Text style={styles.checkboxLabel}>Nhớ mật khẩu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng Nhập</Text>
        </TouchableOpacity>
        <Text style={styles.siginText}>Chưa có tài khoản?
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerButtonText}> Đăng Ký</Text>
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
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: 'white',
  },
  checkboxLabel: {
    color: '#555',
  },
  forgotPasswordText: {
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
    marginTop: -2,
  },
  siginText: {
    marginTop: 15,
  },
  registerButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});