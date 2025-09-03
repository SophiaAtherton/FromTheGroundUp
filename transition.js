// Fade transition overlay logic for seamless page changes
function showTransitionAndNavigate(url) {
  let overlay = document.getElementById('transitionOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'transitionOverlay';
    overlay.className = 'transition-overlay';
    document.body.appendChild(overlay);
  }
  overlay.classList.add('active');
  setTimeout(function() {
    window.location.href = url;
  }, 700); // Duration matches CSS transition
}

// Add overlay CSS if not present
(function addOverlayCSS() {
  if (!document.getElementById('transitionOverlayStyle')) {
    const style = document.createElement('style');
    style.id = 'transitionOverlayStyle';
    style.innerHTML = `
      .transition-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #24483A;
        opacity: 0;
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.7s cubic-bezier(0.77,0,0.175,1);
      }
      .transition-overlay.active {
        opacity: 1;
        pointer-events: all;
      }
    `;
    document.head.appendChild(style);
  }
})();
