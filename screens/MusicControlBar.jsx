import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react-native";

const MusicControlBar = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}) => {
  return (
    <View style={styles.controlBar}>
      {/* Previous Button */}
      <TouchableOpacity style={styles.button} onPress={onPrevious}>
        <SkipBack style={styles.icon} />
      </TouchableOpacity>

      {/* Play/Pause Button */}
      <TouchableOpacity style={styles.button} onPress={onPlayPause}>
        {isPlaying ? (
          <Pause style={styles.icon} />
        ) : (
          <Play style={styles.icon} />
        )}
      </TouchableOpacity>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={onNext}>
        <SkipForward style={styles.icon} />
      </TouchableOpacity>

      {/* Song Information */}
      <View style={styles.songInfo}>
        {currentSong ? (
          <>
            <Text style={styles.songTitle}>{currentSong.title}</Text>
            <Text style={styles.songArtist}>{currentSong.artist}</Text>
          </>
        ) : (
          <Text style={styles.songTitle}>No song playing</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controlBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#ddd",
    zIndex: 100,
  },
  button: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#007bff",
    marginHorizontal: 5,
  },
  icon: {
    color: "#fff",
    fontSize: 24,
  },
  songInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  songTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  songArtist: {
    fontSize: 14,
    color: "#555",
  },
});

export default MusicControlBar;
