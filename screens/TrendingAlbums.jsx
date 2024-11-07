import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Heart, Share, Download, Play } from 'lucide-react-native';

export default function TrendingAlbums({ route }) {
  const { item } = route.params;
  const [liked, setLiked] = useState(false);

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

  const handlePlaySong = (song) => {
    Alert.alert("Now Playing", `${song.title} - ${song.artist}`);
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
