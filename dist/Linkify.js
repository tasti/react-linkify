'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _linkifyIt = require('linkify-it');

var _linkifyIt2 = _interopRequireDefault(_linkifyIt);

var _tlds = require('tlds');

var _tlds2 = _interopRequireDefault(_tlds);

var linkify = new _linkifyIt2['default']();
linkify.tlds(_tlds2['default']).set({ fuzzyLink: false }).add('@', {
  validate: function validate(text, pos, self) {
    var tail = text.slice(pos);

    if (!self.re.imgurUser) {
      self.re.imgurUser = new RegExp('^([a-zA-Z0-9_]){1,15}(?!_)(?=$|' + self.re.src_ZPCc + ')');
    }
    if (self.re.imgurUser.test(tail)) {
      // Linkifier allows punctuation chars before prefix,
      // but we additionally disable `@` ("@@mention" is invalid)
      if (pos >= 2 && tail[pos - 2] === '@') {
        return false;
      }
      return tail.match(self.re.imgurUser)[0].length;
    }
    return 0;
  },
  normalize: function normalize(match) {
    match.url = '//imgur.com/user/' + match.url.replace(/^@/, '');
  }
});

var Linkify = (function (_React$Component) {
  _inherits(Linkify, _React$Component);

  function Linkify() {
    _classCallCheck(this, Linkify);

    _get(Object.getPrototypeOf(Linkify.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Linkify, [{
    key: 'getMatches',
    value: function getMatches(string) {
      return linkify.match(string);
    }
  }, {
    key: 'parseString',
    value: function parseString(string) {
      var elements = [];
      if (string === '') {
        return elements;
      }

      var matches = this.getMatches(string);
      if (!matches) {
        return string;
      }

      var lastIndex = 0;
      for (var i = 0; i < matches.length; i++) {
        var match = matches[i];
        // Push the preceding text if there is any
        if (match.index > lastIndex) {
          elements.push(string.substring(lastIndex, match.index));
        }
        // Shallow update values that specified the match
        var props = { href: match.url, key: Linkify.uniqueKey() };
        for (var key in this.props.properties) {
          var val = this.props.properties[key];
          if (val === Linkify.MATCH) {
            val = match.url;
          }

          props[key] = val;
        }
        elements.push(_react2['default'].createElement(this.props.component, props, match.text));
        lastIndex = match.lastIndex;
      }

      if (lastIndex !== string) {
        elements.push(string.substring(lastIndex));
      }

      return elements.length === 1 ? elements[0] : elements;
    }
  }, {
    key: 'parse',
    value: function parse(children) {
      var _this = this;

      var parsed = children;

      if (typeof children === 'string') {
        parsed = this.parseString(children);
      } else if (_react2['default'].isValidElement(children) && children.type !== 'a' && children.type !== 'button') {
        parsed = _react2['default'].cloneElement(children, { key: Linkify.uniqueKey() }, this.parse(children.props.children));
      } else if (children instanceof Array) {
        parsed = children.map(function (child) {
          return _this.parse(child);
        });
      }

      return parsed;
    }
  }, {
    key: 'render',
    value: function render() {
      var parsedChildren = this.parse(this.props.children);

      return _react2['default'].createElement(
        'span',
        { className: 'Linkify' },
        parsedChildren
      );
    }
  }], [{
    key: 'uniqueKey',
    value: function uniqueKey() {
      return 'LINKIFY_KEY_' + ++Linkify.keyCounter;
    }
  }, {
    key: 'MATCH',
    value: 'LINKIFY_MATCH',
    enumerable: true
  }, {
    key: 'keyCounter',
    value: 0,
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      component: _react2['default'].PropTypes.any,
      properties: _react2['default'].PropTypes.object,
      urlRegex: _react2['default'].PropTypes.object,
      emailRegex: _react2['default'].PropTypes.object
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      component: 'a',
      properties: {}
    },
    enumerable: true
  }]);

  return Linkify;
})(_react2['default'].Component);

exports['default'] = Linkify;
module.exports = exports['default'];
