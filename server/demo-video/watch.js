// Просмотр считаем из браузера: превью ссылок в мессенджерах скрипты не запускают.
(function () {
  var id = document.currentScript && document.currentScript.dataset.id;
  if (!id) return;
  fetch('/api/videos/' + encodeURIComponent(id) + '/view', { method: 'POST', keepalive: true }).catch(function () {});
})();
