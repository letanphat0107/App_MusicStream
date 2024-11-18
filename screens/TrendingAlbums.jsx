import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Heart, Share, Download, Play, Pause, SkipForward, Shuffle, Repeat, PlusCircle } from 'lucide-react-native';
import Slider from '@react-native-community/slider';

export default function TrendingAlbums({ route }) {
  const { item } = route.params;
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [queue, setQueue] = useState([]);

  const sampleSongs = [
    { id: '1', title: 'Track 1', artist: 'Artist A', duration: '3:45' },
    { id: '2', title: 'Track 2', artist: 'Artist B', duration: '4:02' },
    { id: '3', title: 'Track 3', artist: 'Artist C', duration: '5:12' },
    { id: '4', title: 'Track 4', artist: 'Artist A', duration: '3:58' },
  ];

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShare = () => {
    Alert.alert("Share", `Sharing ${item.title}`);
  };

  const handleDownload = () => {
    Alert.alert("Download", `Downloading ${item.title}`);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    Alert.alert(isPlaying ? "Paused" : "Now Playing", `${currentTrack.title} - ${currentTrack.artist}`);
  };

  const handlePlaySong = (song) => {
    setCurrentTrack(song);
    setIsPlaying(true);
    setTrackProgress(0); // Reset track progress when a new song is played
    Alert.alert("Now Playing", `${song.title} - ${song.artist}`);
  };

  const handleSkip = () => {
    const currentIndex = sampleSongs.findIndex(song => song.id === currentTrack.id);
    const nextSong = sampleSongs[(currentIndex + 1) % sampleSongs.length];
    setCurrentTrack(nextSong);
    setTrackProgress(0); // Reset track progress
    Alert.alert("Next Track", `${nextSong.title} - ${nextSong.artist}`);
  };

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
    Alert.alert(isShuffled ? "Shuffle Off" : "Shuffle On", "Shuffle the playlist.");
  };

  const handleRepeat = () => {
    setIsRepeated(!isRepeated);
    Alert.alert(isRepeated ? "Repeat Off" : "Repeat On", "The track will repeat.");
  };

  const handleAddToQueue = () => {
    if (currentTrack) {
      setQueue([...queue, currentTrack]);
      Alert.alert("Added to Queue", `${currentTrack.title} has been added to your queue.`);
    }
  };

  const handleAddToPlaylist = () => {
    Alert.alert("Added to Playlist", `${item.title} has been added to your playlist.`);
  };

  const renderSongItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePlaySong(item)}>
      <View style={styles.songItem}>
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{item.title}</Text>
          <Text style={styles.songArtist}>{item.artist}</Text>
        </View>
        <View style={styles.songDurationContainer}>
          <Play style={styles.playIcon} />
          <Text style={styles.songDuration}>{item.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Image source={item.image} style={styles.albumImage} />

      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle}>{item.title}</Text>
        <Text style={styles.albumArtist}>By {item.artist || 'Various Artists'}</Text>
        <Text style={styles.albumDescription}>
          Enjoy the latest tracks and hits from {item.title}. Dive into this trending album with all-time favorites and new releases!
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Heart style={[styles.actionIcon, liked ? styles.liked : null]} />
          <Text style={[styles.actionText, liked ? styles.likedText : null]}>{liked ? 'Liked' : 'Like'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Share style={styles.actionIcon} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
          <Download style={styles.actionIcon} />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleAddToPlaylist}>
          <PlusCircle style={styles.actionIcon} />
          <Text style={styles.actionText}>Add to Playlist</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.playerControls}>
        <TouchableOpacity onPress={handleShuffle} style={styles.controlButton}>
          <Shuffle style={styles.controlIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkip} style={styles.controlButton}>
          <SkipForward style={styles.controlIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause} style={styles.controlButton}>
          {isPlaying ? (
            <Pause style={styles.controlIcon} />
          ) : (
            <Play style={styles.controlIcon} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRepeat} style={styles.controlButton}>
          <Repeat style={styles.controlIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.volumeControl}>
        <Text style={styles.volumeText}>Volume</Text>
        <Slider
          value={volume}
          onValueChange={setVolume}
          minimumValue={0}
          maximumValue={1}
          style={styles.slider}
        />
      </View>

      <View style={styles.trackProgress}>
        <Text style={styles.trackProgressText}>{`Track Progress: ${(trackProgress * 100).toFixed(0)}%`}</Text>
        <Slider
          value={trackProgress}
          onValueChange={setTrackProgress}
          minimumValue={0}
          maximumValue={1}
          style={styles.slider}
        />
      </View>

      <Text style={styles.trackListTitle}>Track List</Text>
      <FlatList
        data={sampleSongs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id}
        style={styles.trackList}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  albumImage: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 16,
  },
  albumInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  albumTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  albumArtist: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 4,
  },
  albumDescription: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    color: '#ff6b6b',
    fontSize: 24,
  },
  liked: {
    color: '#e74c3c',
  },
  actionText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginTop: 4,
  },
  likedText: {
    color: '#e74c3c',
  },
  playerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  controlButton: {
    padding: 12,
  },
  controlIcon: {
    color: '#4cd137',
    fontSize: 30,
  },
  volumeControl: {
    marginTop: 20,
    alignItems: 'center',
  },
  volumeText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  trackProgress: {
    marginTop: 20,
    alignItems: 'center',
  },
  trackProgressText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  slider: {
    width: '80%',
  },
  trackListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  trackList: {
    marginTop: 10,
  },
  songItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#dcdde1',
    backgroundColor: '#f5f6fa',
    borderRadius: 10,
    marginBottom: 8,
  },
  songInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  songArtist: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  songDurationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playIcon: {
    color: '#4cd137',
    fontSize: 20,
    marginRight: 8,
  },
  songDuration: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});
