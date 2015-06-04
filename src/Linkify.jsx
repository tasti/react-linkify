import React from 'react';

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
    // TODO: Improve regexs
    urlRegex: /\b(?:(?:https):\/\/|[-A-Z0-9+&@#/%=~_|$?!:,.]+\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/i,
    emailRegex: /\b[-A-Z0-9+&%=~_|$!.]+@[-A-Z0-9+&%=~_|$!.]+\.[-A-Z0-9+&%=~_|$!]+/i
  }

  getMatch(string) {
    let urlIdx = string.search(this.props.urlRegex);
    let emailIdx = string.search(this.props.emailRegex);

    if ((urlIdx === -1) && (emailIdx === -1)) {
      return false;
    }

    let idx, regex, type;
    if (urlIdx === -1) {
      idx = emailIdx;
      regex = this.props.emailRegex;
      type = 'email';
    } else if (emailIdx === -1) {
      idx = urlIdx;
      regex = this.props.urlRegex;
      type = 'url';
    } else if (urlIdx < emailIdx) {
      idx = urlIdx;
      regex = this.props.urlRegex;
      type = 'url';
    } else { // Email has precedence over url when equal
      idx = emailIdx;
      regex = this.props.emailRegex;
      type = 'email';
    }

    var str = string.match(regex)[0];

    return {
      str: str,
      type: type,
      idx: idx,
      len: str.length
    }
  }

  formatLink(match) {
    if (match.type === 'email') {
      return `mailto:${match.str}`;
    } else if (match.type === 'url') {
      if (match.str.substring(0, 4).toLowerCase() === 'http') {
        return match.str;
      } else {
        return `http://${match.str}`;
      }
    }

    return match.str;
  }

  parseStringHelper(string, elements) {
    if (string === '') {
      return elements;
    }

    let match = this.getMatch(string);
    if (!match) {
      elements.push(string);
      return this.parseStringHelper('', elements);
    }

    // Push the preceding text if there is any
    if (match.idx > 0) {
      elements.push(string.substring(0, match.idx));
    }

    // Shallow update values that specified the match
    let props = {href: this.formatLink(match), key: Linkify.uniqueKey()};
    for (let key in this.props.properties) {
      let val = this.props.properties[key];
      if (val === Linkify.MATCH) {
        val = this.formatLink(match);
      }

      props[key] = val;
    }

    elements.push(React.createElement(
      this.props.component,
      props,
      match.str
    ));

    return this.parseStringHelper(string.substring(match.idx + match.len), elements);
  }

  parseString(string) {
    let elements = [];

    this.parseStringHelper(string, elements);

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
    let parsedChildren = this.parse(this.props.children);

    return <span className="Linkify">{parsedChildren}</span>;
  }
}

export default Linkify;
