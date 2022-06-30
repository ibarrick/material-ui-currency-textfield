'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var AutoNumeric = _interopDefault(require('autonumeric'));
var styles$1 = require('@mui/styles');
var material = require('@mui/material');

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var styles = function styles(theme) {
  return {
    textField: function textField(props) {
      return {
        textAlign: props.textAlign || "right"
      };
    }
  };
};

/**
 * CurrencyTextField is a [react](https://reactjs.org/) component with automated currency and number format, and with [Material-ui](https://material-ui.com/) look and feel.
 *
 * CurrencyTextField is a wrapper component for <a href="https://github.com/autoNumeric/autoNumeric">autonumeric</a> and based on <a href="https://github.com/mkg0/react-numeric">react-numeric</a>.
 *
 * Main features:
 * * Adds thousands separator automatically.
 * * Adds automatically the decimals on blur.
 * * Smart input. User can only type the accepted characters depending on the current value.
 * * Lots of config options...
 * * It accepts all the `props` and `classes` of Material-Ui <a href="https://material-ui.com/api/text-field/#textfield-api">TextField API</a> (Ex: classes, label, helperText, variant).
 * * And also all the `options` from <a href="http://autonumeric.org/guide">AutoNumeric</a>
 */

var CurrencyTextField = function (_React$Component) {
  inherits(CurrencyTextField, _React$Component);

  function CurrencyTextField(props) {
    classCallCheck(this, CurrencyTextField);

    var _this = possibleConstructorReturn(this, (CurrencyTextField.__proto__ || Object.getPrototypeOf(CurrencyTextField)).call(this, props));

    _this.getValue = _this.getValue.bind(_this);
    _this.callEventHandler = _this.callEventHandler.bind(_this);
    return _this;
  }

  createClass(CurrencyTextField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          currencySymbol = _props.currencySymbol,
          others = objectWithoutProperties(_props, ["currencySymbol"]);

      this.autonumeric = new AutoNumeric(this.input, this.props.value, _extends({}, this.props.preDefined, others, {
        onChange: undefined,
        onFocus: undefined,
        onBlur: undefined,
        onKeyPress: undefined,
        onKeyUp: undefined,
        onKeyDown: undefined,
        watchExternalChanges: false
      }));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.autonumeric.remove();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      var isValueChanged = this.props.value !== newProps.value && this.getValue() !== newProps.value;

      if (isValueChanged) {
        this.autonumeric.set(newProps.value);
      }
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (!this.autonumeric) return;
      var valueMapper = {
        string: function string(numeric) {
          return numeric.getNumericString();
        },
        number: function number(numeric) {
          return numeric.getNumber();
        }
      };
      return valueMapper[this.props.outputFormat](this.autonumeric);
    }
  }, {
    key: "callEventHandler",
    value: function callEventHandler(event, eventName) {
      if (!this.props[eventName]) return;
      this.props[eventName](event, this.getValue());
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          classes = _props2.classes,
          currencySymbol = _props2.currencySymbol,
          inputProps = _props2.inputProps,
          InputProps = _props2.InputProps,
          others = objectWithoutProperties(_props2, ["classes", "currencySymbol", "inputProps", "InputProps"]);


      var otherProps = {};["id", "label", "className", "autoFocus", "variant", "style", "error", "disabled", "type", "name", "defaultValue", "tabIndex", "fullWidth", "rows", "rowsMax", "select", "required", "helperText", "unselectable", "margin", "SelectProps", "multiline", "size", "FormHelperTextProps", "placeholder"].forEach(function (prop) {
        return otherProps[prop] = _this2.props[prop];
      });

      return React.createElement(material.TextField, _extends({
        inputRef: function inputRef(ref) {
          return _this2.input = ref;
        },
        onChange: function onChange(e) {
          return _this2.callEventHandler(e, "onChange");
        },
        onFocus: function onFocus(e) {
          return _this2.callEventHandler(e, "onFocus");
        },
        onBlur: function onBlur(e) {
          return _this2.callEventHandler(e, "onBlur");
        },
        onKeyPress: function onKeyPress(e) {
          return _this2.callEventHandler(e, "onKeyPress");
        },
        onKeyUp: function onKeyUp(e) {
          return _this2.callEventHandler(e, "onKeyUp");
        },
        onKeyDown: function onKeyDown(e) {
          return _this2.callEventHandler(e, "onKeyDown");
        },
        InputProps: _extends({
          startAdornment: React.createElement(
            material.InputAdornment,
            { position: "start" },
            currencySymbol
          )
        }, InputProps),
        inputProps: _extends({
          className: classes.textField
        }, inputProps)
      }, otherProps));
    }
  }]);
  return CurrencyTextField;
}(React.Component);

