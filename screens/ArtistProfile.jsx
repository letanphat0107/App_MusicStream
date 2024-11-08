import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ArtistProfile = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <FontAwesome name="chevron-left" size={24} color="black" />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require('../images/ArtistProfile/Image63.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>Ryan Young</Text>
        <Text style={styles.followers}>65.1K Followers</Text>

        <View style={styles.buttonsRow}>
          <View style={styles.subButtonsRow}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <FontAwesome name="ellipsis-h" size={24} color="black" />
          </View>
          <View style={styles.subButtonsRow}>
            <FontAwesome name="random" size={24} color="black" />
            <TouchableOpacity style={styles.playButton}>
              <FontAwesome name="play" size={26} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Popular Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular</Text>
        {popularTracks.map((track, index) => (
          <View key={index} style={styles.trackRow}>
            <Image source={track.image} style={styles.trackImage} />
            <View style={styles.trackInfo}>
              <Text style={styles.trackName}>{track.name}</Text>
              <Text style={styles.trackArtistName}>{track.artistName}</Text>
              <Text style={styles.trackDetails}><FontAwesome name="play" size={12} color="black" />  {track.plays} • {track.duration}</Text>
            </View>
            <FontAwesome name="ellipsis-h" size={24} color="black" />
          </View>
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
        <Image source={require('../images/ArtistProfile/Image73.png')} style={styles.aboutImage} />
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

const popularTracks = [
  { name: 'Let you free', artistName: 'Ryan Young', plays: '68M', duration: '03:35', image: require('../images/ArtistProfile/Image66.png')},
  { name: 'Blinding Lights', artistName: 'Ryan Young', plays: '93M', duration: '04:39', image: require('../images/ArtistProfile/Image67.png') },
  { name: 'Levitating', artistName: 'Ryan Young', plays: '9M', duration: '07:48', image: require('../images/ArtistProfile/Image68.png') },
  { name: 'Astronaut in the Ocean', artistName: 'Ryan Young', plays: '23M', duration: '3:36', image: require('../images/ArtistProfile/Image69.png') },
  { name: 'Dynamite', artistName: 'Ryan Young', plays: '10M', duration: '06:22', image: require('../images/ArtistProfile/Image70.png') },
];

const albums = [
  { title: 'ME', artist: 'Jessica Gonzalez', image: require('../images/ArtistProfile/Image71.png') },
  { title: 'Magna nost', artist: 'Jessica Gonzalez', image: require('../images/ArtistProfile/Image72.png') },
  { title: 'Proident', artist: 'Jessica Gonzalez', image: require('../images/ArtistProfile/Image77.png') },
];

const fansAlsoLike = [
  { name: 'Magna nost', artist: 'Jessica Gonzalez', image: require('../images/ArtistProfile/Image74.png') },
  { name: 'Exercitatio', artist: 'Brian Harris', image: require('../images/ArtistProfile/Image75.png') },
  { name: 'Tempor Any', artist: 'Tyler Ano', image: require('../images/ArtistProfile/Image76.png') },
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
