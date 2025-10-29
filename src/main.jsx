import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/Routes';
import './styles/index.css';
import 'animate.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ThemeWrapper from './components/ThemeWrapper';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeWrapper>
    <RouterProvider router={routes} />
  </ThemeWrapper>
);