CurrencyTextField.propTypes = {
  type: PropTypes.oneOf(["text", "tel", "hidden"]),
  /** The variant to use. */
  variant: PropTypes.string,
  id: PropTypes.string,
  /** The CSS class name of the wrapper element. */
  className: PropTypes.string,
  /** Inline styling for element */
  style: PropTypes.object,
  /** If true, the input element will be disabled. */
  disabled: PropTypes.bool,
  /** The label content. */
  label: PropTypes.string,
  /** Align the numbers in the textField.
   * If you pass the `inputProps` from TextFieldAPI text align won't work.
   * then, you have handle it by className with your own class inside inputProps.
   */
  textAlign: PropTypes.oneOf(["right", "left", "center"]),
  /** Tab index for the element */
  tabIndex: PropTypes.number,
  /** If true, the input element will be focused during the first mount. */
  autoFocus: PropTypes.bool,
  /** The short hint displayed in the input before the user enters a value. */
  placeholder: PropTypes.string,
  /** value to be enter and display in input */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Callback fired when the value is changed. */
  onChange: PropTypes.func,
  /** Callback fired when focused on element. */
  onFocus: PropTypes.func,
  /** Callback fired on blur. */
  onBlur: PropTypes.func,
  /** Callback fired on key press. */
  onKeyPress: PropTypes.func,
  /** Callback fired on key press. */
  onKeyUp: PropTypes.func,
  /** Callback fired on key press. */
  onKeyDown: PropTypes.func,
  /** Defines the currency symbol string. */
  currencySymbol: PropTypes.string,
  /** Defines what decimal separator character is used. */
  decimalCharacter: PropTypes.string,
  /** Allow to declare an alternative decimal separator which is automatically replaced by `decimalCharacter` when typed. */
  decimalCharacterAlternative: PropTypes.string,
  /** Defines the default number of decimal places to show on the formatted value. */
  decimalPlaces: PropTypes.number,
  /** Defines how many decimal places should be visible when the element is unfocused null. */
  decimalPlacesShownOnBlur: PropTypes.number,
  /** Defines how many decimal places should be visible when the element has the focus. */
  decimalPlacesShownOnFocus: PropTypes.number,
  /** Defines the thousand grouping separator character */
  digitGroupSeparator: PropTypes.string,
  /** Controls the leading zero behavior   */
  leadingZero: PropTypes.oneOf(["allow", "deny", "keep"]),
  /** maximum value that can be enter */
  maximumValue: PropTypes.string,
  /** minimum value that can be enter */
  minimumValue: PropTypes.string,
  /** placement of the negitive and possitive sign symbols */
  negativePositiveSignPlacement: PropTypes.oneOf(["l", "r", "p", "s"]),
  /** Defines the negative sign symbol to use   */
  negativeSignCharacter: PropTypes.string,
  /** how the value should be formatted,before storing it */
  outputFormat: PropTypes.oneOf(["string", "number"]),
  /** Defines if the element value should be selected on focus. */
  selectOnFocus: PropTypes.bool,
  /** Defines the positive sign symbol to use. */
  positiveSignCharacter: PropTypes.string,
  /** Defines if the element should be set as read only on initialization. */
  readOnly: PropTypes.bool,
  /** predefined objects are available in <a href="https://www.nodenpm.com/autonumeric/4.5.1/detail.html#predefined-options">AutoNumeric</a>*/
  preDefined: PropTypes.object
};

CurrencyTextField.defaultProps = {
  type: "text",
  variant: "standard",
  currencySymbol: "$",
  outputFormat: "number",
  textAlign: "right",
  maximumValue: "10000000000000",
  minimumValue: "-10000000000000"
};
var CurrencyTextField$1 = styles$1.withStyles(styles)(CurrencyTextField);

var predefinedOptions = AutoNumeric.getPredefinedOptions();

module.exports = CurrencyTextField$1;
