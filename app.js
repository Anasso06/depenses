'use strict';

/* ---------- Constantes et traductions ---------- */

const KEY = 'depenses:v1';
const COLORS = ['#0f766e', '#2563eb', '#d97706', '#9333ea', '#dc2626', '#0891b2', '#65a30d', '#db2777', '#64748b'];
const TESS_URL = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';

const I18N = {
  fr: {
    app: 'Mes dépenses', expenses: 'Dépenses', income: 'Revenus', net: 'Solde du mois',
    accounts: 'Comptes', total: 'Total', byCategory: 'Dépenses par catégorie', operations: 'Opérations',
    noOps: 'Aucune opération ce mois-ci.', noChart: 'Pas encore de dépenses à afficher.',
    add: 'Ajouter', edit: 'Modifier', save: 'Enregistrer', cancel: 'Annuler', delete: 'Supprimer', close: 'Fermer',
    tOut: 'Dépense', tIn: 'Revenu', tTr: 'Transfert',
    amount: 'Montant (MAD)', account: 'Compte', from: 'De', to: 'Vers', category: 'Catégorie', subcat: 'Sous-catégorie',
    none: '—', date: 'Date', time: 'Heure', note: 'Note', attach: 'Joindre un PDF ou une image', attachment: 'Pièce jointe',
    removeAtt: 'Retirer', view: 'Voir',
    multiLines: 'Plusieurs lignes', singleNote: 'Note simple', articles: 'Articles', articleName: 'Article ou tâche',
    addLine: 'Ajouter une ligne', sumHint: 'Le montant est la somme des lignes.',
    reading: 'Lecture de la pièce jointe…', readOk: 'Rempli depuis la pièce jointe : ', readNone: 'Rien de lisible dans la pièce jointe. Remplis à la main.',
    readFail: 'Lecture impossible. Remplis à la main.', needNet: 'La lecture des images a besoin d’internet la première fois. Remplis à la main pour l’instant.',
    useItems: 'Utiliser les articles détectés', itemsUsed: 'Articles ajoutés',
    settings: 'Réglages', language: 'Langue', backup: 'Sauvegarde', exportFull: 'Sauvegarde complète (.json)', exportXlsx: 'Tableau Excel (.xlsx)',
    import: 'Importer une sauvegarde',
    exportHint: 'La sauvegarde complète contient les opérations et les pièces jointes. Le fichier Excel sert à consulter et analyser.',
    importHint: 'Remplace les données actuelles par celles d’une sauvegarde (.json).',
    manageAccounts: 'Comptes', manageCats: 'Catégories et sous-catégories', newAccount: 'Nom du compte', newCat: 'Nom de la catégorie',
    newSub: 'Nouvelle sous-catégorie', initial: 'Solde de départ de chaque compte', addBtn: 'Ajouter',
    confirmDel: 'Supprimer cette opération ?', confirmImport: 'Remplacer toutes les données actuelles par ce fichier ?',
    importOk: 'Données importées', importBad: 'Fichier invalide', exported: 'Fichier créé',
    needAmount: 'Entre un montant supérieur à 0.', sameAcc: 'Choisis deux comptes différents.',
    usedAcc: 'Ce compte a des opérations, il ne peut pas être supprimé.',
    usedCat: 'Cette catégorie est utilisée, elle ne peut pas être supprimée.',
    usedSub: 'Cette sous-catégorie est utilisée, elle ne peut pas être supprimée.',
    lastOne: 'Il doit en rester au moins un.', fileErr: 'Impossible d’enregistrer ou de lire le fichier.',
    storageErr: 'Stockage plein ou indisponible.', needName: 'Entre un nom.',
    prev: 'Mois précédent', next: 'Mois suivant',
    cash: 'Espèces', bank: 'Banque', savings_acc: 'Épargne',
    groceries: 'Courses', transport: 'Transport', savings: 'Épargne', internet: 'Internet',
    maintenance: 'Entretien', others: 'Autres',
    xDate: 'Date', xTime: 'Heure', xType: 'Type', xAccount: 'Compte', xTo: 'Vers le compte', xCat: 'Catégorie',
    xSub: 'Sous-catégorie', xNote: 'Note', xItems: 'Articles', xAmount: 'Montant (MAD)', xAtt: 'Pièce jointe',
    budgets: 'Budgets du mois', budgetOf: 'Budget mensuel (MAD)', overBy: 'dépassé de',
    budgetNear: 'Budget {c} : {p} % utilisé', budgetOver: 'Budget {c} dépassé',
    search: 'Rechercher (note, article, montant…)', fAcc: 'Comptes', fCat: 'Catégories', fType: 'Types',
    allPeriods: 'Toutes les périodes', clearFilters: 'Effacer les filtres', resCount: 'opération(s)', noMatch: 'Aucune opération ne correspond.',
    compare: 'Comparaison avec le mois précédent', last6: 'Dépenses des 6 derniers mois', newItem: 'nouveau', totalRow: 'Total',
    reset: 'Remise à zéro', resetHint: 'Efface les opérations et leurs pièces jointes. Une sauvegarde est téléchargée avant. Les comptes et les catégories sont gardés.',
    resetMonth: 'Effacer ce mois', resetAll: 'Effacer toutes les opérations', resetBal: 'Remettre aussi les soldes de départ à 0',
    resetConfirm: 'Supprimer {n} opération(s) : {label} ?', attDeleted: 'Les pièces jointes liées seront supprimées.',
    balZero: 'Les soldes de départ seront remis à 0.', backupNote: 'Une sauvegarde sera téléchargée avant la suppression.',
    resetConfirm2: 'Dernière confirmation : cette action est définitive. Continuer ?', resetDone: 'Remise à zéro effectuée',
    nothingToReset: 'Rien à supprimer.', backupFail: 'Sauvegarde impossible : rien n’a été supprimé.', allOps: 'toutes les opérations',
    viewOp: 'Consulter', editOp: 'Modifier', delOp: 'Supprimer', detail: 'Détail de l’opération', noAtt: 'Aucune',
    openAtt: 'Voir la pièce jointe', deleted: 'Opération supprimée', type: 'Type', rights: 'Tous droits réservés'
  },
  ar: {
    app: 'مصاريفي', expenses: 'المصاريف', income: 'المداخيل', net: 'رصيد الشهر',
    accounts: 'الحسابات', total: 'المجموع', byCategory: 'المصاريف حسب الفئة', operations: 'العمليات',
    noOps: 'لا توجد عمليات هذا الشهر.', noChart: 'لا توجد مصاريف لعرضها بعد.',
    add: 'إضافة', edit: 'تعديل', save: 'حفظ', cancel: 'إلغاء', delete: 'حذف', close: 'إغلاق',
    tOut: 'مصروف', tIn: 'دخل', tTr: 'تحويل',
    amount: 'المبلغ (درهم)', account: 'الحساب', from: 'من', to: 'إلى', category: 'الفئة', subcat: 'الفئة الفرعية',
    none: '—', date: 'التاريخ', time: 'الساعة', note: 'ملاحظة', attach: 'إرفاق ملف PDF أو صورة', attachment: 'مرفق',
    removeAtt: 'إزالة', view: 'عرض',
    multiLines: 'عدة أسطر', singleNote: 'ملاحظة بسيطة', articles: 'المشتريات', articleName: 'مادة أو مهمة',
    addLine: 'إضافة سطر', sumHint: 'المبلغ هو مجموع الأسطر.',
    reading: 'جارٍ قراءة المرفق…', readOk: 'تمت التعبئة من المرفق: ', readNone: 'لا يوجد شيء مقروء في المرفق. املأ يدوياً.',
    readFail: 'تعذرت القراءة. املأ يدوياً.', needNet: 'قراءة الصور تحتاج إلى الإنترنت في المرة الأولى. املأ يدوياً الآن.',
    useItems: 'استعمال المواد المكتشفة', itemsUsed: 'تمت إضافة المواد',
    settings: 'الإعدادات', language: 'اللغة', backup: 'النسخ الاحتياطي', exportFull: 'نسخة كاملة (.json)', exportXlsx: 'جدول إكسل (.xlsx)',
    import: 'استيراد نسخة احتياطية',
    exportHint: 'النسخة الكاملة تحتوي على العمليات والمرفقات. ملف إكسل للاطلاع والتحليل.',
    importHint: 'يستبدل البيانات الحالية بنسخة احتياطية (.json).',
    manageAccounts: 'الحسابات', manageCats: 'الفئات والفئات الفرعية', newAccount: 'اسم الحساب', newCat: 'اسم الفئة',
    newSub: 'فئة فرعية جديدة', initial: 'الرصيد الابتدائي لكل حساب', addBtn: 'إضافة',
    confirmDel: 'حذف هذه العملية؟', confirmImport: 'استبدال كل البيانات الحالية بهذا الملف؟',
    importOk: 'تم استيراد البيانات', importBad: 'ملف غير صالح', exported: 'تم إنشاء الملف',
    needAmount: 'أدخل مبلغاً أكبر من 0.', sameAcc: 'اختر حسابين مختلفين.',
    usedAcc: 'هذا الحساب يحتوي على عمليات ولا يمكن حذفه.',
    usedCat: 'هذه الفئة مستعملة ولا يمكن حذفها.',
    usedSub: 'هذه الفئة الفرعية مستعملة ولا يمكن حذفها.',
    lastOne: 'يجب أن يبقى واحد على الأقل.', fileErr: 'تعذر حفظ الملف أو قراءته.',
    storageErr: 'التخزين ممتلئ أو غير متاح.', needName: 'أدخل اسماً.',
    prev: 'الشهر السابق', next: 'الشهر التالي',
    cash: 'نقداً', bank: 'البنك', savings_acc: 'الادخار',
    groceries: 'مشتريات', transport: 'النقل', savings: 'الادخار', internet: 'الإنترنت',
    maintenance: 'الصيانة', others: 'أخرى',
    xDate: 'التاريخ', xTime: 'الساعة', xType: 'النوع', xAccount: 'الحساب', xTo: 'إلى الحساب', xCat: 'الفئة',
    xSub: 'الفئة الفرعية', xNote: 'ملاحظة', xItems: 'المشتريات', xAmount: 'المبلغ (درهم)', xAtt: 'مرفق',
    budgets: 'ميزانيات الشهر', budgetOf: 'الميزانية الشهرية (درهم)', overBy: 'تجاوز بمقدار',
    budgetNear: 'ميزانية {c} : استُعمل {p} %', budgetOver: 'تم تجاوز ميزانية {c}',
    search: 'بحث (ملاحظة، مادة، مبلغ…)', fAcc: 'الحسابات', fCat: 'الفئات', fType: 'الأنواع',
    allPeriods: 'كل الفترات', clearFilters: 'مسح التصفية', resCount: 'عملية', noMatch: 'لا توجد عملية مطابقة.',
    compare: 'مقارنة مع الشهر السابق', last6: 'مصاريف آخر 6 أشهر', newItem: 'جديد', totalRow: 'المجموع',
    reset: 'إعادة التصفير', resetHint: 'يحذف العمليات ومرفقاتها. تُحمَّل نسخة احتياطية قبل ذلك. تبقى الحسابات والفئات.',
    resetMonth: 'حذف هذا الشهر', resetAll: 'حذف كل العمليات', resetBal: 'إرجاع الأرصدة الابتدائية إلى 0 أيضاً',
    resetConfirm: 'حذف {n} عملية : {label} ؟', attDeleted: 'ستُحذف المرفقات المرتبطة بها.',
    balZero: 'ستُرجع الأرصدة الابتدائية إلى 0.', backupNote: 'ستُحمَّل نسخة احتياطية قبل الحذف.',
    resetConfirm2: 'تأكيد أخير : هذا الإجراء نهائي. هل تتابع؟', resetDone: 'تمت إعادة التصفير',
    nothingToReset: 'لا شيء للحذف.', backupFail: 'تعذر إنشاء النسخة الاحتياطية : لم يُحذف شيء.', allOps: 'كل العمليات',
    viewOp: 'عرض', editOp: 'تعديل', delOp: 'حذف', detail: 'تفاصيل العملية', noAtt: 'لا يوجد',
    openAtt: 'عرض المرفق', deleted: 'تم حذف العملية', type: 'النوع', rights: 'جميع الحقوق محفوظة'
  }
};

