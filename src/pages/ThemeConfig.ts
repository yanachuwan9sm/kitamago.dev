import { createGlobalStyle } from 'styled-components';

export type ThemeType = typeof lightTheme;

export const lightTheme = { body: '#FFF', text: '#363537', background: '#363537' };

export const darkTheme: ThemeType = { body: '#262626', text: '#f5f5f5', background: '#999' };

export const GlobalStyle = createGlobalStyle`
:root {
  --c-primary: #3ea8ff;
}

* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  outline: 0;
  font-family: Noto Sans JP, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif;
  color: ${({ theme }) => theme.text};
  background:  ${({ theme }) => theme.body};
  transition: background 0.2s ease-in, color 0.2s ease-in;
}

a {
  color: inherit;
  text-decoration: none;
}

input,
button,
select,
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  border: none;
  border-radius: 0;
  font: inherit;
  outline: none;
}
`;
