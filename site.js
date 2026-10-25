/* موقع رواج لإدارة الأعمال */
'use strict';
const C = window.RAWAJ_SITE || {};
const T = (n, d) => { if (window.rwTrack) window.rwTrack(n, d); };
const $ = (s, el) => (el || document).querySelector(s);
const $$ = (s, el) => [...(el || document).querySelectorAll(s)];
const ic = n => `<svg class="i"><use href="#i-${n}"/></svg>`;
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = v => (Number(v) || 0).toLocaleString('en-US', { maximumFractionDigits: 2 });
const api = (path, body) => fetch(C.PANEL_URL.replace(/\/$/, '') + path, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {})
  .then(r => r.json()).catch(() => ({ ok: false, offline: true }));
const wa = text => `https://wa.me/${C.WHATSAPP}?text=${encodeURIComponent(text || 'السلام عليكم، أرغب بالاستفسار عن نظام رواج لإدارة الأعمال')}`;
function toast(msg, err) { const t = document.createElement('div'); t.className = 'toast' + (err ? ' err' : ''); t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 4200); }

/* ---------------- المزايا والأسئلة ---------------- */
const FEATURES = [
  ['bolt', 'نقطة بيع فائقة السرعة', 'باركود، اختصارات لوحة مفاتيح، دفع متعدد، فواتير معلّقة، وتنقّل بين الفواتير مع التعديل والحذف.'],
  ['receipt', 'فواتير ضريبية معتمدة', 'رمز QR متوافق مع هيئة الزكاة، فاتورة مبسطة وكاملة، وإشعارات دائنة ومدينة.'],
  ['box', 'مخزون دقيق', 'متوسط التكلفة المرجّح، جرد وتسويات، حد إعادة الطلب، وسجل حركة كامل لكل صنف.'],
  ['wallet', 'حسابات العملاء والموردين', 'أرصدة، حدود ائتمانية، كشوف حساب، سندات قبض وصرف بتوزيع تلقائي على الفواتير.'],
  ['chart', 'تقارير لحظية', 'قائمة الدخل، إقرار ضريبة القيمة المضافة، المبيعات حسب الصنف والعميل والكاشير، وتقييم المخزون.'],
  ['sparkles', 'رؤى ذكية', 'تحليل تلقائي: ساعة الذروة، أصناف ستنفد، مخزون راكد، هوامش ضعيفة، وعملاء متأخرون.'],
  ['timer', 'الورديات وتقرير Z', 'عهدة نقدية، تقرير مؤقت، إغلاق مع جرد الصندوق وحساب العجز والزيادة.'],
  ['printer', 'قوالب طباعة فاخرة', '5 قوالب للفواتير بلونك وشعارك، إيصال حراري 80mm، وتقارير بتصميم احترافي.'],
  ['chat', 'واتساب مدمج', 'إرسال الفاتورة للعميل وتذكيره بالمستحق بضغطة زر.'],
  ['shield', 'نسخ احتياطي محمي', 'آخر 10 نسخ محمية ضد الحذف، نسخة عند الخروج، ومسارات حفظ إضافية تختارها.'],
  ['users', 'صلاحيات وسجل عمليات', 'أدوار للمدير والمحاسب والكاشير، وكل عملية مسجلة بالمستخدم والوقت.'],
  ['headset', 'دعم فني متواصل', 'خدمة عملاء داخل النظام، دعم عن بعد عبر AnyDesk وTeamViewer طوال الاشتراك.']
];
const FAQ = [
  ['هل يعمل النظام بدون إنترنت؟', 'نعم، يعمل النظام على جهازك بالكامل وتُحفظ البيانات محلياً. الإنترنت مطلوب فقط للتفعيل والمزامنة مع الدعم الفني والتحديثات.'],
  ['هل الفواتير متوافقة مع هيئة الزكاة والضريبة؟', 'تصدر الفواتير الضريبية المبسطة والكاملة مع رمز QR بالصيغة المعتمدة للمرحلة الأولى، مع إقرار ضريبة القيمة المضافة.'],
  ['هل يمكنني تجربة النظام قبل الاشتراك؟', 'نعم، تتوفر تجربة مجانية لمدة 3 أيام من شاشة الدخول مباشرة بعد التحميل.'],
  ['ماذا يحدث لبياناتي إذا تعطل الجهاز؟', 'تُحفظ البيانات في مجلد محمي مع نسخ احتياطية متعددة، ويمكنك إضافة مسار حفظ على فلاشة أو OneDrive، ونسخة يومية لدى الدعم الفني.'],
  ['كيف أفعّل اشتراكي؟', 'اختر باقتك وأرسل طلب الاشتراك من هنا، وسيتواصل معك فريقنا لإتمام الدفع ثم يرسل لك بيانات الدخول وعقد الاشتراك.'],
  ['هل يدعم أكثر من مستخدم؟', 'نعم، أضف موظفيك بأدوار مختلفة (مدير، محاسب، كاشير) مع صلاحيات دقيقة وسجل لكل العمليات.']
];
$('#featGrid').innerHTML = FEATURES.map(([i, t, d], n) => `<div class="feat reveal" style="transition-delay:${(n % 4) * 60}ms"><div class="ic">${ic(i)}</div><b>${t}</b><p>${d}</p></div>`).join('');
$('#faqList').innerHTML = FAQ.map(([q, a], i) => `<details ${i ? '' : 'open'}><summary>${q}</summary><p>${a}</p></details>`).join('');
$$('.feat').forEach(f => f.addEventListener('mousemove', e => { const r = f.getBoundingClientRect(); f.style.setProperty('--mx', (e.clientX - r.left) + 'px'); f.style.setProperty('--my', (e.clientY - r.top) + 'px'); }));