/* ---------- Utilitaires ---------- */

const $ = (s, r = document) => r.querySelector(s);

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
function pad(n) { return String(n).padStart(2, '0'); }
function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}
function nowTime() {
  const d = new Date();
  return pad(d.getHours()) + ':' + pad(d.getMinutes());
}
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
function parseAmount(v) {
  let s = String(v == null ? '' : v).trim();
  s = s.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
  s = s.replace(/٫/g, '.').replace(/[\s  ]/g, '').replace(',', '.');
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}
function round2(n) { return Math.round(n * 100) / 100; }

/* ---------- État ---------- */

function defaultState() {
  return {
    lang: 'fr',
    accounts: [
      { id: 'a_cash', key: 'cash', initial: 0 },
      { id: 'a_bank', key: 'bank', initial: 0 },
      { id: 'a_sav', key: 'savings_acc', initial: 0 }
    ],
    categories: ['groceries', 'transport', 'savings', 'internet', 'maintenance', 'others']
      .map((k) => ({ id: 'c_' + k, key: k, subs: [] })),
    tx: []
  };
}

function normalize(s) {
  const d = defaultState();
  const cats = Array.isArray(s.categories) && s.categories.length ? s.categories : d.categories;
  cats.forEach((c) => { if (!Array.isArray(c.subs)) c.subs = []; });
  return {
    lang: s.lang === 'ar' ? 'ar' : 'fr',
    accounts: Array.isArray(s.accounts) && s.accounts.length ? s.accounts : d.accounts,
    categories: cats,
    tx: Array.isArray(s.tx)
      ? s.tx.filter((x) => x && typeof x.amount === 'number' && typeof x.date === 'string')
      : []
  };
}

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && Array.isArray(s.tx)) return normalize(s);
  } catch (e) { /* données absentes ou illisibles */ }
  return defaultState();
}

let state = load();
let month = todayStr().slice(0, 7);

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch (e) { toast(t('storageErr')); }
}

const t = (k) => (I18N[state.lang] && I18N[state.lang][k]) || I18N.fr[k] || k;
const accById = (id) => state.accounts.find((a) => a.id === id) || { name: '?', initial: 0 };
const accName = (a) => a.name || t(a.key);
const catName = (c) => c.name || t(c.key);
const catById = (id) => state.categories.find((c) => c.id === id);
const subName = (c, sid) => {
  const s = c && (c.subs || []).find((s) => s.id === sid);
  return s ? s.name : '';
};
function itemsSummary(x) {
  return (x.items || []).map((i) => i.n).filter(Boolean).join(', ');
}

/* ---------- Pièces jointes (IndexedDB) ---------- */

const DB = {
  db: null,
  open() {
    return new Promise((res, rej) => {
      if (!window.indexedDB) return rej(new Error('no idb'));
      const r = indexedDB.open('depenses-files', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('files', { keyPath: 'id' });
      r.onsuccess = () => { DB.db = r.result; res(); };
      r.onerror = () => rej(r.error);
    });
  },
  run(mode, fn) {
    return new Promise((res, rej) => {
      if (!DB.db) return rej(new Error('db unavailable'));
      const tx = DB.db.transaction('files', mode);
      const req = fn(tx.objectStore('files'));
      tx.oncomplete = () => res(req ? req.result : undefined);
      tx.onerror = () => rej(tx.error);
      tx.onabort = () => rej(tx.error);
    });
  },
  put(rec) { return DB.run('readwrite', (s) => s.put(rec)); },
  get(id) { return DB.run('readonly', (s) => s.get(id)); },
  del(id) { return DB.run('readwrite', (s) => s.delete(id)); },
  all() { return DB.run('readonly', (s) => s.getAll()); },
  clear() { return DB.run('readwrite', (s) => s.clear()); }
};

function blobToDataURL(blob) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = () => rej(r.error);
    r.readAsDataURL(blob);
  });
}
function dataURLToBlob(d) {
  const i = d.indexOf(',');
  const mime = (d.slice(0, i).match(/:(.*?);/) || [])[1] || 'application/octet-stream';
  const bin = atob(d.slice(i + 1));
  const arr = new Uint8Array(bin.length);
  for (let k = 0; k < bin.length; k++) arr[k] = bin.charCodeAt(k);
  return new Blob([arr], { type: mime });
}

/* ---------- Lecture des pièces jointes (PDF et images) ---------- */

