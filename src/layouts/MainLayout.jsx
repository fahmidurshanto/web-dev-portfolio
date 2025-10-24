import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div>
     <div className='pb-28'>
       <Navbar />
     </div>
      <main className='container mx-auto px-4'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;