import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';

export default function NewTag() {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState(''); 

  const handleAddTag = () => {
    if (newTag.trim() !== '') {
      setTags([...tags, newTag.trim()]);
      setNewTag(''); 
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter(item => item !== tag)); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Tag</Text>
      <Text style={styles.text}>Danh sách các tag mới của bạn sẽ hiển thị ở đây.</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Thêm tag mới"
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
          <View style={styles.tagItem}>
            <Text style={styles.tagText}>{item}</Text>
            <TouchableOpacity onPress={() => handleRemoveTag(item)}>
              <Text style={styles.removeText}>Xóa</Text>
            </TouchableOpacity>
          </View>
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
  },
  tagText: {
    fontSize: 16,
  },
  removeText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