const OCR = {
  scriptPromise: null,

  loadTesseract() {
    if (window.Tesseract) return Promise.resolve();
    if (!OCR.scriptPromise) {
      OCR.scriptPromise = new Promise((res, rej) => {
        const s = document.createElement('script');
        s.src = TESS_URL;
        s.onload = () => res();
        s.onerror = () => { OCR.scriptPromise = null; rej(Object.assign(new Error('net'), { code: 'net' })); };
        document.head.appendChild(s);
      });
    }
    return OCR.scriptPromise;
  },

  async shrink(blob) {
    try {
      const bmp = await createImageBitmap(blob);
      const max = 2200;
      const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
      if (k === 1) { bmp.close && bmp.close(); return blob; }
      const c = document.createElement('canvas');
      c.width = Math.round(bmp.width * k);
      c.height = Math.round(bmp.height * k);
      c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
      bmp.close && bmp.close();
      return await new Promise((res) => c.toBlob((b) => res(b || blob), 'image/png'));
    } catch (e) { return blob; }
  },

  async recognize(blob, onProgress) {
    await OCR.loadTesseract();
    const langs = state.lang === 'ar' ? 'fra+eng+ara' : 'fra+eng';
    let worker;
    try {
      worker = await window.Tesseract.createWorker(langs, 1, {
        logger: (m) => { if (m && m.status === 'recognizing text' && onProgress) onProgress(m.progress); }
      });
      const r = await worker.recognize(await OCR.shrink(blob));
      return (r && r.data && r.data.text) || '';
    } catch (e) {
      throw Object.assign(new Error('ocr'), { code: navigator.onLine ? 'ocr' : 'net' });
    } finally {
      if (worker) { try { await worker.terminate(); } catch (e) { /* ignoré */ } }
    }
  },

  async pdfText(file, onProgress) {
    const pdfjs = await import('./vendor/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = new URL('./vendor/pdf.worker.min.mjs', location.href).href;
    const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    const pages = Math.min(doc.numPages, 3);
    let text = '';
    for (let p = 1; p <= pages; p++) {
      const page = await doc.getPage(p);
      const tc = await page.getTextContent();
      const rows = [];
      tc.items.forEach((it) => {
        if (!it.str || !it.str.trim()) return;
        const y = it.transform[5], x = it.transform[4];
        let row = rows.find((r) => Math.abs(r.y - y) < 3);
        if (!row) { row = { y, parts: [] }; rows.push(row); }
        row.parts.push({ x, s: it.str });
      });
      rows.sort((a, b) => b.y - a.y);
      text += rows.map((r) => r.parts.sort((a, b) => a.x - b.x).map((q) => q.s).join(' ')).join('\n') + '\n';
    }
    if (text.replace(/\s/g, '').length >= 20) return text;

    // PDF scanné : on dessine la première page puis on lit l'image
    const page = await doc.getPage(1);
    const vp = page.getViewport({ scale: 2 });
    const c = document.createElement('canvas');
    c.width = Math.round(vp.width);
    c.height = Math.round(vp.height);
    await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
    const blob = await new Promise((res) => c.toBlob(res, 'image/png'));
    return OCR.recognize(blob, onProgress);
  },

  extract(file, onProgress) {
    if (file.type === 'application/pdf' || /\.pdf$/i.test(file.name)) return OCR.pdfText(file, onProgress);
    return OCR.recognize(file, onProgress);
  }
};

/* ---------- Formats ---------- */

const fmtCache = {};
function money(n) {
  n = round2(n);
  const frac = Number.isInteger(n) ? 0 : 2;
  const key = state.lang + frac;
  if (!fmtCache[key]) {
    const opts = { style: 'currency', currency: 'MAD', minimumFractionDigits: frac, maximumFractionDigits: frac };
    try { fmtCache[key] = new Intl.NumberFormat(locale(), opts); }
    catch (e) { fmtCache[key] = new Intl.NumberFormat('fr-FR', opts); }
  }
  return fmtCache[key].format(n);
}
function locale() { return state.lang === 'ar' ? 'ar-MA-u-nu-latn' : 'fr-FR'; }
function monthLabel(m) {
  const p = m.split('-').map(Number);
  return new Intl.DateTimeFormat(locale(), { month: 'long', year: 'numeric' }).format(new Date(p[0], p[1] - 1, 1));
}
function dayLabel(s, withYear) {
  const p = s.split('-').map(Number);
  const o = { day: 'numeric', month: 'short' };
  if (withYear) o.year = 'numeric';
  return new Intl.DateTimeFormat(locale(), o).format(new Date(p[0], p[1] - 1, p[2]));
}

/* ---------- Calculs ---------- */

function balances() {
  const b = {};
  state.accounts.forEach((a) => { b[a.id] = Number(a.initial) || 0; });
  state.tx.forEach((x) => {
    if (!(x.account in b)) return;
    if (x.type === 'out') b[x.account] -= x.amount;
    else if (x.type === 'in') b[x.account] += x.amount;
    else if (x.type === 'tr' && x.to in b) { b[x.account] -= x.amount; b[x.to] += x.amount; }
  });
  return b;
}
function sum(list) { return list.reduce((s, x) => s + x.amount, 0); }

/* ---------- Rendu principal ---------- */

function chartHTML(ops) {
  const by = {};
  ops.filter((x) => x.type === 'out').forEach((x) => {
    const g = by[x.category] || (by[x.category] = { v: 0, subs: {} });
    g.v += x.amount;
    if (x.sub) g.subs[x.sub] = (g.subs[x.sub] || 0) + x.amount;
  });
  const items = Object.keys(by).map((id) => {
    const c = catById(id);
    const subs = Object.keys(by[id].subs).map((sid) => ({ name: subName(c, sid) || t('others'), v: by[id].subs[sid] }))
      .sort((a, b) => b.v - a.v);
    return { name: c ? catName(c) : t('others'), v: by[id].v, subs };
  }).sort((a, b) => b.v - a.v);
  const total = items.reduce((s, i) => s + i.v, 0);
  if (!total) return { total: 0, html: '<p class="empty">' + t('noChart') + '</p>' };

  let acc = 0;
  const circles = items.map((it, i) => {
    const p = it.v / total * 100;
    const c = '<circle r="15.9155" cx="21" cy="21" fill="none" stroke="' + COLORS[i % COLORS.length] +
      '" stroke-width="6" stroke-dasharray="' + p.toFixed(3) + ' ' + (100 - p).toFixed(3) +
      '" stroke-dashoffset="' + (25 - acc).toFixed(3) + '"/>';
    acc += p;
    return c;
  }).join('');
  const legend = items.map((it, i) =>
    '<li><i style="background:' + COLORS[i % COLORS.length] + '"></i><span>' + esc(it.name) +
    '</span><em>' + Math.round(it.v / total * 100) + '%</em><b>' + money(it.v) + '</b></li>' +
    it.subs.map((s) =>
      '<li class="sub"><i></i><span>' + esc(s.name) + '</span><em>' + Math.round(s.v / total * 100) + '%</em><b>' + money(s.v) + '</b></li>'
    ).join('')
  ).join('');
  return {
    total,
    html: '<div class="chart"><svg class="donut" viewBox="0 0 42 42" role="img" aria-label="' + esc(t('byCategory')) + '">' +
      '<circle r="15.9155" cx="21" cy="21" fill="none" stroke="var(--line)" stroke-width="6"/>' + circles +
      '</svg><ul class="legend">' + legend + '</ul></div>'
  };
}

const svgIcon = (d) => '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
const ICONS = {
  view: svgIcon('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  edit: svgIcon('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
  del: svgIcon('<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>')
};

const arrow = () => (state.lang === 'ar' ? '←' : '→');

function opInfo(x) {
  if (x.type === 'out') {
    const c = catById(x.category);
    let title = c ? catName(c) : t('others');
    const sn = c && x.sub ? subName(c, x.sub) : '';
    if (sn) title += ' · ' + sn;
    return { title, sign: '−', cls: 'neg' };
  }
  if (x.type === 'in') return { title: t('tIn'), sign: '+', cls: 'pos' };
  return { title: accName(accById(x.account)) + ' ' + arrow() + ' ' + accName(accById(x.to)), sign: '', cls: '' };
}

function opHTML(x, withYear) {
  const o = opInfo(x);
  const when = dayLabel(x.date, withYear) + (x.time ? ' ' + x.time : '');
  const meta = [when, x.type === 'tr' ? '' : accName(accById(x.account)), x.note || itemsSummary(x)]
    .filter(Boolean).map(esc).join(' · ');
  const ico = (act, label, extra) =>
    '<button type="button" class="ico' + (extra || '') + '" data-act="' + act + '" aria-label="' + esc(label) + '" title="' + esc(label) + '">' + ICONS[act] + '</button>';
  return '<div class="op" data-id="' + esc(x.id) + '">' +
    '<button type="button" class="o-body" data-act="view" aria-label="' + esc(t('viewOp')) + '">' +
      '<span class="o-main"><b>' + esc(o.title) + '</b><small>' + meta + '</small></span>' +
      (x.att ? '<span class="clip" aria-hidden="true">📎</span>' : '') +
      '<span class="o-amt ' + o.cls + '">' + o.sign + money(x.amount) + '</span></button>' +
    '<div class="o-actions">' + ico('view', t('viewOp')) + ico('edit', t('editOp')) + ico('del', t('delOp'), ' d') + '</div></div>';
}

/* ---------- Recherche et filtres ---------- */

let flt = { q: '', acc: '', cat: '', type: '', all: false };
const fold = (s) => String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
function filterActive() { return !!(flt.q.trim() || flt.acc || flt.cat || flt.type || flt.all); }

function matches(x) {
  if (!flt.all && !x.date.startsWith(month)) return false;
  if (flt.type && x.type !== flt.type) return false;
  if (flt.acc && x.account !== flt.acc && x.to !== flt.acc) return false;
  if (flt.cat && x.category !== flt.cat) return false;
  const q = fold(flt.q).trim();
  if (q) {
    const c = catById(x.category);
    const hay = fold([
      x.note, itemsSummary(x), c ? catName(c) : '', c && x.sub ? subName(c, x.sub) : '',
      accName(accById(x.account)), x.to ? accName(accById(x.to)) : '', x.att ? x.att.name : '',
      String(x.amount), String(x.amount).replace('.', ',')
    ].join(' '));
    if (!hay.includes(q)) return false;
  }
  return true;
}

function sortedOps(list) {
  return list.slice().sort((a, b) =>
    b.date.localeCompare(a.date) || (b.time || '').localeCompare(a.time || '') || (b.ts || 0) - (a.ts || 0));
}

function filtersHTML() {
  const opt = (v, l, sel) => '<option value="' + esc(v) + '"' + (sel === v ? ' selected' : '') + '>' + esc(l) + '</option>';
  return '<div class="filters">' +
    '<input type="search" id="fq" class="fq" autocomplete="off" placeholder="' + esc(t('search')) + '" value="' + esc(flt.q) + '" aria-label="' + esc(t('search')) + '">' +
    '<div class="frow">' +
      '<select id="fAcc" aria-label="' + esc(t('account')) + '">' + opt('', t('fAcc'), flt.acc) +
        state.accounts.map((a) => opt(a.id, accName(a), flt.acc)).join('') + '</select>' +
      '<select id="fCat" aria-label="' + esc(t('category')) + '">' + opt('', t('fCat'), flt.cat) +
        state.categories.map((c) => opt(c.id, catName(c), flt.cat)).join('') + '</select>' +
      '<select id="fType" aria-label="' + esc(t('type')) + '">' + opt('', t('fType'), flt.type) +
        opt('out', t('tOut'), flt.type) + opt('in', t('tIn'), flt.type) + opt('tr', t('tTr'), flt.type) + '</select>' +
    '</div>' +
    '<div class="fopts"><label class="chk"><input type="checkbox" id="fAll"' + (flt.all ? ' checked' : '') + '> ' + esc(t('allPeriods')) + '</label>' +
    '<button type="button" class="link" id="fClear"' + (filterActive() ? '' : ' hidden') + '>' + esc(t('clearFilters')) + '</button></div></div>';
}

function renderOps() {
  const body = $('#opsBody');
  if (!body) return;
  const list = sortedOps(state.tx.filter(matches));
  const out = sum(list.filter((x) => x.type === 'out'));
  const inc = sum(list.filter((x) => x.type === 'in'));
  const active = filterActive();
  const head = active
    ? '<p class="res">' + list.length + ' ' + esc(t('resCount')) + (out ? ' · ' + esc(t('expenses')) + ' ' + money(out) : '') +
      (inc ? ' · ' + esc(t('income')) + ' ' + money(inc) : '') + '</p>'
    : '';
  body.innerHTML = head + (list.length
    ? list.map((x) => opHTML(x, flt.all)).join('')
    : '<p class="empty">' + esc(t(active ? 'noMatch' : 'noOps')) + '</p>');
  const clr = $('#fClear');
  if (clr) clr.hidden = !active;
}

/* ---------- Budgets et comparaison ---------- */

function spentByCat(list) {
  const m = {};
  list.filter((x) => x.type === 'out').forEach((x) => { m[x.category] = (m[x.category] || 0) + x.amount; });
  return m;
}
function numFmt(v) {
  return new Intl.NumberFormat(locale(), { maximumFractionDigits: 0 }).format(Math.round(v));
}
function monthShift(m, d) {
  const p = m.split('-').map(Number);
  const dt = new Date(p[0], p[1] - 1 + d, 1);
  return dt.getFullYear() + '-' + pad(dt.getMonth() + 1);
}
function monthShort(m) {
  const p = m.split('-').map(Number);
  return new Intl.DateTimeFormat(locale(), { month: 'short' }).format(new Date(p[0], p[1] - 1, 1));
}

function budgetsHTML(ops) {
  const sp = spentByCat(ops);
  const rows = state.categories.filter((c) => c.budget > 0).map((c) => {
    const s = sp[c.id] || 0;
    const p = s / c.budget * 100;
    const cls = p >= 100 ? 'over' : p >= 80 ? 'warn' : 'ok';
    return '<div class="bud"><div class="bud-h"><span>' + esc(catName(c)) + '</span><b>' + money(s) + ' / ' + money(c.budget) + '</b></div>' +
      '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.min(100, Math.round(p)) + '" aria-label="' + esc(catName(c)) + '">' +
      '<i class="' + cls + '" style="width:' + Math.min(100, p).toFixed(1) + '%"></i></div>' +
      '<small class="t-' + cls + '">' + Math.round(p) + '%' + (p >= 100 ? ' · ' + esc(t('overBy')) + ' ' + money(s - c.budget) : '') + '</small></div>';
  });
  if (!rows.length) return '';
  return '<section class="card"><h2>' + t('budgets') + '</h2>' + rows.join('') + '</section>';
}

function deltaHTML(a, b) {
  if (!a && !b) return '<b class="delta">—</b>';
  if (!a) return '<b class="delta neg">' + esc(t('newItem')) + '</b>';
  const p = Math.round((b - a) / a * 100);
  return '<b class="delta ' + (p > 0 ? 'neg' : p < 0 ? 'pos' : '') + '">' + (p > 0 ? '+' : '') + p + '%</b>';
}

function compareHTML() {
  const prevKey = monthShift(month, -1);
  const cur = spentByCat(state.tx.filter((x) => x.date.startsWith(month)));
  const prev = spentByCat(state.tx.filter((x) => x.date.startsWith(prevKey)));
  const ids = Array.from(new Set(Object.keys(cur).concat(Object.keys(prev))));
  const rows = ids.map((id) => {
    const c = catById(id);
    return { name: c ? catName(c) : t('others'), a: prev[id] || 0, b: cur[id] || 0 };
  }).sort((x, y) => y.b - x.b || y.a - x.a);
  const totA = rows.reduce((s, r) => s + r.a, 0);
  const totB = rows.reduce((s, r) => s + r.b, 0);

  let html = '<section class="card"><h2>' + t('compare') + '<small>' + esc(monthLabel(prevKey)) + ' ' + arrow() + ' ' + esc(monthLabel(month)) + '</small></h2>';
  if (!rows.length) {
    html += '<p class="empty">' + t('noChart') + '</p>';
  } else {
    html += rows.map((r) =>
      '<div class="cmp"><span>' + esc(r.name) + '</span><span class="cmp-v">' + numFmt(r.a) + ' ' + arrow() + ' ' + numFmt(r.b) + '</span>' + deltaHTML(r.a, r.b) + '</div>').join('');
    html += '<div class="cmp tot"><span>' + t('totalRow') + '</span><span class="cmp-v">' + numFmt(totA) + ' ' + arrow() + ' ' + numFmt(totB) + '</span>' + deltaHTML(totA, totB) + '</div>';
  }

  const months = [5, 4, 3, 2, 1, 0].map((i) => monthShift(month, -i));
  const vals = months.map((m) => sum(state.tx.filter((x) => x.type === 'out' && x.date.startsWith(m))));
  const mx = Math.max.apply(null, vals.concat([1]));
  html += '<h2 class="h6">' + t('last6') + '</h2><div class="b6wrap" role="img" aria-label="' + esc(t('last6')) + '">' +
    months.map((m, i) =>
      '<div class="b6"><div class="b6plot"><div class="b6bar' + (i === 5 ? ' cur' : '') + '" style="height:' +
      (vals[i] ? Math.max(3, vals[i] / mx * 100).toFixed(1) : 0) + '%"></div></div>' +
      '<span class="b6v">' + (vals[i] ? numFmt(vals[i]) : '') + '</span><span class="b6l">' + esc(monthShort(m)) + '</span></div>').join('') +
    '</div></section>';
  return html;
}

function renderAll() {
  $('#appTitle').textContent = t('app');
  $('#monthLabel').textContent = monthLabel(month);

  const ops = state.tx.filter((x) => x.date.startsWith(month));
  const out = sum(ops.filter((x) => x.type === 'out'));
  const inc = sum(ops.filter((x) => x.type === 'in'));
  const net = inc - out;
  const bal = balances();
  const totalBal = Object.keys(bal).reduce((s, k) => s + bal[k], 0);
  const chart = chartHTML(ops);

  const accRows = state.accounts.map((a) =>
    '<div class="row"><span>' + esc(accName(a)) + '</span><b class="' + (bal[a.id] < 0 ? 'neg' : '') + '">' +
    money(bal[a.id]) + '</b></div>'
  ).join('');

  $('#main').innerHTML =
    '<section class="cards">' +
      '<div class="card stat"><span>' + t('expenses') + '</span><b class="neg">' + money(out) + '</b></div>' +
      '<div class="card stat"><span>' + t('income') + '</span><b class="pos">' + money(inc) + '</b></div>' +
      '<div class="card stat wide"><span>' + t('net') + '</span><b class="' + (net < 0 ? 'neg' : 'pos') + '">' + money(net) + '</b></div>' +
    '</section>' +
    '<section class="card"><h2>' + t('accounts') + '<small>' + t('total') + ' ' + money(totalBal) + '</small></h2>' + accRows + '</section>' +
    budgetsHTML(ops) +
    '<section class="card"><h2>' + t('byCategory') + (chart.total ? '<small>' + t('total') + ' ' + money(chart.total) + '</small>' : '') + '</h2>' + chart.html + '</section>' +
    compareHTML() +
    '<section class="card ops"><h2 style="padding-top:10px">' + t('operations') + '</h2>' + filtersHTML() + '<div id="opsBody"></div></section>';
  renderOps();
}

function applyLang() {
  const rtl = state.lang === 'ar';
  document.documentElement.lang = state.lang;
  document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  document.title = t('app');
  $('#btnSettings').setAttribute('aria-label', t('settings'));
  $('#prevM').setAttribute('aria-label', t('prev'));
  $('#nextM').setAttribute('aria-label', t('next'));
  $('#fab').setAttribute('aria-label', t('add'));
  renderFoot();
}

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

function shiftMonth(delta) {
  const p = month.split('-').map(Number);
  const d = new Date(p[0], p[1] - 1 + delta, 1);
  month = d.getFullYear() + '-' + pad(d.getMonth() + 1);
  renderAll();
}

/* ---------- Formulaire d'opération ---------- */

let editing = null;
let removeAtt = false;

function openTx(id) {
  editing = id ? state.tx.find((x) => x.id === id) : null;
  removeAtt = false;
  const x = editing || {
    type: 'out', amount: '', account: state.accounts[0].id,
    to: (state.accounts[1] || state.accounts[0]).id,
    category: state.categories[0].id, sub: '', date: todayStr(), time: nowTime(), note: '', items: null, att: null
  };
  const accOpts = (sel) => state.accounts.map((a) =>
    '<option value="' + esc(a.id) + '"' + (a.id === sel ? ' selected' : '') + '>' + esc(accName(a)) + '</option>').join('');
  const catOpts = state.categories.map((c) =>
    '<option value="' + esc(c.id) + '"' + (c.id === x.category ? ' selected' : '') + '>' + esc(catName(c)) + '</option>').join('');
  const kind = (v, label) =>
    '<label><input type="radio" name="kind" value="' + v + '"' + (x.type === v ? ' checked' : '') + '><span>' + label + '</span></label>';

  const dlg = $('#dlgTx');
  dlg.innerHTML =
    '<form id="fTx" class="sheet" novalidate>' +
      '<div class="sheet-h"><h2>' + (editing ? t('edit') : t('add')) + '</h2>' +
        '<button type="button" class="icon" data-close aria-label="' + t('close') + '">✕</button></div>' +
      '<div class="seg">' + kind('out', t('tOut')) + kind('in', t('tIn')) + kind('tr', t('tTr')) + '</div>' +
      '<label class="f"><span>' + t('amount') + '</span><input name="amount" inputmode="decimal" autocomplete="off" placeholder="0" value="' + esc(x.amount) + '"></label>' +
      '<label class="f"><span id="lblAcc"></span><select name="account">' + accOpts(x.account) + '</select></label>' +
      '<label class="f" id="fTo"><span>' + t('to') + '</span><select name="to">' + accOpts(x.to) + '</select></label>' +
      '<label class="f" id="fCat"><span>' + t('category') + '</span><select name="category">' + catOpts + '</select></label>' +
      '<label class="f" id="fSub" hidden><span>' + t('subcat') + '</span><select name="sub"></select></label>' +
      '<div class="two">' +
        '<label class="f"><span>' + t('date') + '</span><input type="date" name="date" value="' + esc(x.date) + '"></label>' +
        '<label class="f"><span>' + t('time') + '</span><input type="time" name="time" value="' + esc(x.time || '') + '"></label>' +
      '</div>' +
      '<div class="f" id="fNote">' +
        '<div class="f-h"><span id="lblNote"></span><button type="button" class="link" id="toggleLines"></button></div>' +
        '<input type="text" name="note" autocomplete="off" value="' + esc(x.note) + '">' +
        '<div id="linesBox" hidden><div id="lines"></div>' +
          '<button type="button" class="btn sm" id="addLine">+ ' + t('addLine') + '</button>' +
          '<p class="hint">' + t('sumHint') + '</p></div>' +
      '</div>' +
      '<div class="f"><span>' + t('attachment') + '</span><div id="attBox"></div>' +
        '<input type="file" name="file" accept="application/pdf,image/*" aria-label="' + esc(t('attach')) + '">' +
        '<p class="ocr" id="ocrStatus" role="status" aria-live="polite"></p>' +
        '<button type="button" class="btn sm" id="useItems" hidden></button></div>' +
      '<p class="err" id="fErr" role="alert"></p>' +
      '<div class="actions">' +
        (editing ? '<button type="button" class="danger" id="btnDel">' + t('delete') + '</button>' : '') +
        '<button type="submit" class="primary">' + t('save') + '</button>' +
      '</div>' +
    '</form>';

  const form = $('#fTx');
  const amountEl = form.elements.amount;
  const noteEl = form.elements.note;
  const dateEl = form.elements.date;
  const timeEl = form.elements.time;
  const kindVal = () => form.elements.kind.value;
  let linesMode = !!(editing && editing.items && editing.items.length);
  let dateTouched = !!editing;
  let timeTouched = !!editing;
  let detected = [];
  dateEl.addEventListener('input', () => { dateTouched = true; });
  timeEl.addEventListener('input', () => { timeTouched = true; });

  /* sous-catégories */
  const fillSub = (catId, selected) => {
    const c = catById(catId);
    const subs = (c && c.subs) || [];
    const sel = form.elements.sub;
    sel.innerHTML = '<option value="">' + t('none') + '</option>' +
      subs.map((s) => '<option value="' + esc(s.id) + '"' + (s.id === selected ? ' selected' : '') + '>' + esc(s.name) + '</option>').join('');
    $('#fSub').hidden = !(subs.length && kindVal() === 'out');
  };
  fillSub(x.category, x.sub);

  const syncKind = () => {
    const k = kindVal();
    $('#fCat').hidden = k !== 'out';
    $('#fTo').hidden = k !== 'tr';
    $('#lblAcc').textContent = k === 'tr' ? t('from') : t('account');
    fillSub(form.elements.category.value, form.elements.sub.value);
  };
  form.addEventListener('change', (e) => {
    if (e.target.name === 'kind') syncKind();
    else if (e.target.name === 'category') fillSub(e.target.value, '');
  });

  /* note simple ou plusieurs lignes */
  const linesEl = $('#lines');
  const addLineRow = (n, a) => {
    const row = document.createElement('div');
    row.className = 'line';
    row.innerHTML = '<input class="ln" autocomplete="off" placeholder="' + esc(t('articleName')) + '" value="' + esc(n || '') + '">' +
      '<input class="la" inputmode="decimal" autocomplete="off" placeholder="0" value="' + esc(a ? a : '') + '">' +
      '<button type="button" class="icon sm" data-rm aria-label="' + esc(t('delete')) + '">✕</button>';
    linesEl.appendChild(row);
    return row;
  };
  const readLines = () => Array.from(linesEl.querySelectorAll('.line')).map((r) => ({
    n: r.querySelector('.ln').value.trim(),
    a: parseAmount(r.querySelector('.la').value)
  })).filter((l) => l.n || l.a);
  const linesSum = () => round2(readLines().reduce((s, l) => s + l.a, 0));
  const syncSum = () => { if (linesMode) amountEl.value = linesSum() || ''; };

  const syncMode = () => {
    $('#linesBox').hidden = !linesMode;
    noteEl.hidden = linesMode;
    amountEl.readOnly = linesMode;
    $('#lblNote').textContent = linesMode ? t('articles') : t('note');
    $('#toggleLines').textContent = linesMode ? t('singleNote') : t('multiLines');
    if (linesMode && !linesEl.children.length) {
      const seed = editing && editing.items && editing.items.length ? editing.items : null;
      if (seed) seed.forEach((i) => addLineRow(i.n, i.a));
      else {
        addLineRow(noteEl.value.trim(), '');
        addLineRow('', ''); addLineRow('', '');
      }
    }
    syncSum();
  };
  $('#toggleLines').onclick = () => { linesMode = !linesMode; syncMode(); };
  $('#addLine').onclick = () => { addLineRow('', '').querySelector('.ln').focus(); };
  linesEl.addEventListener('input', syncSum);
  linesEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-rm]');
    if (!b) return;
    b.closest('.line').remove();
    syncSum();
  });

  /* pièce jointe */
  const drawAtt = () => {
    const box = $('#attBox');
    if (editing && editing.att && !removeAtt) {
      box.innerHTML = '<div class="att"><span>📎 ' + esc(editing.att.name) + '</span>' +
        '<button type="button" class="btn sm" id="attView">' + t('view') + '</button>' +
        '<button type="button" class="btn sm" id="attRm">' + t('removeAtt') + '</button></div>';
      $('#attView').onclick = () => viewAtt(editing.att);
      $('#attRm').onclick = () => { removeAtt = true; drawAtt(); };
    } else {
      box.innerHTML = '';
    }
  };

  const setStatus = (m) => { $('#ocrStatus').textContent = m; };
  let ocrToken = 0;
  form.elements.file.addEventListener('change', async () => {
    const f = form.elements.file.files[0];
    const token = ++ocrToken;
    $('#useItems').hidden = true;
    detected = [];
    if (!f) return setStatus('');
    setStatus(t('reading'));
    let text;
    try {
      text = await OCR.extract(f, (p) => { if (token === ocrToken) setStatus(t('reading') + ' ' + Math.round(p * 100) + '%'); });
    } catch (err) {
      if (token === ocrToken && form.isConnected) setStatus(err && err.code === 'net' ? t('needNet') : t('readFail'));
      return;
    }
    if (token !== ocrToken || !form.isConnected) return;

    const p = window.ReceiptParser.parseReceipt(text, new Date());
    const filled = [];
    if (p.amount && !linesMode && !amountEl.value.trim()) { amountEl.value = p.amount; filled.push(t('amount')); }
    if (p.date && !dateTouched) { dateEl.value = p.date; filled.push(t('date')); }
    if (p.date && p.time && !timeTouched) { timeEl.value = p.time; filled.push(t('time')); }
    if (p.merchant && !linesMode && !noteEl.value.trim()) { noteEl.value = p.merchant; filled.push(t('note')); }
    if (p.items.length >= 2) {
      detected = p.items;
      const b = $('#useItems');
      b.textContent = t('useItems') + ' (' + p.items.length + ')';
      b.hidden = false;
    }
    setStatus(filled.length ? t('readOk') + filled.join(', ') : t('readNone'));
  });
  $('#useItems').onclick = () => {
    if (!detected.length) return;
    linesMode = true;
    linesEl.innerHTML = '';
    detected.forEach((i) => addLineRow(i.n, i.a));
    syncMode();
    $('#useItems').hidden = true;
    setStatus(t('itemsUsed'));
  };

  syncKind();
  syncMode();
  drawAtt();

  const fail = (m) => { $('#fErr').textContent = m; };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    fail('');
    const fd = new FormData(form);
    const type = fd.get('kind');
    const lines = linesMode ? readLines() : [];
    const amount = linesMode ? linesSum() : parseAmount(fd.get('amount'));
    if (!(amount > 0)) return fail(t('needAmount'));
    const account = fd.get('account');
    const to = fd.get('to');
    if (type === 'tr' && account === to) return fail(t('sameAcc'));

    const rec = {
      id: editing ? editing.id : uid(),
      ts: editing ? editing.ts : Date.now(),
      type, amount, account,
      date: fd.get('date') || todayStr(),
      time: fd.get('time') || '',
      note: linesMode ? '' : String(fd.get('note') || '').trim()
    };
    if (linesMode && lines.length) rec.items = lines;
    if (type === 'out') {
      rec.category = fd.get('category');
      if (fd.get('sub')) rec.sub = fd.get('sub');
    }
    if (type === 'tr') rec.to = to;

    let att = editing ? editing.att : null;
    const file = fd.get('file');
    try {
      if (removeAtt && att) { await DB.del(att.id); att = null; }
      if (file && file.size > 0) {
        if (att) await DB.del(att.id);
        const fid = uid();
        await DB.put({ id: fid, name: file.name, type: file.type, blob: file });
        att = { id: fid, name: file.name, type: file.type };
      }
    } catch (err) { return fail(t('fileErr')); }
    if (att) rec.att = att;

    if (editing) state.tx[state.tx.indexOf(editing)] = rec; else state.tx.push(rec);
    save();
    dlg.close();
    renderAll();
    budgetAlert(rec);
  });

  const del = $('#btnDel');
  if (del) del.onclick = async () => {
    if (!confirm(t('confirmDel'))) return;
    dlg.close();
    await deleteTx(editing);
  };

  dlg.showModal();
}

