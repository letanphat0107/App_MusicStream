import React ,{useState} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FontAwesome } from '@expo/vector-icons';

const feedData = [
    {
        id: '1',
        userName: 'Jessica Gonzalez',
        userImage: require('../images/FeedAudioListing/Avatar4.png'),
        trackTitle: 'FLOWER',
        artist: 'Jessica Gonzalez',
        trackImage: require('../images/FeedAudioListing/Image93.png'),
        playCount: '125',
        duration: '05:15',
        postTime: '3d',
        likes: 20,
        comments: 3,
        shares: 1,
    },
    {
        id: '2',
        userName: 'William King',
        userImage: require('../images/FeedAudioListing/Avatar5.png'),
        trackTitle: 'Me',
        artist: 'William King',
        trackImage: require('../images/FeedAudioListing/Image94.png'),
        playCount: '245',
        duration: '05:15',
        postTime: '5d',
        likes: 45,
        comments: 9,
        shares: 2,
    },
];

const commentsData = [
    {
        id: '1',
        userName: 'Sally Rooney',
        userImage: require('../images/FeedCommentOnAnAudio/Avatar8.png'),
        commentText: 'Do duis cul 😍',
        time: '17h',
        likes: 1,
    },
    {
        id: '2',
        userName: 'Jason',
        userImage: require('../images/FeedCommentOnAnAudio/Avatar9.png'),
        commentText: 'Minim magna exc 😍',
        time: '48m',
        likes: 1,
    },
    {
        id: '3',
        userName: 'Liam Pham',
        userImage: require('../images/FeedCommentOnAnAudio/Avatar11.png'),
        commentText: 'Commodo 🔥',
        time: '48m',
        likes: 1,
    },
];

const FeedScreen = () => {
    const [showComments, setShowComments] = useState(false);

    const renderItem = ({ item }) => (
        <View style={styles.postContainer}>
            {/* User Info */}
            <View style={styles.userInfo}>
                <Image source={item.userImage } style={styles.userImage} />
                <View style={styles.userDetails}>
                    <Text style={styles.userName}>{item.userName} <FontAwesome name="check-circle-o" size={16} color="#14b9d5" /></Text>
                    <Text style={styles.postTime}>Posted a track · {item.postTime}</Text>
                </View>
            </View>

            {/* Track Image */}
            <Image source={item.trackImage } style={styles.trackImage} />

            {/* Track Info */}
            <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{item.trackTitle}</Text>
                <View style={styles.subTrackInfo}>
                    <Text style={styles.artistName}>{item.artist}</Text>
                    <View style={styles.trackStats}>
                        <Icon name="play-outline" size={14} color="#fff" />
                        <Text style={styles.playCount}>{item.playCount}</Text>
                        <Text style={styles.duration}>·  {item.duration}</Text>
                    </View>
                </View>
            </View>

            {/* Post Actions */}
            <View style={styles.postActions}>
                <View style={styles.subPostActions}>
                    <View style={styles.action}>
                        <MaterialIcons name="favorite-border" size={20} color="#aaa" />
                        <Text style={styles.actionCount}>{item.likes}</Text>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.action} onPress={() => setShowComments(true)}>
                            <MaterialIcons name="chat-bubble-outline" size={20} color="#aaa" />
                            <Text style={styles.actionCount}>{item.comments}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.action}>
                        <MaterialIcons name="share" size={20} color="#aaa" />
                        <Text style={styles.actionCount}>{item.shares}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                    <Icon name="ellipsis-horizontal" size={20} color="#aaa" />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderComment = ({ item }) => (
        <View style={styles.commentContainer}>
            <Image source={item.userImage } style={styles.commentUserImage} />
            <View style={styles.commentContent}>
                <View style={styles.subCommentContent}>
                    <Text style={styles.commentUserName}>{item.userName}</Text>
                    <Text style={styles.commentText}>{item.commentText}</Text>
                </View>
                <View style={styles.commentDetails}>
                    <Text style={styles.commentTime}>{item.time}</Text>
                    <Text style={styles.commentLikes}>{item.likes} like</Text>
                    <TouchableOpacity>
                        <Text style={styles.replyText}>Reply</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.likeButton}>
                <MaterialIcons name="thumb-up-off-alt" size={18} color="#aaa" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Feed</Text>
                <TouchableOpacity>
                    <Icon name="wifi-outline" size={24} color="#555" />
                </TouchableOpacity>
            </View>
            {showComments ? (
                <View style={styles.commentsSection}>
                    <View style={styles.header}>
                        <Text style={styles.commentsTitle}>3 comments</Text>
                        <TouchableOpacity onPress={() => setShowComments(false)} style={styles.backButton}>
                            <Icon name="arrow-back" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                    
                    <FlatList
                        data={commentsData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderComment}
                        contentContainerStyle={styles.commentsList}
                    />

                    <View style={styles.inputContainer}>
                        <Image source={require('../images/FeedCommentOnAnAudio/Avatar13.png')} style={styles.userAvatar} />
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Write a comment..."
                            placeholderTextColor="#aaa"
                        />
                        <TouchableOpacity style={styles.sendButton}>
                            <Icon name="send" size={20} color="#555" />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={feedData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            )}
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 18,
        marginTop: 30
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    postContainer: {
        marginBottom: 24,
        marginTop: 20,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    userDetails: {
        flex: 1,
        marginLeft: 8,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postTime: {
        fontSize: 12,
        color: '#555',
        marginTop: 5
    },
    moreButton: {
        padding: 8,
    },
    trackImage: {
        width: '100%',
        height: 350,
        borderRadius: 8,
    },
    trackInfo: {
        position: 'absolute',
        bottom: 53,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: 20,
        width: '100%',
        borderRadius: 8,
    },
    subTrackInfo:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    trackTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    artistName: {
        fontSize: 16,
        color: '#fff',
    },
    trackStats: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    playCount: {
        color: '#fff',
        marginLeft: 4,
    },
    duration: {
        color: '#fff',
        marginLeft: 8,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    subPostActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 22
    },
    actionCount: {
        marginLeft: 6,
        color: '#555',
    },
    commentsSection: {
        flex: 1,
        padding: 16,
    },
    backButton: {
        marginBottom: 8,
    },
    commentsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    commentsList: {
        paddingBottom: 20,
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 40,
    },
    commentUserImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    commentContent: {
        flex: 1,
        marginLeft: 10,
    },
    subCommentContent:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    commentUserName: {
        fontWeight: 'bold',
        color: '#333',
    },
    commentText: {
        color: '#333',
        marginTop: 2,
        marginLeft: 8
    },
    commentDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    commentTime: {
        fontSize: 12,
        color: '#555',
        marginRight: 10,
    },
    commentLikes: {
        fontSize: 12,
        color: '#555',
        marginRight: 10,
    },
    replyText: {
        fontSize: 12,
        color: '#007bff',
    },
    likeButton: {
        padding: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 25,
        marginTop: 12,
    },
    userAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 8,
    },
    commentInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    sendButton: {
        paddingHorizontal: 10,
    },
});

export default FeedScreen;
