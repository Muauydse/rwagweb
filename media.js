/* موقع رواج — الشروحات والإعلانات (يوتيوب) + حسابات التواصل — تُدار من لوحة التحكم */
'use strict';
(() => {
  const $ = (s, el) => (el || document).querySelector(s), $$ = (s, el) => [...(el || document).querySelectorAll(s)];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const track = (n, d) => { if (window.rwTrack) window.rwTrack(n, d); };
  const KIND = { tutorial: 'شرح', ad: 'إعلان' };
  const SOC = {
    youtube: ['يوتيوب', '#ff0033', 'M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.02V8.98L15.5 12z'],
    tiktok: ['تيك توك', '#25f4ee', 'M16.6 2h-3.3v13.1a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V8.9a6.3 6.3 0 1 0 5.3 6.2V8.4a8 8 0 0 0 4.6 1.5V6.6a4.6 4.6 0 0 1-4.6-4.6z'],
    instagram: ['إنستقرام', '#e1306c', 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.5 5.6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'],
    snapchat: ['سناب شات', '#fffc00', 'M12 2c3 0 5.2 2.3 5.2 5.4v2.3c.4.2 1 .1 1.5-.1.6-.2 1 .5.5.9-.6.5-1.6.7-1.9 1.2.6 1.5 1.9 2.9 3.6 3.4.4.1.4.6 0 .8-.7.3-1.6.4-2 .7-.2.5-.2 1.1-.7 1.1-.6 0-1.2-.3-2 .1-1 .5-1.7 1.6-4.2 1.6s-3.2-1.1-4.2-1.6c-.8-.4-1.4-.1-2-.1-.5 0-.5-.6-.7-1.1-.4-.3-1.3-.4-2-.7-.4-.2-.4-.7 0-.8 1.7-.5 3-1.9 3.6-3.4-.3-.5-1.3-.7-1.9-1.2-.5-.4-.1-1.1.5-.9.5.2 1.1.3 1.5.1V7.4C6.8 4.3 9 2 12 2z'],
    x: ['إكس', '#ffffff', 'M17.8 2h3.4l-7.4 8.5L22.5 22h-6.8l-5.3-6.9L4.3 22H.9l7.9-9.1L.5 2h7l4.8 6.3zm-1.2 18h1.9L6.6 3.9H4.6z'],
    facebook: ['فيسبوك', '#1877f2', 'M14 8.5V6.8c0-.8.5-1 .9-1h2.6V2h-3.6C10 2 9.5 4.8 9.5 6.6v1.9H7v3.9h2.5V22h4.5v-9.6h3.1l.4-3.9z'],
    linkedin: ['لينكدإن', '#0a66c2', 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4z'],
    telegram: ['تيليجرام', '#29a9eb', 'M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.5 13.2 1.8 11.7c-1-.3-1-1 .2-1.5L20.5 3c.9-.3 1.6.2 1.4 1.3z']
  };
  const socIcon = p => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${SOC[p][2]}"/></svg>`;
  const thumb = (id, q = 'hqdefault') => `https://i.ytimg.com/vi/${id}/${q}.jpg`;
  let VIDS = [], filter = 'all', cur = -1;
  const C = window.RAWAJ_SITE || {};
  const nf = n => (Number(n) || 0).toLocaleString('en-US');
  const viewer = (() => { try { let v = localStorage.getItem('rw_viewer'); if (!v) { v = 'web_' + Array.from(crypto.getRandomValues(new Uint8Array(12)), b => b.toString(16).padStart(2, '0')).join(''); localStorage.setItem('rw_viewer', v); } return v; } catch (e) { return 'web_' + Math.random().toString(16).slice(2, 18); } })();
  const engage = body => fetch(String(C.PANEL_URL || '').replace(/\/$/, '') + '/api/public/video', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, viewer }) })
    .then(r => r.json()).catch(() => ({ ok: false, offline: true }));
  const ago = t => { const m = Math.max(1, Math.round((Date.now() - new Date(t)) / 60000)); return m < 60 ? `قبل ${m} دقيقة` : m < 1440 ? `قبل ${Math.round(m / 60)} ساعة` : `قبل ${Math.round(m / 1440)} يوم`; };
  const EYE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
  const HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.4 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.6 0 5.6 3.5 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/></svg>';
  const BUBBLE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>';

  /* ---------- حسابات التواصل ---------- */
  function social(list) {
    list = (list || []).filter(s => SOC[s.p] && /^https?:\/\//.test(s.url));
    const a = s => `<a class="soc-a" href="${esc(s.url)}" target="_blank" rel="noopener" style="--c:${SOC[s.p][1]}" title="${SOC[s.p][0]}" aria-label="${SOC[s.p][0]}" data-soc="${s.p}">${socIcon(s.p)}</a>`;
    const foot = $('#socFoot'), sup = $('#socSup');
    if (foot) { foot.innerHTML = list.map(a).join(''); foot.hidden = !list.length; }
    if (sup) { sup.innerHTML = list.length ? `<span class="soc-lbl">تابعنا على</span>${list.map(s => `<a class="soc-pill" href="${esc(s.url)}" target="_blank" rel="noopener" style="--c:${SOC[s.p][1]}" data-soc="${s.p}">${socIcon(s.p)}<span>${SOC[s.p][0]}</span></a>`).join('')}` : ''; sup.hidden = !list.length; }
    $$('[data-soc]').forEach(x => x.addEventListener('click', () => track('social', x.dataset.soc)));
  }

  /* ---------- قائمة الفيديوهات ---------- */
  function grid() {
    const g = $('#vGrid'); if (!g) return;
    const list = VIDS.map((v, i) => ({ v, i })).filter(x => filter === 'all' || x.v.kind === filter);
    g.innerHTML = list.map(({ v, i }, n) => `<button type="button" class="vcard ${n === 0 && filter === 'all' ? 'feat' : ''}" data-v="${i}">
      <span class="vthumb"><img loading="lazy" src="${thumb(v.yt, n === 0 && filter === 'all' ? 'maxresdefault' : 'hqdefault')}" onerror="this.onerror=null;this.src='${thumb(v.yt)}'" alt="">
        <span class="vplay"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg></span><span class="vkind ${v.kind}">${KIND[v.kind] || 'شرح'}</span></span>
      <span class="vbody"><b>${esc(v.title)}</b>${v.desc ? `<small>${esc(v.desc)}</small>` : ''}<span class="vstats"><span>${EYE}${nf(v.views)}</span><span>${HEART}${nf(v.likes)}</span><span>${BUBBLE}${nf(v.comments)}</span></span></span></button>`).join('') || '<p class="vempty">لا توجد فيديوهات في هذا التصنيف حالياً</p>';
    $$('[data-v]', g).forEach(b => b.onclick = () => open(+b.dataset.v));
  }
  function render(S) {
    VIDS = (S.videos || []).filter(v => /^[\w-]{11}$/.test(v.yt || ''));
    const sec = $('#videos'), on = VIDS.length && !(S.sections && S.sections.videos === false);
    if (sec) sec.hidden = !on;
    $$('a[href="#videos"]').forEach(a => { a.hidden = !on; });
    if (!on) return;
    const has = k => VIDS.some(v => v.kind === k);
    $('#vTabs').innerHTML = [['all', 'الكل'], ['tutorial', 'الشروحات'], ['ad', 'الإعلانات']].filter(([k]) => k === 'all' || has(k))
      .map(([k, l]) => `<button type="button" data-f="${k}" class="${filter === k ? 'on' : ''}">${l} <i>${k === 'all' ? VIDS.length : VIDS.filter(v => v.kind === k).length}</i></button>`).join('');
    $('#vTabs').hidden = !(has('tutorial') && has('ad'));
    $$('#vTabs [data-f]').forEach(b => b.onclick = () => { filter = b.dataset.f; $$('#vTabs [data-f]').forEach(x => x.classList.toggle('on', x === b)); grid(); });
    grid();
  }

  /* ---------- المشغّل الاحترافي ---------- */
  function player() {
    let m = $('#vp'); if (m) return m;
    m = document.createElement('div'); m.id = 'vp'; m.className = 'vp'; m.hidden = true;
    m.innerHTML = `<div class="vp-box" role="dialog" aria-modal="true">
      <div class="vp-head"><span class="vp-kind"></span><b class="vp-title"></b><span class="vp-count"></span><button type="button" class="vp-x" aria-label="إغلاق"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
      <div class="vp-main"><div class="vp-stage"><div class="vp-frame"></div>
          <button type="button" class="vp-nav prev" aria-label="السابق"><svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg></button><button type="button" class="vp-nav next" aria-label="التالي"><svg viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg></button></div>
        <aside class="vp-list"></aside></div>
      <div class="vp-foot"><p class="vp-desc"></p><a class="vp-yt" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="${SOC.youtube[2]}"/></svg> مشاهدة على يوتيوب</a></div>
      <div class="vp-eng"><span class="vp-views">${EYE}<b>0</b> مشاهدة</span><button type="button" class="vp-like" aria-pressed="false">${HEART}<b>0</b> <span>إعجاب</span></button><span class="vp-ccount">${BUBBLE}<b>0</b> تعليق</span></div>
      <div class="vp-cm"><form class="vp-cform" autocomplete="off"><input name="name" maxlength="60" placeholder="اسمك" required><textarea name="text" maxlength="1000" rows="2" placeholder="اكتب تعليقك أو سؤالك عن هذا الشرح…" required></textarea><button type="submit">إرسال التعليق</button></form>
        <div class="vp-cmsg" hidden></div><div class="vp-clist"></div></div></div>`;
    document.body.appendChild(m);
    m.addEventListener('click', e => { if (e.target === m) close(); });
    $('.vp-x', m).onclick = close;
    $('.vp-nav.prev', m).onclick = () => step(-1); $('.vp-nav.next', m).onclick = () => step(1);
    $('.vp-like', m).onclick = async () => {
      const v = VIDS[cur]; if (!v) return; const b = $('.vp-like', m); b.disabled = true;
      const r = await engage({ action: 'like', vid: v.id }); b.disabled = false;
      if (r.ok) { paint(r); v.likes = r.likes; track('video_like', v.title); }
    };
    $('.vp-cform', m).onsubmit = async e => {
      e.preventDefault(); const f = e.target, v = VIDS[cur]; if (!v) return;
      const name = f.name.value.trim(), text = f.text.value.trim(); if (name.length < 2 || text.length < 2) return;
      try { localStorage.setItem('rw_cname', name); } catch (x) { }
      const btn = $('button', f); btn.disabled = true; const r = await engage({ action: 'comment', vid: v.id, name, text }); btn.disabled = false;
      const msg = $('.vp-cmsg', m); msg.hidden = false;
      if (r.ok) { f.text.value = ''; msg.className = 'vp-cmsg ok'; msg.textContent = '✓ تم إرسال تعليقك — سيظهر بعد مراجعته من فريق رواج'; track('video_comment', v.title); }
      else { msg.className = 'vp-cmsg err'; msg.textContent = r.error || 'تعذر إرسال التعليق الآن'; }
    };
    document.addEventListener('keydown', e => { if (m.hidden) return; if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') step(-1); else if (e.key === 'ArrowLeft') step(1); });
    return m;
  }
  function open(i) {
    const m = player(), v = VIDS[i]; if (!v) return; cur = i;
    $('.vp-frame', m).innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.yt}?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="${esc(v.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    $('.vp-title', m).textContent = v.title; $('.vp-kind', m).textContent = KIND[v.kind] || 'شرح'; $('.vp-kind', m).className = 'vp-kind ' + v.kind;
    $('.vp-count', m).textContent = `${i + 1} / ${VIDS.length}`;
    $('.vp-desc', m).textContent = v.desc || ''; $('.vp-yt', m).href = `https://youtu.be/${v.yt}`;
    $('.vp-list', m).innerHTML = VIDS.map((x, k) => `<button type="button" class="vp-it ${k === i ? 'on' : ''}" data-k="${k}"><span><img src="${thumb(x.yt, 'mqdefault')}" alt="">${k === i ? '<i>يُعرض الآن</i>' : ''}</span><b>${esc(x.title)}</b></button>`).join('');
    $$('.vp-it', m).forEach(b => b.onclick = () => open(+b.dataset.k));
    const on = $('.vp-it.on', m); if (on) on.scrollIntoView({ block: 'nearest' });
    $('.vp-list', m).hidden = VIDS.length < 2; $$('.vp-nav', m).forEach(b => { b.hidden = VIDS.length < 2; });
    if (m.hidden) { m.hidden = false; document.body.style.overflow = 'hidden'; setTimeout(() => m.classList.add('in'), 20); }
    loadEngage(v);
    track('video', v.title);
  }
  function paint(r) {
    const m = $('#vp'); if (!m) return;
    $('.vp-views b', m).textContent = nf(r.views); $('.vp-like b', m).textContent = nf(r.likes); $('.vp-ccount b', m).textContent = nf(r.comments);
    const lk = $('.vp-like', m); lk.classList.toggle('on', !!r.liked); lk.setAttribute('aria-pressed', r.liked ? 'true' : 'false');
  }
  async function loadEngage(v) {
    const m = $('#vp'); paint(v); $('.vp-clist', m).innerHTML = ''; $('.vp-cmsg', m).hidden = true;
    try { const n = localStorage.getItem('rw_cname'); if (n) $('.vp-cform', m).name.value = n; } catch (e) { }
    engage({ action: 'view', vid: v.id });
    const r = await engage({ action: 'comments', vid: v.id });
    if (!r.ok || VIDS[cur] !== v) return;
    Object.assign(v, { views: r.views, likes: r.likes, comments: r.comments }); paint(r);
    $('.vp-clist', m).innerHTML = (r.list || []).map(c => `<div class="vp-c"><div class="vp-ch"><b>${esc(c.name)}</b><small>${ago(c.created)}</small></div><p>${esc(c.text)}</p>
      ${c.reply ? `<div class="vp-cr"><b>رد فريق رواج</b><p>${esc(c.reply.text)}</p></div>` : ''}</div>`).join('') || '<p class="vp-cnone">لا توجد تعليقات بعد — كن أول من يعلّق</p>';
  }
  function step(d) { if (VIDS.length) open((cur + d + VIDS.length) % VIDS.length); }
  function close() { const m = $('#vp'); if (!m) return; m.classList.remove('in'); $('.vp-frame', m).innerHTML = ''; setTimeout(() => { m.hidden = true; }, 220); document.body.style.overflow = ''; }

  document.addEventListener('rw:site', e => { const S = e.detail || {}; render(S); social(S.social); });
})();
