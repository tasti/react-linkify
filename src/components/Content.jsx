import Linkify from 'react-linkify';
import React from 'react';

import Example from './Example.jsx';

class Content extends React.Component {
  static examples = [
    {
      description: 'Basic',
      before: <div>See source code at https://github.com/tasti/react-linkify/.</div>,
      after: <Linkify>See examples at https://github.com/tasti/react-linkify/.</Linkify>
    }, {
      description: 'Advanced',
      before: (
        <div>
          <div>react-linkify <span>(https://github.com/tasti/react-linkify/)</span></div>
            <div>React component to parse links (urls, emails, etc.) in text into clickable links</div>
          See source code at https://github.com/tasti/react-linkify/.
            <footer>Contact: tasti@zakarie.com</footer>
        </div>
      ), after: (
        <Linkify>
          <div>react-linkify <span>(https://github.com/tasti/react-linkify/)</span></div>
            <div>React component to parse links (urls, emails, etc.) in text into clickable links</div>
          See examples at https://github.com/tasti/react-linkify/.
            <footer>Contact: tasti@zakarie.com</footer>
        </Linkify>
      )
    }
  ]

  render() {
    return (
      <div className="Content" style={{padding: '20px'}}>
        {Content.examples.map((example, i) => {
          return (
            <Example
              description={example.description}
              before={example.before}
              after={example.after}
              key={i}
            />
          );
        })}
        More coming soon!
      </div>
    );
  }
}

export default Content;
