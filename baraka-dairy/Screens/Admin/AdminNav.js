import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './AdminDrawerContent';
import Store from '../store';
import UploadItem from './ProdUpload';
import AdminHomeScreen from './AdminHome';

const Drawer = createDrawerNavigator();

const AdminDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        cardStyle: { backgroundColor: 'white' },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen
        name="Admin Home"
        component={AdminHomeScreen}
        options={{ gestureEnabled: false }}
      />
      <Drawer.Screen name="Store" component={Store} />
      <Drawer.Screen name="ProdUpload" component={UploadItem} />
    </Drawer.Navigator>
  );
};

export default AdminDrawerNavigator;
