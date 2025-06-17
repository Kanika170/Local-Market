import React, { useState, useRef, useEffect } from 'react';
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

const OTP_LENGTH = 4;

const SellerVerificationScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { shopData, updateShopData } = useSeller();

  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerInterval.current);
  }, []);

  const timerInterval = useRef(null);

  const startTimer = () => {
    setCanResend(false);
    setTimer(30);
    timerInterval.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    // For demo, we'll consider "1234" as the correct OTP
    if (enteredOtp === '1234') {
      // Update shop verification status
      updateShopData({
        ...shopData,
        verified: true,
      });

      Alert.alert(
        'Verification Successful',
        'Your shop has been verified successfully.',
        [
          {
            text: 'Continue',
            onPress: () => navigation.replace('SellerTabs'),
          },
        ]
      );
    } else {
      Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
    }
  };

  const handleResendOtp = () => {
    // Simulate OTP resend
    Alert.alert('OTP Sent', 'A new OTP has been sent to your mobile number.');
    startTimer();
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Number</Text>
      
      <Text style={styles.subtitle}>
        Enter the 4-digit code sent to{'\n'}
        {shopData?.mobile || 'your mobile number'}
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOtpChange(value.slice(-1), index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.verifyButton,
          !otp.every(digit => digit) && styles.verifyButtonDisabled,
        ]}
        onPress={handleVerify}
        disabled={!otp.every(digit => digit)}
      >
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        {canResend ? (
          <TouchableOpacity onPress={handleResendOtp}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.timerText}>
            Resend OTP in {timer} seconds
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.changeNumberButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.changeNumberText}>Change Mobile Number</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 20,
      paddingTop: 60,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      marginBottom: 40,
      lineHeight: 24,
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      marginBottom: 40,
    },
    otpInput: {
      width: 60,
      height: 60,
      borderWidth: 2,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.m,
      fontSize: 24,
      textAlign: 'center',
      color: theme.colors.text.primary,
      backgroundColor: theme.colors.surface,
    },
    verifyButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: theme.borderRadius.s,
      width: '100%',
    },
    verifyButtonDisabled: {
      backgroundColor: theme.colors.disabled,
    },
    verifyButtonText: {
      color: theme.colors.text.inverse,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    resendContainer: {
      marginTop: 24,
      alignItems: 'center',
    },
    resendText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '500',
    },
    timerText: {
      color: theme.colors.text.secondary,
      fontSize: 16,
    },
    changeNumberButton: {
      marginTop: 40,
    },
    changeNumberText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '500',
    },
  });

export default SellerVerificationScreen;
