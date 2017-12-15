js-animate-scroll
=================

[![Build Status](https://travis-ci.org/bupy7/js-animate-scroll.svg?branch=master)](https://travis-ci.org/bupy7/js-animate-scroll)
[![Coverage Status](https://coveralls.io/repos/github/bupy7/js-animate-scroll/badge.svg?branch=master)](https://coveralls.io/github/bupy7/js-animate-scroll?branch=master)

> This is fork of [animate-scroll-js](https://github.com/sunmockyang/animate-scroll-js).

Lightweight javascript library to animate vertical scrolling to a specified element without jQuery.

Click [HERE](http://bupy7.github.io/js-animate-scroll/) for the DEMO.

Install
-------

Via [NPM](https://www.npmjs.com/):

```bash
$ npm install js-animate-scroll
```

Usage
-----

```js
var options = {
    duration: 200,
    easing: 'linear',
    padding: 0,
    align: 'top',
    onFinish: function () {}
};
new AnimateScroll('#some-select-element', options);
```

- `target` - Specifies the DOM element, or an element selector, or a page offset value (px) to scroll to.
- `options` - Additional configuration for scrolling:
    - `duration` - How long the scroll animation lasts in milliseconds. Default: 200;
    - `easing` - Easing type for scroll animation. See below for options Default: linear. (string);
    - `padding` - How much space in pixels from the top of the specified element to scroll to. Default: 0;
    - `align` - Can be set to `top`, `center`, `bottom` and scroll will animate to the target aligned as specified within the window. Default `top` (string);
    - `onFinish` - Callback function to run when the animation is finished or cancelled.



Easing
------

There are available easing functions:
 
- `linear`
- `easeInQuad`
- `easeOutQuad`
- `easeInOutQuad`
- `easeInCubic`
- `easeOutCubic`
- `easeInOutCubic`
- `easeInQuart`
- `easeOutQuart`
- `easeInOutQuart`
- `easeInQuint`
- `easeOutQuint`
- `easeInOutQuint`

Notes
-----

> If the user manually scrolls during the scroll animation, the animation will cancel and the onFinish function will run

Build
-----

### Using Docker

Run dev environment:

```bash
$ docker-compose up
```

Run Grunt:

```bash
$ docker-compose run --rm ext npm run build
```

### Using locale dev environment

```bash
$ npm install
$ npm run build
```

Run tests
---------

### Using Docker

```bash
$ docker-compose run --rm ext npm run test:run-without-coverage
```

### Using locale dev environment

```bash
$ npm run test
```

License
-------

js-animate-scroll is released under the MIT License.
