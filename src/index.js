class AnimateScroll {
  /**
   * @returns {String}
   */
  get DEFAULT_EASING_EFFECT () {
    return 'linear'
  }

  /**
   * @returns {Array.<String, Function>}
   */
  get EASING_EFFECTS () {
    return {
      /**
       * @param {float} t
       * @returns {float}
       */
      linear: function (t) {
        return t
      },
      /**
       * @param {float} t
       * @returns {float}
       */
      easeInQuad: function (t) {
        return Math.pow(t, 2)
      },
      /**
       * @param {float} t
       * @returns {float}
       */
      easeOutQuad: function (t) {
        return t * (2 - t)
      },
      /**
       * @param {float} t
       * @returns {float}
       */
      easeInOutQuad: function (t) {
        if (t < 0.5) {
          return 2 * Math.pow(t, 2)
        }
        return -1 + (4 - 2 * t) * t
      },
      /**
       * @param {float} t
       * @returns {float}
       */
      easeInCubic: function (t) {
        return Math.pow(t, 3)
      },
      /**
       * @param {float} t
       * @returns {float}
       */
      easeOutCubic: function (t) {
        return (--t) * Math.pow(t, 2) + 1
      },
      /**
       * @param {float} t
       * @returns {float}
       */
      easeInOutCubic: function (t) {
        if (t < 0.5) {
          return 4 * Math.pow(t, 3)
        }
        return (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      },
      /**
       * @param {float} t
       * @returns {float}
       */
      easeInQuart: function (t) {
        return Math.pow(t, 4)
      },
      /**
       * @param {float} t
       * @returns {float}
       */
      easeOutQuart: function (t) {
        return 1 - (--t) * Math.pow(t, 3)
      },
      /**
       * @param {float} t
       * @returns {float}
       */
      easeInOutQuart: function (t) {
        if (t < 0.5) {
          return 8 * Math.pow(t, 4)
        }
        return 1 - 8 * (--t) * Math.pow(t, 3)
      },
      /**
       * @param {float} t
       * @returns {float}
       */
      easeInQuint: function (t) {
        return Math.pow(t, 5)
      },
      /**
       * @param {float} t
       * @returns {float}
       */
      easeOutQuint: function (t) {
        return 1 + (--t) * Math.pow(t, 4)
      },
      /**
       * @param {float} t
       * @returns {float}
       */
      easeInOutQuint: function (t) {
        if (t < 0.5) {
          return 16 * Math.pow(t, 5)
        }
        return 1 + 16 * (--t) * Math.pow(t, 4)
      }
    }
  }

  get ALIGN_CENTER () {
    return 'center'
  }

  get ALIGN_BOTTOM () {
    return 'bottom'
  }

  get ALIGN_TOP () {
    return 'top'
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
  constructor (target, options) {
    /**
     * @type {HTMLElement|Number}
     * @private
     */
    this._target = null
    /**
     * @type {integer}
     * @private
     */
    this._padding = 0
    /**
     * @type {String}
     * @private
     */
    this._align = this.ALIGN_TOP
    /**
     * @type {Function}
     * @private
     */
    this._onFinish = function () {}
    /**
     * @type {float}
     * @private
     */
    this._easing = this.EASING_EFFECTS[this.DEFAULT_EASING_EFFECT]
    /**
     * @type {integer}
     * @private
     */
    this._duration = 200

    this._configuration(target, options || {})
    this._run()
  }

  _configuration (target, options) {
    this._target = typeof target === 'string' ? document.querySelector(target) : target

    if (options.padding !== undefined && options.padding >= 0) {
      this._padding = options.padding
    }

    if (options.align !== undefined) {
      this._align = options.align
    }

    if (typeof options.onFinish === 'function') {
      this._onFinish = options.onFinish
    }

    if (options.easing !== undefined && this.EASING_EFFECTS[options.easing] !== undefined) {
      this._easing = this.EASING_EFFECTS[options.easing]
    }

    if (options.duration !== undefined && options.duration >= 0) {
      this._duration = options.duration
    }
  }

  _run () {
    let docElem = document.documentElement // to facilitate minification better
    let windowHeight = docElem.clientHeight
    let maxScroll = window['scrollMaxY'] !== undefined ? window.scrollMaxY : docElem.scrollHeight - windowHeight
    let currentY = window.pageYOffset

    let targetY = isNaN(this._target) ? currentY : this._target
    let elementBounds = isNaN(this._target) ? this._target.getBoundingClientRect() : 0

    if (this._align === this.ALIGN_CENTER) {
      targetY += isNaN(this._target) ? (elementBounds.top + elementBounds.height / 2) : this._target
      targetY -= windowHeight / 2
      targetY -= this._padding
    } else if (this._align === this.ALIGN_BOTTOM) {
      targetY += elementBounds.bottom || this._target
      targetY -= windowHeight
      targetY += this._padding
    } else { // top
      targetY += elementBounds.top || this._target
      targetY -= this._padding
    }
    targetY = Math.max(Math.min(maxScroll, targetY), 0)

    let deltaY = targetY - currentY

    let callback = {
      targetY: targetY,
      deltaY: deltaY,
      duration: this._duration,
      easing: this._easing,
      onFinish: this._onFinish,
      startTime: Date.now(),
      lastY: currentY,
      step: function () {
        var stop = false
        if (this.deltaY > 0) {
          stop = this.targetY <= this.lastY
        } else {
          stop = this.targetY >= this.lastY
        }
        if (stop) {
          this.onFinish()
          return
        }

        // Calculate how much time has passed
        let t = Math.min((Date.now() - this.startTime) / this.duration, 1)

        // Scroll window amount determined by easing
        let y = this.targetY - ((1 - this.easing(t)) * (this.deltaY))
        window.scrollTo(window.scrollX, y)

        // Continue animation as long as duration hasn't surpassed
        if (t !== 1) {
          this.lastY = window.pageYOffset
          window.requestAnimationFrame(this.step.bind(this))
        } else {
          this.onFinish()
        }
      }
    }
    window.requestAnimationFrame(callback.step.bind(callback))
  }
}

export default AnimateScroll
