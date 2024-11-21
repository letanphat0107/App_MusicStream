import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo Image thay vì logo-spotify */}
      <Image source={require('../images/Login/MusicIcon.png')} style={styles.logo} />
      
      <Text style={styles.title}>Hàng triệu bài hát.</Text>
      <Text style={styles.title}> Miễn phí trên Spotify.</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>Đăng ký miễn phí</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginWithPhone')}>
        <Ionicons name="call-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Tiếp tục bằng số điện thoại</Text>
      </TouchableOpacity>


      {/* Các nút đăng nhập khác */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginWithGoogle')}>
        <Ionicons name="logo-google" size={24} color="#fff" />
        <Text style={styles.buttonText}>Tiếp tục bằng Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginForm')}>
        <Ionicons name="key-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Đăng nhập bằng tài khoản</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  logo: {
    width: 120, // Bạn có thể thay đổi kích thước tùy ý
    height: 120, // Bạn có thể thay đổi kích thước tùy ý
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginVertical: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1DB954',
    padding: 10,
    marginVertical: 5,
    borderRadius: 25,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default LoginScreen;
