import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Animated, ImageBackground, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Play, Pause, ChevronRight, ChevronLeft, Repeat, FastForward, Rewind, Volume } from 'lucide-react-native';

export default function PlayerScreen({ route }) {
  const { song, playlist } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const soundRef = useRef();
  const rotation = useRef(new Animated.Value(0)).current;
  const waveAnimation = useRef(new Animated.Value(0)).current; // Wave animation

  useEffect(() => {
    setPosition(0);
    setIsPlaying(false);
    if (soundRef.current) {
      soundRef.current.unloadAsync();
    }
    loadSound();

    // Looping rotation
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();

    // Wave animation (moving water effect)
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
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
        { shouldPlay: isPlaying, volume },
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
        soundRef.current.playAsync();
      } else {
        skipForward();
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
    }
  };

  const skipForward = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }

      const currentIndex = playlist.findIndex(item => item.id === song.id);
      const nextIndex = currentIndex + 1;

      if (nextIndex < playlist.length) {
        const nextSong = playlist[nextIndex];
        setPosition(0);
        setIsPlaying(false);
        route.params.song = nextSong;
      } else {
        Alert.alert('End of playlist', 'There are no more songs to play.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to skip forward. Please try again later.');
    }
  };

  const skipBackward = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }

      const currentIndex = playlist.findIndex(item => item.id === song.id);
      const prevIndex = currentIndex - 1;

      if (prevIndex >= 0) {
        const prevSong = playlist[prevIndex];
        setPosition(0);
        setIsPlaying(false);
        route.params.song = prevSong;
      } else {
        Alert.alert('Start of playlist', 'There are no previous songs to play.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to skip backward. Please try again later.');
    }
  };

  const fastForward = () => {
    const newPosition = Math.min(position + 10000, duration);
    setPosition(newPosition);
    soundRef.current.setPositionAsync(newPosition);
  };

  const rewind = () => {
    const newPosition = Math.max(position - 10000, 0);
    setPosition(newPosition);
    soundRef.current.setPositionAsync(newPosition);
  };

  const toggleRepeat = () => setIsRepeat(!isRepeat);

  const formatDuration = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const disableButtons = isBuffering || duration === 0;

  return (
    <View style={styles.container}>
      <ImageBackground source={song.image} style={styles.backgroundImage} blurRadius={10}>
        <View style={styles.overlay}>
          <Animated.View style={styles.circleContainer}>
            <Animated.Image
              source={song.image}
              style={[styles.songImage, {
                transform: [{ rotate: rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg']
                })}]
              }]}

            />
            <Animated.View style={[styles.waveEffect, 
              {
                transform: [
                  { scale: waveAnimation.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) },
                  { translateY: waveAnimation.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }
                ]
              }
            ]} />
          </Animated.View>
          <Text style={styles.songTitle}>{song.title}</Text>
          <Text style={styles.songArtist}>{song.artist}</Text>
          <Text style={styles.songDuration}>{formatDuration(position)} / {formatDuration(duration)}</Text>
          
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onValueChange={async (value) => {
              setPosition(value);
              if (soundRef.current) {
                await soundRef.current.setPositionAsync(value);
              }
            }}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#1DB954"
          />
          
          {isBuffering && <ActivityIndicator size="large" color="#FF6347" style={styles.loadingIndicator} />}

          <View style={styles.controls}>
            <TouchableOpacity onPress={skipBackward} disabled={disableButtons} style={styles.button}>
              <ChevronLeft color="white" size={45} />
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlayback} disabled={disableButtons} style={styles.button}>
              {isPlaying ? <Pause color="white" size={60} /> : <Play color="white" size={60} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={skipForward} disabled={disableButtons} style={styles.button}>
              <ChevronRight color="white" size={45} />
            </TouchableOpacity>
          </View>

          <View style={styles.extraControls}>
            <TouchableOpacity onPress={toggleRepeat} disabled={disableButtons} style={styles.button}>
              <Repeat color={isRepeat ? 'yellow' : 'white'} size={40} />
            </TouchableOpacity>
            <TouchableOpacity onPress={rewind} disabled={disableButtons} style={styles.button}>
              <Rewind color="white" size={40} />
            </TouchableOpacity>
            <TouchableOpacity onPress={fastForward} disabled={disableButtons} style={styles.button}>
              <FastForward color="white" size={40} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.volumeButton}
            onPress={() => setShowVolumeControl(!showVolumeControl)}
          >
            <Volume color="white" size={35} />
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
                minimumTrackTintColor="#1DB954"
                maximumTrackTintColor="#FFFFFF"
                thumbTintColor="#1DB954"
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#181818' },
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  circleContainer: { width: 250, height: 250, borderRadius: 125, shadowColor: '#000', shadowOpacity: 0.8, shadowOffset: { width: 0, height: 10 }, shadowRadius: 20, position: 'relative' },
  songImage: { width: '100%', height: '100%', borderRadius: 125, borderWidth: 5, borderColor: '#FF6347' },
  waveEffect: { 
    position: 'absolute',
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    borderRadius: 125, 
    borderWidth: 2, 
    borderColor: '#FF6347', 
    opacity: 0.5 
  },
  songTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  songArtist: { color: '#AAAAAA', fontSize: 18 },
  songDuration: { color: '#AAAAAA', fontSize: 16, marginTop: 5 },
  slider: { width: '80%', marginTop: 20 },
  controls: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 20 },
  extraControls: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 20 },
  volumeButton: { marginTop: 20 },
  loadingIndicator: { position: 'absolute', top: '50%', left: '50%', marginLeft: -25, marginTop: -25 },
  volumeControl: { position: 'absolute', bottom: 30, width: '80%', alignItems: 'center' },
  button: { padding: 10, alignItems: 'center' },
});
