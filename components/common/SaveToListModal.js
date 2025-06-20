import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../theme/useTheme';

const SaveToListModal = ({ visible, onClose, product, onSave }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [newListName, setNewListName] = useState('');
  const [selectedList, setSelectedList] = useState(null);

  // Mock existing lists - in real app, this would come from context/props
  const [lists, setLists] = useState([
    { id: 1, name: 'Wishlist', count: 5 },
    { id: 2, name: 'Shopping List', count: 3 },
    { id: 3, name: 'Favorites', count: 8 }
  ]);

  const handleCreateNewList = () => {
    if (newListName.trim()) {
      const newList = {
        id: Date.now(),
        name: newListName.trim(),
        count: 0
      };
      setLists([...lists, newList]);
      setNewListName('');
      setSelectedList(newList);
    }
  };

  const handleSave = () => {
    if (selectedList) {
      onSave(selectedList.id, product);
      onClose();
    }
  };

  const renderList = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.listItem,
        selectedList?.id === item.id && styles.selectedListItem
      ]}
      onPress={() => setSelectedList(item)}
    >
      <View style={styles.listItemContent}>
        <Text style={styles.listName}>{item.name}</Text>
        <Text style={styles.listCount}>{item.count} items</Text>
      </View>
      {selectedList?.id === item.id && (
        <Text style={styles.checkmark}>✓</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Save to List</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.productImage}>{product?.image || '📦'}</Text>
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product?.name}</Text>
              <Text style={styles.productPrice}>{product?.price}</Text>
            </View>
          </View>

          <View style={styles.createNewList}>
            <TextInput
              style={styles.input}
              value={newListName}
              onChangeText={setNewListName}
              placeholder="Create new list..."
              placeholderTextColor={theme.colors.text.tertiary}
            />
            <TouchableOpacity 
              style={[
                styles.createButton,
                !newListName.trim() && styles.createButtonDisabled
              ]}
              onPress={handleCreateNewList}
              disabled={!newListName.trim()}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Your Lists</Text>
          <FlatList
            data={lists}
            renderItem={renderList}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />

          <TouchableOpacity 
            style={[
              styles.saveButton,
              !selectedList && styles.saveButtonDisabled
            ]}
            onPress={handleSave}
            disabled={!selectedList}
          >
            <Text style={styles.saveButtonText}>
              {selectedList ? `Save to "${selectedList.name}"` : 'Select a list'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme) => StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.l,
    borderTopRightRadius: theme.borderRadius.l,
    maxHeight: '80%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  closeButton: {
    fontSize: 20,
    color: theme.colors.text.secondary,
    padding: theme.spacing.s,
  },
  productInfo: {
    flexDirection: 'row',
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    alignItems: 'center',
  },
  productImage: {
    fontSize: 40,
    marginRight: theme.spacing.m,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  productPrice: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginTop: 4,
  },
  createNewList: {
    flexDirection: 'row',
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  input: {
    flex: 1,
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginRight: theme.spacing.s,
  },
  createButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.m,
    paddingHorizontal: theme.spacing.l,
    justifyContent: 'center',
  },
  createButtonDisabled: {
    backgroundColor: theme.colors.disabled,
  },
  createButtonText: {
    color: theme.colors.text.inverse,
    ...theme.typography.button,
  },
  sectionTitle: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontWeight: '600',
    padding: theme.spacing.m,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.m,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.s,
  },
  selectedListItem: {
    backgroundColor: theme.colors.primary + '20',
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  listItemContent: {
    flex: 1,
  },
  listName: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
  },
  listCount: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  checkmark: {
    color: theme.colors.primary,
    fontSize: 20,
    marginLeft: theme.spacing.m,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    margin: theme.spacing.m,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: theme.colors.disabled,
  },
  saveButtonText: {
    color: theme.colors.text.inverse,
    ...theme.typography.button,
  },
});

export default SaveToListModal;
