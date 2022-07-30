import {} from 'styled-components';

import type { ThemeType } from '../pages/ThemeConfig';
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeType {}
}
