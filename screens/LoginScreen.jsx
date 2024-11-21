import { Pen } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [logoScale] = useState(new Animated.Value(0)); 
  const [fadeIn] = useState(new Animated.Value(0)); 
  const [slideUp] = useState(new Animated.Value(100)); // Khởi tạo giá trị cho hiệu ứng slide-up
  const [buttonSlide] = useState(new Animated.Value(50)); // Khởi tạo giá trị cho hiệu ứng di chuyển nút

  useEffect(() => {
    Animated.timing(logoScale, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideUp, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    Animated.timing(buttonSlide, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground
      source={require('../images/Background/Login.jpg')}
      style={styles.container}
      resizeMode="cover"
    > 
      <Animated.Text style={[styles.title, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
        Hàng triệu bài hát
      </Animated.Text>
      <Animated.Text style={[styles.title, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
        Miễn phí trên Deezer
      </Animated.Text>

      {/* Các nút đăng nhập với hiệu ứng di chuyển */}
      <TouchableOpacity
        style={[styles.button, { transform: [{ translateX: buttonSlide }] }]}
        onPress={() => navigation.navigate('SignUp')}
        activeOpacity={0.8}
      >
        <Pen name="person-add-outline" size={24} color="#ff1b6b" />
        <Text style={styles.buttonText}>Đăng ký miễn phí</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { transform: [{ translateX: buttonSlide }] }]}
        onPress={() => navigation.navigate('LoginWithPhone')}
        activeOpacity={0.8}
      >
        <Ionicons name="call-outline" size={24} color="#ff1b6b" />
        <Text style={styles.buttonText}>Tiếp tục bằng số điện thoại</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { transform: [{ translateX: buttonSlide }] }]}
        onPress={() => navigation.navigate('LoginWithGoogle')}
        activeOpacity={0.8}
      >
        <Ionicons name="logo-google" size={24} color="#ff1b6b" />
        <Text style={styles.buttonText}>Tiếp tục bằng Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { transform: [{ translateX: buttonSlide }] }]}
        onPress={() => navigation.navigate('LoginForm')}
        activeOpacity={0.8}
      >
        <Ionicons name="key-outline" size={24} color="#ff1b6b" />
        <Text style={styles.buttonText}>Đăng nhập bằng tài khoản</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    color: '#1DB954',
    marginVertical: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200EE', 
    padding: 15,
    marginVertical: 10,
    borderRadius: 30,
    width: '90%',
    elevation: 5,  
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
    fontWeight: '500',
  },
});

export default LoginScreen;
