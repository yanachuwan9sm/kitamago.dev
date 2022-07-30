import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { lightTheme, darkTheme } from '../pages/ThemeConfig';

type themeColorType = 'light' | 'dark';

type themeState = {
  setTheme: Dispatch<SetStateAction<themeColorType>>;
};

const ThemeContext = createContext<themeState>({
  setTheme: () => undefined,
});

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<themeColorType>('dark');

  return (
    <ThemeContext.Provider value={{ setTheme }}>
      <StyledThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Context APIでstyled-componentsのThemeProviderをラップしたカスタムフック
export const useTheme = () => useContext(ThemeContext);
