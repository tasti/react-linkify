jest.autoMockOff();

const React = require('react');
const ReactTestUtils = require('react-dom/test-utils');
const renderer = require('react-test-renderer');

describe('Linkify', () => {
  const Linkify = require('../Linkify.jsx').default;

  describe('#parseString', () => {
    const linkify = ReactTestUtils.renderIntoDocument(<Linkify>test</Linkify>);

    it('should not modify the string', () => {
      const input = 'React is a JavaScript library for building user interfaces.';
      const output = linkify.parseString(input);

      expect(output).toEqual(input);
    });

    it('should parse http url', () => {
      const input = 'http://facebook.github.io/react/';
      const output = linkify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.href).toEqual(input);
      expect(output.props.children).toEqual(input);
    });

    it('should parse https url', () => {
      const input = 'https://facebook.github.io/react/';
      const output = linkify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.href).toEqual(input);
      expect(output.props.children).toEqual(input);
    });

    it('should parse no protocol url', () => {
      const input = 'facebook.github.io/react/';
      const output = linkify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.href).toEqual(`http://${input}`);
      expect(output.props.children).toEqual(input);
    });

    it('should parse url in beginning of text', () => {
      const input = ['https://github.com/facebook/react', ' is the location to the React source code.'];
      const output = linkify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0].type).toEqual('a');
      expect(output[0].props.href).toEqual(input[0]);
      expect(output[0].props.children).toEqual(input[0]);
      expect(output[1]).toEqual(input[1]);
    });

    it('should parse url in middle of text', () => {
      const input = ['Go to ', 'https://github.com/facebook/react', ' for the React source code.'];
      const output = linkify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0]).toEqual(input[0]);
      expect(output[1].type).toEqual('a');
      expect(output[1].props.href).toEqual(input[1]);
      expect(output[1].props.children).toEqual(input[1]);
      expect(output[2]).toEqual(input[2]);
    });

    it('should parse url in end of text', () => {
      const input = ['The React source code is located at ', 'https://github.com/facebook/react'];
      const output = linkify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0]).toEqual(input[0]);
      expect(output[1].type).toEqual('a');
      expect(output[1].props.href).toEqual(input[1]);
      expect(output[1].props.children).toEqual(input[1]);
    });
  });

  describe('#parse', () => {
    const linkify = ReactTestUtils.renderIntoDocument(<Linkify>test</Linkify>);

    it('should not parse <a> elements', () => {
      const input = (
        <a href="http://facebook.github.io/react/">
          http://facebook.github.io/react/
        </a>
      );
      const output = linkify.parse(input);

      expect(output).toEqual(input);
    });

    it('should not parse <button> elements', () => {
      const input = <button>http://facebook.github.io/react/</button>;
      const output = linkify.parse(input);

      expect(output).toEqual(input);
    });

    it('should parse email', () => {
      const input = 'tasti@zakarie.com';
      const output = linkify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.href).toEqual(`mailto:${input}`);
      expect(output.props.children).toEqual(input);
    });

    it('should parse email in sentence', () => {
      const input = ['For more information, contact ', 'tasti@zakarie.com', '.'];
      const output = linkify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0]).toEqual(input[0]);
      expect(output[1].type).toEqual('a');
      expect(output[1].props.href).toEqual(`mailto:${input[1]}`);
      expect(output[1].props.children).toEqual(input[1]);
      expect(output[2]).toEqual(input[2]);
    });

    it('should parse complex urls', () => {
      const input = [
        'For more information ',
        'https://www.wayfair.de/dCor-design---DCOO1623-L6-K~DCOO1623.html?refid=MODE368-DCOO1623_21727408&PiID%5B%5D=21727408',
        '.',
      ];

      const output = linkify.parseString(input.join(''));
      expect(output[1].props.children).toEqual(input[1]);
    });
  });

  describe('#render', () => {
    it('should render correctly (start)', () => {
      const tree = renderer
        .create(<Linkify>https://github.com/facebook/react is the location to the React source code.</Linkify>)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly (middle)', () => {
      const tree = renderer
        .create(<Linkify>Go to https://github.com/facebook/react for the React source code.</Linkify>)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('should render correctly (end)', () => {
      const tree = renderer
        .create(<Linkify>The React source code is located at https://github.com/facebook/react</Linkify>)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it('testing', () => {
      const tree = renderer
        .create(<React.Fragment>The React source code is located at <bold>woah</bold></React.Fragment>)
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    // it('should render with default className of Linkify if one is not provided', () => {
    //   const linkify = ReactTestUtils.renderIntoDocument(<Linkify></Linkify>);
    //   expect(linkify.props.className).toEqual('Linkify');
    // });

    // it('should render with a custom className if one is provided', () => {
    //   const linkify = ReactTestUtils.renderIntoDocument(<Linkify className="custom-class"></Linkify>);

    //   expect(linkify.props.className).toEqual('custom-class');
    // });
  });

  describe('#static', () => {
    //const Linkify = require('../Linkify.jsx');
  });
});
