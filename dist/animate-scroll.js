(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('AnimateScroll', ['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global['AnimateScroll'] = mod.exports.default;
  }
})(this, function (exports) {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnimateScroll = function () {
  _createClass(AnimateScroll, [{
    key: 'DEFAULT_EASING_EFFECT',

    /**
     * @returns {String}
     */
    get: function get() {
      return 'linear';
    }

    /**
     * @returns {Array.<String, Function>}
     */

  }, {
    key: 'EASING_EFFECTS',
    get: function get() {
      return {
        /**
         * @param {float} t
         * @returns {float}
         */
        linear: function linear(t) {
          return t;
        },
        /**
         * @param {float} t
         * @returns {float}
         */
        easeInQuad: function easeInQuad(t) {
          return Math.pow(t, 2);
        },
        /**
         * @param {float} t
         * @returns {float}
         */
        easeOutQuad: function easeOutQuad(t) {
          return t * (2 - t);
        },
        /**
         * @param {float} t
         * @returns {float}
         */
        easeInOutQuad: function easeInOutQuad(t) {
          if (t < 0.5) {
            return 2 * Math.pow(t, 2);
          }
          return -1 + (4 - 2 * t) * t;
        },
        /**
         * @param {float} t
         * @returns {float}
         */
        easeInCubic: function easeInCubic(t) {
          return Math.pow(t, 3);
        },
        /**
         * @param {float} t
         * @returns {float}
         */
        easeOutCubic: function easeOutCubic(t) {
          return --t * Math.pow(t, 2) + 1;
        },
        /**
         * @param {float} t
         * @returns {float}
         */
        easeInOutCubic: function easeInOutCubic(t) {
          if (t < 0.5) {
            return 4 * Math.pow(t, 3);
          }
          return (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        },
        /**
         * @param {float} t
         * @returns {float}
         */
        easeInQuart: function easeInQuart(t) {
          return Math.pow(t, 4);
        },
        /**
         * @param {float} t
         * @returns {float}
         */
        easeOutQuart: function easeOutQuart(t) {
          return 1 - --t * Math.pow(t, 3);
        },
        /**
         * @param {float} t
         * @returns {float}
         */
        easeInOutQuart: function easeInOutQuart(t) {
          if (t < 0.5) {
            return 8 * Math.pow(t, 4);
          }
          return 1 - 8 * --t * Math.pow(t, 3);
        },
        /**
         * @param {float} t
         * @returns {float}
         */
        easeInQuint: function easeInQuint(t) {
          return Math.pow(t, 5);
        },
        /**
         * @param {float} t
         * @returns {float}
         */
        easeOutQuint: function easeOutQuint(t) {
          return 1 + --t * Math.pow(t, 4);
        },
        /**
         * @param {float} t
         * @returns {float}
         */
        easeInOutQuint: function easeInOutQuint(t) {
          if (t < 0.5) {
            return 16 * Math.pow(t, 5);
          }
          return 1 + 16 * --t * Math.pow(t, 4);
        }
      };
    }
  }, {
    key: 'ALIGN_CENTER',
    get: function get() {
      return 'center';
    }
  }, {
    key: 'ALIGN_BOTTOM',
    get: function get() {
      return 'bottom';
    }
  }, {
    key: 'ALIGN_TOP',
    get: function get() {
      return 'top';
    }

    /**
     * @param {HTMLElement|String|Number} target
     * @param {Object} [options]
     * @param {integer} [options.padding]
     * @param {String} [options.align]
     * @param {Function} [options.onFinish]
     * @param {String} [options.easing]
     * @param {integer} [options.duration]
     * @constructor
     */

  }]);

  function AnimateScroll(target, options) {
    _classCallCheck(this, AnimateScroll);

    /**
     * @type {HTMLElement|Number}
     * @private
     */
    this._target = null;
    /**
     * @type {integer}
     * @private
     */
    this._padding = 0;
    /**
     * @type {String}
     * @private
     */
    this._align = this.ALIGN_TOP;
    /**
     * @type {Function}
     * @private
     */
    this._onFinish = function () {};
    /**
     * @type {float}
     * @private
     */
    this._easing = this.EASING_EFFECTS[this.DEFAULT_EASING_EFFECT];
    /**
     * @type {integer}
     * @private
     */
    this._duration = 200;

    this._configuration(target, options || {});
    this._run();
  }

  _createClass(AnimateScroll, [{
    key: '_configuration',
    value: function _configuration(target, options) {
      this._target = typeof target === 'string' ? document.querySelector(target) : target;

      if (options.padding !== undefined && options.padding >= 0) {
        this._padding = options.padding;
      }

      if (options.align !== undefined) {
        this._align = options.align;
      }

      if (typeof options.onFinish === 'function') {
        this._onFinish = options.onFinish;
      }

      if (options.easing !== undefined && this.EASING_EFFECTS[options.easing] !== undefined) {
        this._easing = this.EASING_EFFECTS[options.easing];
      }

      if (options.duration !== undefined && options.duration >= 0) {
        this._duration = options.duration;
      }
    }
  }, {
    key: '_run',
    value: function _run() {
      var docElem = document.documentElement; // to facilitate minification better
      var windowHeight = docElem.clientHeight;
      var maxScroll = window['scrollMaxY'] !== undefined ? window.scrollMaxY : docElem.scrollHeight - windowHeight;
      var currentY = window.pageYOffset;

      var targetY = isNaN(this._target) ? currentY : this._target;
      var elementBounds = isNaN(this._target) ? this._target.getBoundingClientRect() : 0;

      if (this._align === this.ALIGN_CENTER) {
        targetY += isNaN(this._target) ? elementBounds.top + elementBounds.height / 2 : this._target;
        targetY -= windowHeight / 2;
        targetY -= this._padding;
      } else if (this._align === this.ALIGN_BOTTOM) {
        targetY += elementBounds.bottom || this._target;
        targetY -= windowHeight;
        targetY += this._padding;
      } else {
        // top
        targetY += elementBounds.top || this._target;
        targetY -= this._padding;
      }
      targetY = Math.max(Math.min(maxScroll, targetY), 0);

      var deltaY = targetY - currentY;

      var callback = {
        targetY: targetY,
        deltaY: deltaY,
        duration: this._duration,
        easing: this._easing,
        onFinish: this._onFinish,
        startTime: Date.now(),
        lastY: currentY,
        step: function step() {
          var stop = false;
          if (this.deltaY > 0) {
            stop = this.targetY <= this.lastY;
          } else {
            stop = this.targetY >= this.lastY;
          }
          if (stop) {
            this.onFinish();
            return;
          }

          // Calculate how much time has passed
          var t = Math.min((Date.now() - this.startTime) / this.duration, 1);

          // Scroll window amount determined by easing
          var y = this.targetY - (1 - this.easing(t)) * this.deltaY;
          window.scrollTo(window.scrollX, y);

          // Continue animation as long as duration hasn't surpassed
          if (t !== 1) {
            this.lastY = window.pageYOffset;
            window.requestAnimationFrame(this.step.bind(this));
          } else {
            this.onFinish();
          }
        }
      };
      window.requestAnimationFrame(callback.step.bind(callback));
    }
  }]);

  return AnimateScroll;
}();

exports.default = AnimateScroll;


});
