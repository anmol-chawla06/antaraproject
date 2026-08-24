/**
 * VISUAL INDIA — page controller.
 *
 * Renders the two views the model in visual-india.js describes:
 *   #/              -> state index
 *   #/state/<slug>  -> that state's visual gallery
 *
 * No image data lives here. Everything is read from the model, which reads
 * from site-media.js, which reads from data.js.
 */
(function () {
  'use strict';

  var VI = window.AntaraVisualIndia;
  var LIGHTBOX = window.AntaraLightbox;

  var STATES = VI.buildStates(window.DESTINATIONS, window.STATES_META);
  var TOTAL_SITES = STATES.reduce(function (n, s) { return n + s.siteCount; }, 0);
  var TOTAL_IMAGES = STATES.reduce(function (n, s) { return n + s.imageCount; }, 0);

  var root = document.getElementById('vi-root');
  var titleEl = document.querySelector('title');

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var BACK_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>';

  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }

  /* Every <img> on this page goes through here: lazy below the fold, aspect
     ratio already reserved by CSS, and a graceful hide if a file is missing so
     a broken path never leaves a torn layout. */
  function img(image, alt, opts) {
    opts = opts || {};
    if (!image || !image.src) return '';
    return '<img src="' + esc(image.src) + '" alt="' + esc(image.alt || alt || '') + '"' +
      (opts.eager ? ' fetchpriority="high"' : ' loading="lazy"') +
      ' decoding="async"' +
      ' onerror="this.closest(\'.vi-shot,.vi-card,.vi-hero\')?.classList.add(\'is-failed\');this.style.display=\'none\'">';
  }

  /* ---------------------------------------------------------------- index */

  function renderIndex() {
    document.title = 'Visual India — Antara';
    var cards = STATES.map(function (s) {
      return '<a class="vi-card" href="#/state/' + esc(s.slug) + '">' +
        img(s.representative, s.name) +
        '<div class="vi-card-body">' +
          '<div class="vi-card-name">' + esc(s.name) + '</div>' +
          '<div class="vi-card-meta">' +
            '<span>' + esc(plural(s.siteCount, 'site', 'sites')) + '</span>' +
            (s.unescoCount ? '<span class="dot"></span><span>' + s.unescoCount + ' UNESCO</span>' : '') +
          '</div>' +
          (s.description ? '<p class="vi-card-desc">' + esc(s.description) + '</p>' : '') +
        '</div></a>';
    }).join('');

    root.innerHTML =
      '<div class="vi-shell">' +
        '<header class="vi-masthead">' +
          '<div class="vi-eyebrow">Visual India</div>' +
          '<h1 class="vi-title">Explore India’s heritage,<br>one state at a time.</h1>' +
          '<p class="vi-lede">Every photograph below is a verified, openly licensed record of a place that exists. Choose a state to see what stands there.</p>' +
          '<div class="vi-stats">' +
            '<div class="vi-stat"><div class="n">' + STATES.length + '</div><div class="k">States</div></div>' +
            '<div class="vi-stat"><div class="n">' + TOTAL_SITES + '</div><div class="k">Heritage sites</div></div>' +
            '<div class="vi-stat"><div class="n">' + TOTAL_IMAGES + '</div><div class="k">Photographs</div></div>' +
          '</div>' +
        '</header>' +
        '<div class="vi-grid">' + cards + '</div>' +
        footer() +
      '</div>';
  }

  /* ---------------------------------------------------------------- state */

  function renderState(state) {
    document.title = state.name + ' — Visual India — Antara';

    var sites = state.sites.map(function (site) {
      var shots = site.preview.map(function (image, i) {
        var isLast = i === site.preview.length - 1;
        var extra = site.gallery.length - site.preview.length;
        return '<button class="vi-shot" type="button" data-site="' + esc(site.id) + '" data-index="' + i + '"' +
          ' aria-label="' + esc((image.caption || site.name) + ' — open image viewer') + '">' +
          img(image, site.altFallback) +
          (isLast && extra > 0 ? '<span class="vi-shot-more">+' + extra + ' more</span>' : '') +
          '</button>';
      }).join('');

      return '<article class="vi-site">' +
        '<div class="vi-site-info">' +
          '<h3 class="vi-site-name">' + esc(site.name) + '</h3>' +
          (site.location ? '<div class="vi-site-loc">' + esc(site.location) + '</div>' : '') +
          (site.heritageStatus ? '<span class="vi-badge' + (site.unesco ? '' : ' is-plain') + '">' + esc(site.heritageStatus) + '</span>' : '') +
          '<div><a class="vi-site-link" href="' + esc(site.href) + '">Explore Site ' + ARROW + '</a></div>' +
        '</div>' +
        '<div class="vi-strip">' +
          (shots || '<div class="vi-strip-empty">No photograph of this site has been verified yet.</div>') +
        '</div>' +
      '</article>';
    }).join('');

    var rep = state.representative;
    var credit = rep ? LIGHTBOX.creditHTML(rep) : '';

    root.innerHTML =
      '<div class="vi-shell">' +
        '<a class="vi-back" href="#/">' + BACK_ARROW + ' All states</a>' +
        '<div class="vi-hero">' +
          img(rep, state.name, { eager: true }) +
          (credit ? '<div class="vi-hero-credit">' + credit + '</div>' : '') +
          '<div class="vi-hero-body">' +
            '<h1 class="vi-hero-name">' + esc(state.name) + '</h1>' +
            (state.description ? '<p class="vi-hero-desc">' + esc(state.description) + '</p>' : '') +
          '</div>' +
        '</div>' +
        '<div class="vi-actions">' +
          '<a class="btn-primary" href="' + esc(VI.mapHrefForState(state)) + '">Explore on Map ' + ARROW + '</a>' +
        '</div>' +
        '<div class="vi-section-head">' +
          '<h2>Heritage sites in ' + esc(state.name) + '</h2>' +
          '<span class="count">' + esc(plural(state.siteCount, 'site', 'sites')) + ' · ' + esc(plural(state.imageCount, 'photograph', 'photographs')) + '</span>' +
        '</div>' +
        sites +
        footer() +
      '</div>';

    wireGallery(state);
  }

  /* Open the shared viewer on the whole site gallery, positioned at the
     picture that was clicked — so a visitor who taps the third thumbnail can
     keep stepping through everything else that site has. */
  function wireGallery(state) {
    var byId = {};
    state.sites.forEach(function (s) { byId[s.id] = s; });
    root.querySelectorAll('.vi-shot').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var site = byId[btn.dataset.site];
        if (!site) return;
        var previewSrc = site.preview[+btn.dataset.index] && site.preview[+btn.dataset.index].src;
        var start = site.gallery.findIndex(function (g) { return g.src === previewSrc; });
        LIGHTBOX.open(site.gallery, start < 0 ? 0 : start, site.altFallback);
      });
    });
  }

  function footer() {
    return '<div class="vi-foot">Photographs are reused from each site’s verified media record — creator, licence and source are preserved and shown in the image viewer. ' +
      'Provenance for every file is recorded in <code>data/media-sources.json</code>.</div>';
  }

  function notFound(slug) {
    document.title = 'State not found — Visual India — Antara';
    root.innerHTML =
      '<div class="vi-shell">' +
        '<a class="vi-back" href="#/">' + BACK_ARROW + ' All states</a>' +
        '<header class="vi-masthead">' +
          '<div class="vi-eyebrow">Visual India</div>' +
          '<h1 class="vi-title">No such state</h1>' +
          '<p class="vi-lede">Antara has no heritage sites recorded for “' + esc(slug) + '”. Browse the ' + STATES.length + ' states that are represented instead.</p>' +
        '</header>' +
      '</div>';
  }

  /* ---------------------------------------------------------------- route */

  function route() {
    LIGHTBOX.close();
    var hash = (location.hash || '').replace(/^#\/?/, '');
    var m = hash.match(/^state\/([^/]+)/);
    if (m) {
      var state = VI.findState(STATES, decodeURIComponent(m[1]));
      if (state) renderState(state); else notFound(decodeURIComponent(m[1]));
    } else {
      renderIndex();
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', route);
  route();

  // Exposed for browser verification only; the page does not read it back.
  window.__visualIndia = { states: STATES, totalSites: TOTAL_SITES, totalImages: TOTAL_IMAGES };
}());
