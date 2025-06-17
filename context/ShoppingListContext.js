import React, { createContext, useContext, useState, useEffect } from 'react';
import { findBestShopsForList } from '../data/staticData';

const ShoppingListContext = createContext();

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
};

export const ShoppingListProvider = ({ children }) => {
  const [shoppingLists, setShoppingLists] = useState([
    {
      id: 1,
      name: 'Monthly Grocery List',
      items: [
        { id: 1, name: 'Basmati Rice', quantity: '5kg', purchased: true, price: 450 },
        { id: 2, name: 'Wheat Flour', quantity: '2kg', purchased: false, price: 280 },
        { id: 3, name: 'Fortune Sunflower Oil', quantity: '1L', purchased: true, price: 120 },
        { id: 4, name: 'Sugar', quantity: '1kg', purchased: false, price: 45 },
        { id: 5, name: 'Tata Salt', quantity: '1kg', purchased: true, price: 22 },
        { id: 6, name: 'Organic Tomatoes', quantity: '2kg', purchased: false, price: 60 },
        { id: 7, name: 'Potatoes', quantity: '3kg', purchased: false, price: 40 },
        { id: 8, name: 'Organic Milk', quantity: '1L', purchased: true, price: 65 },
      ],
      createdAt: '2024-01-15',
      totalItems: 8,
      purchasedItems: 4,
      estimatedTotal: 1092,
      category: 'Grocery',
      shared: false,
      sharedWith: []
    },
    {
      id: 2,
      name: 'Puja List',
      items: [
        { id: 1, name: 'Incense Sticks', quantity: '1 pack', purchased: false, price: 25 },
        { id: 2, name: 'Flowers (Marigold)', quantity: '1 garland', purchased: false, price: 30 },
        { id: 3, name: 'Coconut', quantity: '2 pieces', purchased: true, price: 40 },
        { id: 4, name: 'Camphor', quantity: '1 pack', purchased: false, price: 15 },
        { id: 5, name: 'Oil Lamp', quantity: '1 piece', purchased: true, price: 50 },
      ],
      createdAt: '2024-01-10',
      totalItems: 5,
      purchasedItems: 2,
      estimatedTotal: 160,
      category: 'Religious',
      shared: false,
      sharedWith: []
    },
    {
      id: 3,
      name: 'Daily Essentials',
      items: [
        { id: 1, name: 'Organic Milk', quantity: '1L', purchased: true, price: 65 },
        { id: 2, name: 'Britannia Bread', quantity: '1 loaf', purchased: true, price: 25 },
        { id: 3, name: 'Eggs', quantity: '12 pcs', purchased: false, price: 60 },
        { id: 4, name: 'Amul Butter', quantity: '100g', purchased: false, price: 52 },
      ],
      createdAt: '2024-01-20',
      totalItems: 4,
      purchasedItems: 2,
      estimatedTotal: 202,
      category: 'Daily',
      shared: true,
      sharedWith: ['family@example.com']
    }
  ]);

  const [favorites, setFavorites] = useState([]);
  const [recentItems, setRecentItems] = useState([
    'Basmati Rice', 'Organic Milk', 'Britannia Bread', 'Fortune Sunflower Oil', 
    'Organic Tomatoes', 'Tata Salt', 'Amul Butter', 'Whole Wheat Flour'
  ]);

  // Create new shopping list
  const createList = (name, category = 'General') => {
    const newList = {
      id: Date.now(),
      name: name.trim(),
      items: [],
      createdAt: new Date().toISOString().split('T')[0],
      totalItems: 0,
      purchasedItems: 0,
      estimatedTotal: 0,
      category,
      shared: false,
      sharedWith: []
    };
    setShoppingLists(prev => [...prev, newList]);
    return newList;
  };

  // Delete shopping list
  const deleteList = (listId) => {
    setShoppingLists(prev => prev.filter(list => list.id !== listId));
  };

  // Update list name
  const updateListName = (listId, newName) => {
    setShoppingLists(prev =>
      prev.map(list =>
        list.id === listId ? { ...list, name: newName.trim() } : list
      )
    );
  };

  // Add item to list
  const addItemToList = (listId, itemName, quantity = '1', estimatedPrice = 0) => {
    if (!itemName.trim()) return;

    const newItem = {
      id: Date.now(),
      name: itemName.trim(),
      quantity: quantity.trim(),
      purchased: false,
      price: estimatedPrice
    };

    setShoppingLists(prev =>
      prev.map(list => {
        if (list.id === listId) {
          const updatedItems = [...list.items, newItem];
          const totalItems = updatedItems.length;
          const purchasedItems = updatedItems.filter(item => item.purchased).length;
          const estimatedTotal = updatedItems.reduce((sum, item) => sum + (item.price || 0), 0);

          return {
            ...list,
            items: updatedItems,
            totalItems,
            purchasedItems,
            estimatedTotal
          };
        }
        return list;
      })
    );

    // Add to recent items if not already there
    if (!recentItems.includes(itemName.trim())) {
      setRecentItems(prev => [itemName.trim(), ...prev.slice(0, 9)]);
    }
  };

  // Remove item from list
  const removeItemFromList = (listId, itemId) => {
    setShoppingLists(prev =>
      prev.map(list => {
        if (list.id === listId) {
          const updatedItems = list.items.filter(item => item.id !== itemId);
          const totalItems = updatedItems.length;
          const purchasedItems = updatedItems.filter(item => item.purchased).length;
          const estimatedTotal = updatedItems.reduce((sum, item) => sum + (item.price || 0), 0);

          return {
            ...list,
            items: updatedItems,
            totalItems,
            purchasedItems,
            estimatedTotal
          };
        }
        return list;
      })
    );
  };

  // Toggle item purchased status
  const toggleItemPurchased = (listId, itemId) => {
    setShoppingLists(prev =>
      prev.map(list => {
        if (list.id === listId) {
          const updatedItems = list.items.map(item => {
            if (item.id === itemId) {
              return { ...item, purchased: !item.purchased };
            }
            return item;
          });
          const purchasedItems = updatedItems.filter(item => item.purchased).length;

          return {
            ...list,
            items: updatedItems,
            purchasedItems
          };
        }
        return list;
      })
    );
  };

  // Update item details
  const updateItem = (listId, itemId, updates) => {
    setShoppingLists(prev =>
      prev.map(list => {
        if (list.id === listId) {
          const updatedItems = list.items.map(item => {
            if (item.id === itemId) {
              return { ...item, ...updates };
            }
            return item;
          });
          const estimatedTotal = updatedItems.reduce((sum, item) => sum + (item.price || 0), 0);

          return {
            ...list,
            items: updatedItems,
            estimatedTotal
          };
        }
        return list;
      })
    );
  };

  // Get best shops for a list
  const getBestShopsForList = (listId) => {
    const list = shoppingLists.find(l => l.id === listId);
    if (!list) return [];

    return findBestShopsForList(list);
  };

  // Share list
  const shareList = (listId, emails) => {
    setShoppingLists(prev =>
      prev.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            shared: true,
            sharedWith: [...new Set([...list.sharedWith, ...emails])]
          };
        }
        return list;
      })
    );
  };

  // Unshare list
  const unshareList = (listId) => {
    setShoppingLists(prev =>
      prev.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            shared: false,
            sharedWith: []
          };
        }
        return list;
      })
    );
  };

  // Duplicate list
  const duplicateList = (listId) => {
    const originalList = shoppingLists.find(l => l.id === listId);
    if (!originalList) return;

    const duplicatedList = {
      ...originalList,
      id: Date.now(),
      name: `${originalList.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
      items: originalList.items.map(item => ({
        ...item,
        id: Date.now() + Math.random(),
        purchased: false
      })),
      purchasedItems: 0,
      shared: false,
      sharedWith: []
    };

    setShoppingLists(prev => [...prev, duplicatedList]);
    return duplicatedList;
  };

  // Add to favorites
  const addToFavorites = (listId) => {
    if (!favorites.includes(listId)) {
      setFavorites(prev => [...prev, listId]);
    }
  };

  // Remove from favorites
  const removeFromFavorites = (listId) => {
    setFavorites(prev => prev.filter(id => id !== listId));
  };

  // Get list statistics
  const getListStats = () => {
    const totalLists = shoppingLists.length;
    const totalItems = shoppingLists.reduce((sum, list) => sum + list.totalItems, 0);
    const completedItems = shoppingLists.reduce((sum, list) => sum + list.purchasedItems, 0);
    const totalEstimatedValue = shoppingLists.reduce((sum, list) => sum + list.estimatedTotal, 0);
    const sharedLists = shoppingLists.filter(list => list.shared).length;

    return {
      totalLists,
      totalItems,
      completedItems,
      completionRate: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0,
      totalEstimatedValue,
      sharedLists
    };
  };

  const value = {
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
    unshareList,
    duplicateList,
    addToFavorites,
    removeFromFavorites,
    getListStats
  };

  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
};
