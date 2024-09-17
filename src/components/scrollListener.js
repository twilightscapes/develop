document.addEventListener('DOMContentLoaded', () => {
  const horizontalScrollClassName = 'horizontal-slider';
  const scrollMultiplier = 2; // Increase this value for faster scrolling

  document.addEventListener('wheel', (event) => {
    let target = event.target;
    while (target && !target.classList.contains(horizontalScrollClassName)) {
      target = target.parentElement;
    }

    if (target && target.classList.contains(horizontalScrollClassName)) {
      event.preventDefault();

      // Use deltaX for horizontal scroll wheels, fallback to deltaY for vertical
      const scrollAmount = (event.deltaX || event.deltaY) * scrollMultiplier;
      target.scrollLeft += scrollAmount;
    }
  }, { passive: false });

  // Add touch event listeners for mobile devices
  let touchStartX;
  document.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchmove', (event) => {
    if (!touchStartX) return;

    let target = event.target;
    while (target && !target.classList.contains(horizontalScrollClassName)) {
      target = target.parentElement;
    }

    if (target && target.classList.contains(horizontalScrollClassName)) {
      const touchEndX = event.touches[0].clientX;
      const diff = touchStartX - touchEndX;
      target.scrollLeft += diff;
      touchStartX = touchEndX;
    }
  }, { passive: true });
});