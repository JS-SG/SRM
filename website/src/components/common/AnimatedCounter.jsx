import React, { useEffect, useState, useRef } from "react";

const AnimatedCounter = ({ target, duration = 1500, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp = null;
          const startValue = 0;
          const endValue = Number(target);

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeOut * (endValue - startValue) + startValue);
            setCount(currentCount);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(endValue);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={elementRef} className="stat-number-display">
      {count}
      {suffix && <span className="stat-number-suffix">{suffix}</span>}
    </span>
  );
};

export default AnimatedCounter;
