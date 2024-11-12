import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Animated } from 'react-native';

export default function NewTag() {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const handleAddTag = () => {
    if (newTag.trim() !== '' && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
      fadeIn();
    }
  };

  const fadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter(item => item !== tag));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thẻ Mới</Text>
      <Text style={styles.text}>Danh sách các thẻ mới của bạn sẽ hiển thị ở đây.</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Thêm thẻ mới"
          value={newTag}
          onChangeText={setNewTag}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTag}>
          <Text style={styles.addButtonText}>Thêm</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tags}
        renderItem={({ item }) => (
          <Animated.View style={[styles.tagItem, { opacity: fadeAnim }]}>
            <TouchableOpacity onPress={() => handleRemoveTag(item)} style={styles.tagTouchable}>
              <Text style={styles.tagText}>{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveTag(item)}>
              <Text style={styles.removeText}>Xóa</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  addButton: {
    backgroundColor: '#ff1b6b',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tagItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 10,
  },
  tagText: {
    fontSize: 16,
    color: '#333',
  },
  removeText: {
    color: 'red',
    fontWeight: 'bold',
  },
  tagTouchable: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#e0f7fa',
  },
});