async function viewAtt(att) {
  let rec = null;
  try { rec = await DB.get(att.id); } catch (e) { /* ignoré */ }
  if (!rec) return toast(t('fileErr'));
  const url = URL.createObjectURL(rec.blob);
  if ((rec.type || '').startsWith('image/')) {
    const dlg = $('#dlgView');
    dlg.innerHTML = '<div class="sheet"><div class="sheet-h"><h2>' + esc(rec.name) + '</h2>' +
      '<button type="button" class="icon" data-close aria-label="' + t('close') + '">✕</button></div>' +
      '<img class="view-img" alt="' + esc(rec.name) + '" src="' + url + '"></div>';
    dlg.addEventListener('close', () => URL.revokeObjectURL(url), { once: true });
    dlg.showModal();
  } else {
    const w = window.open(url, '_blank');
    if (!w) {
      const a = document.createElement('a');
      a.href = url; a.download = rec.name;
      document.body.appendChild(a); a.click(); a.remove();
    }
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }
}

/* ---------- Réglages ---------- */

function renderSettings() {
  const accRows = state.accounts.map((a) =>
    '<div class="row"><span class="nm">' + esc(accName(a)) + '</span>' +
    '<input data-init="' + esc(a.id) + '" inputmode="decimal" value="' + esc(a.initial || 0) + '" aria-label="' + esc(t('initial')) + '">' +
    '<button type="button" class="icon" data-act="del-acc" data-id="' + esc(a.id) + '" aria-label="' + t('delete') + '">✕</button></div>'
  ).join('');
  const catRows = state.categories.map((c) =>
    '<div class="catblock"><div class="row"><b class="nm">' + esc(catName(c)) + '</b>' +
    '<button type="button" class="icon" data-act="del-cat" data-id="' + esc(c.id) + '" aria-label="' + t('delete') + '">✕</button></div>' +
    '<label class="budrow"><span>' + t('budgetOf') + '</span><input data-budget="' + esc(c.id) + '" inputmode="decimal" placeholder="0" value="' + esc(c.budget || '') + '"></label>' +
    '<div class="chips">' + (c.subs || []).map((s) =>
      '<span class="chip">' + esc(s.name) + '<button type="button" data-act="del-sub" data-cat="' + esc(c.id) + '" data-id="' + esc(s.id) +
      '" aria-label="' + esc(t('delete')) + '">✕</button></span>').join('') + '</div>' +
    '<form class="add" data-form="sub" data-cat="' + esc(c.id) + '"><input name="name" autocomplete="off" placeholder="' + esc(t('newSub')) + '">' +
    '<button class="btn sm">' + t('addBtn') + '</button></form></div>'
  ).join('');
  const lang = (v, label) =>
    '<label><input type="radio" name="lang" value="' + v + '"' + (state.lang === v ? ' checked' : '') + '><span>' + label + '</span></label>';

  $('#dlgSet').innerHTML =
    '<div class="sheet">' +
      '<div class="sheet-h"><h2>' + t('settings') + '</h2>' +
        '<button type="button" class="icon" data-close aria-label="' + t('close') + '">✕</button></div>' +
      '<h3>' + t('language') + '</h3>' +
      '<div class="seg">' + lang('fr', 'Français') + lang('ar', 'العربية') + '</div>' +
      '<h3>' + t('backup') + '</h3>' +
      '<p class="hint">' + t('exportHint') + '</p>' +
      '<button type="button" class="btn" data-act="export-json">' + t('exportFull') + '</button>' +
      '<button type="button" class="btn" data-act="export-xlsx">' + t('exportXlsx') + '</button>' +
      '<p class="hint">' + t('importHint') + '</p>' +
      '<button type="button" class="btn" data-act="import">' + t('import') + '</button>' +
      '<h3>' + t('manageAccounts') + '</h3><p class="hint">' + t('initial') + '</p>' +
      '<div class="list">' + accRows + '</div>' +
      '<form class="add" data-form="acc"><input name="name" autocomplete="off" placeholder="' + esc(t('newAccount')) + '">' +
        '<input name="initial" inputmode="decimal" placeholder="0" style="max-width:90px">' +
        '<button class="btn">' + t('addBtn') + '</button></form>' +
      '<h3>' + t('manageCats') + '</h3>' +
      '<div class="list">' + catRows + '</div>' +
      '<form class="add" data-form="cat"><input name="name" autocomplete="off" placeholder="' + esc(t('newCat')) + '">' +
        '<button class="btn">' + t('addBtn') + '</button></form>' +
      '<h3>' + t('reset') + '</h3><p class="hint">' + t('resetHint') + '</p>' +
      '<label class="chk"><input type="checkbox" id="resetBal"> ' + t('resetBal') + '</label>' +
      '<button type="button" class="danger" data-act="reset-month">' + t('resetMonth') + ' (' + esc(monthLabel(month)) + ')</button>' +
      '<button type="button" class="danger" data-act="reset-all">' + t('resetAll') + '</button>' +
    '</div>';
}

