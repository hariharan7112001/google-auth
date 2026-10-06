import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  getAuth,
  signInWithCredential,
  signOut as firebaseSignOut,
} from "@react-native-firebase/auth";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { saveUserProfile } from "@/lib/users";

// The "Web client" ID (client_type 3) from google-services.json / Google Cloud Console.
// Required so Google returns an idToken that Firebase accepts.
const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

GoogleSignin.configure({ webClientId });

/**
 * "Continue with Google": signs in if the account exists, otherwise Firebase
 * creates it (that's the "register" step). Returns null if the user cancelled.
 */
export async function signInWithGoogle() {
  if (!webClientId || webClientId.startsWith("REPLACE_ME")) {
    throw new Error("EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is not set in .env. Restart Metro after setting it.");
  }

  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
    if (!isSuccessResponse(response)) return null;

    const { idToken } = response.data;
    if (!idToken) throw new Error("No idToken from Google. Check EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID.");

    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(getAuth(), credential);
    const { user } = userCredential;

    // Sign-in already succeeded; a Firestore problem shouldn't block the user.
    const isNewUser = getAdditionalUserInfo(userCredential)?.isNewUser ?? false;
    saveUserProfile(user, isNewUser).catch((error) =>
      console.warn("Failed to save user profile to Firestore:", error),
    );
    return user;
  } catch (error) {
    if (isErrorWithCode(error) && error.code === statusCodes.IN_PROGRESS) return null;
    throw error;
  }
}

export async function signOut() {
  await GoogleSignin.signOut();
  await firebaseSignOut(getAuth());
}
