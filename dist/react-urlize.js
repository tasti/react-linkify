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

var Urlize = (function (_React$Component) {
  function Urlize() {
    _classCallCheck(this, Urlize);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Urlize, _React$Component);

  _createClass(Urlize, [{
    key: 'parse',
    value: function parse(text) {
      var words = text.split(' ');

      words = words.map(function (word) {
        if (word.match(/^https?:\/\/\w/i)) {
          word = '<a href="' + word + '">' + word + '</a>';
        }

        return word;
      });

      return words.join(' ');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('span', { dangerouslySetInnerHTML: { __html: this.parse(this.props.children) } });
    }
  }]);

  return Urlize;
})(_react2['default'].Component);

exports['default'] = Urlize;
module.exports = exports['default'];
