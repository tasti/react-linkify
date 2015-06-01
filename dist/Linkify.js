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
    key: 'parseStringHelper',
    value: function parseStringHelper(string, elements) {
      if (string === '') {
        return elements;
      }

      var urlIdx = string.search(this.props.urlRegex);
      var emailIdx = string.search(this.props.emailRegex);

      if (urlIdx === -1 && emailIdx === -1) {
        elements.push(string);
        return this.parseStringHelper('', elements);
      } else if (urlIdx === -1) {
        urlIdx = emailIdx + 1;
      } else if (emailIdx === -1) {
        emailIdx = urlIdx + 1;
      }

      var idx = undefined,
          regex = undefined;
      if (urlIdx < emailIdx) {
        idx = urlIdx;
        regex = this.props.urlRegex;
      } else {
        // Email has precedence over url when equal
        idx = emailIdx;
        regex = this.props.emailRegex;
      }

      var match = string.match(regex)[0];
      var len = match.length;

      // Push the preceding text if there is any
      if (idx > 0) {
        elements.push(string.substring(0, idx));
      }

      // Shallow update values that specified the match
      var props = {};
      for (var key in this.props.properties) {
        var val = this.props.properties[key];
        if (val === Linkify.MATCH) {
          val = idx === emailIdx ? 'mailto:' + match : match;
        }

        props[key] = val;
      }

      elements.push(_react2['default'].createElement(this.props.component, props, match));

      return this.parseStringHelper(string.substring(idx + len), elements);
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
    key: 'MATCH',
    value: 'LINKIFY_MATCH',
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
      properties: { href: 'LINKIFY_MATCH' },
      urlRegex: /\b(?:(?:https):\/\/|[-A-Z0-9+&@#/%=~_|$?!:,.]+\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/i,
      emailRegex: /\S+@\S+\.\S+/ // TODO: Use a more rigorous regex
    },
    enumerable: true
  }]);

  return Linkify;
})(_react2['default'].Component);

exports['default'] = Linkify;
module.exports = exports['default'];
