import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Modal,
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavigationBar from './BottomNavigationBar';

const ListsScreen = () => {
  const navigation = useNavigation();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [selectedList, setSelectedList] = useState(null);
  const [newItemName, setNewItemName] = useState('');

  // Sample shopping lists data
  const [shoppingLists, setShoppingLists] = useState([
    {
      id: 1,
      name: 'Monthly Grocery List',
      items: [
        { id: 1, name: 'Rice (5kg)', purchased: true },
        { id: 2, name: 'Wheat Flour (2kg)', purchased: false },
        { id: 3, name: 'Cooking Oil (1L)', purchased: true },
        { id: 4, name: 'Sugar (1kg)', purchased: false },
        { id: 5, name: 'Salt (1kg)', purchased: true },
        { id: 6, name: 'Onions (2kg)', purchased: false },
        { id: 7, name: 'Potatoes (3kg)', purchased: false },
        { id: 8, name: 'Tomatoes (1kg)', purchased: true },
      ],
      createdAt: '2024-01-15',
      totalItems: 8,
      purchasedItems: 4
    },
    {
      id: 2,
      name: 'Puja List',
      items: [
        { id: 1, name: 'Incense Sticks', purchased: false },
        { id: 2, name: 'Flowers (Marigold)', purchased: false },
        { id: 3, name: 'Coconut', purchased: true },
        { id: 4, name: 'Camphor', purchased: false },
        { id: 5, name: 'Oil Lamp', purchased: true },
      ],
      createdAt: '2024-01-10',
      totalItems: 5,
      purchasedItems: 2
    },
    {
      id: 3,
      name: 'Daily Essentials',
      items: [
        { id: 1, name: 'Milk (1L)', purchased: true },
        { id: 2, name: 'Bread', purchased: true },
        { id: 3, name: 'Eggs (12 pcs)', purchased: false },
        { id: 4, name: 'Butter', purchased: false },
      ],
      createdAt: '2024-01-20',
      totalItems: 4,
      purchasedItems: 2
    }
  ]);

  const createNewList = () => {
    if (newListName.trim()) {
      const newList = {
        id: Date.now(),
        name: newListName.trim(),
        items: [],
        createdAt: new Date().toISOString().split('T')[0],
        totalItems: 0,
        purchasedItems: 0
      };
      setShoppingLists([...shoppingLists, newList]);
      setNewListName('');
      setShowCreateModal(false);
    }
  };

  const addItemToList = (listId) => {
    if (newItemName.trim()) {
      setShoppingLists(lists => 
        lists.map(list => {
          if (list.id === listId) {
            const newItem = {
              id: Date.now(),
              name: newItemName.trim(),
              purchased: false
            };
            return {
              ...list,
              items: [...list.items, newItem],
              totalItems: list.totalItems + 1
            };
          }
          return list;
        })
      );
      setNewItemName('');
    }
  };

  const toggleItemPurchased = (listId, itemId) => {
    setShoppingLists(lists =>
      lists.map(list => {
        if (list.id === listId) {
          const updatedItems = list.items.map(item => {
            if (item.id === itemId) {
              return { ...item, purchased: !item.purchased };
            }
            return item;
          });
          const purchasedCount = updatedItems.filter(item => item.purchased).length;
          return {
            ...list,
            items: updatedItems,
            purchasedItems: purchasedCount
          };
        }
        return list;
      })
    );
  };

  const findBestShops = (list) => {
    // Mock shop matching logic
    const mockShops = [
      { name: 'Green Market', match: `${list.totalItems}/${list.totalItems}`, percentage: 100 },
      { name: 'Super Bazaar', match: `${Math.max(1, list.totalItems - 2)}/${list.totalItems}`, percentage: Math.round(((list.totalItems - 2) / list.totalItems) * 100) },
      { name: 'Local Store', match: `${Math.max(1, list.totalItems - 4)}/${list.totalItems}`, percentage: Math.round(((list.totalItems - 4) / list.totalItems) * 100) },
    ];
    return mockShops.sort((a, b) => b.percentage - a.percentage);
  };

  const renderListCard = (list) => {
    const progress = list.totalItems > 0 ? (list.purchasedItems / list.totalItems) * 100 : 0;
    
    return (
      <TouchableOpacity 
        key={list.id} 
        style={styles.listCard}
        onPress={() => setSelectedList(list)}
      >
        <View style={styles.listHeader}>
          <Text style={styles.listName}>{list.name}</Text>
          <Text style={styles.listDate}>{list.createdAt}</Text>
        </View>
        
        <View style={styles.listStats}>
          <Text style={styles.itemCount}>
            {list.purchasedItems}/{list.totalItems} items completed
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        <View style={styles.listActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {
              const bestShops = findBestShops(list);
              // Navigate to shop search results
              console.log('Best shops for', list.name, ':', bestShops);
            }}
          >
            <Text style={styles.actionButtonText}>Find Shops</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => setSelectedList(list)}
          >
            <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>View List</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderListDetail = () => {
    if (!selectedList) return null;

    return (
      <Modal visible={!!selectedList} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedList(null)}>
              <Text style={styles.backButton}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedList.name}</Text>
          </View>

          <View style={styles.addItemContainer}>
            <TextInput
              style={styles.addItemInput}
              placeholder="Add new item..."
              value={newItemName}
              onChangeText={setNewItemName}
            />
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => addItemToList(selectedList.id)}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.itemsList}>
            {selectedList.items.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[styles.itemRow, item.purchased && styles.purchasedItem]}
                onPress={() => toggleItemPurchased(selectedList.id, item.id)}
              >
                <Text style={styles.checkBox}>
                  {item.purchased ? '✅' : '⬜'}
                </Text>
                <Text style={[
                  styles.itemName,
                  item.purchased && styles.purchasedItemText
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.shopMatchContainer}>
            <Text style={styles.shopMatchTitle}>Best Shop Matches:</Text>
            {findBestShops(selectedList).map((shop, index) => (
              <View key={index} style={styles.shopMatchRow}>
                <Text style={styles.shopName}>{shop.name}</Text>
                <Text style={styles.shopMatch}>{shop.match} ({shop.percentage}%)</Text>
              </View>
            ))}
          </View>
        </View>
      </Modal>
    );
  };

  if (selectedList) {
    return renderListDetail();
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Smart Shopping Lists</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Text style={styles.createButtonText}>+ New List</Text>
        </TouchableOpacity>
      </View>

      {/* Lists */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Your Lists</Text>
        {shoppingLists.map(renderListCard)}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How Smart Lists Work:</Text>
          <Text style={styles.infoText}>
            • Create lists like "Monthly Grocery", "Puja Items", etc.{'\n'}
            • Add items you want to buy{'\n'}
            • App finds shops with maximum matching products{'\n'}
            • Visit one shop and get everything you need{'\n'}
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
            <View style={styles.createModalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowCreateModal(false);
                  setNewListName('');
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

      <BottomNavigationBar navigation={navigation} activeTab="Lists" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#9C27B0',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 90 : 65,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginTop: 20,
    marginBottom: 16,
  },
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  listDate: {
    fontSize: 12,
    color: '#666666',
  },
  listStats: {
    marginBottom: 16,
  },
  itemCount: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#9C27B0',
    borderRadius: 3,
  },
  listActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#9C27B0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#9C27B0',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#9C27B0',
  },
  infoSection: {
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9C27B0',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  createModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  createInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
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
    backgroundColor: '#F0F0F0',
  },
  confirmButton: {
    backgroundColor: '#9C27B0',
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    backgroundColor: '#9C27B0',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 16,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  addItemContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  addItemInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 12,
  },
  addButton: {
    backgroundColor: '#9C27B0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
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
    borderBottomColor: '#F0F0F0',
  },
  purchasedItem: {
    opacity: 0.6,
  },
  checkBox: {
    fontSize: 20,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  purchasedItemText: {
    textDecorationLine: 'line-through',
    color: '#666666',
  },
  shopMatchContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#F9F9F9',
  },
  shopMatchTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  shopMatchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  shopName: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  shopMatch: {
    fontSize: 14,
    color: '#9C27B0',
    fontWeight: '500',
  },
});

export default ListsScreen;
