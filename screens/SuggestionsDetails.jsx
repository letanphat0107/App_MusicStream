import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Heart, Share, Bookmark } from 'lucide-react-native';

export default function SuggestionsDetails({ route }) {
  const { item } = route.params;

  const handleLike = () => {
    Alert.alert('Liked', `You liked ${item.title}`);
  };

  const handleShare = () => {
    Alert.alert('Shared', `You shared ${item.title}`);
  };

  const handleBookmark = () => {
    Alert.alert('Saved', `${item.title} has been bookmarked`);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>A curated suggestion just for you!</Text>
        <Text style={styles.description}>
          Discover more about {item.title}. This suggestion is handpicked to bring you an exciting experience. Explore and enjoy the beauty and uniqueness of this item!
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Heart style={styles.actionIcon} />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Share style={styles.actionIcon} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleBookmark}>
          <Bookmark style={styles.actionIcon} />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginVertical: 20,
  },
  infoContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 4,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#34495e',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    color: '#3498db',
    fontSize: 24,
  },
  actionText: {
    fontSize: 14,
    color: '#3498db',
    marginTop: 4,
  },
});
