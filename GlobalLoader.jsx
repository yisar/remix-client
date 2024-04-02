import "./global-loader.css";
import { useState, useEffect } from "react";

function GlobalLoader({ isLoading }) {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    let timeout;
    if (isLoading) {
      setVisible(true);
    } else {
      timeout = setTimeout(() => {
        setVisible(false);
      }, 500);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isLoading]);

  return (
    isVisible && (
      <div className={`global-loader ${isLoading ? "is-loading" : null}`}>
        <div className="global-loader-fill" />
      </div>
    )
  );
}

export default GlobalLoader;