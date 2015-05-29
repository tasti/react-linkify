import React from 'react';

class Urlize extends React.Component {
  render() {
    return <span>{this.props.children}</span>;
  }
}

export default Urlize;