/* ---------------- التحميل وخدمة العملاء ---------------- */
$$('.ver').forEach(x => { x.textContent = C.VERSION || ''; });
$('#yr').textContent = new Date().getFullYear();
$('.dl-meta').textContent = `الإصدار ${C.VERSION || ''}${C.FILE_SIZE ? ' · ' + C.FILE_SIZE : ''}`;
$('.req').textContent = 'المتطلبات: ' + (C.REQUIREMENTS || 'Windows 10 / 11');
const dlBtn = $('#dlBtn');
// زر التحميل: رابط مباشر، أو تواصل واتساب — لوحة التحكم تحدده (live.js) وconfig.js احتياط
function setDownload(url) {
  if (url) { dlBtn.href = url; dlBtn.target = ''; dlBtn.setAttribute('download', ''); dlBtn.innerHTML = ic('download') + ' تحميل مباشر لويندوز'; }
  else { dlBtn.href = wa('السلام عليكم، أرغب في تحميل نظام رواج لإدارة الأعمال'); dlBtn.target = '_blank'; dlBtn.removeAttribute('download'); dlBtn.innerHTML = ic('chat') + ' تواصل لاستلام نسخة التحميل'; }
}
setDownload(C.DOWNLOAD_URL);
$('#supWa').href = wa(); $('#waFloat').href = wa();
$('.ph').textContent = C.PHONE_LABEL || ''; $('.em').textContent = C.EMAIL || '';
$('#supMail').href = `mailto:${C.EMAIL}?subject=${encodeURIComponent('استفسار عن نظام رواج')}`;
$('#contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target, data = Object.fromEntries(new FormData(f)), msg = $('#contactMsg'), btn = $('button[type=submit]', f);
  btn.disabled = true; btn.textContent = 'جارٍ الإرسال…';
  const r = await api('/api/public/contact', { ...data, subject: data.category + (data.company ? ' — ' + data.company : '') });
  btn.disabled = false; btn.textContent = 'إرسال الرسالة';
  if (r.ok) { T('contact_sent', data.category); f.reset(); msg.className = 'form-msg ok'; msg.textContent = '✓ تم استلام رسالتك — سيتواصل معك فريق خدمة العملاء قريباً'; }
  else { msg.className = 'form-msg err'; msg.innerHTML = `${esc(r.error || 'تعذر الإرسال الآن')} — <a href="${wa('السلام عليكم\n' + (data.message || ''))}" target="_blank" style="text-decoration:underline">تواصل عبر واتساب</a>`; }
});

/* ---------------- الباقات (من لوحة التحكم) ---------------- */
let PLANS = null;
async function loadPlans() {
  const r = await api('/api/public/plans');
  PLANS = r.ok && r.plans && r.plans.length ? { plans: r.plans, currency: r.currency, payMethods: r.payMethods, live: true } : { plans: C.FALLBACK_PLANS || [], currency: C.CURRENCY || 'ر.س', payMethods: ['تحويل بنكي'], live: false };
  $('#plansGrid').innerHTML = PLANS.plans.map(p => `<div class="plan ${p.highlight ? 'best' : ''} reveal in">${p.highlight ? '<span class="tag">الأكثر توفيراً</span>' : ''}<h4>${esc(p.name)}</h4><span class="dur">${esc(p.duration || '')}</span>
    <div class="price">${fmt(p.price)} <small>${esc(PLANS.currency)}</small></div><ul>${(p.features || []).map(f => `<li>${esc(f)}</li>`).join('')}</ul>
    <button class="btn ${p.highlight ? 'gold' : 'glass'} block" data-signup="${esc(p.id)}">اشترك في هذه الباقة</button></div>`).join('') || '<div class="plans-loading">تواصل معنا لمعرفة الباقات</div>';
}
loadPlans();

