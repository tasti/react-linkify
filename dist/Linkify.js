'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Linkify = (function (_React$Component) {
  function Linkify() {
    _classCallCheck(this, Linkify);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }

    this.matchings = [{ type: 'email', regex: this.props.emailRegex }, { type: 'url', regex: this.props.urlRegex }];
  }

  _inherits(Linkify, _React$Component);

  _createClass(Linkify, [{
    key: 'getMatch',
    value: function getMatch(string) {
      for (var i = 0; i < this.matchings.length; ++i) {
        var matching = this.matchings[i];
        var idx = string.search(matching.regex);

        if (idx !== -1) {
          var str = string.match(matching.regex)[0];

          return {
            str: str,
            type: matching.type,
            idx: idx,
            len: str.length
          };
        }
      }

      return false;
    }
  }, {
    key: 'formatLink',
    value: function formatLink(match) {
      if (match.type === 'email') {
        return 'mailto:' + match.str;
      } else if (match.type === 'url') {
        if (match.str.substring(0, 4).toLowerCase() === 'http') {
          return match.str;
        } else {
          return 'http://' + match.str;
        }
      }

      return match.str;
    }
  }, {
    key: 'parseStringHelper',
    value: function parseStringHelper(string, elements) {
      if (string === '') {
        return elements;
      }

      var match = this.getMatch(string);
      if (!match) {
        elements.push(string);
        return this.parseStringHelper('', elements);
      }

      // Push the preceding text if there is any
      if (match.idx > 0) {
        elements.push(string.substring(0, match.idx));
      }

      // Shallow update values that specified the match
      var props = { href: this.formatLink(match), key: Linkify.uniqueKey() };
      for (var key in this.props.properties) {
        var val = this.props.properties[key];
        if (val === Linkify.MATCH) {
          val = this.formatLink(match);
        }

        props[key] = val;
      }

      elements.push(_react2['default'].createElement(this.props.component, props, match.str));

      return this.parseStringHelper(string.substring(match.idx + match.len), elements);
    }
  }, {
    key: 'parseString',
    value: function parseString(string) {
      var elements = [];

      this.parseStringHelper(string, elements);

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
    key: 'MATCH',
    value: 'LINKIFY_MATCH',
    enumerable: true
  }, {
    key: 'keyCounter',
    value: 0,
    enumerable: true
  }, {
    key: 'uniqueKey',
    value: function uniqueKey() {
      return 'LINKIFY_KEY_' + ++Linkify.keyCounter;
    }
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
      properties: {},
      // TODO: Improve regexs
      urlRegex: /\b(?:(?:https):\/\/|[-A-Z0-9+&@#/%=~_|$?!:,.]+\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/i,
      emailRegex: /\b[-A-Z0-9+&%=~_|$!.]+@[-A-Z0-9+&%=~_|$!.]+\.[-A-Z0-9+&%=~_|$!]+/i
    },
    enumerable: true
  }]);

  return Linkify;
})(_react2['default'].Component);

exports['default'] = Linkify;
module.exports = exports['default'];

// In order of precedence, for when regexs overlap
