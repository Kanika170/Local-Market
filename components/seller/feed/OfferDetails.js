import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

const OfferDetails = ({ postData, setPostData }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Offer Details</Text>
      {['title', 'discount', 'validUntil'].map((field) => (
        <View key={field} style={styles.inputGroup}>
          <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</Text>
          <TextInput
            style={styles.input}
            placeholder={`e.g., ${field === 'title' ? 'Weekend Special Sale' : field === 'discount' ? '20% off' : 'This Sunday, 31st Dec'}`}
            value={postData.offerDetails[field]}
            onChangeText={(text) => setPostData({
              ...postData,
              offerDetails: { ...postData.offerDetails, [field]: text },
            })}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
});

export default OfferDetails;
