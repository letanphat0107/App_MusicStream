import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const AlbumsList = ({ route }) => {
  const { data, favorites = new Set(), toggleFavorite } = route.params; 

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.key)} style={styles.favoriteButton}>
        <Text style={styles.favoriteButtonText}>
          {favorites.has(item.key) ? 'Unfavorite' : 'Favorite'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trending Albums</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0', 
    elevation: 1, 
  },
  textContainer: {
    flex: 1, 
    paddingLeft: 10, 
    },
  itemImage: {
    width: 150,
    height: 150,
    borderRadius: 8, 
  },
  itemTitle: {
    textAlign: 'left', 
    fontWeight: 'bold',
  },
  favoriteButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#ff1b6b',
    borderRadius: 20,
  },
  favoriteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AlbumsList;
