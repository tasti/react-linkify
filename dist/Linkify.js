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
  }

  _inherits(Linkify, _React$Component);

  _createClass(Linkify, [{
    key: 'parseString',
    value: function parseString(string) {
      var elements = [];

      while (string.search(Linkify.regex.url) !== -1) {
        var match = string.match(Linkify.regex.url)[0];
        var idx = string.search(Linkify.regex.url);
        var len = match.length;

        if (idx > 0) {
          elements.push(string.substring(0, idx));
        }
        string = string.substring(idx + len);

        elements.push(_react2['default'].createElement('a', { href: match }, match));
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
      } else if (_react2['default'].isValidElement(children)) {
        parsed = _react2['default'].cloneElement(children, {}, this.parse(children.props.children));
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
    key: 'regex',
    value: {
      url: /\b(?:(?:https?):\/\/|[-A-Z0-9+&@#/%=~_|$?!:,.]+\.)[-A-Z0-9+&@#/%=~_|$?!:,.]*[A-Z0-9+&@#/%=~_|$]/i
    },
    enumerable: true
  }]);

  return Linkify;
})(_react2['default'].Component);

exports['default'] = Linkify;
module.exports = exports['default'];
