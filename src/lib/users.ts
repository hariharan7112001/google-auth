import type { User } from "@react-native-firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "@react-native-firebase/firestore";

/**
 * Creates `users/{uid}` on first sign-in and refreshes it on every later sign-in.
 * Write-only (no read first) so it still queues and syncs if Firestore is briefly unreachable.
 */
export async function saveUserProfile(user: User, isNewUser: boolean) {
  await setDoc(
    doc(getFirestore(), "users", user.uid),
    {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      provider: "google",
      lastLoginAt: serverTimestamp(),
      ...(isNewUser ? { createdAt: serverTimestamp() } : {}),
    },
    { merge: true },
  );
}
