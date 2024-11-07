import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { ChevronRight, Plus } from 'lucide-react-native';
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

  const handleAddPlaylist = () => {
    navigation.navigate('AddPlaylist', {
      addPlaylist: (newPlaylist) => {
        setData((prevData) => [...prevData, newPlaylist]);
      },
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <TouchableOpacity style={styles.arrowButton}>
        <ChevronRight style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Playlists</Text>
      <FlatList
        data={data}
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
  arrowButton: {
    padding: 5,
  },
  arrowIcon: {
    fontSize: 24,
    color: '#333',
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
