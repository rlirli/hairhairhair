/// <reference types="astro/client" />

interface Window {
  hairhairhairTheme?: {
    getPreference: () => string;
    setPreference: (preference: string) => void;
    subscribe: (listener: (preference: string) => void) => () => void;
  };
}
