import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavigationBar from './BottomNavigationBar';

const ChatScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const [message, setMessage] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to Vintage Treasures Boutique. How can I help you today?",
      time: "10:32 AM",
      sender: "shop",
      date: "Today"
    },
    {
      id: 2,
      text: "Hi! I saw the antique silver necklace on your page. Is it still available?",
      time: "10:33 AM",
      sender: "user",
      date: "Today"
    },
    {
      id: 3,
      text: "Yes, the Victorian silver locket necklace is still available! It's priced at $85. Would you like me to hold it for you?",
      time: "10:35 AM",
      sender: "shop",
      date: "Today"
    },
    {
      id: 4,
      text: "That would be great! Can I come by tomorrow afternoon to see it in person?",
      time: "10:36 AM",
      sender: "user",
      date: "Today"
    },
    {
      id: 5,
      text: "Absolutely! We're open from 10 AM to 6 PM tomorrow. I'll put your name on it. May I know your name please?",
      time: "10:38 AM",
      sender: "shop",
      date: "Today"
    }
  ]);

  const quickReplies = [
    "Is this in stock?",
    "What are your hours?",
    "Do you deliver?"
  ];

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: "user",
        date: "Today"
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const handleQuickReply = (reply) => {
    setMessage(reply);
  };

  const renderDateSeparator = (date) => (
    <View style={styles.dateSeparator}>
      <View style={styles.dateLine} />
      <Text style={styles.dateText}>{date}</Text>
      <View style={styles.dateLine} />
    </View>
  );

  const renderMessages = () => {
    let currentDate = null;
    const messageElements = [];

    messages.forEach((msg, index) => {
      if (msg.date !== currentDate) {
        messageElements.push(
          <View key={`date-${msg.date}`}>
            {renderDateSeparator(msg.date)}
          </View>
        );
        currentDate = msg.date;
      }

      messageElements.push(
        <View 
          key={msg.id} 
          style={[
            styles.messageWrapper,
            msg.sender === 'user' ? styles.userMessageWrapper : null
          ]}
        >
          {msg.sender === 'shop' && (
            <Image 
              source={require('../assets/category.jpeg')}
              style={styles.messageAvatar}
            />
          )}
          <View style={[
            styles.messageBubble,
            msg.sender === 'user' ? styles.userBubble : styles.shopBubble
          ]}>
            <Text style={styles.messageText}>{msg.text}</Text>
            <Text style={styles.messageTime}>{msg.time}</Text>
          </View>
        </View>
      );
    });

    return messageElements;
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Shopping Companion</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.headerText}>Bu</Text>
          <Text style={styles.headerText}>tto</Text>
        </View>
      </View>

      {/* Shop Info */}
      <View style={styles.shopInfo}>
        <Image 
          source={require('../assets/category.jpeg')}
          style={styles.shopAvatar}
        />
        <View style={styles.shopDetails}>
          <Text style={styles.shopName}>Vintage Treasures Boutique</Text>
          <Text style={styles.shopStatus}>Usually replies within 5 minutes</Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {renderMessages()}
      </ScrollView>

      {/* Quick Replies - Only show when keyboard is hidden */}
      {!keyboardVisible && (
        <View style={styles.quickRepliesWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickRepliesContainer}
          >
            {quickReplies.map((reply, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.quickReplyButton}
                onPress={() => handleQuickReply(reply)}
              >
                <Text style={styles.quickReplyText}>{reply}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#999999"
          value={message}
          onChangeText={setMessage}
          multiline
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity 
          style={[styles.sendButton, message.trim() ? styles.sendButtonActive : null]}
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <Text style={styles.sendButtonText}>Bu</Text>
          <Text style={styles.sendButtonText}>tto</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation - Only show when keyboard is hidden */}
      {!keyboardVisible && (
        <BottomNavigationBar navigation={navigation} activeTab="Chat" />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#9C27B0',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
  },
  shopInfo: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  shopAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  shopDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  shopName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  shopStatus: {
    fontSize: 14,
    color: '#666666',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 32,
  },
  dateSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dateText: {
    marginHorizontal: 16,
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 20,
  },
  shopBubble: {
    backgroundColor: '#FFF3E0',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#E1BEE7',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
    lineHeight: 22,
  },
  messageTime: {
    fontSize: 12,
    color: '#666666',
  },
  quickRepliesWrapper: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 8,
  },
  quickRepliesContainer: {
    paddingHorizontal: 16,
  },
  quickReplyButton: {
    backgroundColor: '#E1BEE7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  quickReplyText: {
    color: '#9C27B0',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
    maxHeight: 100,
    minHeight: 48,
    color: '#000000',
  },
  sendButton: {
    backgroundColor: '#9C27B0',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  sendButtonActive: {
    opacity: 1,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 14,
  },
});

export default ChatScreen;
