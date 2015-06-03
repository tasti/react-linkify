import pretty from 'pretty';
import React from 'react';

class ExampleSection extends React.Component {
  static propTypes = {
    element: React.PropTypes.node.isRequired
  }

  static renderToStaticMarkup(element) {
    var string = '';

    if (typeof element === 'string') {
      string += element;
    } else if (React.isValidElement(element)) {
      var type = (typeof element.type === 'string') ? element.type : element.type.name;

      string += `<${type}`;
      // props
      string += `>`;
      string += ExampleSection.renderToStaticMarkup(element.props.children);
      string += `</${type}>`;
    } else if (element instanceof Array) {
      return element.map(el => {
        return ExampleSection.renderToStaticMarkup(el);
      }).join('');
    }

    return string;
  }

  render() {
    return (
      <div className="ExampleSection">
        <pre style={{padding: '4px', background: 'lightgrey', borderRadius: '2px', wordWrap: 'break-word'}}>
          {pretty((ExampleSection.renderToStaticMarkup(this.props.element)))}
        </pre>
        <div>Renders to:</div>
        <div style={{padding: '4px', border: '1px solid lightgrey', borderRadius: '2px'}}>
          {this.props.element}
        </div>
      </div>
    );
  }
}

export default ExampleSection;
