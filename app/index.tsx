// App.js
import { WebView } from "react-native-webview";
import { View, StyleSheet, StatusBar } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <WebView source={{ uri: "https://lakhpati.fun/login" }} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
