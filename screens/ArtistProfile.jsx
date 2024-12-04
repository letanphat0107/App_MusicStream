import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const ArtistProfile = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  // State theo dõi trạng thái Follow/Unfollow
  const [isFollowing, setIsFollowing] = useState(false);
  // State lưu trữ thông tin của track đang phát
  const [sounds, setSounds] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(null); // Trạng thái lưu track đang phát

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  // Object lưu thông tin profile
  const [profile, setProfile] = useState({
    name: 'Ryan Young',
    followers: 65100, // Ban đầu có 65.1K followers
    image: require('../images/ArtistProfile/Image63.png'),
  });

  const handleFollow = () => {
    // Nếu đang Follow, hủy Follow (giảm followers), nếu không thì tăng followers
    if (isFollowing) {
      setProfile(prevProfile => ({
        ...prevProfile,
        followers: prevProfile.followers - 1,
      }));
    } else {
      setProfile(prevProfile => ({
        ...prevProfile,
        followers: prevProfile.followers + 1,
      }));
    }
    // Đổi trạng thái Follow/Unfollow
    setIsFollowing(!isFollowing);
  };

  // Hàm định dạng followers với 'K', 'M' nếu lớn hơn 1000
  const formatFollowers = (followers) => {
    if (followers >= 1000000) {
      return (followers / 1000000).toFixed(1) + 'M'; // Định dạng 'M'
    } else if (followers >= 1000) {
      return (followers / 1000).toFixed(1) + 'K'; // Định dạng 'K'
    }
    return followers.toString(); // Nếu nhỏ hơn 1000, hiển thị số nguyên
  };

  // Hàm dừng tất cả các bài hát
  const stopAllTracks = async () => {
    // Dừng tất cả các track đang phát
    for (let trackId in sounds) {
      if (sounds[trackId]) {
        await sounds[trackId].stopAsync();
      }
    }
    setSounds({}); // Reset âm thanh sau khi dừng tất cả
    setIsPlaying(false);
    setCurrentTrackId(null); // Reset track đang phát
  };

  // Hàm phát nhạc
  const playTrack = async (trackId, audioUrl) => {
    try {
      // Nếu track đã đang phát, thì dừng bài hát trước đó
      if (currentTrackId !== trackId) {
        // Dừng tất cả bài hát trước khi phát bài hát mới
        await stopAllTracks();
        
        // Tạo mới đối tượng sound và phát nhạc cho track hiện tại
        const { sound } = await Audio.Sound.createAsync(audioUrl, { shouldPlay: true });
        
        // Cập nhật trạng thái âm thanh cho track hiện tại
        setSounds(prevSounds => ({
          ...prevSounds,
          [trackId]: sound,
        }));
        setIsPlaying(true); // Đánh dấu là đang phát nhạc
        setCurrentTrackId(trackId); // Cập nhật track hiện tại
      } else {
        // Nếu track hiện tại đã đang phát, dừng bài hát
        await stopAllTracks();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  // Hàm phát tất cả các bài hát theo trình tự
  const playAllTracks = async () => {
    try {
      if (isPlaying) {
        await stopAllTracks();
        return;
      }
      for (const track of popularTracks) {
        const { sound } = await Audio.Sound.createAsync(track.audioUrl, { shouldPlay: true });
        setSounds(prevSounds => ({ ...prevSounds, [track.id]: sound }));
        setIsPlaying(true);
        setCurrentTrackId(track.id);

        // Đợi bài hát hiện tại kết thúc, sau đó phát bài hát tiếp theo
        await sound.playAsync();
        await sound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.didJustFinish && currentTrackId === track.id) {
            if (popularTracks.indexOf(track) < popularTracks.length - 1) {
              // Chuyển sang bài hát tiếp theo
              const nextTrack = popularTracks[popularTracks.indexOf(track) + 1];
              await playTrack(nextTrack.id, nextTrack.audioUrl);
            } else {
              // Nếu đã phát hết các bài hát, dừng lại
              await stopAllTracks();
            }
          }
        });
      }
    } catch (error) {
      console.error('Error playing all tracks:', error);
    }
  };

  // Hàm phát tất cả các bài hát theo thứ tự ngẫu nhiên
  const playRandomTracks = async () => {
    const shuffledTracks = [...popularTracks].sort(() => Math.random() - 0.5); // Trộn mảng ngẫu nhiên
    try {
      if (isPlaying) {
        await stopAllTracks();
        return;
      }
      for (const track of shuffledTracks) {
        const { sound } = await Audio.Sound.createAsync(track.audioUrl, { shouldPlay: true });
        setSounds(prevSounds => ({ ...prevSounds, [track.id]: sound }));
        setIsPlaying(true);
        setCurrentTrackId(track.id);

        // Đợi bài hát hiện tại kết thúc, sau đó phát bài hát tiếp theo
        await sound.playAsync();
        await sound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.didJustFinish && currentTrackId === track.id) {
            if (shuffledTracks.indexOf(track) < shuffledTracks.length - 1) {
              // Chuyển sang bài hát tiếp theo trong mảng ngẫu nhiên
              const nextTrack = shuffledTracks[shuffledTracks.indexOf(track) + 1];
              await playTrack(nextTrack.id, nextTrack.audioUrl);
            } else {
              // Nếu đã phát hết các bài hát, dừng lại
              await stopAllTracks();
            }
          }
        });
      }
    } catch (error) {
      console.error('Error playing random tracks:', error);
    }
  };


  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="chevron-left" size={24} color="black" />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
      <Image source={profile.image} style={styles.profileImage} />
        <Text style={styles.profileName}>{profile.name}</Text>
        
        {/* Hiển thị số lượng followers */}
        <Text style={styles.followers}>{formatFollowers(profile.followers)} Followers</Text>

        <View style={styles.buttonsRow}>
          <View style={styles.subButtonsRow}>
            <TouchableOpacity style={[styles.followButton, , { backgroundColor: isFollowing ? 'rgba(238, 230, 234, 0.8)' : 'white' }]} onPress={handleFollow}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <FontAwesome name="ellipsis-h" size={24} color="black" />
          </View>
          <View style={styles.subButtonsRow}>
            <FontAwesome name="random" size={24} color="black" onPress={playRandomTracks}/>
            <TouchableOpacity style={styles.playButton}>
              <FontAwesome name="play" size={26} color="white" onPress={playAllTracks}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Popular Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular</Text>
        {popularTracks.map((track, index) => (
          <TouchableOpacity onPress={() => playTrack(track.id ,track.audioUrl)}>
            <View key={track.id} style={styles.trackRow}>
              <Image source={track.image} style={styles.trackImage} />
              <View style={styles.trackInfo}>
                <Text style={styles.trackName}>{track.name}</Text>
                <Text style={styles.trackArtistName}>{track.artistName}</Text>
                <Text style={styles.trackDetails}><FontAwesome name="play" size={12} color="black" />  {track.plays} • {track.duration}</Text>
              </View>
              <FontAwesome name="ellipsis-h" size={24} color="black" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Albums Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Albums</Text>
        <ScrollView horizontal>
          {albums.map((album, index) => (
            <View key={index} style={styles.album}>
              <Image source={album.image} style={styles.albumImage} />
              <Text style={styles.albumTitle}>{album.title}</Text>
              <Text style={styles.albumArtist}>{album.artist}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Image source={require('../assets/all_images/Artist Profile/Image 73.png')} style={styles.aboutImage} />
        <Text style={styles.aboutText} numberOfLines={isExpanded ? undefined : 4}>
          Do in cupidatat aute et in officia aute laboris est Lorem est nisi dolor consequat voluptate duis irure. Veniam quis amet irure cillum elit aliquip sunt cillum cillum do aliqua voluptate ad non magna elit. Do ea na. Do in cupidatat aute et in officia aute laboris est Lorem est nisi dolor consequat voluptate duis irure.
          {isExpanded ? '' : '...'} 
        </Text>
        <TouchableOpacity style={styles.viewMoreButton} onPress={toggleText}>
          <Text style={styles.viewMore}>{isExpanded ? "View less" : "View more"}</Text>
        </TouchableOpacity>
      </View>

      {/* Fans also like Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fans also like</Text>
        <ScrollView horizontal>
          {fansAlsoLike.map((fan, index) => (
            <View key={index} style={styles.fan}>
              <Image source={fan.image } style={styles.fanImage} />
              <Text style={styles.fanName}>{fan.name}</Text>
              <Text style={styles.fanArtist}>{fan.artist}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

// Example data
const popularTracks = [
  {id: 1, name: 'Let you free', artistName: 'Ryan Young', plays: '68M', duration: '03:35', image: require('../assets/all_images/Artist Profile/Image 66.png'), audioUrl: require('../assets/audio/Ghen-MINErikKhacHung-13305025.mp3')},
  {id: 2, name: 'Blinding Lights', artistName: 'Ryan Young', plays: '93M', duration: '04:39', image: require('../assets/all_images/Artist Profile/Image 67.png'), audioUrl: require('../assets/audio/chamhoa.mp3') },
  {id: 3, name: 'Levitating', artistName: 'Ryan Young', plays: '9M', duration: '07:48', image: require('../assets/all_images/Artist Profile/Image 68.png'), audioUrl: require('../assets/audio/CoEmCho-MINMrA-4928094.mp3') },
  {id: 4, name: 'Astronaut in the Ocean', artistName: 'Ryan Young', plays: '23M', duration: '3:36', image: require('../assets/all_images/Artist Profile/Image 69.png'), audioUrl: require('../assets/audio/emmoilanguoiyeuanh.mp3') },
  {id: 5, name: 'Dynamite', artistName: 'Ryan Young', plays: '10M', duration: '06:22', image: require('../assets/all_images/Artist Profile/Image 70.png'), audioUrl: require('../assets/audio/TrenTinhBanDuoiTinhYeu-MIN-6802163.mp3') },
];

const albums = [
  { title: 'ME', artist: 'Jessica Gonzalez', image: require('../assets/all_images/Artist Profile/Image 71.png') },
  { title: 'Magna nost', artist: 'Jessica Gonzalez', image: require('../assets/all_images/Artist Profile/Image 72.png') },
  { title: 'Proident', artist: 'Jessica Gonzalez', image: require('../assets/all_images/Artist Profile/Image 77.png') },
];

const fansAlsoLike = [
  { name: 'Magna nost', artist: 'Jessica Gonzalez', image: require('../assets/all_images/Artist Profile/Image 74.png') },
  { name: 'Exercitatio', artist: 'Brian Harris', image: require('../assets/all_images/Artist Profile/Image 75.png') },
  { name: 'Tempor Any', artist: 'Tyler Ano', image: require('../assets/all_images/Artist Profile/Image 76.png') },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 18 ,marginTop: 30},
  header: { marginVertical: 10 },
  profileSection: { alignItems: 'center', marginBottom: 20},
  profileImage: { width: 250, height: 250, borderRadius: 50 },
  profileName: { fontSize: 34, fontWeight: 'bold', marginTop: 18 },
  followers: { color: 'gray' ,marginTop: 10},
  buttonsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 , width: '100%'},
  subButtonsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  followButton: { backgroundColor: 'white', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 30, marginRight: 20 , borderWidth: 1, borderColor: '#7f8286'},
  followButtonText: { color: '#7f8286' , fontSize: 20},
  playButton: { backgroundColor: 'black', paddingVertical: 22, paddingHorizontal: 24, borderRadius: 70, marginLeft: 30},
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  trackRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  trackImage: { width: 60, height: 60, borderRadius: 5, marginRight: 10 },
  trackInfo: { flex: 1 },
  trackName: { fontSize: 16 },
  trackArtistName:{ color: 'gray' },
  trackDetails: { color: 'gray' },
  album: { marginRight: 10, alignItems: 'flex-start' },
  albumImage: { width: 140, height: 140, borderRadius: 5 },
  albumTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  albumArtist: { color: 'gray' ,marginTop: 5},
  aboutImage: { width: '100%', height: 150, borderRadius: 5, marginBottom: 10 },
  aboutText: { color: 'gray' , lineHeight: 25},
  viewMoreButton: {paddingVertical: 12, paddingHorizontal: 30, borderRadius: 30, marginTop: 15, alignItems: 'center'},
  viewMore: { color: '#1DB954' },
  fan: { marginRight: 10, alignItems: 'flex-start' },
  fanImage: { width: 140, height: 140, borderRadius: 5 },
  fanName: { fontSize: 14, fontWeight: 'bold', marginTop: 5 },
  fanArtist: { color: 'gray' , marginTop: 5},
});

export default ArtistProfile;
