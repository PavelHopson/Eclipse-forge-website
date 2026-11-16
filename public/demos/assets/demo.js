/* Eclipse Forge live demos — shared behaviour.
 * Everything runs in the browser. Nothing is sent anywhere: leads live in localStorage of this device.
 * Config comes from <script type="application/json" id="demo-config">.
 */
(function () {
  'use strict';

  var config = JSON.parse(document.getElementById('demo-config').textContent);
  var STORAGE_KEY = 'ef-demo-leads:' + config.slug;
  var selection = {}; // what the widget put into the lead
  var rub = new Intl.NumberFormat('ru-RU');

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === 'text') node.textContent = attrs[key];
      else if (key === 'class') node.className = attrs[key];
      else node.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) { if (child) node.appendChild(child); });
    return node;
  }
  function money(value) { return rub.format(Math.round(value)) + ' ₽'; }
  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function dayLabel(date) {
    return date.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' });
  }
  function isoDate(date) { return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()); }
  function addDays(date, days) { var d = new Date(date); d.setDate(d.getDate() + days); return d; }
  // 'YYYY-MM-DD' as a local date (new Date(string) would parse it as UTC)
  function parseIso(value) { var p = String(value).split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); }

  function setSelection(next) {
    selection = next;
    var summary = $('[data-lead-summary]');
    if (summary) {
      summary.textContent = Object.keys(selection).length
        ? Object.keys(selection).map(function (k) { return k + ': ' + selection[k]; }).join(' · ')
        : '';
    }
  }

  /* ── Widget: stay (dates + guests → rooms with price) ── */
  function initStay(root) {
    var today = new Date();
    var from = $('[name="from"]', root);
    var to = $('[name="to"]', root);
    var guests = $('[name="guests"]', root);
    var list = $('[data-rooms]', root);
    var total = $('[data-total]', root);
    from.min = isoDate(today);
    from.value = isoDate(addDays(today, 7));
    to.value = isoDate(addDays(today, 10));
    var chosen = null;

    function nights() {
      var a = parseIso(from.value), b = parseIso(to.value);
      var n = Math.round((b - a) / 86400000);
      return isFinite(n) ? n : 0;
    }

    function render() {
      to.min = isoDate(addDays((from.value ? parseIso(from.value) : today), 1));
      var n = nights();
      var g = Number(guests.value);
      list.innerHTML = '';
      config.rooms.forEach(function (room, index) {
        var fits = g <= room.capacity;
        // deterministic «busy» pattern so the demo shows unavailable rooms too
        var busy = (parseIso(from.value).getDate() + index) % 5 === 0;
        var price = room.price * Math.max(n, 0);
        var btn = el('button', { type: 'button', class: 'choice', 'aria-pressed': String(chosen === room.id) }, [
          el('b', { text: room.name }),
          el('span', { text: n > 0 ? money(price) : '—' }),
          el('small', { text: room.note + ' · до ' + room.capacity + ' гостей · ' + money(room.price) + ' / ночь' }),
        ]);
        if (!fits || busy || n <= 0) {
          btn.disabled = true;
          btn.querySelector('small').textContent += busy ? ' · занято на эти даты' : !fits ? ' · не вместит' : '';
        }
        btn.addEventListener('click', function () { chosen = room.id; render(); });
        list.appendChild(btn);
      });
      var room = config.rooms.filter(function (r) { return r.id === chosen; })[0];
      var available = room && !$all('.choice', list)[config.rooms.indexOf(room)].disabled;
      if (!available) chosen = null;
      if (room && available && n > 0) {
        total.innerHTML = '';
        total.appendChild(el('span', { text: room.name + ', ' + n + ' ноч.' }));
        total.appendChild(el('b', { text: money(room.price * n) }));
        setSelection({
          'Номер': room.name,
          'Даты': parseIso(from.value).toLocaleDateString('ru-RU') + ' — ' + parseIso(to.value).toLocaleDateString('ru-RU'),
          'Гости': guests.value,
          'Сумма': money(room.price * n),
        });
      } else {
        total.innerHTML = '';
        total.appendChild(el('span', { text: n > 0 ? 'Выберите домик — посчитаем стоимость' : 'Дата выезда должна быть позже заезда' }));
        setSelection({});
      }
    }
    [from, to, guests].forEach(function (input) { input.addEventListener('change', render); });
    render();
  }

  /* ── Widget: calc (type × area → estimate) ── */
  function initCalc(root) {
    var typeWrap = $('[data-types]', root);
    var area = $('[name="area"]', root);
    var areaOut = $('[data-area-out]', root);
    var total = $('[data-total]', root);
    var current = config.types[0].id;

    config.types.forEach(function (type) {
      var b = el('button', { type: 'button', 'aria-pressed': String(type.id === current), text: type.name });
      b.addEventListener('click', function () {
        current = type.id;
        $all('button', typeWrap).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        render();
      });
      typeWrap.appendChild(b);
    });

    function render() {
      var type = config.types.filter(function (t) { return t.id === current; })[0];
      var m2 = Number(area.value);
      areaOut.textContent = m2 + ' м²';
      var sum = type.rate * m2;
      total.innerHTML = '';
      total.appendChild(el('span', { text: type.name + ' · ' + m2 + ' м² · ' + money(type.rate) + '/м²' }));
      total.appendChild(el('b', { text: '≈ ' + money(sum) }));
      setSelection({ 'Ремонт': type.name, 'Площадь': m2 + ' м²', 'Ориентир': '≈ ' + money(sum) });
    }
    area.addEventListener('input', render);
    render();
  }

  /* ── Widget: slots (service + time) ── */
  function initSlots(root) {
    var serviceSel = $('[name="service"]', root);
    var daysWrap = $('[data-days]', root);
    config.services.forEach(function (s) {
      serviceSel.appendChild(el('option', { value: s.id, text: s.name + ' — от ' + money(s.price) }));
    });
    var chosen = null;
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    function render() {
      daysWrap.innerHTML = '';
      for (var d = 1; d <= 3; d += 1) {
        var date = addDays(start, d);
        var row = el('div', { class: 'slots' });
        config.hours.forEach(function (hour, i) {
          var key = isoDate(date) + ' ' + hour;
          var taken = (date.getDate() * 7 + i * 3) % 4 === 0;
          var b = el('button', { type: 'button', 'aria-pressed': String(chosen === key), text: hour, 'aria-label': dayLabel(date) + ', ' + hour + (taken ? ', занято' : '') });
          b.disabled = taken;
          b.addEventListener('click', function () { chosen = key; render(); });
          row.appendChild(b);
        });
        daysWrap.appendChild(el('div', { class: 'slots-day' }, [el('h4', { text: dayLabel(date) }), row]));
      }
      var service = config.services.filter(function (s) { return s.id === serviceSel.value; })[0];
      if (chosen) {
        var parts = chosen.split(' ');
        setSelection({
          'Услуга': service.name,
          'Время': parseIso(parts[0]).toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'long' }) + ', ' + parts[1],
          'Ориентир': 'от ' + money(service.price),
        });
      } else {
        setSelection({ 'Услуга': service.name });
      }
    }
    serviceSel.addEventListener('change', render);
    render();
  }

  /* ── Leads storage ── */
  function loadLeads() {
    try {
      var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (Array.isArray(stored)) return stored;
    } catch (e) { /* storage unavailable — fall back to seed */ }
    return config.seedLeads.map(function (lead, i) {
      return Object.assign({ id: 'seed-' + i, created: Date.now() - (i + 1) * 3600 * 1000 * 5 }, lead);
    });
  }
  function saveLeads(leads) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(leads)); } catch (e) { /* ignore */ }
  }

  /* ── Lead form ── */
  function initForm(form) {
    var error = $('[data-form-error]', form);
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = form.elements.name.value.trim();
      var phoneDigits = form.elements.phone.value.replace(/\D/g, '');
      if (!name) { error.textContent = 'Напишите, как к вам обращаться.'; form.elements.name.focus(); return; }
      if (phoneDigits.length !== 11) { error.textContent = 'Телефон: 11 цифр, например +7 900 000-00-00.'; form.elements.phone.focus(); return; }
      if (!form.elements.consent.checked) { error.textContent = 'Нужно согласие на обработку данных.'; return; }
      error.textContent = '';
      var contactWay = (form.querySelector('[name="contact"]:checked') || {}).value || 'Звонок';
      var lead = {
        id: 'lead-' + Date.now(),
        created: Date.now(),
        name: name,
        phone: '+7 ' + phoneDigits.slice(1, 4) + ' ' + phoneDigits.slice(4, 7) + '-' + phoneDigits.slice(7, 9) + '-' + phoneDigits.slice(9),
        contact: contactWay,
        comment: form.elements.comment ? form.elements.comment.value.trim() : '',
        details: selection,
        status: 'new',
        fresh: true,
      };
      var leads = loadLeads().map(function (l) { return Object.assign({}, l, { fresh: false }); });
      leads.unshift(lead);
      saveLeads(leads);
      var ok = $('[data-form-ok]');
      form.hidden = true;
      ok.hidden = false;
      ok.focus();
      openOwner();
    });
    var again = $('[data-form-again]');
    if (again) again.addEventListener('click', function () {
      form.reset();
      form.hidden = false;
      $('[data-form-ok]').hidden = true;
    });
  }

  /* ── Owner panel ── */
  var dialog = document.getElementById('owner');
  var STATUSES = [
    { id: 'new', title: 'Новые', next: 'work', action: 'Взять в работу' },
    { id: 'work', title: 'В работе', next: 'done', action: 'Закрыть: договорились' },
    { id: 'done', title: 'Закрыты', next: null, action: null },
  ];

  function ago(ts) {
    var min = Math.max(0, Math.round((Date.now() - ts) / 60000));
    if (min < 1) return 'только что';
    if (min < 60) return min + ' мин назад';
    var h = Math.round(min / 60);
    return h < 24 ? h + ' ч назад' : Math.round(h / 24) + ' дн назад';
  }

  function leadCard(lead, status) {
    var dl = el('dl');
    function row(k, v) { if (v) { dl.appendChild(el('dt', { text: k })); dl.appendChild(el('dd', { text: v })); } }
    row('Телефон', lead.phone);
    row('Связь', lead.contact);
    Object.keys(lead.details || {}).forEach(function (k) { row(k, lead.details[k]); });
    row('Комментарий', lead.comment);
    var footer = el('footer');
    if (status.id === 'new') footer.appendChild(el('span', { class: 'sla', text: 'Перезвонить до ' + new Date(lead.created + 15 * 60000).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) }));
    if (status.next) {
      var b = el('button', { type: 'button', text: status.action });
      b.addEventListener('click', function () {
        var leads = loadLeads().map(function (l) { return l.id === lead.id ? Object.assign({}, l, { status: status.next, fresh: false }) : l; });
        saveLeads(leads);
        renderOwner();
      });
      footer.appendChild(b);
    }
    return el('article', { class: 'lead-card' + (lead.fresh ? ' lead-card--new' : '') }, [
      el('header', {}, [el('b', { text: lead.name }), el('span', { text: ago(lead.created) })]),
      dl,
      footer,
    ]);
  }

  function renderOwner() {
    var leads = loadLeads();
    var body = $('[data-owner-body]', dialog);
    body.innerHTML = '';

    var newest = leads[0];
    if (newest && newest.fresh) {
      var text = '🔔 Новая заявка · ' + config.brand + '\n' + newest.name + ', ' + newest.phone + ' (' + newest.contact + ')';
      Object.keys(newest.details || {}).forEach(function (k) { text += '\n' + k + ': ' + newest.details[k]; });
      body.appendChild(el('div', { class: 'tg', role: 'note', 'aria-label': 'Уведомление в Telegram' }, [
        el('div', { class: 'tg-from', text: 'Telegram · бот заявок' }),
        el('pre', { text: text }),
      ]));
    }

    var counts = { new: 0, work: 0, done: 0 };
    leads.forEach(function (l) { counts[l.status] = (counts[l.status] || 0) + 1; });
    var conversion = leads.length ? Math.round((counts.done / leads.length) * 100) : 0;
    body.appendChild(el('div', { class: 'owner-stats' }, [
      el('div', { class: 'owner-stat' }, [el('b', { text: String(leads.length) }), el('span', { text: 'заявок в демо' })]),
      el('div', { class: 'owner-stat' }, [el('b', { text: String(counts.new) }), el('span', { text: 'ждут звонка' })]),
      el('div', { class: 'owner-stat' }, [el('b', { text: String(counts.work) }), el('span', { text: 'в работе' })]),
      el('div', { class: 'owner-stat' }, [el('b', { text: conversion + '%' }), el('span', { text: 'дошли до сделки' })]),
    ]));

    var cols = el('div', { class: 'owner-cols' });
    STATUSES.forEach(function (status) {
      var list = el('div', { class: 'owner-list' });
      var items = leads.filter(function (l) { return l.status === status.id; });
      items.forEach(function (l) { list.appendChild(leadCard(l, status)); });
      if (!items.length) list.appendChild(el('div', { class: 'owner-empty', text: 'Пусто' }));
      cols.appendChild(el('section', { class: 'owner-col' }, [
        el('h3', {}, [el('span', { text: status.title }), el('span', { text: String(items.length) })]),
        list,
      ]));
    });
    body.appendChild(cols);
  }

  function openOwner() {
    renderOwner();
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }

  $all('[data-open-owner]').forEach(function (b) { b.addEventListener('click', openOwner); });
  $('[data-owner-close]', dialog).addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
  var reset = $('[data-owner-reset]', dialog);
  if (reset) reset.addEventListener('click', function () {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    renderOwner();
  });

  /* ── Boot ── */
  var widget = $('[data-widget]');
  if (widget) {
    var kind = widget.getAttribute('data-widget');
    if (kind === 'stay') initStay(widget);
    if (kind === 'calc') initCalc(widget);
    if (kind === 'slots') initSlots(widget);
  }
  var form = $('[data-lead-form]');
  if (form) initForm(form);
})();
