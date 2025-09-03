document.addEventListener('DOMContentLoaded', () => {
  const swipeHandle = document.getElementById('swipeHandle');
  const container = document.getElementById('swipeContainer');
  let isDragging = false;
  let startX, startLeft;

  const maxRight = container.offsetWidth - swipeHandle.offsetWidth - 10;

  function onDragStart(e) {
    isDragging = true;
    startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
    startLeft = swipeHandle.offsetLeft;
    swipeHandle.style.transition = 'none';
  }

  function onDragMove(e) {
    if (!isDragging) return;

    e.preventDefault();
    const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
    const walk = x - startX;
    let newLeft = startLeft + walk;

    // Constrain movement
    newLeft = Math.max(5, Math.min(newLeft, maxRight));
    swipeHandle.style.left = `${newLeft}px`;

    // Update background gradient based on progress - use lighter green only
    const progress = newLeft / maxRight;
    const greenStart = `rgba(183, 211, 176, ${0.7 + progress * 0.3})`;
    const greenEnd = `rgba(183, 211, 176, ${0.5 + progress * 0.5})`;
    container.style.background = `linear-gradient(to right, ${greenStart}, ${greenEnd})`;

    // Trigger completion earlier
    if (newLeft >= maxRight - 50) { // Changed from -20 to -50
        onSwipeComplete();
    }
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    swipeHandle.style.transition = 'all 0.5s ease-out';

    // If not reached the end, snap back
    if (swipeHandle.offsetLeft < maxRight - 20) {
      swipeHandle.style.left = '5px';
      container.style.background = 'linear-gradient(to right, rgba(117, 152, 112, 0.3), rgba(117, 152, 112, 0.1))';
      container.style.transition = 'background 0.5s ease-out';
    }
  }

  function onSwipeComplete() {
    // Add success styling
    container.style.transition = 'all 0.3s ease-out';
    // Lighter green effect on phase change (no white)
    container.style.background = 'linear-gradient(to right, #B7D3B0 0%, #B7D3B0 100%)';
    // Optionally, animate back to normal after a short delay
    setTimeout(() => {
      container.style.background = 'linear-gradient(to right, rgba(117, 152, 112, 0.3), rgba(117, 152, 112, 0.1))';
    }, 600);
    // Navigate to questionnaire-spa.html after transition
    setTimeout(() => {
        window.location.href = 'questionnaire-spa.html';
    }, 800);
  }

  // Mouse events
  swipeHandle.addEventListener('mousedown', onDragStart);
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);

  // Touch events
  swipeHandle.addEventListener('touchstart', onDragStart);
  document.addEventListener('touchmove', onDragMove);
  document.addEventListener('touchend', onDragEnd);
});
