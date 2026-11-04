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
  ['receipt', 'ربط مباشر مع هيئة الزكاة', 'الفوترة الإلكترونية — المرحلة الثانية: توقيع رقمي، QR معتمد، وإبلاغ واعتماد فوري للفواتير.'],
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
  ['هل النظام مربوط مع هيئة الزكاة (فاتورة)؟', 'نعم — يدعم المرحلة الثانية: ربط الجهاز ببوابة «فاتورة» برمز OTP، توقيع كل فاتورة رقمياً بصيغة UBL 2.1، رمز QR المرحلة الثانية، والإبلاغ عن المبسطة واعتماد الضريبية مباشرة، مع قسم «الفواتير الإلكترونية» لمتابعة الإرسال. تُفعَّل الخدمة لاشتراكك من الدعم الفني.'],
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
  PLANS = r.ok && r.plans && r.plans.length ? { plans: r.plans, currency: r.currency, payMethods: r.payMethods, bankInfo: r.bankInfo || '', live: true } : { plans: C.FALLBACK_PLANS || [], currency: C.CURRENCY || 'ر.س', payMethods: ['تحويل بنكي'], live: false };
  $('#plansGrid').innerHTML = PLANS.plans.map(p => `<div class="plan ${p.highlight ? 'best' : ''} reveal in">${p.highlight ? '<span class="tag">الأكثر توفيراً</span>' : ''}<h4>${esc(p.name)}</h4><span class="dur">${esc(p.duration || '')}</span>
    <div class="price">${fmt(p.price)} <small>${esc(PLANS.currency)}</small></div><ul>${(p.features || []).map(f => `<li>${esc(f)}</li>`).join('')}</ul>
    <button class="btn ${p.highlight ? 'gold' : 'glass'} block" data-signup="${esc(p.id)}">اشترك في هذه الباقة</button></div>`).join('') || '<div class="plans-loading">تواصل معنا لمعرفة الباقات</div>';
}
loadPlans();

