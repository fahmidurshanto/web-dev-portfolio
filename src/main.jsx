import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './styles/index.css';
import 'animate.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import routes from './routes/Routes';

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeWrapper />
);

export const toggleTheme = () => {
  const currentTheme = localStorage.getItem('theme') || 'light-mode';
  const newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';
  localStorage.setItem('theme', newTheme);
  document.body.className = newTheme;
};