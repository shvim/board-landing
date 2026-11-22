// Scales each artboard to fit the window width; the boards keep their true iPad size inside.
(function () {
  function fit() {
    document.querySelectorAll('.board').forEach(function (board) {
      var w = parseFloat(getComputedStyle(board).getPropertyValue('--w'));
      var avail = board.clientWidth;
      var s = Math.min(1, avail / w);
      board.querySelector('.frame').style.setProperty('--s', s.toFixed(4));
    });
  }
  window.addEventListener('resize', fit);
  fit();
})();
