import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#4a5568" />
    <Text style={styles.menuItemText}>{label}</Text>
  </TouchableOpacity>
);

const ResponsiveMenu: React.FC = () => {
  return (
    <View style={styles.container}>
      <MenuItem icon="home-outline" label="Home" onPress={() => console.log('Home pressed')} />
      <MenuItem icon="cube-outline" label="Sản phẩm" onPress={() => console.log('Sản phẩm pressed')} />
      <MenuItem icon="heart-outline" label="Yêu thích" onPress={() => console.log('Yêu thích pressed')} />
      <MenuItem icon="person-outline" label="Tôi" onPress={() => console.log('Tôi pressed')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 12,
    marginTop: 4,
    color: '#4a5568',
  },
});

export default ResponsiveMenu;