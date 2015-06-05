import Linkify from 'react-linkify';
import React from 'react';

import Example from './Example.jsx';

class Content extends React.Component {
  static examples = [
    {
      description: 'Wrapping around plain text',
      before: (
        <div>
          See source code at https://github.com/tasti/react-linkify/.
        </div>
      ),
      after: (
        <Linkify>
          See source code at https://github.com/tasti/react-linkify/.
        </Linkify>
      )
    }, {
      description: 'Wrapping around DOM elements',
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
          See source code at https://github.com/tasti/react-linkify/.
            <footer>Contact: tasti@zakarie.com</footer>
        </Linkify>
      )
    }, {
      description: 'Doesn\'t modify links that are already clickable',
      before: (
        <div>
          See source code at <a href="https://github.com/tasti/react-linkify/">https://github.com/tasti/react-linkify/</a>.
        </div>
      ),
      after: (
        <Linkify>
          See source code at <a href="https://github.com/tasti/react-linkify/">https://github.com/tasti/react-linkify/</a>.
        </Linkify>
      )
    }, {
      description: 'Adding properties to links',
      before: (
        <div>
          See source code at https://github.com/tasti/react-linkify/.
        </div>
      ),
      after: (
        <Linkify properties={{target: '_blank', style: {color: 'red', fontWeight: 'bold'}}}>
          See source code at https://github.com/tasti/react-linkify/.
        </Linkify>
      )
    }, {
      description: 'Selecting the component to wrap links',
      before: (
        <div>
          See source code at https://github.com/tasti/react-linkify/.
        </div>
      ),
      after: (
        <Linkify component='button' properties={{onClick: () => {alert('Success!')}}}>
          See source code at https://github.com/tasti/react-linkify/.
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
      </div>
    );
  }
}

export default Content;
