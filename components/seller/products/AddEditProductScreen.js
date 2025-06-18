import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { useSeller } from '../../../context/SellerContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageUploadComponent from '../../common/ImageUploadComponent';
import SearchableDropdown from '../../common/SearchableDropdown';

const AddEditProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const { addProduct, updateProduct } = useSeller();

  const editProduct = route.params?.product;
  const isEditing = !!editProduct;

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    originalPrice: '',
    stock: '',
    unit: 'kg',
    images: [],
    tags: [],
    isDeliveryAvailable: false,
    isBestSeller: false,
    isDiscounted: false,
    ...editProduct,
  });

  const [errors, setErrors] = useState({});
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const categories = [
    'Vegetables',
    'Fruits',
    'Grains',
    'Dairy',
    'Beverages',
    'Snacks',
    'Spices & Condiments',
    'Bakery',
    'Frozen Foods',
    'Personal Care',
    'Household Items',
  ];

  const units = ['kg', 'g', 'L', 'ml', 'piece', 'pack'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.price || isNaN(formData.price)) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.stock || isNaN(formData.stock)) {
      newErrors.stock = 'Valid stock quantity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (formData.name && formData.category && !isEditing) {
      fetchSuggestedProducts();
    }
  }, [formData.name, formData.category]);

  const fetchSuggestedProducts = () => {
    // Mock suggested products based on name and category
    const mockSuggestions = [
      {
        id: 1,
        name: 'Organic Tomatoes',
        category: 'Vegetables',
        price: 60,
        description: 'Fresh organic tomatoes from local farms',
        unit: 'kg',
      },
      {
        id: 2,
        name: 'Fresh Spinach',
        category: 'Vegetables',
        price: 40,
        description: 'Nutrient-rich fresh spinach leaves',
        unit: 'kg',
      },
    ].filter(product => 
      product.category === formData.category && 
      product.name.toLowerCase().includes(formData.name.toLowerCase())
    );

    setSuggestedProducts(mockSuggestions);
    setShowSuggestions(mockSuggestions.length > 0);
  };

  const applySuggestedProduct = (product) => {
    setFormData({
      ...formData,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      unit: product.unit,
    });
    setShowSuggestions(false);
  };

  const handleSave = () => {
    if (validateForm()) {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice) || parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };

      if (isEditing) {
        updateProduct(editProduct.id, productData);
        Alert.alert('Success', 'Product updated successfully');
      } else {
        addProduct({
          id: Date.now(),
          ...productData,
        });
        Alert.alert('Success', 'Product added successfully');
      }

      navigation.goBack();
    }
  };

  const handleAddTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
      });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const styles = createStyles(theme);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        {/* Images Section */}
        <ImageUploadComponent
          images={formData.images}
          onImagesChange={(images) => setFormData({ ...formData, images })}
          maxImages={5}
          title="Product Images"
        />

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Name *</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Enter product name"
              value={formData.name}
              onChangeText={(text) => {
                setFormData({ ...formData, name: text });
                if (errors.name) setErrors({ ...errors, name: null });
              }}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          <SearchableDropdown
            data={categories}
            value={formData.category}
            onSelect={(category) => {
              setFormData({ ...formData, category });
              if (errors.category) setErrors({ ...errors, category: null });
            }}
            placeholder="Select a category"
            label="Category *"
            allowOther={true}
            otherLabel="Other"
            error={errors.category}
          />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter product description"
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Suggested Products */}
        {showSuggestions && suggestedProducts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Suggested Products</Text>
            <Text style={styles.sectionSubtitle}>
              Click on a suggestion to auto-fill the form
            </Text>
            {suggestedProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.suggestionCard}
                onPress={() => applySuggestedProduct(product)}
              >
                <View style={styles.suggestionInfo}>
                  <Text style={styles.suggestionName}>{product.name}</Text>
                  <Text style={styles.suggestionDescription}>
                    {product.description}
                  </Text>
                  <Text style={styles.suggestionPrice}>₹{product.price}/{product.unit}</Text>
                </View>
                <Icon name="arrow-right" size={20} color={theme.colors.primary} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Pricing and Stock */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing and Stock</Text>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Current Price (₹) *</Text>
              <TextInput
                style={[styles.input, errors.price && styles.inputError]}
                placeholder="0.00"
                value={formData.price.toString()}
                onChangeText={(text) => {
                  setFormData({ ...formData, price: text });
                  if (errors.price) setErrors({ ...errors, price: null });
                }}
                keyboardType="decimal-pad"
              />
              {errors.price && (
                <Text style={styles.errorText}>{errors.price}</Text>
              )}
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Original Price (₹)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                value={formData.originalPrice.toString()}
                onChangeText={(text) =>
                  setFormData({ ...formData, originalPrice: text })
                }
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Stock Quantity *</Text>
              <TextInput
                style={[styles.input, errors.stock && styles.inputError]}
                placeholder="0"
                value={formData.stock.toString()}
                onChangeText={(text) => {
                  setFormData({ ...formData, stock: text });
                  if (errors.stock) setErrors({ ...errors, stock: null });
                }}
                keyboardType="number-pad"
              />
              {errors.stock && (
                <Text style={styles.errorText}>{errors.stock}</Text>
              )}
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Unit</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.unitList}
              >
                {units.map((unit) => (
                  <TouchableOpacity
                    key={unit}
                    style={[
                      styles.unitButton,
                      formData.unit === unit && styles.selectedUnit,
                    ]}
                    onPress={() => setFormData({ ...formData, unit })}
                  >
                    <Text
                      style={[
                        styles.unitButtonText,
                        formData.unit === unit && styles.selectedUnitText,
                      ]}
                    >
                      {unit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>

        {/* Additional Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Options</Text>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Mark as Best Seller</Text>
            <Switch
              value={formData.isBestSeller}
              onValueChange={(value) =>
                setFormData({ ...formData, isBestSeller: value })
              }
              trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Show Discount Badge</Text>
            <Switch
              value={formData.isDiscounted}
              onValueChange={(value) =>
                setFormData({ ...formData, isDiscounted: value })
              }
              trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Home Delivery Available</Text>
            <Switch
              value={formData.isDeliveryAvailable}
              onValueChange={(value) =>
                setFormData({ ...formData, isDeliveryAvailable: value })
              }
              trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
            />
          </View>
        </View>

        {/* Tags */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tags</Text>
          <View style={styles.tagsContainer}>
            {formData.tags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={styles.tag}
                onPress={() => handleRemoveTag(tag)}
              >
                <Text style={styles.tagText}>{tag}</Text>
                <Icon name="close" size={16} color={theme.colors.text.inverse} />
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.addTagButton}
              onPress={() =>
                handleAddTag(`Tag ${formData.tags.length + 1}`)
              }
            >
              <Icon name="plus" size={20} color={theme.colors.primary} />
              <Text style={styles.addTagText}>Add Tag</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    </ScrollView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
      backgroundColor: theme.colors.surface,
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    saveButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: theme.borderRadius.s,
    },
    saveButtonText: {
      color: theme.colors.text.inverse,
      fontSize: 16,
      fontWeight: '500',
    },
    form: {
      padding: 20,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 16,
    },
    sectionSubtitle: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginBottom: 12,
    },
    suggestionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.s,
      padding: 12,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    suggestionInfo: {
      flex: 1,
    },
    suggestionName: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    suggestionDescription: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginBottom: 4,
    },
    suggestionPrice: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    imagesSection: {
      marginBottom: 24,
    },
    addImageButton: {
      width: 100,
      height: 100,
      borderRadius: theme.borderRadius.m,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    addImageText: {
      color: theme.colors.primary,
      fontSize: 14,
      marginTop: 8,
    },
    imageContainer: {
      width: 100,
      height: 100,
      marginRight: 12,
    },
    productImage: {
      width: '100%',
      height: '100%',
      borderRadius: theme.borderRadius.m,
    },
    removeImageButton: {
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: theme.colors.error,
      borderRadius: 12,
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text.primary,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.s,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: theme.colors.text.primary,
      backgroundColor: theme.colors.surface,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    inputError: {
      borderColor: theme.colors.error,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 14,
      marginTop: 4,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    categoryList: {
      flexGrow: 0,
      marginBottom: 8,
    },
    categoryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: theme.borderRadius.s,
      backgroundColor: theme.colors.surface,
      marginRight: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    selectedCategory: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    categoryButtonText: {
      color: theme.colors.text.primary,
      fontSize: 14,
    },
    selectedCategoryText: {
      color: theme.colors.text.inverse,
    },
    unitList: {
      flexGrow: 0,
    },
    unitButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: theme.borderRadius.s,
      backgroundColor: theme.colors.surface,
      marginRight: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    selectedUnit: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    unitButtonText: {
      color: theme.colors.text.primary,
      fontSize: 14,
    },
    selectedUnitText: {
      color: theme.colors.text.inverse,
    },
    switchRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    switchLabel: {
      fontSize: 16,
      color: theme.colors.text.primary,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    tag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: theme.borderRadius.s,
      marginRight: 8,
      marginBottom: 8,
    },
    tagText: {
      color: theme.colors.text.inverse,
      marginRight: 4,
    },
    addTagButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: theme.borderRadius.s,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      marginBottom: 8,
    },
    addTagText: {
      color: theme.colors.primary,
      marginLeft: 4,
    },
  });

export default AddEditProductScreen;
