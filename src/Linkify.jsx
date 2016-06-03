import React from 'react';
import LinkifyIt from 'linkify-it';
import tlds from 'tlds';

export const linkify = new LinkifyIt();
linkify.tlds(tlds);

class Linkify extends React.Component {
  static MATCH = 'LINKIFY_MATCH'

  static propTypes = {
    className: React.PropTypes.string,
    component: React.PropTypes.any,
    properties: React.PropTypes.object,
    urlRegex: React.PropTypes.object,
    emailRegex: React.PropTypes.object,
    handlers: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        prefix: React.PropTypes.string.isRequired,
        validate: React.PropTypes.func.isRequired,
        normalize: React.PropTypes.func.isRequired
      })
    )
  }

  static defaultProps = {
    className: 'Linkify',
    component: 'a',
    properties: {},
    handlers: []
  }

  componentDidMount() {
    this.addCustomHandlers();
  }

  componentDidUpdate(nextProps) {
    if (this.props.handlers !== nextProps.handlers) {
      this.addCustomHandlers();
    }
  }

  addCustomHandlers() {
    const { handlers } = this.props;

    if (handlers.length) {
      this.linkify = new LinkifyIt();
      this.linkify.tlds(tlds);

      handlers.forEach(handler => {
        this.linkify.add(handler.prefix, {
          validate: handler.validate,
          normalize: handler.normalize
        });
      });
    }
  }

  parseCounter = 0

  getMatches(string) {
    const linkifyInstance = this.linkify || linkify;

    return linkifyInstance.match(string);
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
    matches.forEach((match, idx) => {
      // Push the preceding text if there is any
      if (match.index > lastIndex) {
        elements.push(string.substring(lastIndex, match.index));
      }
      // Shallow update values that specified the match
      let props = {href: match.url, key: `parse${this.parseCounter}match${idx}`};
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
    });

    if (lastIndex < string.length) {
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
        {key: `parse${++this.parseCounter}`},
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
    this.parseCounter = 0;
    const parsedChildren = this.parse(this.props.children);

    return <span className={this.props.className}>{parsedChildren}</span>;
  }
}

export default Linkify;
