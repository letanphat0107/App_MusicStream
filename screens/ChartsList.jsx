import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, RefreshControl } from 'react-native';

const ChartsList = ({ route }) => {
  const { data, favorites = new Set(), toggleFavorite } = route.params;
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('alphabetical');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handleSortChange = (option) => setSortOption(option);

  // Tìm kiếm và sắp xếp danh sách
  const filteredData = data
    .filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'alphabetical') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'favorites') {
        return favorites.has(b.key) - favorites.has(a.key);
      }
      return 0;
    });

  // Pagination logic
  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleSelectItem = (key) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(key)) {
      newSelectedItems.delete(key);
    } else {
      newSelectedItems.add(key);
    }
    setSelectedItems(newSelectedItems);
  };

  const clearSearch = () => setSearchText('');

  const loadMoreItems = () => {
    if (filteredData.length > page * itemsPerPage) {
      setPage(page + 1);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleSelectItem(item.key)}>
      <View style={[styles.itemContainer, selectedItems.has(item.key) && styles.selectedItem]}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          {item.description && (
            <Text style={styles.itemDescription}>
              {item.description}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item.key)} style={styles.favoriteButton}>
          <Text style={styles.favoriteButtonText}>
            {favorites.has(item.key) ? 'Unfavorite' : 'Favorite'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Charts</Text>
      
      {/* Input tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search charts..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Nút sắp xếp */}
      <View style={styles.sortContainer}>
        <TouchableOpacity onPress={() => handleSortChange('alphabetical')} style={styles.sortButton}>
          <Text style={sortOption === 'alphabetical' ? styles.sortButtonActiveText : styles.sortButtonText}>Alphabetical</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSortChange('favorites')} style={styles.sortButton}>
          <Text style={sortOption === 'favorites' ? styles.sortButtonActiveText : styles.sortButtonText}>Favorites</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách */}
      {filteredData.length > 0 ? (
        <FlatList
          data={paginatedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0.5}
        />
      ) : (
        <Text style={styles.noDataText}>No charts found. Please try another search.</Text>
      )}

      {/* Clear selection button */}
      {selectedItems.size > 0 && (
        <TouchableOpacity onPress={() => setSelectedItems(new Set())} style={styles.clearSelectionButton}>
          <Text style={styles.clearSelectionText}>Clear Selection</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
  },
  clearButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#ff1b6b',
    borderRadius: 20,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  sortButton: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff1b6b',
  },
  sortButtonText: {
    color: '#ff1b6b',
  },
  sortButtonActiveText: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#ff1b6b',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    elevation: 1,
  },
  selectedItem: {
    backgroundColor: '#d1e7ff',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDescription: {
    color: 'gray',
    marginVertical: 5,
  },
  favoriteButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#ff1b6b',
    borderRadius: 20,
  },
  favoriteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noDataText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
    marginTop: 20,
  },
  clearSelectionButton: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#ff1b6b',
    borderRadius: 20,
    alignSelf: 'center',
  },
  clearSelectionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChartsList;
