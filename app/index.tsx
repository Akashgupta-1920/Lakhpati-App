// App.js
import React, { useRef, useState, useEffect, useCallback } from "react";
import { WebView } from "react-native-webview";
import {
  View,
  StyleSheet,
  StatusBar,
  BackHandler,
  Platform,
  Alert,
} from "react-native";

export default function App() {
  const webviewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  // Called on Android hardware back press
  const onAndroidBackPress = useCallback(() => {
    if (canGoBack && webviewRef.current) {
      webviewRef.current.goBack(); // navigate back inside WebView
      return true; // we handled it
    }
    // Optional: show confirmation before exiting
    // Alert.alert("Exit", "Do you want to exit the app?", [
    //   { text: "No", style: "cancel" },
    //   { text: "Yes", onPress: () => BackHandler.exitApp() },
    // ]);
    return false; // let OS handle (will exit app)
  }, [canGoBack]);

  useEffect(() => {
    if (Platform.OS === "android") {
      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onAndroidBackPress
      );
      return () => sub.remove();
    }
  }, [onAndroidBackPress]);

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <WebView
          ref={webviewRef}
          source={{ uri: "https://lakhpati.fun/login" }}
          onNavigationStateChange={(navState) => {
            // navState.canGoBack is true when the webview has history to go back to
            setCanGoBack(navState.canGoBack);
          }}
          startInLoadingState
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
