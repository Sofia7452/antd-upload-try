import {ThemeContext} from './theme-context';
import React from 'react';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background,height:100,width:200}}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;