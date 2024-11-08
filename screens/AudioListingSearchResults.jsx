import React , {useState} from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';

const searchResults = [
    { id: '1', title: 'Mer Watson', type: 'artist', followers: '1.234K Followers', image: require('../images/AudioListingSearchResults/Image85.png') },
    { id: '2', title: 'Me', artist: 'Jessica Gonzalez', plays: '2.1M', duration: '3:36', image: require('../images/AudioListingSearchResults/Image83.png') },
    { id: '3', title: 'Me Inc', artist: 'Anthony Taylor', plays: '68M', duration: '3:35', image: require('../images/AudioListingSearchResults/Image84.png') },
    { id: '4', title: 'Dozz me', artist: 'Brian Bailey', plays: '93M', duration: '4:39', image: require('../images/AudioListingSearchResults/Image86.png') },
    { id: '5', title: 'Eastss me', artist: 'Anthony Taylor', plays: '9M', duration: '7:48', image: require('../images/AudioListingSearchResults/Image87.png') },
    { id: '6', title: 'Me Ali', artist: 'Pedro Moreno', plays: '23M', duration: '3:36', image: require('../images/AudioListingSearchResults/Image88.png') },
    { id: '7', title: 'Me quis a', artist: 'Elena Jimenez', plays: '10M', duration: '6:22', image: require('../images/AudioListingSearchResults/Image89.png') },
    { id: '8', title: 'Me light', artist: 'John Smith', plays: '81M', duration: '5:15', image: require('../images/AudioListingSearchResults/Image90.png') },
];

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedTab, setSelectedTab] = useState('All');

    const renderItem = ({ item }) => {
        if (item.type === 'artist') {
            return (
                <View style={styles.artistItem}>
                    <Image source={item.image } style={styles.artistImage} />
                    <View style={styles.artistInfo}>
                        <Text style={styles.artistName}>{item.title}</Text>
                        <Text style={styles.artistFollowers}><FontAwesome name="user-o" size={12} color="black" /> {item.followers}</Text>
                    </View>
                    <TouchableOpacity style={styles.followButton}>
                        <Text style={styles.followText}>Follow</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.resultItem}>
                    <Image source={ item.image }style={styles.resultImage} />
                    <View style={styles.resultInfo}>
                        <Text style={styles.resultTitle}>{item.title}</Text>
                        <Text style={styles.resultDetails}>{item.artist} </Text>
                        <Text style={styles.resultDetails}><FontAwesome name="play" size={12} color="black" />  {item.plays} · {item.duration}</Text>
                    </View>
                    <TouchableOpacity style={styles.moreButton}>
                        <Icon name="ellipsis-horizontal" size={20} color="#aaa" />
                    </TouchableOpacity>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Icon name="search" size={20} color="#aaa" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                {searchText ? (
                    <TouchableOpacity onPress={() => setSearchText('')}>
                        <Icon name="close" size={20} color="#aaa" />
                    </TouchableOpacity>
                ) : null}
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                {['All', 'Tracks', 'Albums', 'Artists'].map((tab) => (
                    <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
                        <Text style={[styles.tab, selectedTab === tab && styles.activeTab]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Results */}
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 18, // Optional padding
        paddingTop: 16,        // Optional padding for top spacing
        marginTop: 30
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 8,
        marginVertical: 16,
    },
    searchInput: {
        flex: 1,
        marginHorizontal: 8,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginTop: 16
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 22,
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
    },
    activeTab: {
        color: '#14b9d5',
        fontWeight: 'bold',
        borderBottomWidth: 5,
        borderBottomColor: '#14b9d5'
    },
    artistItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    artistImage: {
        width: 60,
        height: 60,
        borderRadius: 25,
        marginRight: 12,
    },
    artistInfo: {
        flex: 1,
    },
    artistName: {
        fontSize: 16,
        fontWeight: '500',
    },
    artistFollowers: {
        color: '#555',
        marginTop: 5
    },
    followButton: {
        backgroundColor: 'white', paddingVertical: 6, paddingHorizontal: 18, borderRadius: 30, marginRight: 20 , borderWidth: 1, borderColor: '#7f8286'
    },
    followText: {
        color: '#7f8286' , fontSize: 14
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    resultImage: {
        width: 60,
        height: 60,
        borderRadius: 6,
        marginRight: 12,
    },
    resultInfo: {
        flex: 1,
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    resultDetails: {
        color: '#555',
        marginTop: 5,
    },
    moreButton: {
        padding: 8,
    },
});

export default SearchScreen;
