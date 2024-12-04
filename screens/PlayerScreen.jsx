import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Animated, ImageBackground, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Play, Pause, Volume, ArrowBigRight, ArrowBigLeft } from 'lucide-react-native';

export default function PlayerScreen({ route }) {
  const { song, playlist } = route.params; 

  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(playlist.findIndex(s => s.id === song.id)); // Track the current song index
  const [volume, setVolume] = useState(1); 
  const soundRef = useRef();
  const rotation = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const zoomAnim = useRef(new Animated.Value(1)).current; 
  const buttonShakeAnim = useRef(new Animated.Value(0)).current; 
  const backgroundFadeAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    loadSound();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(zoomAnim, {
      toValue: 1.1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();

    Animated.timing(backgroundFadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [currentSongIndex]); 

  const loadSound = async () => {
    try {
      const { sound, status } = await Audio.Sound.createAsync(
        playlist[currentSongIndex].audio,
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
  };

  const togglePlayback = async () => {
    if (soundRef.current) {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        await soundRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(prevIndex);
  };

  const triggerButtonShake = () => {
    Animated.sequence([
      Animated.timing(buttonShakeAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonShakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonShakeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const formatDuration = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={playlist[currentSongIndex].image} style={styles.backgroundImage} blurRadius={10}>
        <Animated.View style={[styles.overlay, { opacity: backgroundFadeAnim }]}>
          <Animated.View style={[styles.circleContainer, { transform: [{ scale: zoomAnim }] }]}>
            <Animated.Image
              source={playlist[currentSongIndex].image}
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
          <Animated.Text style={[styles.songTitle, { opacity: fadeAnim }]}>{playlist[currentSongIndex].title}</Animated.Text>
          <Animated.Text style={[styles.songArtist, { opacity: fadeAnim }]}>{playlist[currentSongIndex].artist}</Animated.Text>
          <Text style={styles.songDuration}>
            {formatDuration(position)} / {formatDuration(duration)}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onSlidingComplete={(value) => soundRef.current.setPositionAsync(value)}
            minimumTrackTintColor="#FF6347"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#FF6347"
          />
          {isBuffering && <ActivityIndicator size="large" color="#FF6347" style={styles.loadingIndicator} />}
          
          <View style={styles.controls}>
            <TouchableOpacity onPress={handlePrevious}>
              <Animated.View style={{ transform: [{ translateX: buttonShakeAnim }] }}>
                <ArrowBigLeft color="white" size={40} />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlayback}>
              <Animated.View style={{ transform: [{ translateX: buttonShakeAnim }] }}>
                {isPlaying ? <Pause color="white" size={60} /> : <Play color="white" size={60} />}
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext}>
              <Animated.View style={{ transform: [{ translateX: buttonShakeAnim }] }}>
                <ArrowBigRight color="white" size={40} />
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* Volume Control */}
          <View style={styles.volumeControl}>
            <Volume color="white" size={30} />
            <Slider
              style={styles.volumeSlider}
              minimumValue={0}
              maximumValue={1}
              value={volume}
              onValueChange={(value) => {
                setVolume(value);
                if (soundRef.current) {
                  soundRef.current.setVolumeAsync(value);
                }
              }}
              minimumTrackTintColor="#FF6347"
              maximumTrackTintColor="#FFFFFF"
              thumbTintColor="#FF6347"
            />
          </View>
        </Animated.View>
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
  },
  songTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  songArtist: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  songDuration: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  slider: {
    width: '90%',
    height: 40,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  volumeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  volumeSlider: {
    width: 150,
    height: 40,
    marginLeft: 10,
  },
  loadingIndicator: {
    position: 'absolute',
  },
});
