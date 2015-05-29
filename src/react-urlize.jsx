import React from 'react';

class Urlize extends React.Component {
  parseString(string) {
    var words = string.split(' ');

    words = words.map(word => {
      if (word.match(/^https?:\/\/\w/i)) {
        word = React.createElement('a', {href: word}, word);
      }

      return React.createElement('span', {}, word);;
    });

    return words;
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

  rend(parsed) {
    var rendered = parsed;

    if (React.isValidElement(parsed)) {
      rendered = React.renderToString(parsed);
    } else if (parsed instanceof Array) {
      rendered = parsed.map(p => {
        return this.rend(p);
      }).join('');
    }

    return rendered;
  }

  render() {
    var parsedHTML = this.parse(this.props.children);
    var renderedHTML = this.rend(parsedHTML);

    return <span dangerouslySetInnerHTML={{__html: renderedHTML}}></span>;
  }
}

export default Urlize;
