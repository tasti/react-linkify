jest.dontMock('../Linkify.jsx');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('Linkify', () => {
  var Linkify = require('../Linkify.jsx');
  
  describe('#parseString', () => {
    it('should not modify the string', () => {
      var input = 'React is a JavaScript library for building user interfaces.';
      var output = Linkify.parseString(input);

      expect(output).toEqual(input);
    });

    it('should parse http url', () => {
      var input = 'http://facebook.github.io/react/';
      var output = Linkify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.children).toEqual(input);
    });

    it('should parse https url', () => {
      var input = 'https://facebook.github.io/react/';
      var output = Linkify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.children).toEqual(input);
    });

    it('should parse no protocol url', () => {
      var input = 'facebook.github.io/react/';
      var output = Linkify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.children).toEqual(input);
    });

    it('should parse url in beginning of text', () => {
      var input = ['https://github.com/facebook/react', ' is the location to the React source code.'];
      var output = Linkify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0].type).toEqual('a');
      expect(output[0].props.children).toEqual(input[0]);
      expect(output[1]).toEqual(input[1]);
    });

    it('should parse url in middle of text', () => {
      var input = ['Go to ', 'https://github.com/facebook/react', ' for the React source code.'];
      var output = Linkify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0]).toEqual(input[0]);
      expect(output[1].type).toEqual('a');
      expect(output[1].props.children).toEqual(input[1]);
      expect(output[2]).toEqual(input[2]);
    });

    it('should parse url in end of text', () => {
      var input = ['The React source code is located at ', 'https://github.com/facebook/react'];
      var output = Linkify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0]).toEqual(input[0]);
      expect(output[1].type).toEqual('a');
      expect(output[1].props.children).toEqual(input[1]);
    });
  });

  describe('#parse', () => {
    it('should not parse <a> elements', () => {
      var input = (
        <a href="http://facebook.github.io/react/">
          http://facebook.github.io/react/
        </a>
      );
      var output = Linkify.parse(input);

      expect(output).toEqual(input);
    });

    it('should not parse <button> elements', () => {
      var input = <button>http://facebook.github.io/react/</button>;
      var output = Linkify.parse(input);

      expect(output).toEqual(input);
    });
  });

  describe('#render', () => {
  
  });
});