function openSettings() { renderSettings(); $('#dlgSet').showModal(); }

function bindSettings() {
  const dlg = $('#dlgSet');

  dlg.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const act = b.dataset.act;
    if (act === 'export-json') exportData();
    else if (act === 'export-xlsx') exportXlsx();
    else if (act === 'import') $('#importFile').click();
    else if (act === 'reset-month' || act === 'reset-all') resetOps(act === 'reset-month' ? 'month' : 'all', $('#resetBal').checked);
    else if (act === 'del-acc') {
      const id = b.dataset.id;
      if (state.accounts.length <= 1) return toast(t('lastOne'));
      if (state.tx.some((x) => x.account === id || x.to === id)) return toast(t('usedAcc'));
      state.accounts = state.accounts.filter((a) => a.id !== id);
      save(); renderSettings(); renderAll();
    } else if (act === 'del-cat') {
      const id = b.dataset.id;
      if (state.categories.length <= 1) return toast(t('lastOne'));
      if (state.tx.some((x) => x.category === id)) return toast(t('usedCat'));
      state.categories = state.categories.filter((c) => c.id !== id);
      save(); renderSettings(); renderAll();
    } else if (act === 'del-sub') {
      const c = catById(b.dataset.cat);
      if (!c) return;
      if (state.tx.some((x) => x.category === c.id && x.sub === b.dataset.id)) return toast(t('usedSub'));
      c.subs = c.subs.filter((s) => s.id !== b.dataset.id);
      save(); renderSettings(); renderAll();
    }
  });

  dlg.addEventListener('change', (e) => {
    const el = e.target;
    if (el.name === 'lang') {
      state.lang = el.value === 'ar' ? 'ar' : 'fr';
      save(); applyLang(); renderSettings(); renderAll();
    } else if (el.dataset.init) {
      const a = state.accounts.find((a) => a.id === el.dataset.init);
      if (a) { a.initial = parseAmount(el.value); save(); renderAll(); }
    } else if (el.dataset.budget) {
      const c = catById(el.dataset.budget);
      if (c) {
        const v = parseAmount(el.value);
        if (v > 0) c.budget = v; else delete c.budget;
        save(); renderAll();
      }
    }
  });

  dlg.addEventListener('submit', (e) => {
    const f = e.target;
    if (!f.dataset.form) return;
    e.preventDefault();
    const name = f.elements.name.value.trim();
    if (!name) return toast(t('needName'));
    if (f.dataset.form === 'acc') {
      state.accounts.push({ id: uid(), name, initial: parseAmount(f.elements.initial.value) });
    } else if (f.dataset.form === 'cat') {
      state.categories.push({ id: uid(), name, subs: [] });
    } else if (f.dataset.form === 'sub') {
      const c = catById(f.dataset.cat);
      if (!c) return;
      c.subs.push({ id: uid(), name });
    }
    save(); renderSettings(); renderAll();
  });
}

