import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ShoppingBagIcon from './ShoppingBagIcon';
import CustomerHomeFeed from './CustomerHomeFeed'; // Import the CustomerHomeFeed component

const LoginRegisterScreen = ({ onSendOTP }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('customer');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLoginRegister = (mobileNumber, userType) => {
    // Simulate login/registration logic here (e.g., API call)
    console.log('Login/Register pressed', mobileNumber, userType);
    setIsLoggedIn(true); // Set login status to true after button press
  };

  if (isLoggedIn) {
    return <CustomerHomeFeed />; // Render CustomerHomeFeed if logged in
  }

  return (
    <View style={styles.container}>
      {/* Header with Shopping Bag Icon and Title */}
      <View style={styles.header}>
        <ShoppingBagIcon size={40} />
        <Text style={styles.headerTitle}>Shopping Companion</Text>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome!</Text>
        <Text style={styles.welcomeSubtitle}>
          Please enter your mobile number to continue
        </Text>
      </View>

      {/* Mobile Number Input */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Mobile Number</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your mobile number"
            placeholderTextColor="#999999"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>
      </View>

      {/* User Type Selection */}
      <View style={styles.userTypeSection}>
        <Text style={styles.userTypeLabel}>I am a:</Text>
        <View style={styles.userTypeButtons}>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              selectedUserType === 'customer' && styles.selectedUserType
            ]}
            onPress={() => setSelectedUserType('customer')}
          >
            <View style={styles.userTypeIcon}>
              <Text style={styles.customerIcon}>👤</Text>
            </View>
            <Text style={[
              styles.userTypeText,
              selectedUserType === 'customer' && styles.selectedUserTypeText
            ]}>
              Customer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.userTypeButton,
              selectedUserType === 'shopowner' && styles.selectedUserType
            ]}
            onPress={() => setSelectedUserType('shopowner')}
          >
            <View style={styles.userTypeIcon}>
              <Text style={styles.shopIcon}>🏪</Text>
            </View>
            <Text style={[
              styles.userTypeText,
              selectedUserType === 'shopowner' && styles.selectedUserTypeText
            ]}>
              Shop Owner
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.sendOTPButton}
          onPress={() => onSendOTP(mobileNumber, selectedUserType)}
        >
          <Text style={styles.sendOTPText}>Send OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginRegisterButton}
          onPress={() => handleLoginRegister(mobileNumber, selectedUserType)} // Call handleLoginRegister
        >
          <Text style={styles.loginRegisterText}>Login/Register</Text>
        </TouchableOpacity>
      </View>

      {/* Language Selection */}
      <View style={styles.languageSection}>
        <Text style={styles.languageLabel}>Language: </Text>
        <Text style={styles.languageValue}>English</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#9C27B0',
    marginLeft: 12,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  inputSection: {
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9F9F9',
  },
  countryCode: {
    fontSize: 16,
    color: '#333333',
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  userTypeSection: {
    marginBottom: 40,
  },
  userTypeLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 16,
  },
  userTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userTypeButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginHorizontal: 8,
    backgroundColor: '#FFFFFF',
  },
  selectedUserType: {
    borderColor: '#9C27B0',
    backgroundColor: '#F3E5F5',
  },
  userTypeIcon: {
    marginBottom: 8,
  },
  customerIcon: {
    fontSize: 24,
    color: '#9C27B0',
  },
  shopIcon: {
    fontSize: 24,
    color: '#9C27B0',
  },
  userTypeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  selectedUserTypeText: {
    color: '#9C27B0',
  },
  buttonSection: {
    marginBottom: 40,
  },
  sendOTPButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sendOTPText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  loginRegisterButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 16,
    borderRadius: 8,
  },
  loginRegisterText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  languageSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  languageLabel: {
    fontSize: 16,
    color: '#666666',
  },
  languageValue: {
    fontSize: 16,
    color: '#9C27B0',
    fontWeight: '500',
  },
});

export default LoginRegisterScreen;
