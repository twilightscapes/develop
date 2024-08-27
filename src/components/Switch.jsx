import React, { useState, useEffect } from 'react';

const GridIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 256 256"
    height="30px"
    width="30px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M216,128v50.93c0,25.59-8.48,39.93-8.84,40.65A8,8,0,0,1,200,224H64a8,8,0,0,1-6.9-3.95L26.15,160a16,16,0,0,1,6.53-22.23c7.66-4,17.1-.84,21.4,6.62l21,36.44a6.09,6.09,0,0,0,6,3.09l.12,0A8.19,8.19,0,0,0,88,175.74V56a16,16,0,0,1,16.77-16c8.61.4,15.23,7.82,15.23,16.43V128a8,8,0,0,0,8.53,8,8.17,8.17,0,0,0,7.47-8.25V112a16,16,0,0,1,16.77-16c8.61.4,15.23,7.82,15.23,16.43V136a8,8,0,0,0,8.53,8,8.18,8.18,0,0,0,7.47-8.25v-7.28c0-8.61,6.62-16,15.23-16.43A16,16,0,0,1,216,128Zm37.66-77.66-32-32a8,8,0,0,0-11.32,11.32L228.69,48H176a8,8,0,0,0,0,16h52.69L210.34,82.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,253.66,50.34Z" />
  </svg>
);

const SwipeIcon = () => (

  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 16 16"
    height="30px"
    width="30px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
  </svg>
);

function Switch() {
  const [isSliderVisible, setIsSliderVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem("isSliderVisible");
      try {
        return JSON.parse(storedValue) ?? false;
      } catch (error) {
        return false;
      }
    }
    return false;
  });

  const toggleSlider = () => {
    setIsSliderVisible((prev) => {
      const newValue = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem("isSliderVisible", JSON.stringify(newValue));
        window.dispatchEvent(new StorageEvent("storage", { key: "isSliderVisible" }));
        const elements = document.querySelectorAll('.contentpanel', '.slider');
        elements.forEach((el) => {
          if (newValue) {
            el.classList.remove('grid-container');
            el.classList.add('slider', 'panels');
          } else {
            el.classList.add('grid-container');
            el.classList.remove('slider', 'panels');
          }
        });
      }
      return newValue;
    });
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "isSliderVisible" && typeof window !== 'undefined') {
        const storedValue = localStorage.getItem("isSliderVisible");
        setIsSliderVisible(JSON.parse(storedValue));
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.contentpanel');
    elements.forEach((el) => {
      if (isSliderVisible) {
        el.classList.remove('grid-container');
        el.classList.add('slider', 'panels');
      } else {
        el.classList.add('grid-container');
        el.classList.remove('slider', 'panels');
      }
    });

    const handleWheelScroll = (event) => {
      if (isSliderVisible) {
        event.preventDefault();
        const container = event.currentTarget;
        container.scrollLeft += event.deltaY;
      }
    };

    elements.forEach((el) => {
      el.addEventListener('wheel', handleWheelScroll);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener('wheel', handleWheelScroll);
      });
    };
  }, [isSliderVisible]);

  return (
    <div>

        <button aria-label="Toggle View"
        onClick={toggleSlider}
		className="flex h-9 w-9 items-center justify-center rounded-md ring-zinc-400 transition-all hover:ring-2"
	>
        <div className="themer">
          {isSliderVisible ? <GridIcon /> : <SwipeIcon />}
        </div>
      </button>
    </div>
  );
}

export default Switch;
