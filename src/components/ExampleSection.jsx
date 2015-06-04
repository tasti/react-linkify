import {html as beautifyhtml} from 'js-beautify';
import React from 'react';

class ExampleSection extends React.Component {
  static propTypes = {
    element: React.PropTypes.node.isRequired
  }

  static objectToString(obj) {
    var string = '';

    if (obj instanceof Object) {
      string += '{';
      Object.keys(obj).forEach((key, i) => {
        if ((key === 'href') && (obj[key] === 'LINKIFY_MATCH')) {
          return;
        }

        if (i !== 0) {
          string += ', ';
        }

        string += `${key}: `;
        string += ExampleSection.objectToString(obj[key]);
      });
      string += '}';
    } else {
      string += `'${obj}'`;
    }
    
    return string;
  }

  static renderToStaticMarkup(element) {
    var string = '';

    if (typeof element === 'string') {
      string += element;
    } else if (React.isValidElement(element)) {
      var type = (typeof element.type === 'string') ? element.type : element.type.name;

      string += `<${type}`;

      // Props
      var ignoreProps = ['children', 'urlRegex', 'emailRegex'];
      Object.keys(element.props).forEach(key => {
        if (ignoreProps.indexOf(key) !== -1) {
          return;
        } else if ((key === 'component') && (element.props[key] === 'a')) {
          return;
        } else if (key === 'properties') {
          var propsString = ExampleSection.objectToString(element.props[key]);

          if (propsString !== '{}') {
            string += ` ${key}={${propsString}}`;
          }

          return;
        }

        string += ` ${key}=\'${element.props[key]}\'`;
      });

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
          {beautifyhtml(
            ExampleSection.renderToStaticMarkup(this.props.element),
            {indent_size: 2, unformatted: []}
          )}
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
