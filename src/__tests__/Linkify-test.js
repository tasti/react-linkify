jest.dontMock('../Linkify.jsx');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Linkify = require('../Linkify.jsx');

describe('Linkify', () => {
  it('should parse http url', () => {
    var url = 'http://facebook.github.io/react/';

    var DOM = TestUtils.renderIntoDocument(<Linkify>{url}</Linkify>);
    var linkify = TestUtils.findRenderedDOMComponentWithClass(DOM, 'Linkify');
    var link = linkify.props.children;

    expect(link.type).toEqual('a');
    expect(link.props.children).toEqual(url);
  });

  it('should parse https url', () => {
    var url = 'https://facebook.github.io/react/';

    var DOM = TestUtils.renderIntoDocument(<Linkify>{url}</Linkify>);
    var linkify = TestUtils.findRenderedDOMComponentWithClass(DOM, 'Linkify');
    var link = linkify.props.children;

    expect(link.type).toEqual('a');
    expect(link.props.children).toEqual(url);
  });

  it('should parse no protocol url', () => {
    var url = 'facebook.github.io/react/';

    var DOM = TestUtils.renderIntoDocument(<Linkify>{url}</Linkify>);
    var linkify = TestUtils.findRenderedDOMComponentWithClass(DOM, 'Linkify');
    var link = linkify.props.children;

    expect(link.type).toEqual('a');
    expect(link.props.children).toEqual(url);
  });

  it('should parse no protocol url', () => {
    var url = 'facebook.github.io/react/';

    var DOM = TestUtils.renderIntoDocument(<Linkify>{url}</Linkify>);
    var linkify = TestUtils.findRenderedDOMComponentWithClass(DOM, 'Linkify');
    var link = linkify.props.children;

    expect(link.type).toEqual('a');
    expect(link.props.children).toEqual(url);
  });

  it('should parse url in middle of text', () => {
    var url = 'Go to https://github.com/facebook/react for the React source code.';

    var DOM = TestUtils.renderIntoDocument(<Linkify>{url}</Linkify>);
    var linkify = TestUtils.findRenderedDOMComponentWithClass(DOM, 'Linkify');
    
    // TODO
  });
});
