import React from 'react';

class Linkify extends React.Component {
  static regex = {
    url: /\b(?:(?:https?):\/\/|[-A-Z0-9+&@#/%=~_|$?!:,.]+\.)[-A-Z0-9+&@#/%=~_|$?!:,.]*[A-Z0-9+&@#/%=~_|$]/i
  }

  static parseString(string) {
    let elements = [];

    while (string.search(Linkify.regex.url) !== -1) {
      let match = string.match(Linkify.regex.url)[0];
      let idx = string.search(Linkify.regex.url);
      let len = match.length;
      
      if (idx > 0) {
        elements.push(string.substring(0, idx));
      }
      string = string.substring(idx + len);

      elements.push(React.createElement('a', {href: match}, match));
    }

    if (string.length > 0) {
      elements.push(string);
    }

    return (elements.length === 1) ? elements[0] : elements;
  }

  static parse(children) {
    let parsed = children;

    if (typeof children === 'string') {
      parsed = Linkify.parseString(children);
    } else if (React.isValidElement(children)) {
      if ((children.type !== 'a') && (children.type !== 'button')) {
        parsed = React.cloneElement(children, {}, Linkify.parse(children.props.children));
      }
    } else if (children instanceof Array) {
      parsed = children.map(child => {
        return Linkify.parse(child);
      });
    }

    return parsed;
  }

  render() {
    let parsedChildren = Linkify.parse(this.props.children);

    return <span className="Linkify">{parsedChildren}</span>;
  }
}

export default Linkify;
