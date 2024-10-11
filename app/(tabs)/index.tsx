import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';
import { AppProvider } from '../AppContext';
import ProductDetail from '../ProductDetail';
import ProductList from '../ProductList';
import FavoritesScreen from '../FavoritesScreen';
import ProfileScreen from '../ProfileScreen';
import ResponsiveMenu from '../ResponsiveMenu';
import Home from './home';
import Checkout from '../Checkout';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  ProductDetail: undefined;
  Checkout: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Products: undefined;
  Favorites: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <ResponsiveMenu {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Products" component={ProductList} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Products"
            component={ProductList}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail} />
            <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}