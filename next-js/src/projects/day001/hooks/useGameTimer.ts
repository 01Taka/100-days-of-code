import { useState, useEffect, useRef } from "react";

export const useGameTimer = (isActive: boolean, initialTime = 0) => {
  const [seconds, setSeconds] = useState(initialTime);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const resetTimer = () => setSeconds(0);

  return { seconds, resetTimer };
};
