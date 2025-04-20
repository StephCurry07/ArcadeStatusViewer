import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    // Only check localStorage if window exists
    if (typeof window === 'undefined') return false;
    
    const saved = localStorage.getItem('theme');
    // If theme is explicitly set in localStorage, use that
    if (saved) {
      return saved === 'dark';
    }
    // Otherwise, use system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    // Save the current theme preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = () => {
    setIsDark(!isDark);
  };

  // Listen for system theme changes only if no theme is set in localStorage
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Only update theme if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        setIsDark(mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return { isDark, toggle };
};