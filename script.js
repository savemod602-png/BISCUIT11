(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var flash = document.querySelector(".theme-flash");
  var STORAGE_KEY = "biscuit-theme";

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function applyTheme(theme, animate) {
    if (animate && flash) {
      flash.classList.remove("active");
      // force reflow so the animation can restart
      void flash.offsetWidth;
      flash.classList.add("active");
    }

    var setNow = function () {
      root.setAttribute("data-theme", theme);
      if (toggle) {
        toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
        toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      }
    };

    if (animate) {
      window.setTimeout(setNow, 140);
    } else {
      setNow();
    }
  }

  var stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* localStorage unavailable, fall back to system preference */
  }

  var initialTheme = stored || (systemPrefersDark() ? "dark" : "light");
  applyTheme(initialTheme, false);

  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next, true);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* ignore persistence errors */
      }
    });
  }

  // Graceful fallback when video.mp4 hasn't been added yet.
  var video = document.getElementById("bg-video");
  if (video) {
    var showFallback = function () {
      document.body.classList.add("no-video");
    };
    video.addEventListener("error", showFallback, true);
    if (video.readyState === 0 && video.networkState === 3) {
      showFallback();
    }
    window.setTimeout(function () {
      if (video.readyState < 2) {
        showFallback();
      }
    }, 2500);
  }
})();
