import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainTabParamList, RootStackParamList } from '@/app/(tabs)';

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  routeName: keyof MainTabParamList;
  isActive: boolean;
  onPress: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, isActive, onPress }) => (
  <TouchableOpacity 
    style={[styles.menuItem, isActive && styles.activeMenuItem]} 
    onPress={onPress}>
    <Ionicons 
      name={icon} 
      size={24} 
      color={isActive ? '#f97316' : '#4a5568'} />
    <Text 
      style={[
        styles.menuItemText, 
        isActive && styles.activeMenuItemText
      ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const ResponsiveMenu: React.FC = () => {
  const navigation = useNavigation<NavigationProp<MainTabParamList>>();
  const route = useRoute();

  const menuItems: Array<MenuItemProps & { routeName: keyof RootStackParamList }> = [
    { icon: 'home-outline', label: 'Trang chủ', routeName: 'Home' },
    { icon: 'cube-outline', label: 'Sản phẩm', routeName: 'Products' }, 
    { icon: 'heart-outline', label: 'Yêu thích', routeName: 'Favorites' }, 
    { icon: 'person-outline', label: 'Tôi', routeName: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item) => (
        <MenuItem 
          key={item.routeName}
          icon={item.icon}
          label={item.label}
          routeName={item.routeName}
          isActive={route.name === item.routeName}
          onPress={() => navigation.navigate(item.routeName)}
        />
      ))}
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
  activeMenuItem: {
    // You can add additional styles for the active menu item if needed
  },
  menuItemText: {
    fontSize: 12,
    marginTop: 4,
    color: '#4a5568',
  },
  activeMenuItemText: {
    color: '#f97316', // Orange color for active text
  },
});

export default ResponsiveMenu;