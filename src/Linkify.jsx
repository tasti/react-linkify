import React from 'react';
import LinkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = new LinkifyIt();
linkify
  .tlds(tlds)
  .set({ fuzzyLink: false })
  .add('@', {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.imgurUser) {
        self.re.imgurUser =  new RegExp(
          '^([a-zA-Z0-9_]){1,15}(?!_)(?=$|' + self.re.src_ZPCc + ')'
        );
      }
      if (self.re.imgurUser.test(tail)) {
        // Linkifier allows punctuation chars before prefix,
        // but we additionally disable `@` ("@@mention" is invalid)
        if (pos >= 2 && tail[pos - 2] === '@') {
          return false;
        }
        return tail.match(self.re.imgurUser)[0].length;
      }
      return 0;
    },
    normalize: function (match) {
      match.url = '//imgur.com/user/' + match.url.replace(/^@/, '');
    }
  });

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
    properties: {},
  }

  parseCounter = 0

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
    let idx = 0;
    for (let i = 0; i < matches.length; i++) {
      let match = matches[i];
      // Push the preceding text if there is any.
      if (match.index > lastIndex) {
        elements.push(string.substring(lastIndex, match.index));
      }
      // Shallow update values that specified the match.
      let props = {href: match.url, key: `match${++idx}`};
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

    return <span className="Linkify">{parsedChildren}</span>;
  }
}

export default Linkify;
