import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CornerDownRight, Ellipsis, Heart } from 'lucide-react-native';
import { Audio } from 'expo-av'; // Import từ expo-av
import MusicControlBar from './MusicControlBar';

export default function PlaylistsDetails() {
  const route = useRoute();
  const { item } = route.params;

  const [currentSong, setCurrentSong] = useState(null); // Quản lý bài hát hiện tại
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát nhạc
  const [sound, setSound] = useState(null); // Quản lý âm thanh

  // Dừng nhạc khi component unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playSong = async (song) => {
    try {
      // Nếu đang phát nhạc cũ, dừng nhạc trước đó
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      // Tạo một đối tượng âm thanh mới
      const { sound: newSound } = await Audio.Sound.createAsync(song.audio);
      setSound(newSound);
      await newSound.playAsync(); // Phát nhạc

      setCurrentSong(song); // Cập nhật bài hát hiện tại
      setIsPlaying(true); // Đặt trạng thái phát nhạc
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync(); // Tạm dừng
      } else {
        await sound.playAsync(); // Tiếp tục phát
      }
      setIsPlaying(!isPlaying); // Cập nhật trạng thái
    }
  };

  const handleSongPress = (song) => {
    playSong(song); // Gọi hàm phát nhạc khi chọn bài hát
  };

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
    <View style={{ flex: 1 }}>
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
            <TouchableOpacity
              key={index}
              style={styles.songContainer}
              onPress={() => handleSongPress(song)}
            >
              <Image source={song.image} style={styles.songImage} />
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{song.title}</Text>
                <Text style={styles.songArtist}>{song.artist}</Text>
              </View>
              <TouchableOpacity style={styles.moreButton} onPress={() => showMoreOptions(song.title)}>
                <Ellipsis style={styles.icon} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Music Control Bar */}
      <MusicControlBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
      />
    </View>
  );
}

const sampleSongs = [
  {
    id: '1',
    title: 'FLOWER',
    artist: 'Jessica Gonzalez',
    duration: '2,1M . 3:36',
    image: require('../images/MyLibrary/Image101.png'),
    audio: require('../audio/qzt1sl5h1y.mp3'), // File audio
  },
  {
    id: '2',
    title: 'Shape of You',
    artist: 'Anthony Taylor',
    duration: '68M . 3:35',
    image: require('../images/MyLibrary/Image102.png'),
    audio: require('../audio/AnhKhongCanDam-CaoNamThanh-4039734.mp3'),
  },
  {
    id: '3',
    title: 'Blingding Lights',
    artist: 'Ashley Scott',
    duration: '93M . 3:20',
    image: require('../images/MyLibrary/Image103.png'),
    audio: require('../audio/AnhKhongCanDam-CaoNamThanh-4039734.mp3'),
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 60, // Chừa không gian cho MusicControlBar
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
