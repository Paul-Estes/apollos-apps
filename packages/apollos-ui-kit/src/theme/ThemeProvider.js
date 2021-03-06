import { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';

import createTheme, { THEME_PROPS } from './createTheme';

export default class ThemeProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    themeInput: PropTypes.shape(THEME_PROPS),
    iconInput: PropTypes.objectOf(PropTypes.func),
  };

  static childContextTypes = {
    theme: PropTypes.shape(THEME_PROPS),
    themeInput: PropTypes.shape(THEME_PROPS),
    iconInput: PropTypes.objectOf(PropTypes.func),
  };

  static defaultProps = {
    children: null,
    themeInput: {},
    iconInput: {},
  };

  getChildContext = () => ({
    theme: createTheme(this.props.themeInput),
    themeInput: this.props.themeInput,
    iconInput: this.props.iconInput,
  });

  render() {
    return Children.only(this.props.children);
  }
}
