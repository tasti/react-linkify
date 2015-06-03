import React from 'react';

import ExampleSection from './ExampleSection.jsx';

class Example extends React.Component {
  static propTypes = {
    description: React.PropTypes.string.isRequired,
    before: React.PropTypes.node.isRequired,
    after: React.PropTypes.node.isRequired
  }

  render() {
    return (
      <div className="Example">
        <div style={{fontSize: '18px'}}>{this.props.description}</div>
        <div style={{display: 'flex'}}>
          <div style={{margin: '10px', width: '50%'}}>
            <div>Before</div>
            <ExampleSection element={this.props.before} />
          </div>
          <div style={{margin: '10px', width: '50%'}}>
            <div>After</div>
            <ExampleSection element={this.props.after} />
          </div>
        </div>
      </div>
    );
  }
}

export default Example;
