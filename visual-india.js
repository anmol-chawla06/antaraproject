/**
 * ANTARA — VISUAL INDIA
 *
 * State-level visual discovery over the existing heritage dataset:
 *
 *   INDIA -> STATE -> HERITAGE SITES -> VISUAL GALLERY -> SITE EXPERIENCE
 *
 * Everything here is derived. No state list is hardcoded, no image data is
 * copied into a second schema: states come from the destinations themselves,
 * slugs come from the same STATES_META the map router uses, and every picture
 * is resolved through site-media.js. Adding a destination to data.js places it
 * in its state, increments the count, contributes its images and gains an
 * "Explore Site" link with no change to this file.
 *
 * The site detail experience is NOT duplicated — "Explore Site" hands off to
 * the existing map page at #/india/<state>/<site>.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./site-media.js'));
  else root.AntaraVisualIndia = factory(root.AntaraSiteMedia);
}(typeof self !== 'undefined' ? self : this, function (MEDIA) {
  'use strict';

  var MAP_PAGE = 'map.html';

  function slugify(s) {
    return String(s || '').toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  /* Slugs come from STATES_META where it has one, so Visual India and the map
     router address the same state by the same name. Anything missing from that
     table still gets a stable slug rather than being dropped. */
  function stateSlug(stateName, meta) {
    var m = meta && meta[stateName];
    return (m && m.slug) ? m.slug : slugify(stateName);
  }

  /**
   * HERITAGE STATUS
   *
   * `unesco.status` in the dataset is not a boolean and is not always about
   * UNESCO. It carries four kinds of value:
   *
   *   "World Heritage Site"        - actually inscribed by UNESCO
   *   "Tentative List"             - on UNESCO's tentative list, NOT inscribed
   *   "Sacred pilgrimage site" &c. - a plain heritage label, nothing to do with UNESCO
   *   absent                       - no status recorded
   *
   * Treating any truthy value as "UNESCO" would award a World Heritage listing
   * to sites that do not have one, so the label is derived strictly and every
   * other status is shown in the dataset's own words.
   */
  var UNESCO_INSCRIBED = 'World Heritage Site';
  var UNESCO_TENTATIVE = 'Tentative List';

  function isUnescoListed(d) {
    return !!(d && d.unesco && d.unesco.status === UNESCO_INSCRIBED);
  }

  function heritageStatus(d) {
    var u = d && d.unesco;
    if (!u || !u.status) return null;
    var year = u.year ? ' · ' + u.year : '';
    if (u.status === UNESCO_INSCRIBED) return 'UNESCO World Heritage' + year;
    if (u.status === UNESCO_TENTATIVE) return 'UNESCO Tentative List' + year;
    return String(u.status) + year;   // the dataset's own words, unembellished
  }

  /* Ranking helper: only a real inscription counts as a distinction. */
  function unescoOf(d) {
    return isUnescoListed(d) ? d.unesco : null;
  }

  /**
   * REPRESENTATIVE IMAGE RULE (deterministic, documented)
   *
   * A state is represented by the hero photograph of its best-documented site:
   *
   *   1. only sites that actually resolve a hero image are eligible;
   *   2. UNESCO-listed sites rank above non-listed ones;
   *   3. then the site with the most verified images wins;
   *   4. remaining ties break on the site's position in the dataset.
   *
   * Every input is already-verified data, so no image is invented, reassigned
   * or promoted by chance — the same dataset always yields the same choice.
   */
  function pickRepresentative(entries) {
    var eligible = entries.filter(function (e) { return e.media && e.media.hero; });
    if (!eligible.length) return null;
    var best = eligible.slice().sort(function (a, b) {
      var au = unescoOf(a.dest) ? 1 : 0, bu = unescoOf(b.dest) ? 1 : 0;
      if (au !== bu) return bu - au;
      if (a.media.count !== b.media.count) return b.media.count - a.media.count;
      return a.index - b.index;
    })[0];
    return { image: best.media.hero, dest: best.dest };
  }

  /**
   * Build the whole Visual India model from the destination list.
   * `destinations` is window.DESTINATIONS; `meta` is window.STATES_META.
   */
  function buildStates(destinations, meta) {
    var byState = new Map();

    (destinations || []).forEach(function (d, i) {
      if (!d || !d.state) return;
      if (!byState.has(d.state)) byState.set(d.state, []);
      byState.get(d.state).push({ dest: d, index: i, media: MEDIA.resolveMedia(d) });
    });

    var states = [];
    byState.forEach(function (entries, name) {
      var rep = pickRepresentative(entries);
      var m = (meta && meta[name]) || null;
      states.push({
        name: name,
        slug: stateSlug(name, meta),
        siteCount: entries.length,
        // Only a description the dataset already carries. Never invented.
        description: (m && (m.tagline || m.blurb || m.description)) || null,
        tags: (m && Array.isArray(m.tags)) ? m.tags : [],
        representative: rep ? rep.image : null,
        representativeSite: rep ? rep.dest : null,
        imageCount: entries.reduce(function (n, e) { return n + e.media.count; }, 0),
        unescoCount: entries.filter(function (e) { return unescoOf(e.dest); }).length,
        sites: entries
          .slice()
          .sort(function (a, b) {
            var au = unescoOf(a.dest) ? 1 : 0, bu = unescoOf(b.dest) ? 1 : 0;
            if (au !== bu) return bu - au;
            if (a.media.count !== b.media.count) return b.media.count - a.media.count;
            return a.index - b.index;
          })
          .map(function (e) { return buildSite(e, meta); })
      });
    });

    // Most-represented states first; alphabetical within a tie, so the ordering
    // is stable and does not depend on object insertion quirks.
    states.sort(function (a, b) {
      if (a.siteCount !== b.siteCount) return b.siteCount - a.siteCount;
      return a.name.localeCompare(b.name);
    });
    return states;
  }

  function buildSite(entry, meta) {
    var d = entry.dest;
    var media = entry.media;
    var u = unescoOf(d);
    return {
      id: d.id,
      name: d.name,
      slug: d.slug || d.id,
      city: d.city || null,
      state: d.state,
      location: [d.city, d.state].filter(Boolean).join(', ') || null,
      unesco: isUnescoListed(d) ? heritageStatus(d) : null,
      // Shown for every site that records one, in the dataset's own words.
      heritageStatus: heritageStatus(d),
      categories: d.category || [],
      imageCount: media.count,
      // 1-3 representative pictures for the state gallery. The full set stays
      // in `gallery` so the lightbox can step through everything.
      preview: previewImages(media, 3),
      gallery: media.gallery.filter(function (g) { return g && g.src; }),
      hero: media.hero || null,
      altFallback: MEDIA.altFor(d),
      href: MAP_PAGE + '#/india/' + stateSlug(d.state, meta) + '/' + (d.slug || d.id)
    };
  }

  /* Hero first, then the next distinct pictures. No image is repeated inside a
     site's preview strip. */
  function previewImages(media, limit) {
    var out = [];
    var seen = new Set();
    var push = function (img) {
      if (!img || !img.src || seen.has(img.src) || out.length >= limit) return;
      seen.add(img.src);
      out.push(img);
    };
    push(media.hero);
    (media.gallery || []).forEach(push);
    return out;
  }

  function findState(states, slug) {
    return states.filter(function (s) { return s.slug === slug; })[0] || null;
  }

  function mapHrefForState(state) {
    return MAP_PAGE + '#/india/' + state.slug;
  }

  return {
    buildStates: buildStates,
    findState: findState,
    pickRepresentative: pickRepresentative,
    previewImages: previewImages,
    stateSlug: stateSlug,
    isUnescoListed: isUnescoListed,
    heritageStatus: heritageStatus,
    mapHrefForState: mapHrefForState,
    MAP_PAGE: MAP_PAGE
  };
}));
