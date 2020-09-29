import { nest } from 'recompose';

import { ThemeProvider, ThemeManager } from './theme';
import { LayoutProvider } from './LayoutContext';

export default nest(ThemeProvider, ThemeManager, LayoutProvider);
