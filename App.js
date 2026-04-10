import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppContext, AppProvider } from './src/context/AppContext';

import CartScreen from './src/screens/CartScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import WishlistScreen from './src/screens/WishlistScreen';

const Drawer = createDrawerNavigator();
const ACCENT = '#F4845F';


function CustomSidebar({ navigation }) {
  const { isDarkMode, setIsDarkMode } = useContext(AppContext);
  const dark = isDarkMode;
  const bg          = dark ? '#13112B' : '#FFFFFF';
  const textPrimary = dark ? '#FFFFFF' : '#1A1830';
  const textMuted   = dark ? '#9B97C8' : '#7A7899';
  const borderColor = dark ? '#2D2B55' : '#E8E5F0';

  const navItems = [
    { name: 'Home',     icon: '🏠' },
    { name: 'Wishlist', icon: '⭐' },
    { name: 'Cart',     icon: '🛒' },
    { name: 'History',  icon: '📋' },
    { name: 'Profile',  icon: '👤' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: bg, paddingTop: 60 }}>
      <View style={{ paddingHorizontal: 24, paddingBottom: 20, borderBottomWidth: 0.5, borderColor }}>
        <Text style={{ color: ACCENT, fontSize: 28, fontWeight: '800' }}>MANTAP</Text>
        <Text style={{ color: textMuted, fontSize: 12, marginTop: 2 }}>Skincare & Beauty</Text>
      </View>

      <View style={{ paddingTop: 12, flex: 1 }}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            onPress={() => {
              navigation.navigate(item.name);
              navigation.closeDrawer();
            }}
            style={{
              flexDirection: 'row', alignItems: 'center',
              paddingVertical: 14, paddingHorizontal: 24,
              marginHorizontal: 12, borderRadius: 12, marginBottom: 2,
            }}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 20, marginRight: 14 }}>{item.icon}</Text>
            <Text style={{ color: textPrimary, fontSize: 15, fontWeight: '600' }}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{
        borderTopWidth: 0.5, borderColor,
        paddingVertical: 20, paddingHorizontal: 24,
        flexDirection: 'row', alignItems: 'center',
      }}>
        <Text style={{ color: textPrimary, flex: 1, fontSize: 15, fontWeight: '600' }}>Dark Theme</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: '#DDD', true: ACCENT }}
          thumbColor="#FFF"
        />
      </View>
    </View>
  );
}


function MainDrawer() {
  const { isDarkMode, cartCount } = useContext(AppContext);
  const headerBg = isDarkMode ? '#1A1740' : ACCENT;

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomSidebar {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: headerBg },
        headerTintColor: '#FFF',
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        drawerStyle: { width: '72%' },
        
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={{ marginRight: 16, padding: 6 }}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 24 }}>🛒</Text>
            {cartCount > 0 && (
              <View style={{
                position: 'absolute', right: 0, top: 0,
                backgroundColor: '#E24B4A',
                borderRadius: 10, minWidth: 18, height: 18,
                justifyContent: 'center', alignItems: 'center',
                paddingHorizontal: 3,
              }}>
                <Text style={{ color: '#FFF', fontSize: 10, fontWeight: '800' }}>
                  {cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ),
      })}
    >
      <Drawer.Screen name="Home"     component={HomeScreen}     />
      <Drawer.Screen name="Wishlist" component={WishlistScreen} />
      <Drawer.Screen name="Cart"     component={CartScreen}     />
      <Drawer.Screen name="History"  component={HistoryScreen}  />
      <Drawer.Screen name="Profile"  component={ProfileScreen}  />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <NavigationContainer>
          <MainDrawer />
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
}