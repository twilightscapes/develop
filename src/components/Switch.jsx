import React, { useState, useEffect } from "react";

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

  const [icons, setIcons] = useState({
    BsFillGrid3X2GapFill: null,
    PiHandSwipeRightFill: null
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import("react-icons/bs").then(mod => {
        setIcons(prevIcons => ({ ...prevIcons, BsFillGrid3X2GapFill: mod.BsFillGrid3X2GapFill }));
      });
      import("react-icons/pi").then(mod => {
        setIcons(prevIcons => ({ ...prevIcons, PiHandSwipeRightFill: mod.PiHandSwipeRightFill }));
      });
    }
  }, []);

  const toggleSlider = () => {
    setIsSliderVisible((prev) => {
      const newValue = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem("isSliderVisible", JSON.stringify(newValue));
        // Broadcast the change to other tabs/windows
        window.dispatchEvent(new StorageEvent("storage", { key: "isSliderVisible" }));
        // Toggle class names globally
        const elements = document.querySelectorAll('.contentpanel','.slider');
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
      <button
        aria-label="Toggle View"
        onClick={() => {
          toggleSlider();
        }}
        className="swipescroll"
      >
        {isSliderVisible ? (
          <div className="themer">
            {icons.BsFillGrid3X2GapFill && <icons.BsFillGrid3X2GapFill style={{ height: '38px',width:'auto', }} />}
            
          </div>
        ) : (
          <div className="themer">
            {icons.PiHandSwipeRightFill && <icons.PiHandSwipeRightFill style={{ height: '38px',width:'auto', }} />}
            
          </div>
        )}

        <div className="themetext">
          Layout
          {/* {isSliderVisible ? "Scroll" : "Swipe"} */}
        </div>
      </button>
    </div>
  );
}

export default Switch;
