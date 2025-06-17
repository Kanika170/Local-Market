import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { useSeller } from '../../../context/SellerContext';
import ShoppingBagIcon from '../../ShoppingBagIcon';

const SellerLoginScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { updateShopData } = useSeller();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordLogin, setIsPasswordLogin] = useState(false);
  const [error, setError] = useState('');

  const validateMobile = () => {
    return mobile.length === 10 && /^\d+$/.test(mobile);
  };

  const handleSendOTP = () => {
    if (!validateMobile()) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    // Simulate OTP send
    Alert.alert(
      'OTP Sent',
      'A verification code has been sent to your mobile number.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SellerVerification'),
        },
      ]
    );
  };

  const handlePasswordLogin = () => {
    if (!validateMobile()) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    // For demo, we'll use a mock login
    if (password === '123456') {
      // Mock shop data
      const mockShopData = {
        id: 1,
        shopName: 'Demo Shop',
        ownerName: 'Demo Owner',
        mobile: mobile,
        verified: true,
      };

      updateShopData(mockShopData);
      navigation.replace('SellerTabs');
    } else {
      setError('Invalid credentials');
    }
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ShoppingBagIcon size={40} />
        <Text style={styles.headerTitle}>Shop Login</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            placeholderTextColor={theme.colors.text.tertiary}
            value={mobile}
            onChangeText={(text) => {
              setMobile(text);
              setError('');
            }}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        {isPasswordLogin && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={theme.colors.text.tertiary}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError('');
              }}
              secureTextEntry
            />
          </View>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={isPasswordLogin ? handlePasswordLogin : handleSendOTP}
        >
          <Text style={styles.loginButtonText}>
            {isPasswordLogin ? 'Login' : 'Send OTP'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchMethodButton}
          onPress={() => setIsPasswordLogin(!isPasswordLogin)}
        >
          <Text style={styles.switchMethodText}>
            {isPasswordLogin
              ? 'Login with OTP instead'
              : 'Login with Password instead'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate('SellerRegister')}
        >
          <Text style={styles.registerLinkText}>
            Don't have a shop account? Register here
          </Text>
        </TouchableOpacity>

        {isPasswordLogin && (
          <TouchableOpacity
            style={styles.forgotPasswordLink}
            onPress={() => Alert.alert('Reset Password', 'Feature coming soon!')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        )}
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
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 60,
      paddingBottom: 40,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.colors.primary,
      marginLeft: 12,
    },
    form: {
      paddingHorizontal: 20,
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
    errorText: {
      color: theme.colors.error,
      fontSize: 14,
      marginBottom: 16,
    },
    loginButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      borderRadius: theme.borderRadius.s,
      marginBottom: 16,
    },
    loginButtonText: {
      color: theme.colors.text.inverse,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    switchMethodButton: {
      paddingVertical: 8,
      marginBottom: 16,
    },
    switchMethodText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
    },
    registerLink: {
      alignItems: 'center',
      marginTop: 20,
    },
    registerLinkText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '500',
    },
    forgotPasswordLink: {
      alignItems: 'center',
      marginTop: 16,
    },
    forgotPasswordText: {
      color: theme.colors.text.secondary,
      fontSize: 14,
    },
  });

export default SellerLoginScreen;
