import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Animated, ImageBackground, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Play, Pause, ChevronRight, ChevronLeft, Shuffle, Repeat, FastForward, Rewind, Volume } from 'lucide-react-native';

export default function PlayerScreen({ route }) {
  const { song, playlist } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(1); // Volume state (1 = max volume, 0 = min)
  const [showVolumeControl, setShowVolumeControl] = useState(false); // Control visibility of the volume slider
  const soundRef = useRef();
  const rotation = useRef(new Animated.Value(0)).current; // Animated rotation value

  useEffect(() => {
    loadSound();

    // Start rotating the avatar when the component mounts
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 10000, // Complete one full rotation every 10 seconds
        useNativeDriver: true,
      })
    ).start();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [song]);

  const loadSound = async () => {
    try {
      const { sound, status } = await Audio.Sound.createAsync(
        song.audio,
        { shouldPlay: isPlaying, positionMillis: position, volume },
        onPlaybackStatusUpdate
      );
      soundRef.current = sound;
      setSound(sound);
      setDuration(status.durationMillis);
    } catch (error) {
      Alert.alert('Error', 'Unable to load the song. Please try again later.');
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    setPosition(status.positionMillis);
    setIsBuffering(status.isBuffering);

    if (status.didJustFinish) {
      if (isRepeat) {
        soundRef.current.playAsync(); // Replay the same song
      } else {
        skipForward(); // Automatically skip to the next song when finished
      }
    }
  };

  const togglePlayback = async () => {
    if (soundRef.current) {
      try {
        if (isPlaying) {
          await soundRef.current.pauseAsync();
        } else {
          await soundRef.current.playAsync();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        Alert.alert('Error', 'Unable to toggle playback. Please try again later.');
      }
    } else {
      // If sound is not loaded, load it and play
      await loadSound();
    }
  };

  const skipForward = async () => {
    try {
      const nextIndex = isShuffle
        ? Math.floor(Math.random() * playlist.length)
        : playlist.findIndex(item => item.id === song.id) + 1;
      if (nextIndex < playlist.length) {
        const nextSong = playlist[nextIndex];
        setPosition(0);
        setIsPlaying(false);
        route.params.song = nextSong;
        loadSound();
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to skip forward. Please try again later.');
    }
  };

  const skipBackward = async () => {
    try {
      const prevIndex = playlist.findIndex(item => item.id === song.id) - 1;
      if (prevIndex >= 0) {
        const prevSong = playlist[prevIndex];
        setPosition(0);
        setIsPlaying(false);
        route.params.song = prevSong;
        loadSound();
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to skip backward. Please try again later.');
    }
  };

  const fastForward = () => {
    const newPosition = Math.min(position + 10000, duration); // Fast forward by 10 seconds
    setPosition(newPosition);
    soundRef.current.setPositionAsync(newPosition);
  };

  const rewind = () => {
    const newPosition = Math.max(position - 10000, 0); // Rewind by 10 seconds
    setPosition(newPosition);
    soundRef.current.setPositionAsync(newPosition);
  };

  const toggleShuffle = () => setIsShuffle(!isShuffle);

  const toggleRepeat = () => setIsRepeat(!isRepeat);

  const formatDuration = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const disableButtons = isBuffering || duration === 0;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={song.image}
        style={styles.backgroundImage}
        blurRadius={10}
      >
        <View style={styles.overlay}>
          {/* Rotating Avatar with Circular Border */}
          <Animated.View style={styles.circleContainer}>
            <Animated.Image
              source={song.image}
              style={[
                styles.songImage,
                {
                  transform: [
                    {
                      rotate: rotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                },
              ]}
            />
          </Animated.View>
          <Text style={styles.songTitle}>{song.title}</Text>
          <Text style={styles.songArtist}>{song.artist}</Text>
          <Text style={styles.songDuration}>
            {formatDuration(position)} / {formatDuration(duration)}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onValueChange={async (value) => {
              setPosition(value);
              await soundRef.current.setPositionAsync(value);
            }}
            minimumTrackTintColor="#FF6347"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#FF6347"
          />
          {isBuffering && (
            <ActivityIndicator size="large" color="#FF6347" style={styles.loadingIndicator} />
          )}
          <View style={styles.controls}>
            <TouchableOpacity onPress={skipBackward} disabled={disableButtons}>
              <ChevronLeft color="white" size={45} />
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlayback} disabled={disableButtons}>
              {isPlaying ? <Pause color="white" size={60} /> : <Play color="white" size={60} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={skipForward} disabled={disableButtons}>
              <ChevronRight color="white" size={45} />
            </TouchableOpacity>
          </View>
          <View style={styles.extraControls}>
            <TouchableOpacity onPress={toggleShuffle} disabled={disableButtons}>
              <Shuffle color={isShuffle ? 'yellow' : 'white'} size={40} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleRepeat} disabled={disableButtons}>
              <Repeat color={isRepeat ? 'yellow' : 'white'} size={40} />
            </TouchableOpacity>
            <TouchableOpacity onPress={rewind} disabled={disableButtons}>
              <Rewind color="white" size={40} />
            </TouchableOpacity>
            <TouchableOpacity onPress={fastForward} disabled={disableButtons}>
              <FastForward color="white" size={40} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.volumeButton}
            onPress={() => setShowVolumeControl(!showVolumeControl)}
            disabled={disableButtons}
          >
            <Volume color="white" size={40} />
          </TouchableOpacity>
          {showVolumeControl && (
            <View style={styles.volumeControl}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={volume}
                onValueChange={async (value) => {
                  setVolume(value);
                  if (soundRef.current) {
                    await soundRef.current.setVolumeAsync(value);
                  }
                }}
                minimumTrackTintColor="#FF6347"
                maximumTrackTintColor="#FFFFFF"
                thumbTintColor="#FF6347"
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818',
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  circleContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 4,
    borderColor: '#FF6347',
    overflow: 'hidden',
    marginBottom: 20,
  },
  songImage: {
    width: '100%',
    height: '100%',
    borderRadius: 125,
    borderWidth: 4,
    borderColor: '#FF6347',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  songTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  songArtist: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  songDuration: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  slider: {
    width: '80%',
    height: 40,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  extraControls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  volumeButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  volumeControl: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 200,
  },
});
