import { Search, Heart, ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    title: 'FLOWER\nJessica Gonzalez\n2,1M . 3:36',
    image: require('../images/MyLibrary/Image101.png'), 
  },
  {
    id: '2',
    title: 'Shape of You\nAnthony Taylor\n68M . 03:35',
    image: require('../images/MyLibrary/Image102.png'), 
  },
  {
    id: '3',
    title: 'Blingding Lights\nAshley Scott . 4 songs',
    image: require('../images/MyLibrary/Image103.png'), 
  },
  {
    id: '4',
    title: 'Levitating\nAnthony Taylor\n9M . 07:48',
    image: require('../images/MyLibrary/Image104.png'), 
  },
  {
    id: '5',
    title: 'Astronaut in the Ocean\nPedro Moreno\n23M . 3:36',
    image: require('../images/MyLibrary/Image105.png'), 
  },
  {
    id: '6',
    title: 'Dynamite\nElena Jimeneez\n10M . 06:22',
    image: require('../images/MyLibrary/Image106.png'), 
  },
];

export default function MyLibrary() {
  const navigation = useNavigation();  
  const [favorites, setFavorites] = useState(data.map(() => false));
  const [isFollowing, setIsFollowing] = useState(false); // State để quản lý trạng thái follow

  const toggleFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index]; 
    setFavorites(newFavorites);
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing); // Toggle trạng thái follow
  };

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cungDong}>
        <Text style={styles.inDam}>Your Library</Text>
        <TouchableOpacity>
          <Search style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Playlists')}>
          <Text style={styles.buttonText}>Playlists</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('NewTag')}>
          <Text style={styles.buttonText}>New Tag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Songs')}>
          <Text style={styles.buttonText}>Songs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Albums')}>
          <Text style={styles.buttonText}>Albums</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigation('Artists')}>
          <Text style={styles.buttonText}>Artists</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cungDong1}>
        <Image source={require('../images/MyLibrary/Image107.png')} style={styles.styleHinhAnh} />
        <View style={styles.nameContainer}>
          <Text style={styles.artistName}>Mer Watson</Text>
          <Text style={styles.followersCount}>1.234K Followers</Text>
        </View>
        <TouchableOpacity style={[styles.buttonFollow, isFollowing ? { backgroundColor: '#999' } : {}]} onPress={toggleFollow}>
          <Text style={styles.buttonText}>{isFollowing ? 'Following' : 'Follow'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.favoritesContainer}>
        {data.map((item, index) => (
          <View key={item.id} style={styles.favoriteItem}>
            <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(index)}>
              <Image source={item.image} style={styles.favoriteImage} />
              <View style={styles.favoriteTextContainer}>
                <Text style={styles.favoriteText}>{item.title}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(index)}>
                {favorites[index] ? (
                  <ChevronRight style={styles.favoriteIcon} />
                ) : (
                  <Heart style={styles.favoriteIcon} />
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.khoangCach5}> 
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <House style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.iconTitle}>Home</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Search style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.iconTitle}>Search</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={()=> navigation.navigate('FeedAudioListing')}>
            <Newspaper style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.iconTitle}>Feed</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('MyLibrary')}>
            <Library style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.iconTitle}>Library</Text>
        </View>
      </View>
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
  cungDong: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cungDong1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  inDam: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  icon: {
    color: 'gray',
    fontSize: 30,
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#ff1b6b', 
    borderRadius: 25,
    flex: 1, 
    marginHorizontal: 5, 
  },
  buttonText: {
    fontSize: 10,
    textAlign: 'center',
    color: 'white', 
    fontWeight: 'bold',
  },
  styleHinhAnh: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buttonFollow: {
    width: 100,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 25,
    marginHorizontal: 5,
  },
  nameContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 10, 
  },
  artistName: {
    fontWeight: 'bold',
  },
  followersCount: {
    color: 'gray',
  },
  favoritesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  favoritesContainer: {
    marginTop: 10,
    paddingBottom: 10,
  },
  favoriteItem: {
    marginBottom: 10, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, 
  },
  favoriteImage: {
    width: 50,
    height: 50,
    borderRadius: 10, 
  },
  favoriteTextContainer: {
    flex: 1,
    marginLeft: 10, 
  },
  favoriteText: {
    textAlign: 'left',
    fontSize: 12,
    marginRight: 5, 
  },
  favoriteIcon: {
    color: '#ff1b6b',
    fontSize: 20,
    marginLeft: 10,
  },
});
