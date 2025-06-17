import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Modal,
  Platform,
  Alert,
  Share
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/useTheme';
import { useShoppingList } from '../context/ShoppingListContext';
import BottomNavigationBar from './BottomNavigationBar';

const EnhancedListsScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const {
    shoppingLists,
    favorites,
    recentItems,
    createList,
    deleteList,
    updateListName,
    addItemToList,
    removeItemFromList,
    toggleItemPurchased,
    updateItem,
    getBestShopsForList,
    shareList,
    duplicateList,
    addToFavorites,
    removeFromFavorites,
    getListStats
  } = useShoppingList();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListCategory, setNewListCategory] = useState('General');
  const [selectedList, setSelectedList] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [showShopMatches, setShowShopMatches] = useState(false);
  const [shopMatches, setShopMatches] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showStats, setShowStats] = useState(false);

  const categories = ['General', 'Grocery', 'Daily', 'Religious', 'Electronics', 'Clothing', 'Medicine'];

  const createNewList = () => {
    if (newListName.trim()) {
      createList(newListName, newListCategory);
      setNewListName('');
      setNewListCategory('General');
      setShowCreateModal(false);
    }
  };

  const handleAddItem = () => {
    if (newItemName.trim() && selectedList) {
      const price = parseFloat(newItemPrice) || 0;
      addItemToList(selectedList.id, newItemName, newItemQuantity || '1', price);
      setNewItemName('');
      setNewItemQuantity('');
      setNewItemPrice('');
    }
  };

  const handleDeleteList = (listId) => {
    Alert.alert(
      'Delete List',
      'Are you sure you want to delete this shopping list?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteList(listId) }
      ]
    );
  };

  const handleShareList = async (list) => {
    try {
      const listText = `${list.name}\n\n${list.items.map(item => 
        `${item.purchased ? '✅' : '⬜'} ${item.name} (${item.quantity})`
      ).join('\n')}\n\nShared via Local Market App`;
      
      await Share.share({
        message: listText,
        title: `Shopping List: ${list.name}`
      });
    } catch (error) {
      console.error('Error sharing list:', error);
    }
  };

  const findBestShops = (list) => {
    const matches = getBestShopsForList(list.id);
    setShopMatches(matches);
    setShowShopMatches(true);
  };

  const navigateToShopComparison = () => {
    if (selectedList && shopMatches.length > 0) {
      navigation.navigate('ShopComparison', {
        shoppingList: selectedList,
        shopMatches: shopMatches
      });
    }
  };

  const renderQuickAddSuggestions = () => {
    return (
      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>Recent Items:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentItems.slice(0, 8).map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionChip}
              onPress={() => setNewItemName(item)}
            >
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderListCard = (list) => {
    const progress = list.totalItems > 0 ? (list.purchasedItems / list.totalItems) * 100 : 0;
    const isFavorite = favorites.includes(list.id);
    
    return (
      <TouchableOpacity 
        key={list.id} 
        style={[styles.listCard, isFavorite && styles.favoriteCard]}
        onPress={() => setSelectedList(list)}
      >
        <View style={styles.listHeader}>
          <View style={styles.listTitleRow}>
            <Text style={styles.listName}>{list.name}</Text>
            <TouchableOpacity
              onPress={() => isFavorite ? removeFromFavorites(list.id) : addToFavorites(list.id)}
            >
              <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listMetaRow}>
            <Text style={styles.listCategory}>{list.category}</Text>
            <Text style={styles.listDate}>{list.createdAt}</Text>
          </View>
        </View>
        
        <View style={styles.listStats}>
          <Text style={styles.itemCount}>
            {list.purchasedItems}/{list.totalItems} items completed
          </Text>
          <Text style={styles.estimatedTotal}>
            Estimated: ₹{list.estimatedTotal}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        {list.shared && (
          <View style={styles.sharedIndicator}>
            <Text style={styles.sharedText}>👥 Shared with {list.sharedWith.length} people</Text>
          </View>
        )}

        <View style={styles.listActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => findBestShops(list)}
          >
            <Text style={styles.actionButtonText}>🔍 Find Shops</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => setSelectedList(list)}
          >
            <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>📝 Edit</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderListDetail = () => {
    if (!selectedList) return null;

    const currentList = shoppingLists.find(l => l.id === selectedList.id) || selectedList;

    return (
      <Modal visible={!!selectedList} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedList(null)}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{currentList.name}</Text>
            <TouchableOpacity onPress={() => handleShareList(currentList)}>
              <Text style={styles.shareButton}>📤</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.addItemContainer}>
            <View style={styles.addItemRow}>
              <TextInput
                style={[styles.addItemInput, { flex: 2 }]}
                placeholder="Item name..."
                value={newItemName}
                onChangeText={setNewItemName}
              />
              <TextInput
                style={[styles.addItemInput, { flex: 1, marginLeft: 8 }]}
                placeholder="Qty"
                value={newItemQuantity}
                onChangeText={setNewItemQuantity}
              />
              <TextInput
                style={[styles.addItemInput, { flex: 1, marginLeft: 8 }]}
                placeholder="₹ Price"
                value={newItemPrice}
                onChangeText={setNewItemPrice}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddItem}
            >
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>

          {renderQuickAddSuggestions()}

          <ScrollView style={styles.itemsList}>
            {currentList.items.map(item => (
              <View key={item.id} style={[styles.itemRow, item.purchased && styles.purchasedItem]}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => toggleItemPurchased(currentList.id, item.id)}
                >
                  <Text style={styles.checkBox}>
                    {item.purchased ? '✅' : '⬜'}
                  </Text>
                </TouchableOpacity>
                
                <View style={styles.itemDetails}>
                  <Text style={[styles.itemName, item.purchased && styles.purchasedItemText]}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemMeta}>
                    {item.quantity} • ₹{item.price || 0}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeItemFromList(currentList.id, item.id)}
                >
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.listSummary}>
            <Text style={styles.summaryText}>
              Total Items: {currentList.totalItems} | Completed: {currentList.purchasedItems} | 
              Estimated Total: ₹{currentList.estimatedTotal}
            </Text>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={styles.modalActionButton}
              onPress={() => findBestShops(currentList)}
            >
              <Text style={styles.modalActionText}>🔍 Find Best Shops</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalActionButton}
              onPress={() => duplicateList(currentList.id)}
            >
              <Text style={styles.modalActionText}>📋 Duplicate</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalActionButton, styles.deleteActionButton]}
              onPress={() => {
                setSelectedList(null);
                handleDeleteList(currentList.id);
              }}
            >
              <Text style={[styles.modalActionText, styles.deleteActionText]}>🗑️ Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderShopMatchesModal = () => {
    return (
      <Modal visible={showShopMatches} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.shopMatchModal}>
            <View style={styles.shopMatchHeader}>
              <Text style={styles.shopMatchTitle}>Best Shop Matches</Text>
              <TouchableOpacity onPress={() => setShowShopMatches(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.shopMatchList}>
              {shopMatches.map((match, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.shopMatchItem}
                  onPress={() => {
                    setShowShopMatches(false);
                    navigation.navigate('ShopDetailScreen', { shop: match.shop });
                  }}
                >
                  <View style={styles.shopMatchInfo}>
                    <Text style={styles.shopMatchName}>{match.shop.name}</Text>
                    <Text style={styles.shopMatchLocation}>{match.shop.location.address}</Text>
                    <Text style={styles.shopMatchDistance}>{match.shop.location.distance} km away</Text>
                  </View>
                  
                  <View style={styles.shopMatchStats}>
                    <Text style={styles.shopMatchPercentage}>{match.matchPercentage}%</Text>
                    <Text style={styles.shopMatchItems}>
                      {match.matchingProducts}/{match.totalItems} items
                    </Text>
                    <Text style={styles.shopMatchTotal}>₹{match.estimatedTotal}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity 
              style={styles.compareButton}
              onPress={navigateToShopComparison}
            >
              <Text style={styles.compareButtonText}>Compare All Shops</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderStatsModal = () => {
    const stats = getListStats();
    
    return (
      <Modal visible={showStats} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.statsModal}>
            <View style={styles.statsHeader}>
              <Text style={styles.statsTitle}>Shopping Statistics</Text>
              <TouchableOpacity onPress={() => setShowStats(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{stats.totalLists}</Text>
                <Text style={styles.statLabel}>Total Lists</Text>
              </View>
              
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{stats.totalItems}</Text>
                <Text style={styles.statLabel}>Total Items</Text>
              </View>
              
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{stats.completionRate}%</Text>
                <Text style={styles.statLabel}>Completion Rate</Text>
              </View>
              
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>₹{stats.totalEstimatedValue}</Text>
                <Text style={styles.statLabel}>Estimated Value</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Smart Shopping Lists</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setShowStats(true)}
          >
            <Text style={styles.headerButtonText}>📊</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => setShowCreateModal(true)}
          >
            <Text style={styles.createButtonText}>+ New List</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lists */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {favorites.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>❤️ Favorite Lists</Text>
            {shoppingLists.filter(list => favorites.includes(list.id)).map(renderListCard)}
          </>
        )}

        <Text style={styles.sectionTitle}>📝 All Lists ({shoppingLists.length})</Text>
        {shoppingLists.map(renderListCard)}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🧠 How Smart Lists Work:</Text>
          <Text style={styles.infoText}>
            • Create lists like "Monthly Grocery", "Puja Items", etc.{'\n'}
            • Add items with quantities and estimated prices{'\n'}
            • App finds shops with maximum matching products{'\n'}
            • Compare prices and distances across shops{'\n'}
            • Share lists with family and friends{'\n'}
            • Track purchased vs pending items
          </Text>
        </View>
      </ScrollView>

      {/* Create List Modal */}
      <Modal visible={showCreateModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.createModal}>
            <Text style={styles.createModalTitle}>Create New List</Text>
            
            <TextInput
              style={styles.createInput}
              placeholder="Enter list name (e.g., Monthly Grocery)"
              value={newListName}
              onChangeText={setNewListName}
              autoFocus
            />

            <Text style={styles.categoryLabel}>Category:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categorySelector}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    newListCategory === category && styles.selectedCategoryChip
                  ]}
                  onPress={() => setNewListCategory(category)}
                >
                  <Text style={[
                    styles.categoryChipText,
                    newListCategory === category && styles.selectedCategoryChipText
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.createModalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowCreateModal(false);
                  setNewListName('');
                  setNewListCategory('General');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={createNewList}
              >
                <Text style={styles.confirmButtonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {renderListDetail()}
      {renderShopMatchesModal()}
      {renderStatsModal()}

      <BottomNavigationBar navigation={navigation} activeTab="Lists" />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: theme.colors.text.inverse,
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
  },
  headerButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  createButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 90 : 65,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginTop: 20,
    marginBottom: 16,
  },
  listCard: {
    backgroundColor: theme.components.card.backgroundColor,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
    elevation: 2,
    shadowColor: theme.components.card.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  favoriteCard: {
    borderColor: theme.colors.secondary,
    borderWidth: 2,
  },
  listHeader: {
    marginBottom: 12,
  },
  listTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  listName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    flex: 1,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  listMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listCategory: {
    fontSize: 12,
    color: theme.colors.primary,
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  listDate: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  listStats: {
    marginBottom: 12,
  },
  itemCount: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  estimatedTotal: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontWeight: '600',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.surface,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },
  sharedIndicator: {
    backgroundColor: theme.colors.secondary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  sharedText: {
    fontSize: 12,
    color: theme.colors.secondary,
  },
  listActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  actionButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: theme.colors.primary,
  },
  infoSection: {
    backgroundColor: theme.colors.primary + '10',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createModal: {
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  createModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  createInput: {
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
    color: theme.colors.text.primary,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  categorySelector: {
    marginBottom: 20,
  },
  categoryChip: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
  },
  selectedCategoryChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryChipText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  selectedCategoryChipText: {
    color: theme.colors.text.inverse,
  },
  createModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: theme.colors.surface,
  },
  confirmButton: {
    backgroundColor: theme.colors.primary,
  },
  cancelButtonText: {
    color: theme.colors.text.secondary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  confirmButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  modalHeader: {
    backgroundColor: theme.colors.primary,
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    marginRight: 16,
  },
  modalTitle: {
    color: theme.colors.text.inverse,
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  shareButton: {
    color: theme.colors.text.inverse,
    fontSize: 18,
  },
  addItemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.components.card.borderColor,
  },
  addItemRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  addItemInput: {
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
  },
  suggestionsContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.components.card.borderColor,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  suggestionChip: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
  },
  suggestionText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  itemsList: {
    flex: 1,
    padding: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  purchasedItem: {
    opacity: 0.6,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkBox: {
    fontSize: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  purchasedItemText: {
    textDecorationLine: 'line-through',
    color: theme.colors.text.secondary,
  },
  itemMeta: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 16,
  },
  listSummary: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.components.card.borderColor,
    backgroundColor: theme.colors.surface,
  },
  summaryText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.components.card.borderColor,
    backgroundColor: theme.colors.background,
  },
  modalActionButton: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  modalActionText: {
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  deleteActionButton: {
    backgroundColor: '#ffebee',
  },
  deleteActionText: {
    color: '#d32f2f',
  },
  shopMatchModal: {
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    padding: 20,
  },
  shopMatchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  shopMatchTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  closeButton: {
    fontSize: 20,
    color: theme.colors.text.secondary,
    padding: 4,
  },
  shopMatchList: {
    marginBottom: 16,
  },
  shopMatchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
    borderRadius: 8,
    marginBottom: 8,
  },
  shopMatchInfo: {
    flex: 1,
    marginRight: 12,
  },
  shopMatchName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  shopMatchLocation: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: 2,
  },
  shopMatchDistance: {
    fontSize: 12,
    color: theme.colors.primary,
  },
  shopMatchStats: {
    alignItems: 'flex-end',
  },
  shopMatchPercentage: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  shopMatchItems: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: 2,
  },
  shopMatchTotal: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.secondary,
  },
  compareButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  compareButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    fontWeight: '500',
  },
  statsModal: {
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
    padding: 20,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  statCard: {
    width: '50%',
    padding: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  }
});

export default EnhancedListsScreen;
