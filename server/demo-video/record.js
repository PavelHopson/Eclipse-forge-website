// Страница записи демо. Отдельный файл, чтобы CSP запрещал встроенные скрипты.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var KEY = 'ef-demo-token';
  var token = '';
  try { token = localStorage.getItem(KEY) || ''; } catch (e) {}

  var supported = !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia && window.MediaRecorder);
  var state = { recorder: null, chunks: [], streams: [], blob: null, mime: '', timer: null, camVideo: null, audioCtx: null };

  function show(id, on) { $(id).hidden = !on; }
  function say(text, isError) { var m = $('msg'); m.textContent = text || ''; m.className = 'msg' + (isError ? ' error' : ''); }
  function api(method, path, body, headers) {
    return fetch(path, { method: method, body: body, headers: Object.assign({ Authorization: 'Bearer ' + token }, headers || {}) });
  }

  function pickMime() {
    var list = ['video/mp4;codecs=avc1.640028,mp4a.40.2', 'video/mp4;codecs=avc1,opus', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
    for (var i = 0; i < list.length; i++) if (MediaRecorder.isTypeSupported(list[i])) return list[i];
    return '';
  }

  function init() {
    if (!supported) { show('unsupported', true); return; }
    if (!token) { show('gate', true); return; }
    show('studio', true);
    loadList();
  }

  $('saveToken').onclick = function () {
    token = $('token').value.trim();
    api('GET', '/api/videos').then(function (r) {
      if (r.status === 401) { $('gateMsg').textContent = 'Ключ не подошёл.'; return; }
      try { localStorage.setItem(KEY, token); } catch (e) {}
      show('gate', false); init();
    }).catch(function () { $('gateMsg').textContent = 'Сервер не отвечает. Попробуйте ещё раз.'; });
  };

  function stopAll() {
    state.streams.forEach(function (s) { s.getTracks().forEach(function (t) { t.stop(); }); });
    state.streams = [];
    if (state.audioCtx) { state.audioCtx.close().catch(function () {}); state.audioCtx = null; }
    if (document.pictureInPictureElement) document.exitPictureInPicture().catch(function () {});
    clearInterval(state.timer);
  }

  async function openCamera() {
    var cam = await navigator.mediaDevices.getUserMedia({ video: { width: 480, height: 480, facingMode: 'user' }, audio: false });
    state.streams.push(cam);
    var v = document.createElement('video');
    v.muted = true; v.playsInline = true; v.srcObject = cam;
    v.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none';
    document.body.appendChild(v);
    state.camVideo = v;
    await v.play();
    if (document.pictureInPictureEnabled) await v.requestPictureInPicture();
  }

  $('start').onclick = async function () {
    say('');
    var mime = pickMime();
    if (!mime) { say('Браузер не умеет записывать видео. Откройте страницу в Chrome или Edge.', true); return; }
    try {
      if ($('useCam').checked) await openCamera();
      var screen = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 30 }, audio: true });
      state.streams.push(screen);
      var tracks = screen.getVideoTracks();
      var audioSources = [];
      if (screen.getAudioTracks().length) audioSources.push(screen);
      if ($('useMic').checked) {
        try {
          var mic = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
          state.streams.push(mic); audioSources.push(mic);
        } catch (e) { say('Микрофон недоступен, пишем без голоса.', true); }
      }
      if (audioSources.length === 1) tracks = tracks.concat(audioSources[0].getAudioTracks());
      if (audioSources.length > 1) {
        var ctx = new AudioContext(); state.audioCtx = ctx;
        var dest = ctx.createMediaStreamDestination();
        audioSources.forEach(function (s) { ctx.createMediaStreamSource(s).connect(dest); });
        tracks = tracks.concat(dest.stream.getAudioTracks());
      }
      var rec = new MediaRecorder(new MediaStream(tracks), { mimeType: mime, videoBitsPerSecond: 4000000 });
      state.recorder = rec; state.chunks = []; state.mime = mime;
      rec.ondataavailable = function (e) { if (e.data && e.data.size) state.chunks.push(e.data); };
      rec.onstop = finish;
      screen.getVideoTracks()[0].addEventListener('ended', function () { if (rec.state !== 'inactive') rec.stop(); });
      rec.start(1000);
      var t0 = Date.now();
      $('timer').textContent = '00:00';
      state.timer = setInterval(function () {
        var s = Math.floor((Date.now() - t0) / 1000);
        $('timer').textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
      }, 500);
      show('setup', false); show('recording', true);
    } catch (e) {
      stopAll();
      if (e && e.name === 'NotAllowedError') say('Запись отменена: нет доступа к экрану или камере.', true);
      else say('Не удалось начать запись: ' + (e && e.message ? e.message : e), true);
    }
  };

  $('stop').onclick = function () { if (state.recorder && state.recorder.state !== 'inactive') state.recorder.stop(); };

  function finish() {
    stopAll();
    var type = state.mime.split(';')[0];
    state.blob = new Blob(state.chunks, { type: type });
    state.chunks = [];
    var p = $('preview');
    if (p.src) URL.revokeObjectURL(p.src);
    p.src = URL.createObjectURL(state.blob);
    show('recording', false); show('review', true);
    say('Посмотрите запись. Если всё хорошо, получите ссылку.');
  }

  $('again').onclick = function () { reset(); };
  $('next').onclick = function () { $('client').value = ''; $('title').value = ''; reset(); };
  function reset() {
    state.blob = null; $('preview').removeAttribute('src');
    show('review', false); show('done', false); show('setup', true); say('');
  }

  $('upload').onclick = function () {
    if (!state.blob) return;
    var btn = $('upload'); btn.disabled = true; $('again').disabled = true;
    var bar = $('progress'); bar.hidden = false; bar.value = 0;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/videos');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.setRequestHeader('Content-Type', state.blob.type);
    xhr.setRequestHeader('X-Demo-Title', encodeURIComponent($('title').value.trim()));
    xhr.setRequestHeader('X-Demo-Client', encodeURIComponent($('client').value.trim()));
    xhr.upload.onprogress = function (e) { if (e.lengthComputable) { bar.value = Math.round(e.loaded / e.total * 100); say('Загружаем… ' + bar.value + '%'); } };
    xhr.onload = function () {
      btn.disabled = false; $('again').disabled = false; bar.hidden = true;
      var data = {}; try { data = JSON.parse(xhr.responseText); } catch (e) {}
      if (xhr.status === 201) {
        $('shareUrl').value = data.url; $('openLink').href = data.url;
        show('review', false); show('done', true); say('');
        loadList();
      } else if (xhr.status === 401) {
        try { localStorage.removeItem(KEY); } catch (e) {}
        say('Ключ студии больше не действует. Обновите страницу и войдите заново.', true);
      } else say((data.error || 'Не удалось загрузить') + '. Запись осталась здесь, попробуйте ещё раз.', true);
    };
    xhr.onerror = function () { btn.disabled = false; $('again').disabled = false; bar.hidden = true; say('Связь прервалась. Запись осталась здесь, попробуйте ещё раз.', true); };
    xhr.send(state.blob);
  };

  $('copy').onclick = function () {
    var v = $('shareUrl').value;
    (navigator.clipboard ? navigator.clipboard.writeText(v) : Promise.reject()).then(function () { say('Ссылка скопирована.'); }, function () { $('shareUrl').select(); say('Выделите ссылку и скопируйте вручную.'); });
  };

  function fmt(iso) { return iso ? new Date(iso).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '—'; }
  function text(el, s) { el.textContent = s; return el; }

  function loadList() {
    api('GET', '/api/videos').then(function (r) { return r.ok ? r.json() : { items: [] }; }).then(function (data) {
      var box = $('list'); box.textContent = '';
      show('listWrap', true);
      if (!data.items.length) { box.appendChild(text(document.createElement('p'), 'Пока нет роликов.')).className = 'empty'; return; }
      var table = document.createElement('table');
      var head = table.createTHead().insertRow();
      ['Ролик', 'Создан', 'Просмотры', ''].forEach(function (h) { head.appendChild(text(document.createElement('th'), h)); });
      var body = table.createTBody();
      data.items.forEach(function (it) {
        var row = body.insertRow();
        var c = row.insertCell();
        var a = document.createElement('a'); a.href = it.url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = it.title;
        c.appendChild(a);
        if (it.client) { c.appendChild(document.createElement('br')); c.appendChild(text(document.createElement('span'), it.client)).className = 'hint'; }
        text(row.insertCell(), fmt(it.createdAt));
        text(row.insertCell(), it.views ? it.views + ' · последний ' + fmt(it.lastViewAt) : 'не открывали');
        var del = document.createElement('button'); del.textContent = 'Удалить';
        del.setAttribute('aria-label', 'Удалить ролик «' + it.title + '»');
        del.onclick = function () {
          if (!confirm('Удалить ролик «' + it.title + '»? Ссылка у клиента перестанет работать.')) return;
          api('DELETE', '/api/videos/' + it.id).then(loadList);
        };
        row.insertCell().appendChild(del);
      });
      box.appendChild(table);
    }).catch(function () {});
  }

  init();
})();
