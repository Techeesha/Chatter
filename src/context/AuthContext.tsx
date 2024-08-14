import { createContext, useReducer, useEffect, ReactNode } from "react";
import { auth } from "../firebase/config";

// interface User {
//   uid: string;
//   email: string;
//   displayName: string;
//   photoURL: string;
// }

interface AuthState {
  user: firebase.default.User | null | undefined;
  authIsReady: boolean;
}

interface AuthAction {
  type: string;
  payload: firebase.default.User | null | undefined;
}

interface AuthContextValue extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
}

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
