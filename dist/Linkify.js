'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

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

      elements.push(_react2['default'].createElement(this.props.component, _Object$assign(props, { key: Linkify.uniqueKey() }), match));

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
      properties: { href: 'LINKIFY_MATCH' },
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
