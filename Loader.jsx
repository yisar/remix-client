import { useState, useEffect } from "react";

function Loader() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCount((c) => (c + 1) % 4), 150);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="loader">
      Loading {Array.from(new Array(count), () => ".")}
    </div>
  );
}

export default Loader;
