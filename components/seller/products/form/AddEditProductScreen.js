import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { useSeller } from '../../../context/SellerContext';

// Components
import FormHeader from './components/FormHeader';
import BarcodeScanner from './components/BarcodeScanner';
import PricingTabsSection from './components/PricingTabsSection';
import BasicInfoSection from '../AddEditProductScreenSections/BasicInfoSection';
import ImagesSection from '../AddEditProductScreenSections/ImagesSection';
import AdditionalOptionsSection from '../AddEditProductScreenSections/AdditionalOptionsSection';

const AddEditProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const { addProduct, updateProduct, deleteProduct } = useSeller();
  const styles = createStyles(theme);

  const editProduct = route.params?.product;
  const isEditing = !!editProduct;

  const [showScanner, setShowScanner] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    originalPrice: '',
    stock: '',
    unit: 'kg',
    images: [],
    isDeliveryAvailable: true,
    isBestSeller: false,
    isDiscounted: false,
    b2bEnabled: false,
    wholesalePrice: '',
    minOrderQty: '',
    ...editProduct,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (route.params?.barcodeData) {
      const { barcodeData } = route.params;
      setFormData(prev => ({
        ...prev,
        ...barcodeData,
      }));
    }
  }, [route.params?.barcodeData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
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

    if (formData.b2bEnabled) {
      if (!formData.wholesalePrice || isNaN(formData.wholesalePrice)) {
        newErrors.wholesalePrice = 'Wholesale price is required for B2B';
      }
      if (!formData.minOrderQty || isNaN(formData.minOrderQty)) {
        newErrors.minOrderQty = 'Minimum order quantity is required for B2B';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      setIsSaving(true);
      try {
        const productData = {
          ...formData,
          price: parseFloat(formData.price),
          originalPrice: parseFloat(formData.originalPrice) || parseFloat(formData.price),
          stock: parseInt(formData.stock),
          wholesalePrice: formData.wholesalePrice ? parseFloat(formData.wholesalePrice) : null,
          minOrderQty: formData.minOrderQty ? parseInt(formData.minOrderQty) : null,
        };

        if (isEditing) {
          await updateProduct(editProduct.id, productData);
          Alert.alert('Success', 'Product updated successfully');
        } else {
          await addProduct({
            id: Date.now(),
            ...productData,
          });
          Alert.alert('Success', 'Product added successfully');
        }

        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProduct(editProduct.id);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  const handleBarcodeScanned = (data) => {
    setFormData(prev => ({
      ...prev,
      ...data,
    }));
    setShowScanner(false);
  };

  return (
    <View style={styles.container}>
      <FormHeader
        title={isEditing ? `Edit ${formData.name}` : 'Add New Product'}
        onBack={() => navigation.goBack()}
        onSave={handleSave}
        onDelete={isEditing ? handleDelete : undefined}
        isEditing={isEditing}
        isSaving={isSaving}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ImagesSection
          images={formData.images}
          onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
        />

        <BasicInfoSection
          formData={formData}
          errors={errors}
          onChangeText={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
          onSelectCategory={(category) => setFormData(prev => ({ ...prev, category }))}
          onScanBarcode={() => setShowScanner(true)}
        />

        <PricingTabsSection
          formData={formData}
          errors={errors}
          onFormDataChange={setFormData}
        />

        <AdditionalOptionsSection
          formData={formData}
          onFormDataChange={setFormData}
        />
      </ScrollView>

      <Modal
        visible={showScanner}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowScanner(false)}
      >
        <BarcodeScanner
          onBarcodeScanned={handleBarcodeScanned}
          onClose={() => setShowScanner(false)}
        />
      </Modal>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      padding: 20,
    },
  });

export default AddEditProductScreen;
