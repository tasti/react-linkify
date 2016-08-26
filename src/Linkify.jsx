import React from 'react';
import LinkifyIt from 'linkify-it';
import tlds from 'tlds';

const globalCustomizations = {
  add: [],
  tlds: [],
  set: []
};

export const config = {
  add: (...args) => {
    globalCustomizations.add.push(args);
    return config;
  },
  tlds: (...args) => {
    globalCustomizations.tlds.push(args);
    return config;
  },
  set: (...args) => {
    globalCustomizations.set.push(args);
    return config;
  },
  resetAll: () => {
    for (let type in globalCustomizations) {
      globalCustomizations[type] = [];
    }

    return config;
  }
};

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
    ),
    fuzzyLink: React.PropTypes.bool,
    fuzzyIP: React.PropTypes.bool,
    fuzzyEmail: React.PropTypes.bool
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
    this.addCustomHandlers();
  }

  addCustomHandlers() {
    const { handlers } = this.props;

    this.linkify = this.linkify || new LinkifyIt();
    this.linkify.tlds(tlds);

    // add global customizations
    for (let type in globalCustomizations) {
      globalCustomizations[type].forEach(c => this.linkify[type](...c))
    }

    // add instance customizations
    (handlers || []).forEach((handler) => {
      this.linkify.add(handler.prefix, {
        validate: handler.validate,
        normalize: handler.normalize
      });
    });

    ['fuzzyLink', 'fuzzyIP', 'fuzzyEmail'].forEach(f => {
      typeof this.props[f] === 'boolean' && this.linkify.set({ [f]: this.props[f] })
    })
  }

  parseCounter = 0

  getMatches(string) {
    return this.linkify.match(string);
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
