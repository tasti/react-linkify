jest.autoMockOff();

let React = require('react');
let TestUtils = require('react-addons-test-utils');

describe('Linkify', () => {
  let Linkify = require('../Linkify.jsx').default;

  describe('#parseString', () => {
    let linkify = TestUtils.renderIntoDocument(<Linkify></Linkify>);

    it('should not modify the string', () => {
      let input = 'React is a JavaScript library for building user interfaces.';
      let output = linkify.parseString(input);

      expect(output).toEqual(input);
    });

    it('should parse http url', () => {
      let input = 'http://facebook.github.io/react/';
      let output = linkify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.href).toEqual(input);
      expect(output.props.children).toEqual(input);
    });

    it('should parse https url', () => {
      let input = 'https://facebook.github.io/react/';
      let output = linkify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.href).toEqual(input);
      expect(output.props.children).toEqual(input);
    });

    it('should parse no protocol url', () => {
      let input = 'facebook.github.io/react/';
      let output = linkify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.href).toEqual(`http://${input}`);
      expect(output.props.children).toEqual(input);
    });

    it('should parse url in beginning of text', () => {
      let input = ['https://github.com/facebook/react', ' is the location to the React source code.'];
      let output = linkify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0].type).toEqual('a');
      expect(output[0].props.href).toEqual(input[0]);
      expect(output[0].props.children).toEqual(input[0]);
      expect(output[1]).toEqual(input[1]);
    });

    it('should parse url in middle of text', () => {
      let input = ['Go to ', 'https://github.com/facebook/react', ' for the React source code.'];
      let output = linkify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0]).toEqual(input[0]);
      expect(output[1].type).toEqual('a');
      expect(output[1].props.href).toEqual(input[1]);
      expect(output[1].props.children).toEqual(input[1]);
      expect(output[2]).toEqual(input[2]);
    });

    it('should parse url in end of text', () => {
      let input = ['The React source code is located at ', 'https://github.com/facebook/react'];
      let output = linkify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0]).toEqual(input[0]);
      expect(output[1].type).toEqual('a');
      expect(output[1].props.href).toEqual(input[1]);
      expect(output[1].props.children).toEqual(input[1]);
    });
  });

  describe('#parse', () => {
    let linkify = TestUtils.renderIntoDocument(<Linkify></Linkify>);

    it('should not parse <a> elements', () => {
      let input = (
        <a href="http://facebook.github.io/react/">
          http://facebook.github.io/react/
        </a>
      );
      let output = linkify.parse(input);

      expect(output).toEqual(input);
    });

    it('should not parse <button> elements', () => {
      let input = <button>http://facebook.github.io/react/</button>;
      let output = linkify.parse(input);

      expect(output).toEqual(input);
    });

    it('should parse email', () => {
      let input = 'tasti@zakarie.com';
      let output = linkify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.href).toEqual(`mailto:${input}`);
      expect(output.props.children).toEqual(input);
    });

    it('should parse email in sentence', () => {
      let input = ['For more information, contact ', 'tasti@zakarie.com', '.'];
      let output = linkify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0]).toEqual(input[0]);
      expect(output[1].type).toEqual('a');
      expect(output[1].props.href).toEqual(`mailto:${input[1]}`);
      expect(output[1].props.children).toEqual(input[1]);
      expect(output[2]).toEqual(input[2]);
    });
  });

  describe('#addCustomHandlers', () => {
    it('should match a custom handler added through the "handlers" prop', () => {
      const linkify = TestUtils.renderIntoDocument(
        <Linkify handlers={[{
          prefix: '@',
          validate() {
            return 7;
          },
          normalize(match) {
            match.url = 'https://twitter.com/' + match.url.replace(/^@/, '');
          }
        }]}
        >
        </Linkify>
      );

      const input = ['this is an ', '@mention', ' handler'];
      const output = linkify.parseString(input.join(''));

      expect(output[0]).toEqual(input[0]);
      expect(output[1].type).toEqual('a');
      expect(output[1].props.href).toEqual(`https://twitter.com/mention`);
      expect(output[1].props.children).toEqual(input[1]);
      expect(output[2]).toEqual(input[2]);
    });

    it('should match multiple custom handlers', () => {
      const linkify = TestUtils.renderIntoDocument(
        <Linkify handlers={[{
          prefix: '@',
          validate() {
            return 7;
          },
          normalize(match) {
            match.url = 'https://twitter.com/' + match.url.replace(/^@/, '');
          }
        }, {
          prefix: '$',
          validate() {
            return 7;
          },
          normalize(match) {
            match.url = 'https://blingtwitter.com/' + match.url.replace(/^\$/, '');
          }
        }]}
        >
        </Linkify>
      );

      const input = ['this is an ', '@mention', ' and ', '$mention', ' handler'];
      const output = linkify.parseString(input.join(''));

      expect(output[0]).toEqual(input[0]);
      expect(output[1].type).toEqual('a');
      expect(output[1].props.href).toEqual(`https://twitter.com/mention`);
      expect(output[1].props.children).toEqual(input[1]);

      expect(output[2]).toEqual(input[2]);
      expect(output[3].type).toEqual('a');
      expect(output[3].props.href).toEqual(`https://blingtwitter.com/mention`);
      expect(output[3].props.children).toEqual(input[3]);
      expect(output[4]).toEqual(input[4]);
    })
  });

  describe('#render', () => {

  });

  describe('#static', () => {
    //let Linkify = require('../Linkify.jsx');
  });
});
