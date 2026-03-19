/* ================================================
   Beat Your Best — main.js
   Theme toggle, language switch, mobile menu
   ================================================ */

(function() {
  // ── Dark Mode Toggle ──
  var themeBtn = document.getElementById('theme-toggle');
  var html = document.documentElement;

  // Load saved theme
  var saved = localStorage.getItem('byb-theme');
  if (saved) {
    html.setAttribute('data-theme', saved);
    updateThemeIcon(saved === 'dark');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      var isDark = html.getAttribute('data-theme') === 'dark';
      var newTheme = isDark ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('byb-theme', newTheme);
      updateThemeIcon(!isDark);
    });
  }

  function updateThemeIcon(isDark) {
    if (!themeBtn) return;
    themeBtn.innerHTML = isDark
      ? '<i class="fas fa-sun" style="font-size:13px;color:#F59E0B;"></i>'
      : '<i class="fas fa-moon" style="font-size:13px;"></i>';
  }

  // ── Language Switch ──
  var langBtn = document.getElementById('lang-toggle');
  var currentLang = localStorage.getItem('byb-lang') || 'nl';

  // Apply saved language on load
  applyLanguage(currentLang);

  if (langBtn) {
    langBtn.addEventListener('click', function() {
      currentLang = currentLang === 'nl' ? 'en' : 'nl';
      localStorage.setItem('byb-lang', currentLang);
      applyLanguage(currentLang);
    });
  }

  function applyLanguage(lang) {
    // Update button text
    if (langBtn) {
      langBtn.textContent = lang === 'nl' ? 'EN' : 'NL';
    }

    // Update html lang attribute
    html.setAttribute('lang', lang);

    // Swap text content on elements with data-nl / data-en
    document.querySelectorAll('[data-nl][data-en]').forEach(function(el) {
      el.textContent = lang === 'nl' ? el.getAttribute('data-nl') : el.getAttribute('data-en');
    });

    // Update page title if it has data attributes
    var title = document.querySelector('title[data-nl][data-en]');
    if (title) {
      document.title = lang === 'nl' ? title.getAttribute('data-nl') : title.getAttribute('data-en');
    }
  }

  // ── Mobile Hamburger Menu ──
  var hamburger = document.getElementById('nav-hamburger');
  var navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('nav-links-open');
    });
  }
})();
