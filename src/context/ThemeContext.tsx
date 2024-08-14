import React, { createContext, useReducer, ReactNode } from "react";

export interface ThemeState {
  color: string;
  mode: string;
}

export interface ThemeAction {
  type: string;
  payload?: any;
}

type ThemehContextProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<{
  state: ThemeState;
  changeColor: (color: string) => void;
  changeMode: (mode: string) => void;
}>({
  state: { color: "2a85fe", mode: "light" },
  changeColor: () => {},
  changeMode: () => {},
});

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }: ThemehContextProviderProps) => {
  const [state, dispatch] = useReducer(themeReducer, {
    color: "2a85fe",
    mode: "light",
  });

  const changeColor = (color: string) => {
    dispatch({ type: "CHANGE_COLOR", payload: color });
    localStorage.setItem("color", color);
  };

  const changeMode = (mode: string) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
    localStorage.setItem("mode", mode);
  };

  return (
    <ThemeContext.Provider value={{ state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
