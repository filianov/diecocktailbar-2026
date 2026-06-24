/* Setzt das Theme VOR dem ersten Paint (kein Flackern).
   Standard-Theme hier ändern, um die helle Variante als Default zu setzen:
   DEFAULT = 'light'  ->  Seite startet hell. */
(function () {
  try {
    var DEFAULT = 'dark';
    var t = localStorage.getItem('dcb-theme') || DEFAULT;
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
