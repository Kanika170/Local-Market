import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const SearchTypeSelector = ({ visible, onClose, onSelectType }) => {
  const searchTypes = [
    {
      id: 'products',
      title: 'Products',
      icon: '🛍️',
      description: 'Search for products and items',
      color: '#9C27B0'
    },
    {
      id: 'posts',
      title: 'Posts',
      icon: '📝',
      description: 'Search for posts and content',
      color: '#2196F3'
    },
    {
      id: 'shops',
      title: 'Shops',
      icon: '🏪',
      description: 'Search for shops and stores',
      color: '#FF9800'
    }
  ];

  const handleSelectType = (type) => {
    onSelectType(type);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>What would you like to search for?</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            {searchTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[styles.option, { borderLeftColor: type.color }]}
                onPress={() => handleSelectType(type.id)}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  <View style={styles.optionLeft}>
                    <Text style={styles.optionIcon}>{type.icon}</Text>
                    <View style={styles.optionText}>
                      <Text style={styles.optionTitle}>{type.title}</Text>
                      <Text style={styles.optionDescription}>{type.description}</Text>
                    </View>
                  </View>
                  <Text style={styles.arrow}>→</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Choose a category to start searching</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  optionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  option: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
  },
  arrow: {
    fontSize: 18,
    color: '#9C27B0',
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default SearchTypeSelector;
