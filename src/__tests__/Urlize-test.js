jest.dontMock('../Urlize.jsx');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Urlize = require('../Urlize.jsx');

describe('Urlize', () => {
  it('should parse http url', () => {
    var url = 'http://facebook.github.io/react/';

    var DOM = TestUtils.renderIntoDocument(<Urlize>{url}</Urlize>);
    var urlize = TestUtils.findRenderedDOMComponentWithClass(DOM, 'Urlize');
    var link = urlize.props.children;

    expect(link.type).toEqual('a');
    expect(link.props.children).toEqual(url);
  });

  it('should parse https url', () => {
    var url = 'https://facebook.github.io/react/';

    var DOM = TestUtils.renderIntoDocument(<Urlize>{url}</Urlize>);
    var urlize = TestUtils.findRenderedDOMComponentWithClass(DOM, 'Urlize');
    var link = urlize.props.children;

    expect(link.type).toEqual('a');
    expect(link.props.children).toEqual(url);
  });
});
