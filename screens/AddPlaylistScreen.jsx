import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PlusCircle } from 'lucide-react-native'; 

export default function AddPlaylistScreen({ route }) {
  const navigation = useNavigation(); 
  const [playlistName, setPlaylistName] = useState('');
  const [imageUri, setImageUri] = useState(null); 
  const { addPlaylist } = route.params || {}; 

  const handleSavePlaylist = () => {
    if (playlistName.trim() === '') {
      Alert.alert('Error', 'Please enter a playlist name!');
      return;
    }

    const newPlaylist = {
      id: Math.random().toString(),
      title: playlistName,
      image: imageUri || require('../images/MyPlaylists/Image110.png'),
    };

    // Nếu có hàm addPlaylist thì gọi để thêm playlist vào danh sách
    if (addPlaylist) {
      addPlaylist(newPlaylist);
    }

    Alert.alert('Success', 'Playlist has been saved!');
    navigation.goBack();
  };

  const handleSelectImage = () => {
    setImageUri(require('../images/MyPlaylists/Image110.png')); // Thay đổi ảnh đại diện
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Create a New Playlist</Text>

      <TouchableOpacity onPress={handleSelectImage} style={styles.imageContainer}>
        <Image source={imageUri || require('../images/MyPlaylists/Image110.png')} style={styles.image} />
        <PlusCircle style={styles.addImageIcon} />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Enter playlist name"
        value={playlistName}
        onChangeText={setPlaylistName}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSavePlaylist}>
        <Text style={styles.saveButtonText}>Save Playlist</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  addImageIcon: {
    fontSize: 40,
    color: '#333',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#ff1b6b',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
