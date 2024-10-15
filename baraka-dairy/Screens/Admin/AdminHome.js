import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdminDrawerNavigator from './AdminNav';

const AdminHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Home Screen</Text>
      <AdminDrawerNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AdminHomeScreen;
