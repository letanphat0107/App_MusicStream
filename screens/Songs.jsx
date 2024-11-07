import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Songs() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Songs</Text>
      <Text style={styles.text}>Danh sách các bài hát của bạn sẽ hiển thị ở đây.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});
