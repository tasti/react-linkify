import React from 'react';

class Linkify extends React.Component {
  static MATCH = 'LINKIFY_MATCH'

  static propTypes = {
    component: React.PropTypes.any,
    properties: React.PropTypes.object,
    urlRegex: React.PropTypes.object,
    emailRegex: React.PropTypes.object
  }

  static defaultProps = {
    component: 'a',
    properties: {href: 'LINKIFY_MATCH'},
    // TODO: Improve regexs
    urlRegex: /\b(?:(?:https):\/\/|[-A-Z0-9+&@#/%=~_|$?!:,.]+\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/i,
    emailRegex: /\b[-A-Z0-9+&%=~_|$!.]+@[-A-Z0-9+&%=~_|$!.]+\.[-A-Z0-9+&%=~_|$!]+/i
  }

  parseStringHelper(string, elements) {
    if (string === '') {
      return elements;
    }

    let urlIdx = string.search(this.props.urlRegex);
    let emailIdx = string.search(this.props.emailRegex);

    if ((urlIdx === -1) && (emailIdx === -1)) {
      elements.push(string);
      return this.parseStringHelper('', elements);
    } else if (urlIdx === -1) {
      urlIdx = emailIdx + 1;
    } else if (emailIdx === -1) {
      emailIdx = urlIdx + 1;
    }

    let idx, regex;
    if (urlIdx < emailIdx) {
      idx = urlIdx;
      regex = this.props.urlRegex;
    } else { // Email has precedence over url when equal
      idx = emailIdx;
      regex = this.props.emailRegex;
    }

    let match = string.match(regex)[0];
    let len = match.length;

    // Push the preceding text if there is any
    if (idx > 0) {
      elements.push(string.substring(0, idx));
    }

    // Shallow update values that specified the match
    let props = {};
    for (let key in this.props.properties) {
      let val = this.props.properties[key];
      if (val === Linkify.MATCH) {
        val = (idx === emailIdx) ? `mailto:${match}` : match;
      }

      props[key] = val;
    }

    elements.push(React.createElement(
      this.props.component,
      props,
      match
    ));

    return this.parseStringHelper(string.substring(idx + len), elements);
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
