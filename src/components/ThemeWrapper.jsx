import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from '../routes/Routes';

const ThemeWrapper = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.className = savedTheme;
  }, []);

  return (
    <React.StrictMode>
      <RouterProvider router={routes} />
    </React.StrictMode>
  );
};

export default ThemeWrapper;
