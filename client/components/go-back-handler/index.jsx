import React from 'react';

import { History } from 'react-router';

/**
 * Wrapper that handles an on-click and goes back.
 * This uses the old component notation due to mixins,
 * and uses React.createElement to dynamically create the desired element type.
 */
const GoBackHandler = React.createClass({
  mixins: [History],

  handleClick(e) {
    e.preventDefault();
    this.back();
  },

  propTypes: {
    children: React.PropTypes.any,
    componentType: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      componentType: 'div'
    }
  },

  render() {
    return React.createElement(this.props.componentType, {
      ...this.props,
      onClick: (e) => this.handleClick(e)
    }, this.props.children);
  }
});

export default GoBackHandler;
