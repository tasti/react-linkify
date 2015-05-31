import React from 'react';

class Linkify extends React.Component {
  static regex = {
    url: /\b(?:(?:https?):\/\/|[-A-Z0-9+&@#/%=~_|$?!:,.]+\.)[-A-Z0-9+&@#/%=~_|$?!:,.]*[A-Z0-9+&@#/%=~_|$]/i
  }

  parseString(string) {
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

    return (elements.length === 1) ? elements[0] : elements;
  }

  parse(children) {
    let parsed = children;

    if (typeof children === 'string') {
      parsed = this.parseString(children);
    } else if (React.isValidElement(children)) {
      parsed = React.cloneElement(children, {}, this.parse(children.props.children));
    } else if (children instanceof Array) {
      parsed = children.map(child => {
        return this.parse(child);
      });
    }

    return parsed;
  }

  render() {
    let parsedChildren = this.parse(this.props.children);

    return <span className="Linkify">{parsedChildren}</span>;
  }
}

export default Linkify;
