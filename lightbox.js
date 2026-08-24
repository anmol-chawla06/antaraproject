/**
 * ANTARA SHARED LIGHTBOX
 *
 * One image viewer for the whole product. The heritage-site pages and the
 * Visual India state galleries both drive this module, so keyboard handling,
 * focus return, preloading and attribution behave identically everywhere and
 * there is only one implementation to fix.
 *
 * Deliberately small: no library. Arrow keys and Escape work, focus returns to
 * whatever opened it, and neighbouring frames are preloaded so stepping does
 * not flash.
 *
 * Images are the objects produced by site-media.js:
 *   { src, alt, caption, credit, license, licenseUrl, source, attribution }
 *
 * Markup and classes match the existing `.lightbox` rules in app.css.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.AntaraLightbox = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var state = null;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* CC BY and CC BY-SA legally require visible attribution, so the credit is
     part of the viewer, not an optional nicety. */
  function creditHTML(img) {
    if (!img || (!img.credit && !img.license)) return '';
    var who = img.credit ? esc(img.credit) : null;
    var lic = img.license
      ? (img.licenseUrl
          ? '<a href="' + esc(img.licenseUrl) + '" target="_blank" rel="noopener noreferrer license">' + esc(img.license) + '</a>'
          : esc(img.license))
      : null;
    var src = img.source
      ? '<a href="' + esc(img.source) + '" target="_blank" rel="noopener noreferrer">source</a>'
      : null;
    var parts = [who, lic, src].filter(Boolean);
    return parts.length ? '<span class="media-credit">' + parts.join(' &middot; ') + '</span>' : '';
  }

  function ensure() {
    var box = document.getElementById('lightbox');
    if (box) return box;
    box = document.createElement('div');
    box.className = 'lightbox';
    box.id = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Image viewer');
    box.innerHTML =
      '<button class="lb-close" id="lb-close" aria-label="Close image viewer">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
      '</button>' +
      '<button class="lb-nav lb-prev" id="lb-prev" aria-label="Previous image">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>' +
      '</button>' +
      '<figure class="lb-figure">' +
        '<img id="lb-img" alt="">' +
        '<figcaption id="lb-cap"></figcaption>' +
      '</figure>' +
      '<button class="lb-nav lb-next" id="lb-next" aria-label="Next image">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>' +
      '</button>' +
      '<div class="lb-count" id="lb-count"></div>';
    document.body.appendChild(box);

    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.getElementById('lb-close').addEventListener('click', close);
    document.getElementById('lb-prev').addEventListener('click', function () { step(-1); });
    document.getElementById('lb-next').addEventListener('click', function () { step(1); });
    return box;
  }

  function render() {
    if (!state) return;
    var img = state.images[state.index];
    if (!img) return;
    var imgEl = document.getElementById('lb-img');
    var capEl = document.getElementById('lb-cap');
    imgEl.src = img.src;
    imgEl.alt = img.alt || state.fallbackAlt || '';
    var credit = creditHTML(img);
    capEl.innerHTML = (img.caption ? esc(img.caption) : '') + credit;
    capEl.style.display = (img.caption || credit) ? '' : 'none';
    document.getElementById('lb-count').textContent = (state.index + 1) + ' / ' + state.images.length;
    var single = state.images.length < 2;
    document.getElementById('lb-prev').style.display = single ? 'none' : '';
    document.getElementById('lb-next').style.display = single ? 'none' : '';
    [state.index - 1, state.index + 1].forEach(function (i) {
      var n = state.images[(i + state.images.length) % state.images.length];
      if (n) { var pre = new Image(); pre.src = n.src; }
    });
  }

  function step(delta) {
    if (!state) return;
    var len = state.images.length;
    state.index = (state.index + delta + len) % len;
    render();
  }

  function open(images, index, fallbackAlt) {
    var usable = (images || []).filter(function (g) { return g && g.src; });
    if (!usable.length) return false;
    var box = ensure();
    state = {
      images: usable,
      index: Math.max(0, Math.min(index || 0, usable.length - 1)),
      fallbackAlt: fallbackAlt || '',
      lastFocus: document.activeElement
    };
    render();
    box.classList.add('is-open');
    document.getElementById('lb-close').focus();
    return true;
  }

  function close() {
    var box = document.getElementById('lightbox');
    if (!box) return;
    box.classList.remove('is-open');
    if (state && state.lastFocus && state.lastFocus.focus) state.lastFocus.focus();
    state = null;
  }

  function isOpen() {
    var box = document.getElementById('lightbox');
    return !!(box && box.classList.contains('is-open'));
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    });
  }

  return { open: open, close: close, step: step, isOpen: isOpen, creditHTML: creditHTML };
}));
