import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { signInWithGoogle } from "@/lib/auth";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  async function handlePress() {
    setLoading(true);
    try {
      // On success the auth listener updates and the router moves to Home automatically.
      await signInWithGoogle();
    } catch (error) {
      Alert.alert("Sign-in failed", error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Sign in or create an account to continue</Text>

      <Pressable
        style={({ pressed }) => [styles.button, (pressed || loading) && styles.buttonPressed]}
        onPress={handlePress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#1f1f1f" />
        ) : (
          <Text style={styles.buttonText}>Continue with Google</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 24,
  },
  button: {
    width: "100%",
    maxWidth: 320,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#dadce0",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f1f1f",
  },
});
