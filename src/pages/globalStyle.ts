import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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
  font-family: Noto Sans JP, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
  color: #151515;
  background-color: #f6f6f6;
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

export default GlobalStyle;
