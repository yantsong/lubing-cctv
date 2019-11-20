export  function debounce(func, wait) {
    var timeout;
    return function () {
      var context = this;
      clearTimeout(timeout)
      timeout = setTimeout(function () {
        func.apply(context)
      }, wait);
    }
  }