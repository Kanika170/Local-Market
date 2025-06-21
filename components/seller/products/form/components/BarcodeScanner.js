import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BarcodeScanner = ({ onBarcodeScanned, onClose }) => {
  const { theme } = useTheme();
  const [isScanning, setIsScanning] = useState(false);
  const styles = createStyles(theme);

  // Mock barcode data for demo
  const mockBarcodeData = {
    '8901030895566': {
      name: 'Britannia Good Day Cookies',
      category: 'Snacks',
      description: 'Delicious butter cookies with chocolate chips',
      suggestedPrice: 40,
    },
    '8901030895567': {
      name: 'Amul Fresh Milk 1L',
      category: 'Dairy',
      description: 'Fresh full cream milk',
      suggestedPrice: 65,
    },
    '8901030895568': {
      name: 'Tata Salt 1kg',
      category: 'Spices & Condiments',
      description: 'Iodized salt for daily cooking',
      suggestedPrice: 25,
    },
  };

  const handleScanPress = () => {
    setIsScanning(true);
    
    // Simulate camera scanning delay
    setTimeout(() => {
      setIsScanning(false);
      
      // Simulate successful scan with random barcode
      const barcodes = Object.keys(mockBarcodeData);
      const randomBarcode = barcodes[Math.floor(Math.random() * barcodes.length)];
      const productData = mockBarcodeData[randomBarcode];
      
      Alert.alert(
        'Product Found!',
        `Found: ${productData.name}\nWould you like to auto-fill the form?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Auto-fill',
            onPress: () => {
              onBarcodeScanned({
                barcode: randomBarcode,
                ...productData,
              });
              onClose();
            },
          },
        ]
      );
    }, 2000);
  };

  const handleManualEntry = () => {
    Alert.prompt(
      'Enter Barcode',
      'Please enter the barcode manually:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Search',
          onPress: (barcode) => {
            if (barcode && mockBarcodeData[barcode]) {
              const productData = mockBarcodeData[barcode];
              onBarcodeScanned({
                barcode,
                ...productData,
              });
              onClose();
            } else {
              Alert.alert('Product Not Found', 'No product found for this barcode.');
            }
          },
        },
      ],
      'plain-text'
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan Product Barcode</Text>
        <TouchableOpacity onPress={onClose}>
          <Icon name="close" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.scannerArea}>
          {isScanning ? (
            <View style={styles.scanningIndicator}>
              <Icon name="loading" size={48} color={theme.colors.primary} />
              <Text style={styles.scanningText}>Scanning...</Text>
            </View>
          ) : (
            <View style={styles.scannerPlaceholder}>
              <Icon name="qrcode-scan" size={64} color={theme.colors.text.tertiary} />
              <Text style={styles.instructionText}>
                Position the barcode within the frame
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.scanButton]}
            onPress={handleScanPress}
            disabled={isScanning}
          >
            <Icon 
              name={isScanning ? "loading" : "camera"} 
              size={20} 
              color={theme.colors.text.inverse} 
            />
            <Text style={styles.scanButtonText}>
              {isScanning ? 'Scanning...' : 'Start Scan'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.manualButton]}
            onPress={handleManualEntry}
            disabled={isScanning}
          >
            <Icon name="keyboard" size={20} color={theme.colors.primary} />
            <Text style={styles.manualButtonText}>Enter Manually</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>Tips for better scanning:</Text>
          <Text style={styles.tipText}>• Ensure good lighting</Text>
          <Text style={styles.tipText}>• Hold device steady</Text>
          <Text style={styles.tipText}>• Keep barcode flat and clean</Text>
        </View>
      </View>
    </View>
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
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    scannerArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.m,
      marginVertical: 20,
      minHeight: 300,
    },
    scannerPlaceholder: {
      alignItems: 'center',
    },
    scanningIndicator: {
      alignItems: 'center',
    },
    instructionText: {
      fontSize: 16,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      marginTop: 16,
    },
    scanningText: {
      fontSize: 16,
      color: theme.colors.primary,
      marginTop: 16,
      fontWeight: '500',
    },
    actions: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 20,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      borderRadius: theme.borderRadius.s,
      gap: 8,
    },
    scanButton: {
      backgroundColor: theme.colors.primary,
    },
    manualButton: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    scanButtonText: {
      color: theme.colors.text.inverse,
      fontSize: 16,
      fontWeight: '500',
    },
    manualButtonText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '500',
    },
    tips: {
      backgroundColor: theme.colors.surface,
      padding: 16,
      borderRadius: theme.borderRadius.s,
      marginBottom: 20,
    },
    tipsTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 8,
    },
    tipText: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginBottom: 4,
    },
  });

export default BarcodeScanner;
