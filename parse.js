'use strict';

/* Analyse du texte d'un ticket, d'une facture ou d'un relevé.
   Fonction pure : le même code tourne dans le navigateur et dans les tests Node. */

(function (root) {
  const AMOUNT_RE = /(?<![\d.,])(\d{1,3}(?:[   ]\d{3})+|\d+)[.,](\d{2})(?!\d)/g;

  const NOT_TOTAL = /sous[\s-]*total|hors\s*taxe|\bh\.?t\b|\btva\b|remise|rendu|monnaie|esp[eè]ces|\bcb\b|carte|re[cç]u|vous\s*avez/i;
  const PRIO = [
    /net\s*[àa]\s*payer|[àa]\s*payer|amount\s*due/i,
    /total\s*(t\.?t\.?c|g[ée]n[ée]ral)|\bttc\b/i,
    /\btotal\b|المجموع|الإجمالي|الاجمالي/i,
    /montant|المبلغ/i
  ];
  const ITEM_STOP = /total|tva|\bttc\b|\bht\b|rendu|monnaie|esp[eè]ces|\bcb\b|carte|remise|sous|net|payer|montant|date|ticket|caisse|\btel\b|\bice\b|\brc\b|\bif\b|patente|client|article|qt[eé]|facture|n[°o]\s*\d|merci|solde|virement|retrait/i;

  function toNumber(intPart, dec) {
    return parseFloat(intPart.replace(/[\s  ]/g, '') + '.' + dec);
  }

  function amountsIn(line) {
    const out = [];
    let m;
    AMOUNT_RE.lastIndex = 0;
    while ((m = AMOUNT_RE.exec(line))) out.push(toNumber(m[1], m[2]));
    return out;
  }

  function findAmount(lines) {
    for (const re of PRIO) {
      let found = null;
      for (const line of lines) {
        if (!re.test(line) || NOT_TOTAL.test(line)) continue;
        const nums = amountsIn(line);
        if (nums.length) found = nums[nums.length - 1];
      }
      if (found != null && found > 0) return found;
    }
    let max = 0;
    for (const line of lines) amountsIn(line).forEach((n) => { if (n > max) max = n; });
    return max > 0 ? max : null;
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function findDate(text, now) {
    const year = (now || new Date()).getFullYear();
    const ok = (y, mo, d) => y >= 2000 && y <= year + 1 && mo >= 1 && mo <= 12 && d >= 1 && d <= 31;
    let m;
    const dmy = /(?<!\d)(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4}|\d{2})(?!\d)/g;
    while ((m = dmy.exec(text))) {
      let y = parseInt(m[3], 10);
      if (m[3].length === 2) y += 2000;
      const d = parseInt(m[1], 10), mo = parseInt(m[2], 10);
      if (ok(y, mo, d)) return y + '-' + pad(mo) + '-' + pad(d);
    }
    const ymd = /(?<!\d)(\d{4})[\/\-.](\d{1,2})[\/\-.](\d{1,2})(?!\d)/g;
    while ((m = ymd.exec(text))) {
      const y = parseInt(m[1], 10), mo = parseInt(m[2], 10), d = parseInt(m[3], 10);
      if (ok(y, mo, d)) return y + '-' + pad(mo) + '-' + pad(d);
    }
    return null;
  }

  function findTime(text) {
    const m = /(?<![\d:])([01]?\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?(?![\d:])/.exec(text);
    return m ? pad(parseInt(m[1], 10)) + ':' + m[2] : null;
  }

  function findMerchant(lines) {
    for (const line of lines) {
      const letters = (line.match(/[A-Za-zÀ-ÿ؀-ۿ]/g) || []).length;
      if (letters < 3) continue;
      if (/^[^A-Za-zÀ-ÿ؀-ۿ]*(ticket|facture|re[cç]u|duplicata|bon|date|n[°o]|tel|ice|if|rc)\b/i.test(line)) continue;
      const clean = line.replace(/[^A-Za-zÀ-ÿ؀-ۿ0-9 .&'\-]/g, ' ').replace(/\s+/g, ' ').trim();
      if (clean.length >= 3) return clean.slice(0, 40);
    }
    return null;
  }

  function findItems(lines) {
    const items = [];
    const re = /^(.*?[A-Za-zÀ-ÿ؀-ۿ].*?)\s+(?:\d+\s*[x×]\s*[\d.,]+\s+)?(\d{1,3}(?:[   ]\d{3})+|\d+)[.,](\d{2})\s*(?:dh|dhs|mad|د\.م)?\s*$/i;
    for (const line of lines) {
      const m = re.exec(line);
      if (!m) continue;
      const name = m[1].replace(/[^A-Za-zÀ-ÿ؀-ۿ0-9 .&'\-]/g, ' ').replace(/\s+/g, ' ').trim();
      if (name.length < 2 || ITEM_STOP.test(name)) continue;
      items.push({ n: name.slice(0, 40), a: toNumber(m[2], m[3]) });
      if (items.length >= 40) break;
    }
    return items;
  }

  function parseReceipt(text, now) {
    const raw = String(text || '');
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    return {
      amount: findAmount(lines),
      date: findDate(raw, now),
      time: findTime(raw),
      merchant: findMerchant(lines),
      items: findItems(lines)
    };
  }

  const api = { parseReceipt, amountsIn };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ReceiptParser = api;
})(typeof self !== 'undefined' ? self : this);
