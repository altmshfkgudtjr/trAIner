import 'styled-components';
// types
import type { ThemeVariables } from 'tds/types/Palette';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeVariables {}
}