/* ---------------- نافذة طلب الاشتراك ---------------- */
const M = { step: 0, planId: null, coupon: '', discount: 0, final: null, info: {} };
const modal = $('#signup'), body = $('#mBody');
const plan = () => PLANS.plans.find(p => p.id === M.planId);
const total = () => M.final != null ? M.final : plan().price;
function sumLine() { $('#mSum').innerHTML = plan() ? `${esc(plan().name)} — <b>${fmt(total())} ${esc(PLANS.currency)}</b>${M.discount ? ` <span style="color:var(--green)">(وفّرت ${fmt(M.discount)})</span>` : ''}` : ''; }
function keep() { $$('[data-k]', body).forEach(i => { M.info[i.dataset.k] = i.value.trim(); }); }
const F = (k, l, o = {}) => `<label class="m-field ${o.full ? 'full' : ''}">${l}${o.req ? ' <span class="req-star">*</span>' : ''}${o.sel ? `<select data-k="${k}">${o.sel.map(v => `<option ${M.info[k] === v ? 'selected' : ''}>${esc(v)}</option>`).join('')}</select>` : o.area ? `<textarea data-k="${k}" rows="3">${esc(M.info[k] || '')}</textarea>` : `<input data-k="${k}" value="${esc(M.info[k] || '')}" placeholder="${esc(o.ph || '')}" ${o.ltr ? 'class="ltr"' : ''} ${o.list ? 'list="acts"' : ''}>`}</label>`;
function draw() {
  $('#mSteps').innerHTML = ['الباقة', 'بيانات المنشأة', 'المراجعة والإرسال'].map((t, i) => `<div class="m-step ${i === M.step ? 'on' : i < M.step ? 'done' : ''}"><span>${i < M.step ? '✓' : i + 1}</span>${t}</div>`).join('<i></i>');
  $('#mBack').style.visibility = M.step ? 'visible' : 'hidden';
  $('#mNext').textContent = M.step === 2 ? 'إرسال الطلب ✓' : 'التالي ←';
  if (M.step === 0) {
    body.innerHTML = `<div class="m-plans">${PLANS.plans.map(p => `<div class="plan ${p.highlight ? 'best' : ''} ${p.id === M.planId ? 'on' : ''}" data-p="${esc(p.id)}">${p.highlight ? '<span class="tag">الأوفر</span>' : ''}<h4>${esc(p.name)}</h4><span class="dur">${esc(p.duration || '')}</span><div class="price">${fmt(p.price)} <small>${esc(PLANS.currency)}</small></div><ul>${(p.features || []).slice(0, 4).map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>`).join('')}</div>
      <div class="coupon"><input class="ltr" id="cCode" placeholder="كود الخصم (اختياري)" value="${esc(M.coupon)}" style="height:46px;border-radius:12px;border:1px solid var(--line2);background:rgba(7,10,20,.55);padding:0 14px;color:var(--text)"><button class="btn glass" id="cApply" type="button">تطبيق</button></div><div class="form-msg" id="cMsg"></div>`;
    $$('[data-p]', body).forEach(b => b.onclick = () => { M.planId = b.dataset.p; T('plan', plan().name); $$('[data-p]', body).forEach(x => x.classList.toggle('on', x === b)); if (M.coupon) apply(); else { M.final = null; M.discount = 0; sumLine(); } });
    const apply = async () => {
      M.coupon = $('#cCode').value.trim(); const msg = $('#cMsg');
      if (!M.coupon) { M.final = null; M.discount = 0; msg.textContent = ''; return sumLine(); }
      if (!PLANS.live) { msg.className = 'form-msg err'; msg.textContent = 'تعذر التحقق من الكود الآن — أرسل الطلب وسنطبقه لك'; return; }
      msg.className = 'form-msg'; msg.textContent = 'جارٍ التحقق…';
      const r = await api('/api/public/coupon', { code: M.coupon, planId: M.planId }); T('coupon', M.coupon + (r.ok ? ' ✓' : ' ✗'));
      if (r.ok) { M.final = r.final; M.discount = r.discount; msg.className = 'form-msg ok'; msg.textContent = `✓ تم تطبيق ${r.label} — السعر ${fmt(r.final)} ${PLANS.currency}`; }
      else { M.final = null; M.discount = 0; M.coupon = ''; msg.className = 'form-msg err'; msg.textContent = r.error || 'كود الخصم غير صحيح'; }
      sumLine();
    };
    $('#cApply').onclick = apply; $('#cCode').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); apply(); } };
  } else if (M.step === 1) {
    body.innerHTML = `<div class="m-grid"><div class="m-sec">صاحب الطلب</div>${F('ownerName', 'الاسم الكامل', { req: 1 })}${F('mobile', 'رقم الجوال المراد تفعيله', { req: 1, ltr: 1, ph: '05xxxxxxxx' })}${F('email', 'البريد الإلكتروني', { ltr: 1 })}${F('contactTime', 'الوقت المناسب للتواصل', { sel: ['أي وقت', 'صباحاً', 'مساءً'] })}
      <div class="m-sec">بيانات النشاط التجاري</div>${F('company', 'اسم المنشأة', { req: 1 })}${F('companyEn', 'الاسم بالإنجليزية', { ltr: 1 })}${F('activity', 'نوع النشاط', { req: 1, list: 1 })}${F('legalName', 'الاسم القانوني')}${F('crNumber', 'السجل التجاري', { ltr: 1 })}${F('vatNumber', 'الرقم الضريبي', { ltr: 1 })}${F('employees', 'عدد الموظفين', { ltr: 1 })}${F('branches', 'عدد الفروع', { ltr: 1 })}
      <div class="m-sec">العنوان</div>${F('city', 'المدينة', { req: 1 })}${F('district', 'الحي')}${F('street', 'الشارع')}${F('postalCode', 'الرمز البريدي', { ltr: 1 })}
      <div class="m-sec">الدفع</div>${F('payMethod', 'طريقة الدفع المفضلة', { sel: PLANS.payMethods.length ? PLANS.payMethods : ['تحويل بنكي'] })}${F('notes', 'ملاحظات أو احتياجات خاصة', { area: 1, full: 1 })}</div>
      <datalist id="acts">${['تجارة تجزئة', 'تجارة جملة', 'سوبرماركت / تموينات', 'مطعم / كافيه', 'ملابس وأزياء', 'إلكترونيات وجوالات', 'قطع غيار سيارات', 'مواد بناء وأدوات', 'صيدلية / مستلزمات طبية', 'عطور ومستحضرات تجميل', 'مكتبة وقرطاسية', 'أثاث ومفروشات', 'خدمات وصيانة', 'مقاولات'].map(a => `<option value="${a}">`).join('')}</datalist>`;
  } else {
    const I = M.info, row = (k, v) => v ? `<div><small>${k}</small>${esc(v)}</div>` : '';
    body.innerHTML = `<div class="plan best" style="flex-direction:row;align-items:center;justify-content:space-between"><div><small style="color:var(--muted)">الباقة المختارة</small><h4>${esc(plan().name)}</h4><span class="dur">${esc(plan().duration || '')}</span></div>
      <div style="text-align:left">${M.discount ? `<div style="text-decoration:line-through;color:var(--muted)">${fmt(plan().price)}</div>` : ''}<div class="price" style="margin:0">${fmt(total())} <small>${esc(PLANS.currency)}</small></div></div></div>
      <div class="review" style="margin-top:14px">${row('الاسم', I.ownerName)}${row('الجوال', I.mobile)}${row('البريد', I.email)}${row('المنشأة', I.company)}${row('النشاط', I.activity)}${row('المدينة', I.city)}${row('السجل التجاري', I.crNumber)}${row('الرقم الضريبي', I.vatNumber)}${row('طريقة الدفع', I.payMethod)}</div>
      <label class="agree"><input type="checkbox" id="agree"> أوافق على أن يتواصل معي فريق رواج لإتمام الاشتراك، وأن البيانات المدخلة صحيحة.</label>`;
  }
  sumLine();
}
function validate() {
  if (M.step === 1) {
    keep(); const I = M.info;
    const miss = [['ownerName', 'الاسم'], ['mobile', 'رقم الجوال'], ['company', 'اسم المنشأة'], ['activity', 'نوع النشاط'], ['city', 'المدينة']].find(([k]) => !I[k]);
    $$('.m-field', body).forEach(x => x.classList.remove('bad'));
    if (miss) { const i = $(`[data-k="${miss[0]}"]`, body); i.parentElement.classList.add('bad'); i.focus(); toast(`الحقل «${miss[1]}» مطلوب`, 1); return false; }
    if (!/^\+?\d{9,15}$/.test(I.mobile.replace(/[\s-]/g, ''))) { toast('رقم الجوال غير صحيح', 1); return false; }
    if (I.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(I.email)) { toast('البريد الإلكتروني غير صحيح', 1); return false; }
  }
  if (M.step === 2 && !$('#agree').checked) { toast('يرجى الموافقة للمتابعة', 1); return false; }
  return true;
}
async function openSignup(planId) {
  if (!PLANS) await loadPlans();
  Object.assign(M, { step: 0, planId: planId || (PLANS.plans.find(p => p.highlight) || PLANS.plans[0] || {}).id, coupon: '', discount: 0, final: null });
  $('#mNext').hidden = false; $('#mBack').hidden = false;
  if (!PLANS.plans.length) { body.innerHTML = `<div class="done"><h3>تواصل معنا لمعرفة الباقات</h3><p><a class="btn gold" href="${wa()}" target="_blank">واتساب</a></p></div>`; $('#mNext').hidden = true; }
  else draw();
  modal.hidden = false; document.body.style.overflow = 'hidden';
}
function closeSignup() { modal.hidden = true; document.body.style.overflow = ''; }
$('#mBack').onclick = () => { if (M.step === 1) keep(); M.step = Math.max(0, M.step - 1); draw(); };
$('#mNext').onclick = async () => {
  if (M.step === 3) return closeSignup();
  if (!validate()) return;
  if (M.step < 2) { M.step++; draw(); return; }
  const b = $('#mNext'); b.disabled = true; b.textContent = 'جارٍ الإرسال…';
  const r = await api('/api/public/signup', { planId: M.planId, coupon: M.coupon, customer: M.info });
  b.disabled = false;
  if (!r.ok) {
    b.textContent = 'إرسال الطلب ✓';
    const text = `السلام عليكم، أرغب في الاشتراك في نظام رواج\nالباقة: ${plan().name}\nالاسم: ${M.info.ownerName}\nالمنشأة: ${M.info.company}\nالجوال: ${M.info.mobile}\nالمدينة: ${M.info.city}`;
    body.insertAdjacentHTML('beforeend', `<div class="form-msg err" style="margin-top:12px">${esc(r.error || 'تعذر إرسال الطلب الآن')} — <a href="${wa(text)}" target="_blank" style="text-decoration:underline">أرسله عبر واتساب</a></div>`);
    return;
  }
  T('signup_sent', plan().name + ' — ' + fmt(total()));
  M.step = 3; $('#mSteps').innerHTML = ''; $('#mSum').innerHTML = ''; $('#mBack').hidden = true; b.textContent = 'تم';
  body.innerHTML = `<div class="done"><div class="ok">${ic('check')}</div><h3>تم استلام طلبك بنجاح</h3><p>شكراً ${esc(M.info.ownerName)} — <b>سيتم التواصل معك قريباً</b> على الرقم <span class="ltr">${esc(M.info.mobile)}</span> لإتمام الاشتراك وإرسال بيانات الدخول وعقد الاشتراك.</p>
    <p style="margin-top:18px"><a class="btn glass" href="${wa(`السلام عليكم، أرسلت طلب اشتراك من الموقع\nالمنشأة: ${M.info.company}\nالباقة: ${plan().name}`)}" target="_blank">${ic('chat')} تواصل معنا الآن</a></p></div>`;
};
document.addEventListener('click', e => {
  const s = e.target.closest('[data-signup]'); if (s) { e.preventDefault(); openSignup(s.dataset.signup || null); }
  if (e.target.closest('[data-close]') || e.target === modal) closeSignup();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeSignup(); });

/* ---------------- الحركة والتنقل ---------------- */
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .12 });
$$('.reveal').forEach(el => io.observe(el));
addEventListener('scroll', () => $('#nav').classList.toggle('scrolled', scrollY > 20), { passive: true });
$('#burger').onclick = () => $('#links').classList.toggle('open');
$$('#links a').forEach(a => a.onclick = () => $('#links').classList.remove('open'));
