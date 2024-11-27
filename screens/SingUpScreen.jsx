import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import { UserContext } from './UserContext';

const SignUpScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { addUser } = useContext(UserContext);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSignUp = () => {
    const { firstName, lastName, phone, email, password, confirmPassword } = form;

    if (!firstName || !lastName || !phone || !email || !password || !confirmPassword) {
      Alert.alert('Lỗi', 'Tất cả các trường là bắt buộc.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu và Nhập lại mật khẩu không khớp.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ. Đảm bảo sử dụng định dạng @gmail.com.');
      return;
    }

    // Thêm tài khoản mới
    addUser({
      username: email,
      password,
      name: `${firstName} ${lastName}`,
      avatar: 'https://i.ibb.co/25fWCHP/Avatar3.png',
    });

    Alert.alert(
      'Thành công',
      'Đăng ký tài khoản thành công! Bạn sẽ được chuyển sang màn hình đăng nhập.',
      [{ text: 'OK', onPress: () => navigation.navigate('LoginForm') }]
    );
  };

  const handleCancel = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../images/Background/Login.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Đăng ký tài khoản</Text>

        <TextInput
          style={[styles.input, form.firstName ? styles.inputFocus : null]}
          placeholder="Họ"
          placeholderTextColor="#ccc"
          value={form.firstName}
          onChangeText={(value) => handleInputChange('firstName', value)}
        />
        <TextInput
          style={[styles.input, form.lastName ? styles.inputFocus : null]}
          placeholder="Tên"
          placeholderTextColor="#ccc"
          value={form.lastName}
          onChangeText={(value) => handleInputChange('lastName', value)}
        />
        <TextInput
          style={[styles.input, form.phone ? styles.inputFocus : null]}
          placeholder="Số điện thoại"
          placeholderTextColor="#ccc"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
        />
        <TextInput
          style={[styles.input, form.email ? styles.inputFocus : null]}
          placeholder="Email (@gmail.com)"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
        <TextInput
          style={[styles.input, form.password ? styles.inputFocus : null]}
          placeholder="Mật khẩu"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={form.password}
          onChangeText={(value) => handleInputChange('password', value)}
        />
        <TextInput
          style={[styles.input, form.confirmPassword ? styles.inputFocus : null]}
          placeholder="Nhập lại mật khẩu"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
          <Text style={styles.buttonText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Lớp phủ mờ để tăng độ tương phản
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputFocus: {
    borderColor: '#1DB954',
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 15,
    marginTop: 10,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#b22222',
  },
});

export default SignUpScreen;
