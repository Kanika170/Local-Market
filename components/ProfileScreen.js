import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import ShoppingBagIcon from './ShoppingBagIcon';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ShoppingBagIcon size={30} color="#9C27B0" />
        <Text style={styles.headerTitle}>Shopping Companion</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Text style={styles.profileImageText}>👤</Text>
          </View>
        </View>
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>Sarah Johnson</Text>
          <Text style={styles.profileMemberSince}>Member since 2021</Text>
        </View>
      </View>

      {/* Personal Information */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Full Name</Text>
          <View style={styles.infoValueContainer}>
            <Text style={styles.infoValue}>Sarah Johnson</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>City</Text>
          <View style={styles.infoValueContainer}>
            <Text style={styles.infoValue}>San Francisco</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Language</Text>
          <View style={styles.infoValueContainer}>
            <Text style={styles.infoValue}>English</Text>
          </View>
        </View>
      </View>

      {/* My Lists */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>My Lists</Text>
        <TouchableOpacity style={styles.listItem}>
 <View>
            <Text style={styles.listTitle}>Weekly Groceries</Text>
            <Text style={styles.listSubtitle}>12 items • Updated 2 days ago</Text>
          </View>
          <Text style={styles.listArrow}>&amp;gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <View>
            <Text style={styles.listTitle}>Party Supplies</Text>
            <Text style={styles.listSubtitle}>8 items • Updated 1 week ago</Text>
          </View>
          <Text style={styles.listArrow}>&amp;gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <View>
            <Text style={styles.listTitle}>Home Essentials</Text>
            <Text style={styles.listSubtitle}>15 items • Updated 3 days ago</Text>
          </View>
          <Text style={styles.listArrow}>&amp;gt;</Text>
        </TouchableOpacity>
      </View>

      {/* Tracked Products */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Tracked Products</Text>
        <TouchableOpacity style={styles.productItem}>
          <Image
            source={{ uri: 'https://example.com/almond-milk.jpg' }}
            style={styles.productImage}
          />
          <View style={styles.productTextContainer}>
            <Text style={styles.productTitle}>Organic Almond Milk</Text>
            <Text style={styles.productSubtitle}>Price dropped by 15%</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.productItem}>
          <Image
            source={{ uri: 'https://example.com/headphones.jpg' }}
            style={styles.productImage}
          />
          <View style={styles.productTextContainer}>
            <Text style={styles.productTitle}>Wireless Headphones</Text>
            <Text style={styles.productSubtitle}>Back in stock</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.productItem}>
          <Image
            source={{ uri: 'https://example.com/water-bottle.jpg' }}
            style={styles.productImage}
          />
          <View style={styles.productTextContainer}>
            <Text style={styles.productTitle}>Insulated Water Bottle</Text>
            <Text style={styles.productSubtitle}>New colors available</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>Recent Purchases</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9C27B0',
    marginLeft: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageContainer: {
    marginRight: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#9C27B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageText: {
    fontSize: 30,
    color: '#fff',
  },
  profileTextContainer: {
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileMemberSince: {
    fontSize: 14,
    color: 'gray',
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoItem: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  infoValueContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
  },
  infoValue: {
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listSubtitle: {
    fontSize: 12,
    color: 'gray',
  },
  listArrow: {
    fontSize: 16,
    color: 'gray',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  productTextContainer: {
    flexDirection: 'column',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productSubtitle: {
    fontSize: 12,
    color: 'gray',
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  optionText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
