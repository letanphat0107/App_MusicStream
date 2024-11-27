import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OTPVerification = ({ route, navigation }) => {
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lấy dữ liệu từ màn hình trước
  const { phone, otp: generatedOtp } = route.params;

  const handleVerifyOTP = () => {
    if (!otp) {
      Alert.alert('Lỗi', 'Vui lòng nhập mã OTP.');
      return;
    }

    if (otp.length !== 6) {
      Alert.alert('Lỗi', 'Mã OTP phải có 6 chữ số.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      if (otp === generatedOtp.toString()) {
        Alert.alert('Thành công', 'Xác minh OTP thành công!');
        navigation.navigate('HomeAudioListing'); 
      } else {
        Alert.alert('Lỗi', 'Mã OTP không chính xác.');
      }
    }, 2000);
  };

  const handleResendOTP = () => {
    Alert.alert('Thông báo', `Mã OTP mới đã được gửi đến số ${phone}.`);
  };

  return (
    <ImageBackground
      source={require('../images/Background/Login.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <Text style={styles.title}>Xác minh OTP</Text>
      <Text style={styles.subtitle}>Vui lòng nhập mã OTP được gửi đến số</Text>
      <Text style={styles.phoneNumber}>{phone}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập mã OTP"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerifyOTP}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Ionicons name="hourglass" size={24} color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Xác minh</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP}>
        <Text style={styles.resendText}>Gửi lại mã OTP</Text>
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
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 18,
    color: '#1DB954',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    fontSize: 18,
    elevation: 5,
    textAlign: 'center',
    color: '#000',
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 15,
    marginVertical: 10,
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  resendButton: {
    marginTop: 15,
  },
  resendText: {
    color: '#1DB954',
    fontSize: 16,
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

export default OTPVerification;
