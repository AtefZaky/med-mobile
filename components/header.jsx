import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../constants';
import { icons } from '../constants';

import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the Icon component

const Header = ({ title, hasLeftComponent = false, onDrawerPress }) => {
  
  return (
    <View style={styles.containerAll}>
      <View style={styles.topRow}>
        <View style={styles.container}>
          <View style={styles.logobar}>
            <View style={styles.headerLeftContainer}>
              <Image source={require('../assets/images/logoleft.jpg')} style={styles.LeftImage} />
            </View>
            <View style={styles.headerRightContainer}>
              <Image source={require('../assets/images/logoright.jpg')} style={styles.RightImage} />

            </View>
          </View>
          {/* Rest of the component content */}
        </View>  
      </View>
      <View style={styles.header}>
        {hasLeftComponent && (
          <TouchableOpacity style={styles.leftComponent} onPress={onDrawerPress}>
            <Icon name="menu" size={24} color="#fff" style={styles.leftComponentIcon} />
          </TouchableOpacity>
        )}
        <Text style={styles.title} className="font-tregular">{title}</Text>
        <View style={styles.rightComponent}>
          <TouchableOpacity onPress={()=> router.replace("/home")}>
            <Image source={icons.ArrowRight} style={styles.rightComponentIcon} resizeMode='contain' />
          </TouchableOpacity>
        </View>                                       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerAll: {
    flexDirection: "column",

  },
  topRow: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  logobar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    elevation: 4,
    height: 58,
  },
  headerLeftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerRightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  LeftImage: {
    width: 120,
    height: 35,
  },
  RightImage: {
    width: 48,
    height: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  leftComponent: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  leftComponentIcon: {
    marginRight: 8, // Add some spacing between the icon and text
  },
  rightComponent: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 25,

  },
  rightComponentIcon: {
    borderRadius: 10,
    width: 16,
    height: 16,// Add some spacing between the icon and text
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 16,
  }
});

export default Header;