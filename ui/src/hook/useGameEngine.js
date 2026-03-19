import { useState, useEffect } from 'react';

export function useGameEngine() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // We check if the script is already loaded
    if (window.Module && window.Module.onRuntimeInitialized) {
      setIsReady(true);
      return;
    }

    if(window.Module){
      const ogInit = window.Module.onRuntimeInitialized;
      window.Module.onRuntimeInitialized = () => {
        if (ogInit) ogInit();
        console.log("Hook detected: C++ Engine is fired up!");
        setIsReady(true);
      }
    }
  }, []);

  return isReady;
}