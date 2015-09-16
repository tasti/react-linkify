import React from 'react';
import LinkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = new LinkifyIt();
linkify.tlds(tlds);

class Linkify extends React.Component {
  static MATCH = 'LINKIFY_MATCH'

  static keyCounter = 0
  static uniqueKey() {
    return `LINKIFY_KEY_${++Linkify.keyCounter}`;
  }

  static propTypes = {
    component: React.PropTypes.any,
    properties: React.PropTypes.object,
    urlRegex: React.PropTypes.object,
    emailRegex: React.PropTypes.object
  }

  static defaultProps = {
    component: 'a',
    properties: {},
  }

  getMatches(string) {
    return linkify.match(string);
  }

  parseString(string) {
    let elements = [];
    if (string === '') {
      return elements;
    }

    const matches = this.getMatches(string);
    if (!matches) {
      return string;
    }

    let lastIndex = 0;
    for (let match of matches) {
      // Push the preceding text if there is any
      if (match.index > lastIndex) {
        elements.push(string.substring(lastIndex, match.index));
      }
      // Shallow update values that specified the match
      let props = {href: match.url, key: Linkify.uniqueKey()};
      for (let key in this.props.properties) {
        let val = this.props.properties[key];
        if (val === Linkify.MATCH) {
          val = match.url;
        }

        props[key] = val;
      }
      elements.push(React.createElement(
        this.props.component,
        props,
        match.text
      ));
      lastIndex = match.lastIndex;
    }

    if (lastIndex !== string) {
      elements.push(string.substring(lastIndex));
    }

    return (elements.length === 1) ? elements[0] : elements;
  }

  parse(children) {
    let parsed = children;

    if (typeof children === 'string') {
      parsed = this.parseString(children);
    } else if (React.isValidElement(children) && (children.type !== 'a') && (children.type !== 'button')) {
      parsed = React.cloneElement(
        children,
        {key: Linkify.uniqueKey()},
        this.parse(children.props.children)
      );
    } else if (children instanceof Array) {
      parsed = children.map(child => {
        return this.parse(child);
      });
    }

    return parsed;
  }

  render() {
    const parsedChildren = this.parse(this.props.children);

    return <span className="Linkify">{parsedChildren}</span>;
  }
}

export default Linkify;
