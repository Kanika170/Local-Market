import React, { createContext, useContext, useState } from 'react';

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
      name: 'Wishlist',
      category: 'General',
      items: [],
      totalItems: 0,
      purchasedItems: 0,
      estimatedTotal: 0,
      createdAt: new Date().toLocaleDateString(),
      shared: false,
      sharedWith: []
    },
    {
      id: 2,
      name: 'Shopping List',
      category: 'Grocery',
      items: [],
      totalItems: 0,
      purchasedItems: 0,
      estimatedTotal: 0,
      createdAt: new Date().toLocaleDateString(),
      shared: false,
      sharedWith: []
    },
    {
      id: 3,
      name: 'Favorites',
      category: 'General',
      items: [],
      totalItems: 0,
      purchasedItems: 0,
      estimatedTotal: 0,
      createdAt: new Date().toLocaleDateString(),
      shared: false,
      sharedWith: []
    }
  ]);

  const [trackedProducts, setTrackedProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recentItems, setRecentItems] = useState([]);

  const createList = (name, category = 'General') => {
    const newList = {
      id: Date.now(),
      name,
      category,
      items: [],
      totalItems: 0,
      purchasedItems: 0,
      estimatedTotal: 0,
      createdAt: new Date().toLocaleDateString(),
      shared: false,
      sharedWith: []
    };
    setShoppingLists([...shoppingLists, newList]);
    return newList;
  };

  const addItemToList = (listId, name, quantity = '1', price = 0) => {
    setShoppingLists(currentLists => {
      return currentLists.map(list => {
        if (list.id === listId) {
          const newItem = {
            id: Date.now(),
            name,
            quantity,
            price: parseFloat(price),
            purchased: false
          };
          const newItems = [...list.items, newItem];
          return {
            ...list,
            items: newItems,
            totalItems: newItems.length,
            purchasedItems: newItems.filter(item => item.purchased).length,
            estimatedTotal: newItems.reduce((total, item) => total + (item.price * parseInt(item.quantity)), 0)
          };
        }
        return list;
      });
    });
  };

  const removeItemFromList = (listId, itemId) => {
    setShoppingLists(currentLists => {
      return currentLists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            items: list.items.filter(item => item.id !== itemId),
            totalItems: list.items.length - 1,
            purchasedItems: list.items.filter(item => item.purchased && item.id !== itemId).length,
            estimatedTotal: list.items.filter(item => item.id !== itemId)
              .reduce((total, item) => total + (item.price * parseInt(item.quantity)), 0)
          };
        }
        return list;
      });
    });
  };

  const toggleItemPurchased = (listId, itemId) => {
    setShoppingLists(currentLists => {
      return currentLists.map(list => {
        if (list.id === listId) {
          const newItems = list.items.map(item => 
            item.id === itemId ? { ...item, purchased: !item.purchased } : item
          );
          return {
            ...list,
            items: newItems,
            purchasedItems: newItems.filter(item => item.purchased).length
          };
        }
        return list;
      });
    });
  };

  const updateItem = (listId, itemId, updates) => {
    setShoppingLists(currentLists => {
      return currentLists.map(list => {
        if (list.id === listId) {
          const newItems = list.items.map(item => 
            item.id === itemId ? { ...item, ...updates } : item
          );
          return {
            ...list,
            items: newItems,
            estimatedTotal: newItems.reduce((total, item) => total + (item.price * parseInt(item.quantity)), 0)
          };
        }
        return list;
      });
    });
  };

  const deleteList = (listId) => {
    setShoppingLists(currentLists => currentLists.filter(list => list.id !== listId));
  };

  const addToFavorites = (listId) => {
    setFavorites(current => [...new Set([...current, listId])]);
  };

  const removeFromFavorites = (listId) => {
    setFavorites(current => current.filter(id => id !== listId));
  };

  const getBestShopsForList = (listId) => {
    // Mock implementation
    return [];
  };

  const shareList = (listId, users) => {
    setShoppingLists(currentLists => {
      return currentLists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            shared: true,
            sharedWith: [...new Set([...list.sharedWith, ...users])]
          };
        }
        return list;
      });
    });
  };

  const duplicateList = (listId) => {
    const originalList = shoppingLists.find(list => list.id === listId);
    if (originalList) {
      const newList = {
        ...originalList,
        id: Date.now(),
        name: `${originalList.name} (Copy)`,
        createdAt: new Date().toLocaleDateString(),
        shared: false,
        sharedWith: []
      };
      setShoppingLists([...shoppingLists, newList]);
      return newList;
    }
  };

  const getListStats = () => {
    return {
      totalLists: shoppingLists.length,
      totalItems: shoppingLists.reduce((total, list) => total + list.totalItems, 0),
      completionRate: Math.round(
        (shoppingLists.reduce((total, list) => total + list.purchasedItems, 0) /
        shoppingLists.reduce((total, list) => total + list.totalItems, 0)) * 100
      ) || 0,
      totalEstimatedValue: Math.round(
        shoppingLists.reduce((total, list) => total + list.estimatedTotal, 0)
      )
    };
  };

  const trackProduct = (product) => {
    setTrackedProducts(current => {
      const exists = current.some(item => item.id === product.id);
      if (!exists) {
        return [...current, { 
          ...product, 
          trackedAt: new Date().toISOString(),
          priceHistory: [{ 
            price: product.price,
            date: new Date().toISOString() 
          }]
        }];
      }
      return current;
    });
  };

  const untrackProduct = (productId) => {
    setTrackedProducts(current => 
      current.filter(product => product.id !== productId)
    );
  };

  const updateProductPrice = (productId, newPrice) => {
    setTrackedProducts(current => 
      current.map(product => {
        if (product.id === productId) {
          return {
            ...product,
            price: newPrice,
            priceHistory: [
              ...product.priceHistory,
              { price: newPrice, date: new Date().toISOString() }
            ]
          };
        }
        return product;
      })
    );
  };

  return (
    <ShoppingListContext.Provider value={{
      shoppingLists,
      favorites,
      recentItems,
      createList,
      deleteList,
      updateListName: () => {},
      addItemToList,
      removeItemFromList,
      toggleItemPurchased,
      updateItem,
      getBestShopsForList,
      shareList,
      duplicateList,
      addToFavorites,
      removeFromFavorites,
      getListStats,
      trackedProducts,
      trackProduct,
      untrackProduct,
      updateProductPrice
    }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
