import React from 'react';

import Content from './Content.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="Title" style={{fontSize: '48px', fontWeight: 'bold'}}>react-linkify</div>
        <div className="Subtext" style={{fontSize: '24px'}}>
          React component to parse links (urls, emails, etc.) in text into clickable links
        </div>
        <Content />
      </div>
    );
  }
}

export default App;
