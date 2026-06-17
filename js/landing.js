function toggleFaq(button) {
  const item = button.parentElement;
  item.classList.toggle('open');
}

(function() {
  // 8 de junio de 2026, 23:59:59 hora Argentina = UTC-3
  // En UTC: 9 de junio de 2026 02:59:59
  var deadline = new Date('2026-06-09T02:59:59Z').getTime();

  function padTwo(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function tick() {
    var now = Date.now();
    var diff = deadline - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent  = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent  = '00';
      document.getElementById('cd-secs').textContent  = '00';
      return;
    }

    var days  = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins  = Math.floor((diff % 3600000)  / 60000);
    var secs  = Math.floor((diff % 60000)    / 1000);

    document.getElementById('cd-days').textContent  = padTwo(days);
    document.getElementById('cd-hours').textContent = padTwo(hours);
    document.getElementById('cd-mins').textContent  = padTwo(mins);
    document.getElementById('cd-secs').textContent  = padTwo(secs);
  }

  tick();
  setInterval(tick, 1000);
})();
