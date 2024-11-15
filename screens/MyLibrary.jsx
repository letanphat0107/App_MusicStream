import { Search, Heart, ChevronRight, House, Newspaper, Library, Play, Pause } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    title: 'FLOWER\nJessica Gonzalez\n2,1M . 3:36',
    image: require('../images/MyLibrary/Image101.png'),
    audio: require('../audio/qzt1sl5h1y.mp3'),
  },
  {
    id: '2',
    title: 'Shape of You\nAnthony Taylor\n68M . 03:35',
    image: require('../images/MyLibrary/Image102.png'),
    audio: require('../audio/AnhKhongCanDam-CaoNamThanh-4039734.mp3'),
  },
  {
    id: '3',
    title: 'Blingding Lights\nAshley Scott\n4 songs',
    image: require('../images/MyLibrary/Image103.png'),
    audio: require('../audio/qzt1sl5h1y.mp3'),
  },
  {
    id: '4',
    title: 'Levitating\nAnthony Taylor\n9M . 07:48',
    image: require('../images/MyLibrary/Image104.png'),
    audio: require('../audio/qzt1sl5h1y.mp3'),
  },
  {
    id: '5',
    title: 'Astronaut in the Ocean\nPedro Moreno\n23M . 3:36',
    image: require('../images/MyLibrary/Image105.png'),
    audio: require('../audio/qzt1sl5h1y.mp3'),
  },
  {
    id: '6',
    title: 'Dynamite\nElena Jimeneez\n10M . 06:22',
    image: require('../images/MyLibrary/Image106.png'),
    audio: require('../audio/qzt1sl5h1y.mp3'),
  },
];

export default function MyLibrary() {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState(data.map(() => false));
  const [isFollowing, setIsFollowing] = useState(false);

  // Toggle trạng thái yêu thích
  const toggleFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
  };

  // Điều hướng đến PlayerScreen
  const navigateToPlayer = (index) => {
    navigation.navigate('PlayerScreen', { song: data[index] });
  };

  // Toggle theo dõi
  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Playlists')}>
          <Text style={styles.buttonText}>Playlists</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewTag')}>
          <Text style={styles.buttonText}>New Tag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Songs')}>
          <Text style={styles.buttonText}>Songs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Albums')}>
          <Text style={styles.buttonText}>Albums</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Artists')}>
          <Text style={styles.buttonText}>Artists</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cungDong1}>
        <Image source={require('../images/MyLibrary/Image107.png')} style={styles.styleHinhAnh} />
        <View style={styles.nameContainer}>
          <Text style={styles.artistName}>Mer Watson</Text>
          <Text style={styles.followersCount}>1.234K Followers</Text>
        </View>
        <TouchableOpacity
          style={[styles.buttonFollow, isFollowing ? { backgroundColor: '#999' } : {}]}
          onPress={toggleFollow}>
          <Text style={styles.buttonText}>{isFollowing ? 'Following' : 'Follow'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.favoritesContainer}>
        {data.map((item, index) => (
          <View key={item.id} style={styles.favoriteItem}>
            <TouchableOpacity style={styles.favoriteButton} onPress={() => navigateToPlayer(index)}>
              <Image source={item.image} style={styles.favoriteImage} />
              <View style={styles.favoriteTextContainer}>
                <Text style={styles.favoriteText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavorite(index)}>
              {favorites[index] ? (
                <Heart color="red" size={24} />
              ) : (
                <Heart color="#ddd" size={24} />
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.khoangCach5}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeAudioListing')}>
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
          <TouchableOpacity onPress={() => navigation.navigate('FeedAudioListing')}>
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
    backgroundColor: '#181818',
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    color: 'white',
    fontSize: 30,
  },
  iconTitle: {
    fontSize: 12,
    color: 'white',
  },
  khoangCach5: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#231b2e',
    justifyContent: 'space-between',
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
    color: 'white',
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
    fontSize: 12,
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
    color: 'white',
  },
  followersCount: {
    color: 'gray',
  },
  favoritesContainer: {
    marginTop: 10,
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
    fontWeight: 'bold',
    color: 'white',
  },
});
