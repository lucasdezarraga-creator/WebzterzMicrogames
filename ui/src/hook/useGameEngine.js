import { useState, useEffect } from 'react';

export function useGameEngine() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // We check if the script is already loaded
    if (window.Module && window.Module.onRuntimeInitialized) {
      setIsReady(true);
      return;
    }

    // Set up the listener for when C++ is ready
    window.Module = {
      onRuntimeInitialized: () => {
        console.log("C++ Engine is fired up!");
        setIsReady(true);
      }
    };
  }, []);

  return isReady;
}