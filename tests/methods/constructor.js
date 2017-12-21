describe('constructor', function () {
  it('must work with element selector', function (done) {
    // eslint-disable-next-line no-new
    new window.AnimateScroll('.break-3', {
      onFinish: function () {
        done()
      }
    })
  })

  it('must work with object of target', function (done) {
    // eslint-disable-next-line no-new
    new window.AnimateScroll(document.querySelector('.break-3'), {
      onFinish: function () {
        done()
      }
    })
  })

  it('must work with pixels', function (done) {
    // eslint-disable-next-line no-new
    new window.AnimateScroll(200, {
      onFinish: function () {
        done()
      }
    })
  })
})