/* ---------- Sauvegarde : export / import ---------- */

function download(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

async function exportData() {
  try {
    const files = DB.db ? await DB.all() : [];
    const out = { app: 'depenses', version: 1, exportedAt: new Date().toISOString(), state: state, files: [] };
    for (const f of files) {
      out.files.push({ id: f.id, name: f.name, type: f.type, data: await blobToDataURL(f.blob) });
    }
    download(new Blob([JSON.stringify(out)], { type: 'application/json' }), 'depenses-sauvegarde-' + todayStr() + '.json');
    toast(t('exported'));
    return true;
  } catch (e) { toast(t('fileErr')); return false; }
}

/* Excel : fichier .xlsx écrit à la main (une seule feuille), compressé avec JSZip */

function xmlText(s) {
  return String(s == null ? '' : s)
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function colName(i) { return String.fromCharCode(65 + i); }
function excelDate(s) {
  const p = s.split('-').map(Number);
  return Math.round((Date.UTC(p[0], p[1] - 1, p[2]) - Date.UTC(1899, 11, 30)) / 86400000);
}

function buildSheetRows() {
  const heads = ['xDate', 'xTime', 'xType', 'xAccount', 'xTo', 'xCat', 'xSub', 'xNote', 'xItems', 'xAmount', 'xAtt'].map(t);
  const typeLabel = { out: t('tOut'), in: t('tIn'), tr: t('tTr') };
  const list = state.tx.slice().sort((a, b) =>
    a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || '') || (a.ts || 0) - (b.ts || 0));
  const rows = list.map((x) => {
    const c = x.type === 'out' ? catById(x.category) : null;
    const items = (x.items || []).map((i) => i.n + (i.a ? ' ' + i.a : '')).join(' ; ');
    let time = null;
    if (x.time && /^\d{1,2}:\d{2}$/.test(x.time)) {
      const q = x.time.split(':').map(Number);
      time = (q[0] * 60 + q[1]) / 1440;
    }
    return [
      { d: excelDate(x.date) },
      time == null ? { s: '' } : { tm: time },
      { s: typeLabel[x.type] || '' },
      { s: accName(accById(x.account)) },
      { s: x.type === 'tr' ? accName(accById(x.to)) : '' },
      { s: c ? catName(c) : '' },
      { s: c && x.sub ? subName(c, x.sub) : '' },
      { s: x.note || '' },
      { s: items },
      { n: round2(x.amount) },
      { s: x.att ? x.att.name : '' }
    ];
  });
  return { heads, rows };
}

function sheetXML(heads, rows) {
  const cell = (c, r, v) => {
    const ref = colName(c) + r;
    if (v.d != null) return '<c r="' + ref + '" s="2"><v>' + v.d + '</v></c>';
    if (v.tm != null) return '<c r="' + ref + '" s="3"><v>' + v.tm + '</v></c>';
    if (v.n != null) return '<c r="' + ref + '" s="4"><v>' + v.n + '</v></c>';
    if (!v.s) return '';
    return '<c r="' + ref + '" t="inlineStr"><is><t xml:space="preserve">' + xmlText(v.s) + '</t></is></c>';
  };
  let xml = '<row r="1">' + heads.map((h, i) =>
    '<c r="' + colName(i) + '1" t="inlineStr" s="1"><is><t>' + xmlText(h) + '</t></is></c>').join('') + '</row>';
  rows.forEach((row, i) => {
    xml += '<row r="' + (i + 2) + '">' + row.map((v, c) => cell(c, i + 2, v)).join('') + '</row>';
  });
  const widths = [12, 8, 12, 14, 14, 16, 16, 30, 36, 14, 22];
  const last = colName(heads.length - 1) + (rows.length + 1);
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
    '<sheetViews><sheetView workbookViewId="0"' + (state.lang === 'ar' ? ' rightToLeft="1"' : '') + '>' +
    '<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>' +
    '<cols>' + widths.map((w, i) => '<col min="' + (i + 1) + '" max="' + (i + 1) + '" width="' + w + '" customWidth="1"/>').join('') + '</cols>' +
    '<sheetData>' + xml + '</sheetData>' +
    '<autoFilter ref="A1:' + last + '"/></worksheet>';
}

async function buildXlsx() {
  const { heads, rows } = buildSheetRows();
  const zip = new JSZip();
  zip.file('[Content_Types].xml',
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
    '<Default Extension="xml" ContentType="application/xml"/>' +
    '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
    '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
    '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>');
  zip.file('_rels/.rels',
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>');
  zip.file('xl/workbook.xml',
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
    '<sheets><sheet name="' + xmlText(t('operations')) + '" sheetId="1" r:id="rId1"/></sheets></workbook>');
  zip.file('xl/_rels/workbook.xml.rels',
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
    '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>');
  zip.file('xl/styles.xml',
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
    '<numFmts count="2"><numFmt numFmtId="164" formatCode="yyyy\\-mm\\-dd"/><numFmt numFmtId="165" formatCode="hh:mm"/></numFmts>' +
    '<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts>' +
    '<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>' +
    '<fill><patternFill patternType="solid"><fgColor rgb="FFD9EFEA"/><bgColor indexed="64"/></patternFill></fill></fills>' +
    '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>' +
    '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
    '<cellXfs count="5">' +
    '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' +
    '<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>' +
    '<xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>' +
    '<xf numFmtId="165" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>' +
    '<xf numFmtId="4" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>' +
    '</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>');
  zip.file('xl/worksheets/sheet1.xml', sheetXML(heads, rows));
  return zip.generateAsync({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    compression: 'DEFLATE'
  });
}

async function exportXlsx() {
  try {
    download(await buildXlsx(), 'depenses-' + todayStr() + '.xlsx');
    toast(t('exported'));
  } catch (e) { toast(t('fileErr')); }
}

async function importData(file) {
  let obj;
  try {
    obj = JSON.parse(await file.text());
    if (!obj || obj.app !== 'depenses' || !obj.state || !Array.isArray(obj.state.tx)) throw new Error('format');
  } catch (e) { return toast(t('importBad')); }
  if (!confirm(t('confirmImport'))) return;
  try {
    const next = normalize(obj.state);
    next.lang = state.lang;
    if (DB.db) {
      await DB.clear();
      for (const f of obj.files || []) {
        await DB.put({ id: f.id, name: f.name, type: f.type, blob: dataURLToBlob(f.data) });
      }
    }
    state = next;
    save();
    applyLang();
    renderAll();
    if ($('#dlgSet').open) renderSettings();
    toast(t('importOk'));
  } catch (e) { toast(t('importBad')); }
}

/* ---------- Consulter, supprimer, remise à zéro, alertes, pied de page ---------- */

async function deleteTx(x) {
  if (x.att) { try { await DB.del(x.att.id); } catch (e) { /* ignoré */ } }
  state.tx = state.tx.filter((q) => q !== x);
  save();
  renderAll();
  toast(t('deleted'));
}

async function openView(id) {
  const x = state.tx.find((q) => q.id === id);
  if (!x) return;
  const o = opInfo(x);
  const c = catById(x.category);
  const typeLabel = { out: t('tOut'), in: t('tIn'), tr: t('tTr') }[x.type] || '';
  const row = (k, v) => v ? '<div class="drow"><span>' + esc(k) + '</span><b>' + v + '</b></div>' : '';

  let rows = row(t('type'), esc(typeLabel)) +
    row(t('date'), esc(dayLabel(x.date, true) + (x.time ? ' ' + x.time : '')));
  if (x.type === 'tr') {
    rows += row(t('from'), esc(accName(accById(x.account)))) + row(t('to'), esc(accName(accById(x.to))));
  } else {
    rows += row(t('account'), esc(accName(accById(x.account))));
  }
  if (x.type === 'out') {
    rows += row(t('category'), esc(c ? catName(c) : t('others')));
    if (c && x.sub) rows += row(t('subcat'), esc(subName(c, x.sub)));
  }
  rows += row(t('note'), esc(x.note));

  let items = '';
  if (x.items && x.items.length) {
    items = '<div class="ditems"><span class="dh">' + esc(t('articles')) + '</span>' +
      x.items.map((i) => '<div class="drow"><span class="dn">' + esc(i.n) + '</span><b>' + (i.a ? money(i.a) : '') + '</b></div>').join('') + '</div>';
  }

  let att = '';
  if (x.att) {
    att = '<div class="datt"><span class="dh">' + esc(t('attachment')) + '</span>' +
      '<div class="att"><span>📎 ' + esc(x.att.name) + '</span><button type="button" class="btn sm" id="dAttView">' + esc(t('openAtt')) + '</button></div>' +
      '<img id="dThumb" class="thumb" alt="" hidden></div>';
  } else {
    att = row(t('attachment'), esc(t('noAtt')));
  }

  const dlg = $('#dlgDetail');
  dlg.innerHTML =
    '<div class="sheet">' +
      '<div class="sheet-h"><h2>' + esc(t('detail')) + '</h2>' +
        '<button type="button" class="icon" data-close aria-label="' + esc(t('close')) + '">✕</button></div>' +
      '<p class="d-title">' + esc(o.title) + '</p>' +
      '<p class="d-amt ' + o.cls + '">' + o.sign + money(x.amount) + '</p>' +
      '<div class="drows">' + rows + '</div>' + items + att +
      '<div class="actions"><button type="button" class="danger" id="dDel">' + esc(t('delOp')) + '</button>' +
        '<button type="button" class="primary" id="dEdit">' + esc(t('editOp')) + '</button></div>' +
    '</div>';

  $('#dEdit').onclick = () => { dlg.close(); openTx(id); };
  $('#dDel').onclick = async () => {
    if (!confirm(t('confirmDel'))) return;
    dlg.close();
    await deleteTx(x);
  };
  const vb = $('#dAttView');
  if (vb) vb.onclick = () => viewAtt(x.att);
  dlg.showModal();

  if (x.att && (x.att.type || '').startsWith('image/')) {
    try {
      const rec = await DB.get(x.att.id);
      const img = $('#dThumb');
      if (rec && img) {
        const url = URL.createObjectURL(rec.blob);
        img.src = url;
        img.hidden = false;
        img.onclick = () => viewAtt(x.att);
        dlg.addEventListener('close', () => URL.revokeObjectURL(url), { once: true });
      }
    } catch (e) { /* l'aperçu est facultatif */ }
  }
}

async function resetOps(scope, zeroBal) {
  const list = scope === 'month' ? state.tx.filter((x) => x.date.startsWith(month)) : state.tx.slice();
  const hasBal = zeroBal && state.accounts.some((a) => Number(a.initial));
  if (!list.length && !hasBal) return toast(t('nothingToReset'));

  const label = scope === 'month' ? monthLabel(month) : t('allOps');
  const msg = t('resetConfirm').replace('{n}', list.length).replace('{label}', label) + '\n' +
    t('attDeleted') + (zeroBal ? '\n' + t('balZero') : '') + '\n' + t('backupNote');
  if (!confirm(msg)) return;
  if (!confirm(t('resetConfirm2'))) return;

  const saved = await exportData();
  if (!saved) return toast(t('backupFail'));

  for (const x of list) {
    if (x.att) { try { await DB.del(x.att.id); } catch (e) { /* ignoré */ } }
  }
  state.tx = state.tx.filter((x) => list.indexOf(x) === -1);
  if (zeroBal) state.accounts.forEach((a) => { a.initial = 0; });
  save();
  renderAll();
  if ($('#dlgSet').open) renderSettings();
  toast(t('resetDone'));
}

function budgetAlert(rec) {
  if (rec.type !== 'out') return;
  const c = catById(rec.category);
  if (!c || !(c.budget > 0)) return;
  const m = rec.date.slice(0, 7);
  const spent = sum(state.tx.filter((x) => x.type === 'out' && x.category === c.id && x.date.startsWith(m)));
  const p = spent / c.budget * 100;
  if (p >= 100) toast(t('budgetOver').replace('{c}', catName(c)));
  else if (p >= 80) toast(t('budgetNear').replace('{c}', catName(c)).replace('{p}', Math.round(p)));
}

function renderFoot() {
  const f = $('#foot');
  if (!f) return;
  const mail = ['Anasso-2006', 'hotmail.com'].join('@');
  f.innerHTML = '© ' + new Date().getFullYear() + ' Anasso · ' + esc(t('rights')) +
    ' · <a href="mailto:' + mail + '">' + mail + '</a>';
}

/* ---------- Démarrage ---------- */

async function init() {
  try { await DB.open(); } catch (e) { DB.db = null; }

  applyLang();
  renderAll();
  bindSettings();

  $('#prevM').onclick = () => shiftMonth(-1);
  $('#nextM').onclick = () => shiftMonth(1);
  $('#fab').onclick = () => openTx();
  $('#btnSettings').onclick = openSettings;
  $('#main').addEventListener('click', (e) => {
    if (e.target.closest('#fClear')) {
      flt = { q: '', acc: '', cat: '', type: '', all: false };
      renderAll();
      return;
    }
    const a = e.target.closest('[data-act]');
    const op = e.target.closest('.op');
    if (!a || !op) return;
    const id = op.dataset.id;
    if (a.dataset.act === 'view') openView(id);
    else if (a.dataset.act === 'edit') openTx(id);
    else if (a.dataset.act === 'del') {
      const x = state.tx.find((q) => q.id === id);
      if (x && confirm(t('confirmDel'))) deleteTx(x);
    }
  });
  $('#main').addEventListener('input', (e) => {
    if (e.target.id === 'fq') { flt.q = e.target.value; renderOps(); }
  });
  $('#main').addEventListener('change', (e) => {
    const id = e.target.id;
    if (id === 'fAcc') flt.acc = e.target.value;
    else if (id === 'fCat') flt.cat = e.target.value;
    else if (id === 'fType') flt.type = e.target.value;
    else if (id === 'fAll') flt.all = e.target.checked;
    else return;
    renderOps();
  });

  document.querySelectorAll('dialog').forEach((d) => {
    d.addEventListener('click', (e) => {
      if (e.target === d || e.target.closest('[data-close]')) d.close();
    });
  });

  $('#importFile').addEventListener('change', (e) => {
    const f = e.target.files[0];
    e.target.value = '';
    if (f) importData(f);
  });

  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { /* ignoré */ }

  const secure = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if ('serviceWorker' in navigator && secure) {
    navigator.serviceWorker.register('sw.js').catch(() => { /* hors ligne indisponible */ });
  }
}

init();
