Object.defineProperty(Navigator.prototype, 'maxTouchPoints', {
  get: function() { return 0; }
});

(function() {
  const OW = window.Worker;
  window.Worker = function(...a) {
    const url = String(a[0]).slice(0,90);
    console.log('🔧 WORKER:', url);
    const w = new OW(...a);
    w.addEventListener('error', e => {
      console.log('❌ ERR url:', url);
      console.log('   msg:', e.message);
      console.log('   file:', e.filename);
      console.log('   line:', e.lineno, 'col:', e.colno);
    });
    return w;
  };
  window.Worker.prototype = OW.prototype;
})();
