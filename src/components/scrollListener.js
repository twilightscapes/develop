document.addEventListener('DOMContentLoaded', () => {
    // Define the class name for horizontal scrolling
    const horizontalScrollClassName = 'horizontal-slider';
  
    // Add a wheel event listener to the document
    document.addEventListener('wheel', (event) => {
      // Check if the event target or its parent has the specified class name
      let target = event.target;
      while (target && !target.classList.contains(horizontalScrollClassName)) {
        target = target.parentElement;
      }
  
      if (target && target.classList.contains(horizontalScrollClassName)) {
        // Prevent default vertical scrolling
        event.preventDefault();
  
        // Implement horizontal scrolling
        target.scrollLeft += event.deltaY;
      }
    });
  });
  