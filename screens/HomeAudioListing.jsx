import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import { BellRing, House, Library, Newspaper, Search } from "lucide-react-native";
import { useNavigation } from '@react-navigation/native';

export default function HomeAudioListing() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [language, setLanguage] = useState('English');

  const data = [
    { key: "1", image: require("../images/HomeAudioListing/Container26.png") },
    { key: "2", image: require("../images/HomeAudioListing/Container27.png") },
    { key: "3", image: require("../images/HomeAudioListing/Container31.png") },
  ];

  const data2 = [
    { key: "4", image: require("../images/HomeAudioListing/Container31.png"), title: "Daily chart-toppers\nupdate" },
    { key: "5", image: require("../images/HomeAudioListing/Container32.png"), title: "Daily chart-toppers\nupdate" },
    { key: "6", image: require("../images/HomeAudioListing/Container33.png"), title: "Daily chart-toppers\nupdate" },
  ];

  const data3 = [
    { key: "7", image: require("../images/HomeAudioListing/Image45.png"), title: "ME\nJessica Gonzalez" },
    { key: "8", image: require("../images/HomeAudioListing/Image46.png"), title: "Magna nost\nBrian Thomas" },
    { key: "9", image: require("../images/HomeAudioListing/Image47.png"), title: "Magna nost\nChristopher Nolan" },
  ];

  const data4 = [
    { key: "10", image: require("../images/HomeAudioListing/Image39.png"), title: "Jennifer Wilson" },
    { key: "11", image: require("../images/HomeAudioListing/Image40.png"), title: "Elizabeth Hall" },
    { key: "12", image: require("../images/HomeAudioListing/Image41.png"), title: "Anthony Bourdain" },
    { key: "13", image: require("../images/ArtistProfile/Image63.png"), title: "Ryan Young" },
  ];

  const handleSuggestionPress = (item) => {
    navigation.navigate('SuggestionsDetails', { item });
  };

  const handleSeeAllCharts = () => {
    navigation.navigate('ChartsList', { data: data2 });
  };

  const handleSeeAllAlbums = () => {
    navigation.navigate('AlbumsList', { data: data3 });
  };

  const handleSeeAllArtists = () => {
    navigation.navigate('ArtistsList', { data: data4 });
  };

  const handlePressItem = (item) => {
    navigation.navigate('PlaylistsDetails', { item });
  };

  const handlePressItem1 = (item) => {
    navigation.navigate('TrendingAlbums', { item });
  };

  const handleToggleFavorite = (itemKey) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.has(itemKey) ? newFavorites.delete(itemKey) : newFavorites.add(itemKey);
      return newFavorites;
    });
  };

  const handleLanguageChange = () => {
    setLanguage(prevLang => prevLang === 'English' ? 'Vietnamese' : 'English');
  };

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSuggestionPress(item)} style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSuggestionPress(item)} style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItem2 = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressItem(item)} style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage2} />
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItem3 = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressItem1(item)} style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage3} />
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItem4 = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ArtistProfile', { artist: item })} style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage3} />
      <Text style={styles.itemTitle1}>{item.title}</Text>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <Image source={require('../images/HomeAudioListing/Image36.png')} style={styles.styleHinhAnh} />
        <TouchableOpacity onPress={handleLanguageChange}>
          <Text style={styles.languageButton}>{language}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <BellRing style={styles.icon1} />
        </TouchableOpacity>
      </View>

      <View style={styles.khoangCach}>
        <Text style={styles.mauNhat}>{language === 'English' ? 'Good morning,' : 'Chào buổi sáng,'}</Text>
        <Text style={styles.inDam}>Ashley Scott</Text>
      </View>

      <View style={styles.txtFeildContainer}>
        <Search style={styles.searchIcon} />
        <TextInput
          style={styles.txtFeild}
          placeholder={language === 'English' ? "What you want to listen to" : "Bạn muốn nghe gì"}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.khoangCach1}>
          <Text style={styles.inDam1}>{language === 'English' ? 'Suggestions for you' : 'Gợi ý cho bạn'}</Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderSuggestionItem}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.khoangCachData}
        />

        <View style={styles.khoangCach4}>
          <Text style={styles.inDam}>{language === 'English' ? 'Charts' : 'Bảng xếp hạng'}</Text>
          <TouchableOpacity onPress={handleSeeAllCharts}>
            <Text style={styles.buttonSee}>{language === 'English' ? 'See all' : 'Xem tất cả'}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data2}
          renderItem={renderItem2}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.khoangCachData}
        />

        <View style={styles.khoangCach4}>
          <Text style={styles.inDam}>{language === 'English' ? 'Trending albums' : 'Album thịnh hành'}</Text>
          <TouchableOpacity onPress={handleSeeAllAlbums}>
            <Text style={styles.buttonSee}>{language === 'English' ? 'See all' : 'Xem tất cả'}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data3}
          renderItem={renderItem3}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.khoangCachData}
        />

        <View style={styles.khoangCach4}>
          <Text style={styles.inDam}>{language === 'English' ? 'Popular artists' : 'Nghệ sĩ phổ biến'}</Text>
          <TouchableOpacity onPress={handleSeeAllArtists}>
            <Text style={styles.buttonSee}>{language === 'English' ? 'See all' : 'Xem tất cả'}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data4}
          renderItem={renderItem4}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.khoangCachData}
        />
      </ScrollView>

      <View style={styles.khoangCach5}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={()=>navigation.navigate('HomeAudioListing')}>
            <House style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.iconTitle}>{language === 'English' ? 'Home' : 'Trang chủ'}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={()=>navigation.navigate('AudioListingSearchResults')}>
            <Search style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.iconTitle}>{language === 'English' ? 'Search' : 'Tìm kiếm'}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={()=> navigation.navigate('FeedAudioListing')}>
            <Newspaper style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.iconTitle}>{language === 'English' ? 'Feed' : 'Tin tức'}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('MyLibrary')}>
            <Library style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.iconTitle}>{language === 'English' ? 'Library' : 'Thư viện'}</Text>
        </View>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    top: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  styleHinhAnh: {
    width: 30,
    height: 30,
  },
  inDam: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  inDam1: {
    left: 10,
    fontWeight: 'bold',
    fontSize: 25,
  },
  mauNhat: {
    color: 'gray',
    fontSize: 15,
  },
  khoangCach: {
    marginTop: 70,
    paddingHorizontal: 10,
  },
  txtFeildContainer: {
    position: 'relative',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  txtFeild: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 40,
    borderRadius: 25,
  },
  searchIcon: {
    position: 'absolute',
    left: 20,
    top: 10,
    color: 'gray',
  },
  scrollView: {
    marginTop: 20,
  },
  itemContainer: {
    marginRight: 10,
  },
  itemImage: {
    width: 175,
    height: 225,
  },
  itemImage2: {
    width: 150,
    height: 150,
  },
  itemImage3: {
    width: 150,
    height: 150,
  },
  khoangCachData: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  khoangCach4: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 1,
  },
  buttonSee: {
    color: '#ff1b6b',
  },
  followButton: {
    backgroundColor: '#ff1b6b',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 5,
  },
  followButtonText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  itemTitle: {
    marginTop: 5,
    fontSize: 14,
    color: 'black',
  },
  itemTitle1: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  khoangCach5: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#231b2e",
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    color: 'white',
    fontSize: 30,
  },
  icon1: {
    left: 140,
    color: 'black',
    fontSize: 30,
  },
  iconTitle: {
    fontSize: 12,
    color: 'white',
  },
});
