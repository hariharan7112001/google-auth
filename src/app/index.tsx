import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/lib/auth";

export default function Index() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      {user?.photoURL ? <Image source={user.photoURL} style={styles.avatar} /> : null}
      <Text style={styles.name}>{user?.displayName}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.uid}>UID: {user?.uid}</Text>

      <Pressable style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign out</Text>
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
    gap: 8,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  email: {
    fontSize: 15,
    color: "#666",
  },
  uid: {
    fontSize: 12,
    color: "#999",
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#d93025",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
