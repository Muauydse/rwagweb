/* موقع رواج — الربط الحي مع لوحة التحكم:
   تتبع الزوار (بدون ملفات تعريف من طرف ثالث)، تطبيق إعدادات الموقع، شريط الإعلان، وضع الصيانة */
'use strict';
(function () {
  const C = window.RAWAJ_SITE || {};
  const base = (C.PANEL_URL || '').replace(/\/$/, '');
  if (!base) return;
  const rid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
  let vid, sid;
  try { vid = localStorage.getItem('rw_vid') || rid(); localStorage.setItem('rw_vid', vid); } catch (e) { vid = rid(); }
  try { sid = sessionStorage.getItem('rw_sid') || rid(); sessionStorage.setItem('rw_sid', sid); } catch (e) { sid = rid(); }

  /* إرسال بدون طلب تمهيدي (text/plain) ويعمل حتى عند إغلاق الصفحة */
  function send(payload, beacon) {
    const body = JSON.stringify({ vid, sid, ...payload });
    if (beacon && navigator.sendBeacon) { navigator.sendBeacon(base + '/api/public/track', new Blob([body], { type: 'text/plain' })); return; }
    fetch(base + '/api/public/track', { method: 'POST', body, headers: { 'Content-Type': 'text/plain' }, keepalive: true }).catch(() => { });
  }
  window.rwTrack = (name, data) => send({ type: 'event', name, data: data || '' });

  const params = new URLSearchParams(location.search);
  send({ type: 'view', path: location.pathname + location.hash, ref: document.referrer, utm: params.get('utm_source') || params.get('ref') || '',
    lang: navigator.language, tz: (Intl.DateTimeFormat().resolvedOptions() || {}).timeZone || '', screen: `${screen.width}x${screen.height}` });
  setInterval(() => { if (document.visibilityState === 'visible') send({ type: 'ping' }); }, 25000);
  addEventListener('pagehide', () => send({ type: 'ping' }, true));

  /* الأقسام التي شاهدها الزائر */
  const seen = new Set();
  const io = new IntersectionObserver(es => es.forEach(x => { const id = x.target.id; if (x.isIntersecting && !seen.has(id)) { seen.add(id); rwTrack('section', id); } }), { threshold: .35 });
  document.querySelectorAll('section[id]').forEach(s => io.observe(s));

  /* النقرات المهمة */
  document.addEventListener('click', e => {
    const a = e.target.closest('a,button'); if (!a) return;
    if (a.id === 'dlBtn' || a.classList.contains('dl-btn')) rwTrack('download', a.id === 'dlBtn' ? 'زر التحميل' : 'الواجهة');
    else if ((a.href || '').includes('wa.me')) rwTrack('whatsapp', (a.textContent || '').trim().slice(0, 40));
    else if (a.hasAttribute('data-signup')) rwTrack('open_signup', a.dataset.signup || '');
  }, true);

  /* إعدادات الموقع من لوحة التحكم */
  fetch(base + '/api/public/site').then(r => r.json()).then(S => {
    if (!S || !S.ok) return;
    if (S.maintenance && S.maintenance.on) return maintenance(S);
    // زر التحميل حسب اختيار لوحة التحكم: ملف مرفوع أو رابط أو تواصل واتساب
    if (S.downloadMode === 'contact' || S.downloadUrl) { C.DOWNLOAD_URL = S.downloadMode === 'contact' ? '' : S.downloadUrl; if (typeof setDownload === 'function') setDownload(C.DOWNLOAD_URL); }
    if (S.version) document.querySelectorAll('.ver').forEach(x => { x.textContent = S.version; });
    if (S.version || S.fileSize) { const m = document.querySelector('.dl-meta'); if (m) m.textContent = `الإصدار ${S.version || C.VERSION || ''}${S.fileSize ? ' · ' + S.fileSize : ''}`; }
    if (S.whatsapp) { C.WHATSAPP = S.whatsapp; document.querySelectorAll('#supWa,#waFloat').forEach(a => { a.href = `https://wa.me/${S.whatsapp}`; }); }
    if (S.email) { C.EMAIL = S.email; const em = document.querySelector('.em'); if (em) em.textContent = S.email; const ml = document.getElementById('supMail'); if (ml) ml.href = 'mailto:' + S.email; }
    const h = S.hero || {};
    if (h.title) document.querySelector('.hero h1').textContent = h.title;
    if (h.subtitle) document.querySelector('.hero .lead').textContent = h.subtitle;
    Object.entries(S.sections || {}).forEach(([k, on]) => { if (on === false) { const sec = document.getElementById(k); if (sec) sec.hidden = true; document.querySelectorAll(`.links a[href="#${k}"],.foot-links a[href="#${k}"]`).forEach(a => { a.hidden = true; }); } });
    if (S.announcement && S.announcement.on && S.announcement.text) {
      const bar = document.createElement(S.announcement.link ? 'a' : 'div');
      bar.className = 'announce'; bar.textContent = S.announcement.text; if (S.announcement.link) bar.href = S.announcement.link;
      document.body.prepend(bar);
    }
  }).catch(() => { });

  function maintenance(S) {
    const m = S.maintenance, wa = S.whatsapp || C.WHATSAPP, em = S.email || C.EMAIL, sp = document.getElementById('rw-sprite');
    const ic = n => `<svg class="i"><use href="#i-${n}"/></svg>`;
    document.body.innerHTML = (sp ? sp.outerHTML : '') + `<div class="bg-orbs"><i></i><i></i><i></i></div><div class="maint"><svg class="logo" viewBox="0 0 256 256" aria-hidden="true"><use href="#rw-logo"/></svg><span class="pill"><i class="dot" style="background:var(--gold)"></i> وضع الصيانة</span>
      <h1>نعمل على تطوير <span class="grad">تجربتك</span></h1><p>${String(m.message || '').replace(/[<>&]/g, '')}</p>${m.until ? `<p class="until">العودة المتوقعة: <b>${String(m.until).replace(/[<>&]/g, '')}</b></p>` : ''}
      <div class="hero-btns" style="justify-content:center"><a class="btn gold lg" href="https://wa.me/${wa}" target="_blank" rel="noopener">${ic('chat')} تواصل عبر واتساب</a><a class="btn glass lg" href="mailto:${em}">${ic('mail')} البريد الإلكتروني</a></div></div>`;
  }
})();
