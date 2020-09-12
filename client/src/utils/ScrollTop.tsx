import { useEffect } from "react";

// Hook
function ScrollTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

export default ScrollTop;
