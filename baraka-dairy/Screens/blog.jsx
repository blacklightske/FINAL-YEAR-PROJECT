import { Text } from "react-native";
import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const Blog = () => {
  return (
    <SafeAreaView className="px-4 my-6 bg-primary h-full">
      <Text className="text-2xl text-white font-psemibold">Blogf</Text>
      <WebView
      source={{ uri: 'https://barakadairyanimalcareadvice.blogspot.com/' }} 
      style={styles.webview}
    />
    </SafeAreaView>
  );
};

export default Blog;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
