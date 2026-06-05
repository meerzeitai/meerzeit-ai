(function () {
  'use strict';
 
  var GA_ID = 'G-6TJYKB2M7D';
  var STORAGE_KEY = 'mz_cookie_consent';

  // Global dataLayer + gtag stub — available immediately after this script loads
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };

  // -------------------------------------------------------
  // Load GA dynamically — only called after consent granted
  // -------------------------------------------------------
  function loadGA() {
    if (window._gaLoaded) return;
    window._gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  // -------------------------------------------------------
  // Cookie banner
  // -------------------------------------------------------
  function hideBanner(banner) {
    banner.style.transform = 'translateY(100%)';
    setTimeout(function () {
      if (banner.parentNode) { banner.parentNode.removeChild(banner); }
    }, 420);
  }

  function showBanner() {
    if (document.getElementById('mz-cookie-banner')) { return; }

    var banner = document.createElement('div');
    banner.id = 'mz-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie-Einstellungen');
    banner.setAttribute('aria-live', 'polite');

    banner.innerHTML =
      '<p style="color:rgba(255,255,255,.82);font-size:.92rem;margin:0;' +
        'flex:1 1 280px;line-height:1.6">' +
        'Wir nutzen Google Analytics, um zu verstehen, wie unsere Website genutzt wird. ' +
        'Ihre Daten werden nur mit Ihrer Zustimmung erfasst. ' +
        'Mehr in unserer <a href="datenschutz.html" ' +
          'style="color:#2ad1c9;text-decoration:underline">Datenschutzerkl&auml;rung</a>.' +
      '</p>' +
      '<div style="display:flex;gap:12px;flex-shrink:0;flex-wrap:wrap">' +
        '<button id="mz-cookie-decline" ' +
          'style="padding:10px 22px;border-radius:10px;font-family:inherit;' +
          'font-weight:600;font-size:.9rem;cursor:pointer;' +
          'background:transparent;color:rgba(255,255,255,.65);' +
          'border:1.5px solid rgba(255,255,255,.22);transition:border-color .2s,color .2s">' +
          'Ablehnen' +
        '</button>' +
        '<button id="mz-cookie-accept" ' +
          'style="padding:10px 22px;border-radius:10px;font-family:inherit;' +
          'font-weight:600;font-size:.9rem;cursor:pointer;border:none;' +
          'background:linear-gradient(135deg,#2ad1c9,#16b3ab);' +
          'color:#0a1733;transition:transform .2s">' +
          'Akzeptieren' +
        '</button>' +
      '</div>';

    banner.style.cssText =
      'position:fixed;bottom:0;left:0;width:100%;z-index:9000;' +
      'background:rgba(10,23,51,.97);backdrop-filter:blur(12px);' +
      'border-top:1px solid rgba(42,209,201,.22);' +
      'padding:20px 24px;display:flex;align-items:center;' +
      'justify-content:space-between;gap:18px;flex-wrap:wrap;' +
      'box-sizing:border-box;font-family:Manrope,sans-serif;' +
      'transform:translateY(100%);' +
      'transition:transform .4s cubic-bezier(.2,.8,.2,1)';

    document.body.appendChild(banner);

    // Animate in (two rAF frames ensure transition fires)
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        banner.style.transform = 'translateY(0)';
      });
    });

    document.getElementById('mz-cookie-accept').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'granted');
      hideBanner(banner);
      loadGA();
    });

    document.getElementById('mz-cookie-decline').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'denied');
      hideBanner(banner);
    });
  }

  // -------------------------------------------------------
  // Entry point — runs as soon as this script is parsed
  // -------------------------------------------------------
  var consent = localStorage.getItem(STORAGE_KEY);

  if (consent === 'granted') {
    // Returning visitor who already accepted
    loadGA();
  } else if (consent !== 'denied') {
    // No decision stored yet — show banner after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        setTimeout(showBanner, 700);
      });
    } else {
      setTimeout(showBanner, 700);
    }
  }
  // consent === 'denied' → do nothing, no GA, no banner

}());
