import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { useSeller } from '../../../context/SellerContext';
import ShoppingBagIcon from '../../ShoppingBagIcon';

const SellerRegisterScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { updateShopData } = useSeller();

  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    mobile: '',
    shopAddress: '',
    gstNumber: '',
    email: '',
    category: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.shopName.trim()) {
      newErrors.shopName = 'Shop name is required';
    }

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required';
    }

    if (!formData.mobile.trim() || formData.mobile.length !== 10) {
      newErrors.mobile = 'Valid 10-digit mobile number is required';
    }

    if (!formData.shopAddress.trim()) {
      newErrors.shopAddress = 'Shop address is required';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Shop category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      // Create shop data object
      const shopData = {
        id: Date.now(), // Temporary ID
        ...formData,
        verified: false,
        rating: 0,
        reviews: 0,
        followers: 0,
        products: [],
        registrationDate: new Date().toISOString(),
      };

      updateShopData(shopData);
      
      Alert.alert(
        'Registration Successful',
        'Your shop has been registered successfully. Please verify your mobile number.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SellerVerification'),
          },
        ]
      );
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const styles = createStyles(theme);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ShoppingBagIcon size={40} />
        <Text style={styles.headerTitle}>Shop Registration</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Shop Information</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Shop Name *</Text>
          <TextInput
            style={[styles.input, errors.shopName && styles.inputError]}
            placeholder="Enter your shop name"
            placeholderTextColor={theme.colors.text.tertiary}
            value={formData.shopName}
            onChangeText={(value) => updateField('shopName', value)}
          />
          {errors.shopName && <Text style={styles.errorText}>{errors.shopName}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Owner Name *</Text>
          <TextInput
            style={[styles.input, errors.ownerName && styles.inputError]}
            placeholder="Enter owner name"
            placeholderTextColor={theme.colors.text.tertiary}
            value={formData.ownerName}
            onChangeText={(value) => updateField('ownerName', value)}
          />
          {errors.ownerName && <Text style={styles.errorText}>{errors.ownerName}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile Number *</Text>
          <TextInput
            style={[styles.input, errors.mobile && styles.inputError]}
            placeholder="Enter 10-digit mobile number"
            placeholderTextColor={theme.colors.text.tertiary}
            value={formData.mobile}
            onChangeText={(value) => updateField('mobile', value)}
            keyboardType="phone-pad"
            maxLength={10}
          />
          {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Enter email address"
            placeholderTextColor={theme.colors.text.tertiary}
            value={formData.email}
            onChangeText={(value) => updateField('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Shop Address *</Text>
          <TextInput
            style={[styles.input, styles.textArea, errors.shopAddress && styles.inputError]}
            placeholder="Enter complete shop address"
            placeholderTextColor={theme.colors.text.tertiary}
            value={formData.shopAddress}
            onChangeText={(value) => updateField('shopAddress', value)}
            multiline
            numberOfLines={3}
          />
          {errors.shopAddress && <Text style={styles.errorText}>{errors.shopAddress}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Shop Category *</Text>
          <TextInput
            style={[styles.input, errors.category && styles.inputError]}
            placeholder="e.g., Grocery, Electronics, Clothing"
            placeholderTextColor={theme.colors.text.tertiary}
            value={formData.category}
            onChangeText={(value) => updateField('category', value)}
          />
          {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>GST Number (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter GST number if applicable"
            placeholderTextColor={theme.colors.text.tertiary}
            value={formData.gstNumber}
            onChangeText={(value) => updateField('gstNumber', value)}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Shop Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Brief description of your shop and products"
            placeholderTextColor={theme.colors.text.tertiary}
            value={formData.description}
            onChangeText={(value) => updateField('description', value)}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('SellerLogin')}
        >
          <Text style={styles.loginLinkText}>
            Already have an account? Login here
          </Text>
        </TouchableOpacity>
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
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 60,
      paddingBottom: 30,
      paddingHorizontal: 20,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.colors.primary,
      marginLeft: 12,
    },
    form: {
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 20,
    },
    inputGroup: {
      marginBottom: 20,
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
      height: 80,
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
    registerButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      borderRadius: theme.borderRadius.s,
      marginTop: 20,
    },
    registerButtonText: {
      color: theme.colors.text.inverse,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    loginLink: {
      marginTop: 20,
      alignItems: 'center',
    },
    loginLinkText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '500',
    },
  });

export default SellerRegisterScreen;
