import React from 'react';

class Urlize extends React.Component {
  parse(text) {
    var words = text.split(' ');

    words = words.map(word => {
      if (word.match(/^https?:\/\/\w/i)) {
        word = `<a href="${word}">${word}</a>`;
      }

      return word;
    });

    return words.join(' ');
  }

  render() {
    return (
      <span dangerouslySetInnerHTML={{__html: this.parse(this.props.children)}}>
      </span>
    );
  }
}

export default Urlize;
