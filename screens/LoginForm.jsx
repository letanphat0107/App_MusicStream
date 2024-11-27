import React, { useState, useContext } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, View } from 'react-native';
import { UserContext } from './UserContext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icon

const LoginForm = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [securePassword, setSecurePassword] = useState(true); // Trạng thái ẩn/hiện mật khẩu

  const { users } = useContext(UserContext); // Lấy danh sách người dùng từ context

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setError('');
      navigation.replace('HomeAudioListing'); // Chuyển đến HomeAudioListing sau khi đăng nhập thành công
    } else {
      setError('Tên tài khoản hoặc mật khẩu không đúng!');
    }
  };

  const togglePasswordVisibility = () => {
    setSecurePassword(!securePassword); // Chuyển trạng thái ẩn/hiện mật khẩu
  };

  return (
    <ImageBackground
      source={require('../images/Background/Login.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Đăng nhập</Text>

        <TextInput
          style={[styles.input, username ? styles.inputFocus : null]}
          placeholder="Tên tài khoản"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />
        
        {/* Container cho trường mật khẩu và nút mắt */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, password ? styles.inputFocus : null, styles.passwordInput]}
            placeholder="Mật khẩu"
            placeholderTextColor="#ccc"
            secureTextEntry={securePassword} // Ẩn mật khẩu khi securePassword là true
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Icon name={securePassword ? 'eye' : 'eye-slash'} size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Tạo lớp mờ để nội dung dễ đọc trên nền
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#1c1c1c',
    padding: 15,
    borderRadius: 25,
    color: '#fff',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
  },
  inputFocus: {
    borderColor: '#1DB954', // Màu khi input được focus
  },
  passwordContainer: {
    width: '80%',
    flexDirection: 'row', // Đặt các phần tử theo hàng ngang
    alignItems: 'center',  // Căn giữa các phần tử theo chiều dọc
    position: 'relative',
    marginBottom: 15, // Đảm bảo có khoảng cách cho ô mật khẩu
  },
  passwordInput: {
    flex: 1, // Đảm bảo ô mật khẩu chiếm toàn bộ không gian
    paddingRight: 40, // Để nút mắt không che lấp phần text
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    padding: 10,
    top: 7,
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,  // Hiệu ứng bóng mờ cho nút
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});

export default LoginForm;
