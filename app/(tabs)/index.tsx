import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/home/home';
import ProductList from '../components/products/ProductList';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import { AppProvider } from '../contexts/AppContext';
import RegisterScreen from '../screens/RegisterScreen';
import ProductDetail from '../components/products/ProductDetail';
import ProductCategory from '../components/products/ProductCategory';
import Checkout from '../components/cart/Checkout';
import Cart from '../components/cart/Cart';
import ResponsiveMenu from '../components/layout/ResponsiveMenu';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrderConfirmation from '../components/cart/OrderConfirmation';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  Home: undefined;
  Products: undefined;
  Favorites: undefined;
  Profile: undefined;
  ProductDetail: { id: string };
  Checkout: { cartItems: CartItem[] };
  OrderConfirmation: { 
    orderId?: string; 
    returnToCart?: boolean 
  };
  ProductCategory: undefined;
  Cart: undefined;

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
            name="ProductCategory"
            component={ProductCategory}
            options={({ route }) => ({
              title: route.params.category.charAt(0).toUpperCase() + route.params.category.slice(1),
            })} />
          <Stack.Screen
            name="OrderConfirmation"
            component={OrderConfirmation}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}