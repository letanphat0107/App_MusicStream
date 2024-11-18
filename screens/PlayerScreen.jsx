import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Animated } from 'react-native';
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
                    outputRange: ['0deg', '360deg'], // Rotate from 0 to 360 degrees
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
      <View style={styles.controls}>
        {/* Skip backward button */}
        <TouchableOpacity onPress={skipBackward} disabled={disableButtons}>
          <ChevronLeft color="white" size={45} />
        </TouchableOpacity>
        
        {/* Play/Pause button */}
        <TouchableOpacity onPress={togglePlayback} disabled={disableButtons}>
          {isPlaying ? <Pause color="white" size={60} /> : <Play color="white" size={60} />}
        </TouchableOpacity>
        
        {/* Skip forward button */}
        <TouchableOpacity onPress={skipForward} disabled={disableButtons}>
          <ChevronRight color="white" size={45} />
        </TouchableOpacity>
      </View>
      <View style={styles.extraControls}>
        {/* Shuffle button */}
        <TouchableOpacity onPress={toggleShuffle} disabled={disableButtons}>
          <Shuffle color={isShuffle ? 'yellow' : 'white'} size={40} />
        </TouchableOpacity>

        {/* Repeat button */}
        <TouchableOpacity onPress={toggleRepeat} disabled={disableButtons}>
          <Repeat color={isRepeat ? 'yellow' : 'white'} size={40} />
        </TouchableOpacity>

        {/* Rewind button */}
        <TouchableOpacity onPress={rewind} disabled={disableButtons}>
          <Rewind color="white" size={40} />
        </TouchableOpacity>

        {/* Fast forward button */}
        <TouchableOpacity onPress={fastForward} disabled={disableButtons}>
          <FastForward color="white" size={40} />
        </TouchableOpacity>
      </View>
      
      {/* Volume control button */}
      <TouchableOpacity
        style={styles.volumeButton}
        onPress={() => setShowVolumeControl(!showVolumeControl)}
        disabled={disableButtons}
      >
        <Volume color="white" size={40} />
      </TouchableOpacity>

      {/* Volume control slider */}
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
  circleContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FF6347',
  },
  songImage: {
    width: '100%',
    height: '100%',
  },
  songTitle: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  songArtist: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  songDuration: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  extraControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  volumeButton: {
    marginTop: 20,
  },
  volumeControl: {
    width: '80%',
    marginTop: 20,
  },
});
