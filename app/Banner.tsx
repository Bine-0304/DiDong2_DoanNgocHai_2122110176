import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const Banner: React.FC = () => {
  const { width } = Dimensions.get('window');

  return (
    <View style={styles.bannerContainer}>
      <Image
        source={require('../assets/images/slider1.webp')}
        style={[styles.bannerImage, { width }]}
        resizeMode="contain"/>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  bannerImage: {
    height: 200, 
  },
});

export default Banner;