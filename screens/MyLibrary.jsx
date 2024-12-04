import { Search, Heart, ChevronRight, House, Newspaper, Library, Play, Pause } from 'lucide-react-native';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Slider } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    title: 'Đào Nương\nHoàng Vương\n2,1M . 3:06',
    image: require('../images/Avatar/daoNuong.jpg'),
    audio: require('../audio/DaoNuong.mp3'),
  },
  {
    id: '2',
    title: 'Một Bước Yêu Vạn Dặm Đau\nMr.Siro\n8,8M . 4:58',
    image: require('../images/Avatar/motBuocYeuVanDam.jpg'),
    audio: require('../audio/motBuocYeuVanDamDau.mp3'),
  },
  {
  id: '3',
  title: 'Chỉ Là Không Cùng Nhau\nTăng Phúc, Trương Thảo Nhi\n4,8M . 3:52',
  image: require('../images/Avatar/chiLaKhongCungNhau.jpg'),
  audio: require('../audio/ChiLaKhongCungNhau.mp3'),
},
{
  id: '4',
  title: 'Lạc Trôi\nSơn Tùng M-TP\n9M . 3.53',
  image: require('../images/Avatar/lacTroi.jpg'),
  audio: require('../audio/LacTroi.mp3'),
},
{
  id: '5',
  title: 'Chỉ Bằng Cái Gật Đầu\nYan Nguyễn\n23M . 4:06',
  image: require('../images/Avatar/chiBangCaiGatDau.jpg'),
  audio: require('../audio/ChiBangCaiGatDau.mp3'),
},
{
  id: '6',
  title: 'Nói Có Khó Nhưng Vui\nYan Nguyễn\n10M . 4:12',
  image: require('../images/Avatar/noiCoKhoNhungVui.jpg'),
  audio: require('../audio/ChiLaKhongCungNhau.mp3'),
},
{
  id: '7',
  title: 'Ngỡ Như Giấc Mơ\nChu Duyên\n1,2M . 3:58',
  image: require('../images/Avatar/ngoNhuGiacMo.jpg'),
  audio: require('../audio/ngoNhuGiacMo.mp3'),
},  
{
  id: '8',
  title: 'Ai Chung Tình Được Mãi\nĐinh Tùng Huy, ACV\n1,9M . 5:35',
  image: require('../images/Avatar/aiChungTinhDuocMai.jpg'),
  audio: require('../audio/aiChungTinhDuocMai.mp3'),
},
{
  id: '9',
  title: 'Anh Không Can Đảm\nCao Nam Thành\n2,8M . 4:25',
  image: require('../images/Avatar/anhKhongCanDam.jpg'),
  audio: require('../audio/AnhKhongCanDam-CaoNamThanh-4039734.mp3'),
},

];

export default function MyLibrary() {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState(data.map(() => false));
  const [isFollowing, setIsFollowing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const audioPlayer = useRef(null);

  const toggleFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
  };

  const navigateToPlayer = (index) => {
    navigation.navigate('PlayerScreen', { song: data[index], playlist: data });
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Songs"
          placeholderTextColor="#ddd"
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity>
          <Search style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Playlists')}>
          <Text style={styles.buttonText}>Playlist</Text>
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

      {/* Artist Follow Section */}
      <View style={styles.artistFollowSection}>
        <Image source={require('../images/MyLibrary/Image107.png')} style={styles.artistImage} />
        <View style={styles.nameContainer}>
          <Text style={styles.artistName}>Mer Watson</Text>
          <Text style={styles.followersCount}>1.234K Followers</Text>
        </View>
        <TouchableOpacity
          style={[styles.followButton, isFollowing ? { backgroundColor: '#999' } : {}]}
          onPress={toggleFollow}>
          <Text style={styles.buttonText}>{isFollowing ? 'Following' : 'Follow'}</Text>
        </TouchableOpacity>
      </View>

      {/* Song List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.songListContainer}>
        {filteredData.map((item, index) => (
          <View key={item.id} style={styles.songItem}>
            <TouchableOpacity style={styles.songButton} onPress={() => navigateToPlayer(index)}>
              <Image source={item.image} style={styles.songImage} />
              <View style={styles.songTextContainer}>
                <Text style={styles.songText}>{item.title}</Text>
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

      {/* Audio Player Controls */}
      {isPlaying && (
        <View style={styles.playerControls}>
          <TouchableOpacity onPress={togglePlayback}>
            <Pause style={styles.icon} />
          </TouchableOpacity>
          <Slider
            style={styles.progressBar}
            minimumValue={0}
            maximumValue={100}
            value={playbackProgress}
            onValueChange={(value) => setPlaybackProgress(value)}
          />
          <TouchableOpacity onPress={togglePlayback}>
            <Play style={styles.icon} />
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
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
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 10,
    marginRight: 10,
    color: 'white',
    flex: 1,
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
  artistFollowSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  artistImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  followButton: {
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 25,
    marginLeft: 10,
  },
  songListContainer: {
    marginTop: 20,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  songButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  songTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  songText: {
    fontWeight: 'bold',
    color: 'white',
  },
  playerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  progressBar: {
    flex: 1,
    marginHorizontal: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#231b2e',
    justifyContent: 'space-between',
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
});