/* ---------------- نافذة طلب الاشتراك — نفس شكل وخطوات نافذة الاشتراك داخل النظام ---------------- */
const M = { step: 0, planId: null, coupon: '', discount: 0, final: null, info: {} };
const modal = $('#signup'), body = $('#mBody');
const plan = () => PLANS.plans.find(p => p.id === M.planId);
const total = () => M.final != null ? M.final : plan().price;
const CHK = '<svg class="sg-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 10 17 19 7.5"/></svg>';
function sumLine() { $('#mSum').innerHTML = plan() ? `${esc(plan().name)} — <b>${fmt(total())}</b> ${esc(PLANS.currency)}${M.discount ? ` <span class="sg-badge">وفّرت ${fmt(M.discount)}</span>` : ''}` : ''; }
function keep() { $$('[data-k]', body).forEach(i => { M.info[i.dataset.k] = i.value.trim(); }); }
const F = (k, l, o = {}) => `<label class="sg-field ${o.full ? 'full' : ''}"><span>${l}${o.req ? ' <b class="req-star">*</b>' : ''}</span><input data-k="${k}" value="${esc(M.info[k] || '')}" placeholder="${esc(o.ph || '')}" ${o.ltr ? 'class="ltr" dir="ltr"' : ''}>${o.hint ? `<small>${o.hint}</small>` : ''}</label>`;
function draw() {
  $('#mSteps').innerHTML = ['اختر الباقة', 'بياناتك', 'المراجعة والإرسال'].map((t, i) => `<div class="sg-step ${i === M.step ? 'active' : i < M.step ? 'done' : ''}"><span>${i < M.step ? CHK : i + 1}</span>${t}</div>`).join('<i></i>');
  $('#mBack').style.visibility = M.step ? 'visible' : 'hidden';
  $('#mNext').innerHTML = M.step === 2 ? 'إرسال الطلب' : 'التالي ‹';
  if (M.step === 0) {
    body.innerHTML = `<div class="sg-plans">${PLANS.plans.map(p => `<button type="button" class="sg-plan ${p.highlight ? 'best' : ''} ${p.id === M.planId ? 'active' : ''}" data-p="${esc(p.id)}">${p.highlight ? '<span class="tag">الأوفر</span>' : ''}
        <div class="nm">${esc(p.name)}</div><div class="pr">${fmt(p.price)} <small>${esc(PLANS.currency)}</small></div><div class="du">${esc(p.duration || '')}</div>
        <ul>${(p.features || []).map(f => `<li>${CHK} ${esc(f)}</li>`).join('')}</ul></button>`).join('')}</div>
      <div class="sg-coupon"><div class="sg-cbox"><input class="ltr" dir="ltr" id="cCode" placeholder="كود الخصم (اختياري)" value="${esc(M.coupon)}"><button class="sg-btn sec" id="cApply" type="button">تطبيق</button></div><div class="form-msg" id="cMsg"></div></div>`;
    $$('[data-p]', body).forEach(b => b.onclick = () => { M.planId = b.dataset.p; T('plan', plan().name); $$('[data-p]', body).forEach(x => x.classList.toggle('active', x === b)); if (M.coupon) apply(); else { M.final = null; M.discount = 0; sumLine(); } });
    const apply = async () => {
      M.coupon = $('#cCode').value.trim(); const msg = $('#cMsg');
      if (!M.coupon) { M.final = null; M.discount = 0; msg.textContent = ''; return sumLine(); }
      if (!PLANS.live) { msg.className = 'form-msg err'; msg.textContent = 'تعذر التحقق من الكود الآن — أرسل الطلب وسنطبقه لك'; return; }
      msg.className = 'form-msg'; msg.textContent = 'جارٍ التحقق…';
      const r = await api('/api/public/coupon', { code: M.coupon, planId: M.planId }); T('coupon', M.coupon + (r.ok ? ' ✓' : ' ✗'));
      if (r.ok) { M.final = r.final; M.discount = r.discount; msg.className = 'form-msg ok'; msg.textContent = `✓ تم تطبيق ${r.label} — السعر بعد الخصم ${fmt(r.final)} ${PLANS.currency}`; }
      else { M.final = null; M.discount = 0; M.coupon = ''; msg.className = 'form-msg err'; msg.textContent = r.error || 'كود الخصم غير صحيح'; }
      sumLine();
    };
    $('#cApply').onclick = apply; $('#cCode').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); apply(); } };
  } else if (M.step === 1) {
    body.innerHTML = `<p class="sg-intro">ثلاث معلومات فقط — نستلم طلبك ونتواصل معك لإرسال مفتاح التفعيل. بعد التفعيل تُكمل إعداد نشاطك من داخل النظام.</p>
      <div class="sg-grid">${F('company', 'اسم النشاط', { req: 1, full: 1, ph: 'مثال: مؤسسة الريادة التجارية' })}
      ${F('mobile', 'رقم الجوال', { req: 1, ltr: 1, ph: '05xxxxxxxx', hint: 'يُستخدم للتواصل وتسجيل الدخول' })}${F('email', 'البريد الإلكتروني', { req: 1, ltr: 1, ph: 'name@example.com' })}</div>
      <div class="sg-serial"><span>الرقم التسلسلي (اختياري — يُرسل مع الطلب)</span><input class="ltr" dir="ltr" data-k="serial" value="${esc(M.info.serial || '')}" placeholder="RWJ-XXXX-XXXX-XXXX-XXXX"><small>يظهر أسفل شاشة الدخول بعد تثبيت النظام — إن كان مثبتاً لديك أضفه ليُربط طلبك بجهازك مباشرة</small></div>`;
  } else {
    const I = M.info, row = (k, v, l) => v ? `<div><div class="k">${k}</div><div class="v ${l ? 'ltr' : ''}">${esc(v)}</div></div>` : '';
    body.innerHTML = `<div class="sg-plan-sum"><div><div class="k">الباقة المختارة</div><div class="nm">${esc(plan().name)}</div><div class="du">${esc(plan().duration || '')}</div></div>
        <div class="pr">${M.discount ? `<s>${fmt(plan().price)} ${esc(PLANS.currency)}</s>` : ''}<b>${fmt(total())} <small>${esc(PLANS.currency)}</small></b>${M.coupon ? `<span class="sg-badge">${esc(M.coupon)}</span>` : ''}</div></div>
      <div class="sg-info">${row('اسم النشاط', I.company)}${row('الجوال', I.mobile, 1)}${row('البريد', I.email, 1)}${row('الرقم التسلسلي', I.serial, 1)}</div>
      <label class="sg-agree"><input type="checkbox" id="agree"> أوافق على أن يتواصل معي فريق رواج لإتمام الاشتراك، وأن البيانات المدخلة صحيحة.</label>`;
  }
  sumLine();
}
function validate() {
  if (M.step === 1) {
    keep(); const I = M.info;
    const miss = [['company', 'اسم النشاط'], ['mobile', 'رقم الجوال'], ['email', 'البريد الإلكتروني']].find(([k]) => !I[k]);
    $$('.sg-field', body).forEach(x => x.classList.remove('bad'));
    if (miss) { const i = $(`[data-k="${miss[0]}"]`, body); i.parentElement.classList.add('bad'); i.focus(); toast(`الحقل «${miss[1]}» مطلوب`, 1); return false; }
    if (!/^\+?\d{9,15}$/.test(I.mobile.replace(/[\s-]/g, ''))) { toast('رقم الجوال غير صحيح', 1); return false; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(I.email)) { toast('البريد الإلكتروني غير صحيح', 1); return false; }
    if (I.serial && !/^RWJ(-[A-Z0-9]{4}){4}$/i.test(I.serial)) { toast('الرقم التسلسلي بالشكل RWJ-XXXX-XXXX-XXXX-XXXX', 1); return false; }
  }
  if (M.step === 2 && !$('#agree').checked) { toast('يرجى الموافقة للمتابعة', 1); return false; }
  return true;
}
async function openSignup(planId) {
  M.mode = 'signup'; setHead(false);
  if (!PLANS) await loadPlans();
  Object.assign(M, { step: 0, planId: planId || (PLANS.plans.find(p => p.highlight) || PLANS.plans[0] || {}).id, coupon: '', discount: 0, final: null });
  $('#mNext').hidden = false; $('#mBack').hidden = false; $('#mWa').hidden = true;
  if (!PLANS.plans.length) {
    $('#mSteps').innerHTML = ''; $('#mNext').hidden = true; $('#mBack').hidden = true;
    body.innerHTML = `<div class="sg-done"><h3>تعذر تحميل الباقات الآن</h3><p>تحقق من اتصال الإنترنت أو تواصل معنا مباشرة عبر واتساب</p><p style="margin-top:16px"><a class="sg-btn wa" href="${wa()}" target="_blank" rel="noopener">${ic('chat')} تواصل عبر واتساب</a></p></div>`;
  } else draw();
  modal.hidden = false; document.body.style.overflow = 'hidden';
}
function closeSignup() { modal.hidden = true; document.body.style.overflow = ''; }
$('#mBack').onclick = () => { if (M.step === 1) keep(); M.step = Math.max(0, M.step - 1); draw(); };
$('#mNext').onclick = async () => {
  if (M.step === 3) return closeSignup();
  if (!validate()) return;
  if (M.step < 2) { M.step++; draw(); return; }
  const b = $('#mNext'); b.disabled = true; b.textContent = 'جارٍ الإرسال…';
  const r = await api('/api/public/signup', { planId: M.planId, coupon: M.coupon, customer: M.info, serial: M.info.serial || '' });
  b.disabled = false;
  if (!r.ok) {
    b.textContent = 'إرسال الطلب';
    const text = `السلام عليكم، أرغب في الاشتراك في نظام رواج\nالباقة: ${plan().name}\nاسم النشاط: ${M.info.company}\nالجوال: ${M.info.mobile}\nالبريد: ${M.info.email}${M.info.serial ? '\nالرقم التسلسلي: ' + M.info.serial : ''}`;
    body.insertAdjacentHTML('beforeend', `<div class="form-msg err" style="margin-top:12px">${esc(r.error || 'تعذر إرسال الطلب — حاول مرة أخرى')} — <a href="${wa(text)}" target="_blank" rel="noopener" style="text-decoration:underline">أرسله عبر واتساب</a></div>`);
    return;
  }
  T('signup_sent', plan().name + ' — ' + fmt(total()));
  M.step = 3; $('#mSteps').innerHTML = ''; $('#mBack').hidden = true; b.textContent = 'تم';
  const sum = `${esc(plan().name)} · <b>${fmt(total())}</b> ${esc(PLANS.currency)}`;
  $('#mSum').innerHTML = '';
  body.innerHTML = `<div class="sg-done"><div class="sg-check">${CHK}</div><h3>تم استلام طلبك بنجاح</h3>
    <p>شكراً لك — <b>سيتم التواصل معك قريباً</b> على الرقم <span class="ltr" dir="ltr">${esc(M.info.mobile)}</span> لإتمام الاشتراك وإرسال مفتاح التفعيل. بعد التفعيل يفتح لك النظام إعداد نشاطك خطوة بخطوة.</p>
    <div class="sg-muted">الباقة: ${sum}</div></div>`;
  const w = $('#mWa'); w.hidden = false;
  w.href = wa(`السلام عليكم، أرسلت طلب اشتراك في نظام رواج\nالمنشأة: ${M.info.company}\nالباقة: ${plan().name}\nالجوال: ${M.info.mobile}`);
};
document.addEventListener('click', e => {
  const s = e.target.closest('[data-signup]'); if (s) { e.preventDefault(); openSignup(s.dataset.signup || null); }
  if (e.target.closest('[data-close]') || e.target === modal) closeSignup();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeSignup(); });

