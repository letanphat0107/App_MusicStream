import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginWithGoogleEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const validateEmail = (email) => {
    // Kiểm tra tính hợp lệ của email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleContinue = () => {
    if (!email) {
      Alert.alert('Lỗi', 'Vui lòng nhập email của bạn.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ. Vui lòng nhập đúng định dạng.');
      return;
    }

    // Chuyển đến màn hình HomeAudioListing và truyền email
    navigation.navigate('HomeAudioListing', { email });
  };

  return (
    <ImageBackground
      source={require('../images/Background/Login.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>Nhập Email của bạn</Text>
      <Text style={styles.subtitle}>Hãy nhập email để tiếp tục.</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleContinue} activeOpacity={0.8}>
        <Ionicons name="mail-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Quay lại</Text>
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
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  input: {
    width: '90%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    fontSize: 16,
    elevation: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EA4335',
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default LoginWithGoogleEmail;
