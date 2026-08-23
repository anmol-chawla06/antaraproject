/**
 * ANTARA HERITAGE SITE MEDIA
 *
 * One resolver that turns whatever imagery a heritage site happens to have
 * into a predictable shape the page can render:
 *
 *     { hero, gallery[], culture, travel, count, hasGallery }
 *
 * Two schemas are supported at once, on purpose.
 *
 *   Preferred, for new sites:
 *     images: {
 *       hero:    "path" | { src, alt, caption },
 *       gallery: [ "path" | { src, alt, caption } ],
 *       culture: "path" | { ... },
 *       travel:  "path" | { ... }
 *     }
 *
 *   Legacy, which every current site uses:
 *     image, explore[].image, dontMiss[].image, lookCloser.image
 *
 * Adding `images` to a site makes its media appear with no frontend change;
 * sites that never get one keep working exactly as they do now. Nothing here
 * fabricates a caption, a credit or a photographer: alt text is built from the
 * site's own name and location, and a caption is used only where the data
 * already carried one.
 *
 * Free of DOM access so it can be unit-tested in Node. app.js owns rendering.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.AntaraSiteMedia = api;
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function cleanPath(value) {
    if (typeof value !== 'string') return null;
    const trimmed = value.trim();
    return trimmed === '' ? null : trimmed;
  }

  /** Accepts "path" or { src, alt, caption, credit } and normalises both. */
  function toImage(input, fallbackAlt, fallbackCaption) {
    if (!input) return null;

    if (typeof input === 'string') {
      const src = cleanPath(input);
      if (!src) return null;
      return {
        src: src,
        alt: fallbackAlt || null,
        caption: cleanPath(fallbackCaption),
        credit: null
      };
    }

    if (typeof input === 'object') {
      const src = cleanPath(input.src || input.image || input.url);
      if (!src) return null;
      return {
        src: src,
        // A caption authored in the data is a real caption; alt falls back to
        // the site's own identity rather than a filename.
        alt: cleanPath(input.alt) || fallbackAlt || null,
        caption: cleanPath(input.caption) || cleanPath(fallbackCaption),
        credit: cleanPath(input.credit)
      };
    }
    return null;
  }

  /** "Amber Fort — Jaipur, Rajasthan" — never a filename. */
  function describeSite(dest) {
    if (!dest) return 'Heritage site';
    const place = [dest.city, dest.state].filter(Boolean).join(', ');
    return place ? dest.name + ' — ' + place : (dest.name || 'Heritage site');
  }

  function altFor(dest, detail) {
    const base = describeSite(dest);
    return detail ? detail + ', ' + base : base;
  }

  /**
   * Collect every distinct image a site actually has, in the order a reader
   * should meet them. Preferred `images` block wins; legacy fields fill in.
   */
  function resolveMedia(dest) {
    if (!dest) {
      return { hero: null, gallery: [], culture: null, travel: null, count: 0, hasGallery: false, sources: [] };
    }

    const declared = dest.images && typeof dest.images === 'object' ? dest.images : {};
    const seen = new Set();
    const gallery = [];

    const push = img => {
      if (!img || seen.has(img.src)) return null;
      seen.add(img.src);
      gallery.push(img);
      return img;
    };

    // --- Hero -------------------------------------------------------------
    const hero =
      toImage(declared.hero, altFor(dest), null) ||
      toImage(dest.image, altFor(dest), null);
    if (hero) push(hero);

    // --- Declared gallery --------------------------------------------------
    const declaredGallery = Array.isArray(declared.gallery) ? declared.gallery : [];
    declaredGallery.forEach(entry => push(toImage(entry, altFor(dest), null)));

    // --- Named slots -------------------------------------------------------
    const culture = toImage(declared.culture, altFor(dest, 'Cultural detail'), null);
    if (culture) push(culture);

    const travel = toImage(declared.travel, altFor(dest, 'Visitor view'), null);
    if (travel) push(travel);

    // --- Legacy sections carry real captions; keep them ---------------------
    (dest.explore || []).forEach(x => {
      push(toImage(x.image, altFor(dest, x.name), x.name));
    });
    (dest.dontMiss || []).forEach(x => {
      push(toImage(x.image, altFor(dest, x.title), x.title));
    });
    if (dest.lookCloser) {
      push(toImage(dest.lookCloser.image, altFor(dest, 'Detail'), null));
    }

    // A "gallery" needs more than the hero to be worth opening.
    const extras = gallery.filter(g => !hero || g.src !== hero.src);

    return {
      hero: hero,
      gallery: gallery,
      extras: extras,
      culture: culture || extras[0] || null,
      travel: travel || extras[extras.length - 1] || null,
      count: gallery.length,
      hasGallery: extras.length > 0,
      sources: Array.isArray(dest.sources) ? dest.sources : []
    };
  }

  /**
   * Pick an image to sit beside a block of prose, without ever reusing the
   * hero (which the reader has just seen) and without repeating one already
   * placed elsewhere on the page. Returns null when the site has nothing
   * spare -- the caller must then render text alone rather than a filler
   * image or a duplicate.
   */
  function pickSectionImage(media, used) {
    if (!media) return null;
    const taken = used instanceof Set ? used : new Set(used || []);
    for (const img of media.extras) {
      if (!taken.has(img.src)) {
        taken.add(img.src);
        return img;
      }
    }
    return null;
  }

  /** Coverage for one site, for tooling and the progress tracker. */
  function coverageOf(dest) {
    const media = resolveMedia(dest);
    return {
      id: dest && dest.id,
      name: dest && dest.name,
      hero: !!media.hero,
      galleryCount: media.extras.length,
      total: media.count,
      level: media.count === 0 ? 'none' : media.extras.length === 0 ? 'hero-only' : media.extras.length < 3 ? 'partial' : 'rich'
    };
  }

  return {
    toImage: toImage,
    altFor: altFor,
    describeSite: describeSite,
    resolveMedia: resolveMedia,
    pickSectionImage: pickSectionImage,
    coverageOf: coverageOf
  };
});