/* ---------------- تجديد الاشتراك — لعميل له حساب فقط (بالرقم التسلسلي أو الجوال المسجّل) ---------------- */
const RN = { step: 0, id: '', planId: null, method: '', notes: '' };
const HEAD = $('#signup .sg-head > div').innerHTML;
function setHead(renew) {
  $('#signup .sg-head > div').innerHTML = renew ? `<h3><svg class="sg-spark" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.7M20 4v4.7h-4.7M20 12a8 8 0 0 1-13.7 5.6L4 15.3M4 20v-4.7h4.7"/></svg> تجديد الاشتراك</h3><small>للمشتركين الحاليين — جدّد باقتك في دقيقة</small>` : HEAD;
}
const rnPlan = () => PLANS.plans.find(p => p.id === RN.planId);
function rnSum() { $('#mSum').innerHTML = RN.step > 0 && rnPlan() ? `${esc(rnPlan().name)} — <b>${fmt(rnPlan().price)}</b> ${esc(PLANS.currency)}` : ''; }
function rnDraw() {
  $('#mSteps').innerHTML = ['بيانات اشتراكك', 'الباقة وطريقة الدفع', 'المراجعة والإرسال'].map((t, i) => `<div class="sg-step ${i === RN.step ? 'active' : i < RN.step ? 'done' : ''}"><span>${i < RN.step ? CHK : i + 1}</span>${t}</div>`).join('<i></i>');
  $('#mBack').style.visibility = RN.step ? 'visible' : 'hidden';
  $('#mNext').innerHTML = RN.step === 2 ? 'إرسال طلب التجديد' : 'التالي ‹';
  if (RN.step === 0) {
    body.innerHTML = `<p class="sg-intro">اكتب <b>الرقم التسلسلي</b> لجهازك أو <b>رقم الجوال المسجّل</b> في اشتراكك — نتحقق أن لديك حساباً ثم تختار باقة التجديد.</p>
      <div class="sg-serial" style="max-width:none"><span>الرقم التسلسلي أو رقم الجوال المسجّل</span><input class="ltr" dir="ltr" id="rnId" value="${esc(RN.id)}" placeholder="RWJ-XXXX-XXXX-XXXX-XXXX  أو  05xxxxxxxx" autocomplete="off">
      <small>الرقم التسلسلي يظهر أسفل شاشة الدخول في النظام، وفي «حسابي واشتراكي»</small></div>`;
    setTimeout(() => $('#rnId') && $('#rnId').focus(), 30);
    $('#rnId').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); $('#mNext').click(); } };
  } else if (RN.step === 1) {
    const pm = PLANS.payMethods || [];
    body.innerHTML = `<div class="sg-plans">${PLANS.plans.map(p => `<button type="button" class="sg-plan ${p.highlight ? 'best' : ''} ${p.id === RN.planId ? 'active' : ''}" data-p="${esc(p.id)}">${p.highlight ? '<span class="tag">الأوفر</span>' : ''}
        <div class="nm">${esc(p.name)}</div><div class="pr">${fmt(p.price)} <small>${esc(PLANS.currency)}</small></div><div class="du">${esc(p.duration || '')}</div></button>`).join('')}</div>
      ${pm.length ? `<div class="sg-pay"><span>طريقة الدفع</span><div>${pm.map(x => `<button type="button" class="sg-pm ${x === RN.method ? 'active' : ''}" data-m="${esc(x)}">${esc(x)}</button>`).join('')}</div></div>` : ''}
      <label class="sg-field full" style="margin-top:14px"><span>ملاحظة (اختياري)</span><input id="rnNotes" value="${esc(RN.notes)}" placeholder="مثال: أرغب بالتجديد على نفس الجهاز"></label>`;
    $$('[data-p]', body).forEach(b => b.onclick = () => { RN.planId = b.dataset.p; T('renew_plan', rnPlan().name); $$('[data-p]', body).forEach(x => x.classList.toggle('active', x === b)); rnSum(); });
    $$('[data-m]', body).forEach(b => b.onclick = () => { RN.method = b.dataset.m; $$('[data-m]', body).forEach(x => x.classList.toggle('active', x === b)); });
  } else {
    const row = (k, v, l) => v ? `<div><div class="k">${k}</div><div class="v ${l ? 'ltr' : ''}">${esc(v)}</div></div>` : '';
    body.innerHTML = `<div class="sg-plan-sum"><div><div class="k">باقة التجديد</div><div class="nm">${esc(rnPlan().name)}</div><div class="du">${esc(rnPlan().duration || '')}</div></div>
        <div class="pr"><b>${fmt(rnPlan().price)} <small>${esc(PLANS.currency)}</small></b></div></div>
      <div class="sg-info">${row('رقم الاشتراك', RN.id, 1)}${row('طريقة الدفع', RN.method)}${row('ملاحظة', RN.notes)}</div>
      <p class="sg-intro" style="margin-top:14px">تُضاف مدة الباقة إلى تاريخ انتهاء اشتراكك الحالي — لا تخسر الأيام المتبقية. بعد تأكيد وصول المبلغ يتجدد النظام على جهازك تلقائياً.</p>
      <label class="sg-agree"><input type="checkbox" id="agree"> أؤكد أن هذا اشتراكي، وسأدفع بالطريقة المختارة.</label>`;
  }
  rnSum();
}
function rnNotFound() {
  RN.step = 'nf'; $('#mSteps').innerHTML = ''; $('#mBack').style.visibility = 'visible'; $('#mNext').hidden = true; $('#mSum').innerHTML = '';
  const serial = /^RWJ-/i.test(RN.id) ? RN.id.toUpperCase() : '', mobile = serial ? '' : RN.id;
  body.innerHTML = `<div class="sg-done"><h3>لم نجد اشتراكاً بهذا الرقم</h3><p>تأكد من كتابة الرقم التسلسلي أو رقم الجوال المسجّل بشكل صحيح، أو اختر:</p>
    <div class="sg-nf"><button type="button" class="sg-btn pri" id="nfNew">${ic('sparkles')} اشترك الآن</button><button type="button" class="sg-btn sec" id="nfSup">${ic('chat')} تواصل مع الدعم</button></div>
    <p class="sg-muted">إذا كنت مشتركاً وغيّرت رقم جوالك أو جهازك، تواصل مع الدعم وسنساعدك.</p></div>`;
  $('#nfNew').onclick = () => { const plan = RN.planId; openSignup(plan); M.info = { ...M.info, mobile: mobile || M.info.mobile || '', serial: serial || M.info.serial || '' }; T('renew_to_signup', RN.id); };
  $('#nfSup').onclick = () => {
    closeSignup(); const f = $('#contactForm'); if (!f) return;
    if (mobile) f.phone.value = mobile;
    try { f.category.value = [...f.category.options].find(o => /مشكلة|استفسار/.test(o.text)).text; } catch (e) { }
    f.message.value = `أرغب بتجديد اشتراكي ولم يُعثر على حسابي.\nالرقم المُدخل: ${RN.id}`;
    $('#support').scrollIntoView({ behavior: 'smooth' }); setTimeout(() => f.name.focus(), 600);
  };
}
async function openRenew(planId) {
  if (!PLANS) await loadPlans();
  M.mode = 'renew'; setHead(true);
  Object.assign(RN, { step: 0, planId: planId || RN.planId || (PLANS.plans.find(p => p.highlight) || PLANS.plans[0] || {}).id, method: RN.method || '' });
  $('#mNext').hidden = false; $('#mBack').hidden = false; $('#mWa').hidden = true;
  modal.hidden = false; document.body.style.overflow = 'hidden';
  if (!PLANS.live) {
    $('#mSteps').innerHTML = ''; $('#mNext').hidden = true; $('#mBack').hidden = true;
    body.innerHTML = `<div class="sg-done"><h3>تعذر الاتصال الآن</h3><p>تحقق من الإنترنت أو تواصل معنا عبر واتساب لتجديد اشتراكك</p><p style="margin-top:16px"><a class="sg-btn wa" href="${wa('السلام عليكم، أرغب بتجديد اشتراكي في نظام رواج')}" target="_blank" rel="noopener">${ic('chat')} تواصل عبر واتساب</a></p></div>`;
    return;
  }
  rnDraw();
}
async function renewNext() {
  const b = $('#mNext');
  if (RN.step === 3) return closeSignup();
  if (RN.step === 0) {
    RN.id = ($('#rnId').value || '').trim().replace(/\s+/g, '');
    const serial = /^RWJ(-[A-Z0-9]{4}){4}$/i.test(RN.id), phone = /^\+?\d{9,15}$/.test(RN.id.replace(/-/g, ''));
    if (!serial && !phone) return toast('اكتب الرقم التسلسلي (RWJ-XXXX-XXXX-XXXX-XXXX) أو رقم الجوال', 1);
    b.disabled = true; b.textContent = 'جارٍ التحقق…';
    const r = await api('/api/public/renew', { id: RN.id, check: true });
    b.disabled = false; b.innerHTML = 'التالي ‹';
    if (r.notFound) { T('renew_not_found', ''); return rnNotFound(); }
    if (!r.ok) return toast(r.error || 'تعذر التحقق الآن — حاول مرة أخرى', 1);
    RN.step = 1; return rnDraw();
  }
  if (RN.step === 1) {
    RN.notes = ($('#rnNotes').value || '').trim();
    if (!RN.planId) return toast('اختر باقة التجديد', 1);
    if ((PLANS.payMethods || []).length && !RN.method) return toast('اختر طريقة الدفع', 1);
    RN.step = 2; return rnDraw();
  }
  if (!$('#agree').checked) return toast('يرجى التأكيد للمتابعة', 1);
  b.disabled = true; b.textContent = 'جارٍ الإرسال…';
  const r = await api('/api/public/renew', { id: RN.id, planId: RN.planId, payMethod: RN.method, notes: RN.notes });
  b.disabled = false;
  if (r.notFound) return rnNotFound();
  if (!r.ok) { b.textContent = 'إرسال طلب التجديد'; return toast(r.error || 'تعذر إرسال الطلب — حاول مرة أخرى', 1); }
  T('renew_sent', rnPlan().name);
  RN.step = 3; $('#mSteps').innerHTML = ''; $('#mBack').hidden = true; b.textContent = 'تم'; $('#mSum').innerHTML = '';
  const bank = PLANS.bankInfo && /تحويل|بنك/.test(RN.method) ? `<div class="sg-bank"><b>بيانات التحويل</b><pre>${esc(PLANS.bankInfo)}</pre></div>` : '';
  body.innerHTML = `<div class="sg-done"><div class="sg-check">${CHK}</div><h3>تم استلام طلب التجديد</h3>
    <p>شكراً لك — بعد التأكد من وصول المبلغ <b>يتجدد اشتراكك تلقائياً</b> ويتحدث النظام على جهازك خلال ثوانٍ.</p>
    <div class="sg-muted">الباقة: ${esc(rnPlan().name)} · <b>${fmt(rnPlan().price)}</b> ${esc(PLANS.currency)}${RN.method ? ' · ' + esc(RN.method) : ''}</div>${bank}</div>`;
}
const sgNext = $('#mNext').onclick, sgBack = $('#mBack').onclick;
$('#mNext').onclick = e => M.mode === 'renew' ? renewNext() : sgNext(e);
$('#mBack').onclick = e => {
  if (M.mode !== 'renew') return sgBack(e);
  if (RN.step === 'nf') { $('#mNext').hidden = false; RN.step = 0; return rnDraw(); }
  if (RN.step === 1) RN.notes = ($('#rnNotes').value || '').trim();
  RN.step = Math.max(0, RN.step - 1); rnDraw();
};
document.addEventListener('click', e => { const r = e.target.closest('[data-renew]'); if (r) { e.preventDefault(); openRenew(r.dataset.renew || null); } });

/* ---------------- الحركة والتنقل ---------------- */
// الجوال يستعيد آخر موضع تمرير عند الفتح (وأحياناً ينزل لأسفل الصفحة) — نبدأ دائماً من الأعلى ما لم يكن في الرابط قسم محدد
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const toTop = () => { if (!location.hash) { const h = document.documentElement, b = h.style.scrollBehavior; h.style.scrollBehavior = 'auto'; scrollTo(0, 0); h.style.scrollBehavior = b; } };
toTop(); addEventListener('load', toTop); addEventListener('pageshow', e => { if (e.persisted) toTop(); });
const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .12 });
$$('.reveal').forEach(el => io.observe(el));
addEventListener('scroll', () => $('#nav').classList.toggle('scrolled', scrollY > 20), { passive: true });
$('#burger').onclick = () => $('#links').classList.toggle('open');
$$('#links a').forEach(a => a.onclick = () => $('#links').classList.remove('open'));
