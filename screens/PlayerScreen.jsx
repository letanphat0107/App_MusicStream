import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  FlatList,
} from "react-native";
import { Audio } from "expo-av";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react-native";
import Slider from "@react-native-community/slider";

export default function PlayerScreen({ route }) {
  const { song, playlist } = route.params;  // playlist là danh sách bài hát
  const { title, image, audio } = song;

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Lưu chỉ số bài hát hiện tại

  const rotation = useRef(new Animated.Value(0)).current;

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 10000, // 10 giây cho một vòng quay đầy đủ
        useNativeDriver: true,
      })
    ).start();
  };

  const stopRotation = () => {
    rotation.stopAnimation();
    rotation.setValue(0); // Reset rotation về mặc định
  };

  const playPause = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          // Nếu đang phát, tạm dừng và cập nhật trạng thái
          await sound.pauseAsync();
          stopRotation();
          setIsPlaying(false);
        } else {
          // Nếu không phát, bắt đầu phát và cập nhật trạng thái
          await sound.playAsync();
          startRotation();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error("Error while trying to play/pause sound:", error);
    }
  };

  const skipForward = async () => {
    try {
      if (sound) {
        const nextSongIndex = (currentSongIndex + 1) % playlist.length;
        const nextSong = playlist[nextSongIndex];
        const { sound } = await Audio.Sound.createAsync(nextSong.audio);
        setSound(sound);
        setCurrentSongIndex(nextSongIndex);
        await sound.playAsync();
        setIsPlaying(true);
        startRotation();
      }
    } catch (error) {
      console.error("Error while skipping forward:", error);
    }
  };

  const skipBackward = async () => {
    try {
      if (sound) {
        const prevSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        const prevSong = playlist[prevSongIndex];
        const { sound } = await Audio.Sound.createAsync(prevSong.audio);
        setSound(sound);
        setCurrentSongIndex(prevSongIndex);
        await sound.playAsync();
        setIsPlaying(true);
        startRotation();
      }
    } catch (error) {
      console.error("Error while skipping backward:", error);
    }
  };

  // Thêm chức năng tua tới 10 giây
  const skipForward10Sec = async () => {
    try {
      if (sound) {
        const newPosition = Math.min(position + 10000, duration); // Không vượt quá tổng thời gian
        await sound.setPositionAsync(newPosition);
        setPosition(newPosition);
      }
    } catch (error) {
      console.error("Error while skipping forward 10 seconds:", error);
    }
  };

  // Thêm chức năng tua lùi 10 giây
  const skipBackward10Sec = async () => {
    try {
      if (sound) {
        const newPosition = Math.max(position - 10000, 0); // Không lùi quá mức
        await sound.setPositionAsync(newPosition);
        setPosition(newPosition);
      }
    } catch (error) {
      console.error("Error while skipping backward 10 seconds:", error);
    }
  };

  const toggleShuffle = () => setIsShuffle(!isShuffle);
  const toggleRepeat = () => setIsRepeat(!isRepeat);

  const onSliderValueChange = async (value) => {
    if (sound) {
      const newPosition = value * duration;
      await sound.setPositionAsync(newPosition);
      setPosition(newPosition);
    }
  };

  useEffect(() => {
    const loadSound = async () => {
      setIsLoading(true);
      try {
        const { sound } = await Audio.Sound.createAsync(audio);
        setSound(sound);

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setDuration(status.durationMillis);
            setPosition(status.positionMillis);
            setIsPlaying(status.isPlaying); // Cập nhật trạng thái phát lại
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.error("Error while loading sound:", error);
        setIsLoading(false);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
        stopRotation();
      }
    };
  }, [audio]);

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const rotationInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const renderPlaylistItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.playlistItem, currentSongIndex === index && styles.activeSong]}
      onPress={() => setCurrentSongIndex(index)}
    >
      <Text style={styles.playlistItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#ff4081" />
      ) : (
        <>
          <Animated.Image
            source={image}
            style={[styles.albumArt, { transform: [{ rotate: rotationInterpolation }] }]}
          />
          <Text style={styles.title}>{title}</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={position / duration || 0}
            minimumTrackTintColor="#ff4081"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#ff4081"
            onValueChange={onSliderValueChange}
          />
          <View style={styles.controls}>
            <TouchableOpacity onPress={skipBackward10Sec} style={styles.controlButton}>
              <Text style={styles.controlButtonText}>-10s</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={playPause} style={styles.playPauseButton}>
              {isPlaying ? <Pause size={40} color="#fff" /> : <Play size={40} color="#fff" />}
            </TouchableOpacity>
            <TouchableOpacity onPress={skipForward10Sec} style={styles.controlButton}>
              <Text style={styles.controlButtonText}>+10s</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.extraControls}>
            <TouchableOpacity onPress={toggleShuffle} style={styles.controlButton}>
              <Shuffle size={30} color={isShuffle ? "#ff4081" : "#fff"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleRepeat} style={styles.controlButton}>
              <Repeat size={30} color={isRepeat ? "#ff4081" : "#fff"} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={playlist}
            renderItem={renderPlaylistItem}
            keyExtractor={(item) => item.title}
            style={styles.playlistContainer}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  albumArt: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 15,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginTop: 10,
  },
  timeText: {
    color: "#FFF",
    fontSize: 12,
  },
  slider: {
    width: 300,
    marginTop: 20,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 220,
    marginTop: 30,
  },
  controlButton: {
    padding: 10,
    alignItems: "center",
  },
  controlButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  playPauseButton: {
    padding: 15,
  },
  extraControls: {
    flexDirection: "row",
    justifyContent: "center",
    width: 200,
    marginTop: 20,
  },
  playlistContainer: {
    marginTop: 30,
    width: "100%",
  },
  playlistItem: {
    padding: 10,
    backgroundColor: "#333",
    marginVertical: 5,
    borderRadius: 5,
  },
  playlistItemText: {
    color: "#fff",
    fontSize: 16,
  },
  activeSong: {
    backgroundColor: "#ff4081",
  },
});
