import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CornerDownRight, Ellipsis, Heart } from 'lucide-react-native';

export default function PlaylistsDetails() {
  const route = useRoute();
  const { item } = route.params;

  const showMoreOptions = (songTitle) => {
    Alert.alert(
      'Tùy chọn',
      `${songTitle}`,
      [
        { text: 'Thêm vào yêu thích', onPress: () => console.log(`Đã thêm ${songTitle} vào yêu thích`) },
        { text: 'Chia sẻ', onPress: () => console.log(`Đã chia sẻ ${songTitle}`) },
        { text: 'Xóa khỏi danh sách phát', onPress: () => console.log(`Đã xóa ${songTitle} khỏi danh sách phát`), style: 'destructive' },
        { text: 'Hủy', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {item.image && (
          <Image source={item.image} style={styles.playlistImage} />
        )}
        <Text style={styles.playlistTitle}>{item.title}</Text>
      </View>

      <View style={styles.cungDong}>
        <TouchableOpacity style={styles.moreButton}>
          <Heart style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <Ellipsis style={styles.icon} onPress={() => showMoreOptions(item.title)} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <CornerDownRight style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <Image source={require('../images/PlaylistDetails/IconButton2.png')} style={styles.iconButton} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {sampleSongs.map((song, index) => (
          <View key={index} style={styles.songContainer}>
            <Image source={song.image} style={styles.songImage} />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songArtist}>{song.artist}</Text>
              <Text style={styles.songDuration}>{song.duration}</Text>
            </View>
            <TouchableOpacity style={styles.moreButton} onPress={() => showMoreOptions(song.title)}>
              <Ellipsis style={styles.icon} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const sampleSongs = [
  {
    id: '1',
    title: 'FLOWER',
    artist: 'Jessica Gonzalez',
    duration: '2,1M . 3:36', 
    image: require('../images/MyLibrary/Image101.png'), 
  },
  {
    id: '2',
    title: 'Shape of You',
    artist: 'Anthony Taylor',
    duration: '68M . 3:35',
    image: require('../images/MyLibrary/Image102.png'), 
  },
  {
    id: '3',
    title: 'Blingding Lights',
    artist: 'Ashley Scott',
    duration: '93M . 3:20',
    image: require('../images/MyLibrary/Image103.png'), 
  },
  {
    id: '4',
    title: 'Levitating',
    artist: 'Anthony Taylor',
    duration: '9M . 7:48',
    image: require('../images/MyLibrary/Image104.png'), 
  },
  {
    id: '5',
    title: 'Astronaut in the Ocean',
    artist: 'Pedro Moreno',
    duration: '23M . 3:36',
    image: require('../images/MyLibrary/Image105.png'), 
  },
  {
    id: '6',
    title: 'Dynamite',
    artist: 'Elena Jimenez',
    duration: '10M . 6:22',
    image: require('../images/MyLibrary/Image106.png'), 
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  cungDong: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  playlistImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  playlistTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
  },
  content: {
    paddingHorizontal: 10,
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
    justifyContent: 'space-between',
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  songArtist: {
    fontSize: 14,
    color: '#555',
  },
  songDuration: {
    fontSize: 12,
    color: '#999', 
  },
  moreButton: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  icon: {
    color: 'black',
    fontSize: 28,
  },
  iconButton: {
    width: 30,
    height: 30,
  },
});
