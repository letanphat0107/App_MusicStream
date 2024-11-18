import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ChevronRight, Plus, Trash2, Edit } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function Playlists() {
  const navigation = useNavigation(); 
  const [data, setData] = useState([
    {
      id: '1',
      title: 'Ipsum sit nulla\nAshley Scott . 12 songs',
      image: require('../images/MyPlaylists/Image110.png'),
    },
    {
      id: '2',
      title: 'Occaecat aliq\nJose Garcia . 4 songs',
      image: require('../images/MyPlaylists/Image111.png'),
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddPlaylist = () => {
    navigation.navigate('AddPlaylist', {
      addPlaylist: (newPlaylist) => {
        setData((prevData) => [...prevData, newPlaylist]);
      },
    });
  };

  const handleEditPlaylist = (playlist) => {
    const newTitle = prompt('Enter new playlist title:', playlist.title);
    if (newTitle && newTitle !== playlist.title) {
      setData(prevData =>
        prevData.map(item =>
          item.id === playlist.id ? { ...item, title: newTitle } : item
        )
      );
    }
  };

  const handleDeletePlaylist = (playlist) => {
    Alert.alert('Xóa Playlist', 'Bạn có chắc muốn xóa playlist này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        onPress: () => setData(prevData => prevData.filter(item => item.id !== playlist.id)),
      },
    ]);
  };

  const filteredData = data.filter(playlist =>
    playlist.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.arrowButton} onPress={() => navigation.navigate('PlaylistDetail', { playlist: item })}>
          <ChevronRight style={styles.arrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEditPlaylist(item)}>
          <Edit style={styles.editIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletePlaylist(item)}>
          <Trash2 style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm playlist"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Text style={styles.headerText}>Your Playlists</Text>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddPlaylist}>
        <Plus style={styles.plusIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: '#333',
  },
  actionContainer: {
    flexDirection: 'row',
  },
  arrowButton: {
    padding: 5,
  },
  arrowIcon: {
    fontSize: 24,
    color: '#333',
  },
  editButton: {
    padding: 5,
    marginLeft: 10,
  },
  editIcon: {
    fontSize: 20,
    color: '#f39c12',
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
  deleteIcon: {
    fontSize: 20,
    color: '#e74c3c',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'black',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  plusIcon: {
    fontSize: 30,
    color: '#fff',
  },
});
