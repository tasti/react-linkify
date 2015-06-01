import React from 'react';

class Linkify extends React.Component {
  static URL_MATCH = 'LINKIFY_URL_MATCH'

  static propTypes = {
    component: React.PropTypes.any,
    properties: React.PropTypes.object,
    urlRegex: React.PropTypes.object
  }

  static defaultProps = {
    component: 'a',
    properties: {href: 'LINKIFY_URL_MATCH'},
    urlRegex: /\b(?:(?:https):\/\/|[-A-Z0-9+&@#/%=~_|$?!:,.]+\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/i
  }

  parseString(string) {
    let elements = [];

    while (string.search(this.props.urlRegex) !== -1) {
      let match = string.match(this.props.urlRegex)[0];
      let idx = string.search(this.props.urlRegex);
      let len = match.length;
      
      if (idx > 0) {
        elements.push(string.substring(0, idx));
      }
      string = string.substring(idx + len);

      let props = {};
      for (let key in this.props.properties) {
        let val = this.props.properties[key];
        if (val === Linkify.URL_MATCH) {
          val = match;
        }

        props[key] = val;
      }

      elements.push(React.createElement(
        this.props.component,
        props,
        match
      ));
    }

    if (string.length > 0) {
      elements.push(string);
    }

    return (elements.length === 1) ? elements[0] : elements;
  }

  parse(children) {
    let parsed = children;

    if (typeof children === 'string') {
      parsed = this.parseString(children);
    } else if (React.isValidElement(children) && (children.type !== 'a') && (children.type !== 'button')) {
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
