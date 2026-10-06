import { getAuth, onAuthStateChanged, type User } from "@react-native-firebase/auth";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";

type AuthState = {
  user: User | null;
  initializing: boolean;
};

const AuthContext = createContext<AuthState>({ user: null, initializing: true });

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AuthState>({ user: null, initializing: true });

  useEffect(() => {
    // Firebase restores the saved session on app start and fires this once it's known.
    return onAuthStateChanged(getAuth(), (user) => setState({ user, initializing: false }));
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
