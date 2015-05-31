import React from 'react';

class Linkify extends React.Component {
  parseString(string) {
    var words = string.split(' ');

    words = words.map(word => {
      if (word.match(/^https?:\/\/\w/i)) {
        return React.createElement('a', {href: word}, word);
      }

      return React.createElement('span', {}, word);
    });

    return (words.length === 1) ? words[0] : words;
  }

  parse(children) {
    var parsed = children;

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
    var parsedChildren = this.parse(this.props.children);

    return <span className="Linkify">{parsedChildren}</span>;
  }
}

export default Linkify;
