import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeAudioListing from "./screens/HomeAudioListing";
import MyLibrary from "./screens/MyLibrary";
import ChartsList from "./screens/ChartsList";
import AlbumsList from "./screens/AlbumsList";
import ArtistsList from "./screens/ArtistsList";
import Playlists from "./screens/Playlists";
import PlaylistsDetails from "./screens/PlaylistsDetails";
import TrendingAlbums from "./screens/TrendingAlbums";
import SuggestionsDetails from "./screens/SuggestionsDetails";
import Songs from "./screens/Songs";
import NewTag from "./screens/NewTag";
import AddPlaylistScreen from "./screens/AddPlaylistScreen";
import ArtistProfile from "./screens/ArtistProfile";
import FeedAudioListing from "./screens/FeedAudioListing";
import AudioListingSearchResults from "./screens/AudioListingSearchResults";
import PlayerScreen from "./screens/PlayerScreen";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeAudioListing"
      screenOptions={{
        headerStyle: { backgroundColor: "#231b2e" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="HomeAudioListing"
        component={HomeAudioListing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyLibrary"
        component={MyLibrary}
        options={{ title: "My Library" }}
      />
      <Stack.Screen
        name="FeedAudioListing"
        component={FeedAudioListing}
        options={{ title: "Feed" }}
      />
      <Stack.Screen
        name="ChartsList"
        component={ChartsList}
        options={{ title: "Charts" }}
      />
      <Stack.Screen
        name="AlbumsList"
        component={AlbumsList}
        options={{ title: "Albums" }}
      />
      <Stack.Screen
        name="ArtistsList"
        component={ArtistsList}
        options={{ title: "Artists" }}
      />
      <Stack.Screen
        name="Playlists"
        component={Playlists}
        options={{ title: "Playlists" }}
      />
      <Stack.Screen
        name="PlaylistsDetails"
        component={PlaylistsDetails}
        options={{ title: "Playlist Details" }}
      />
      <Stack.Screen
        name="TrendingAlbums"
        component={TrendingAlbums}
        options={{ title: "Trending Albums" }}
      />
      <Stack.Screen
        name="SuggestionsDetails"
        component={SuggestionsDetails}
        options={{ title: "Suggestion Details" }}
      />
      <Stack.Screen
        name="Songs"
        component={Songs}
        options={{ title: "Songs" }}
      />
      <Stack.Screen
        name="NewTag"
        component={NewTag}
        options={{ title: "New Tag" }}
      />
      <Stack.Screen
        name="AddPlaylist"
        component={AddPlaylistScreen}
        options={{ title: "Add New Playlist" }}
      />
      <Stack.Screen
        name="ArtistProfile"
        component={ArtistProfile}
        options={{ title: "Artist Profile" }}
      />
      <Stack.Screen
        name="AudioListingSearchResults"
        component={AudioListingSearchResults}
        options={{ title: "Search Results" }}
      />
      <Stack.Screen
        name="PlayerScreen"
        component={PlayerScreen}
        options={{ title: "Player" }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
