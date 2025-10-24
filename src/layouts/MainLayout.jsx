import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div>
     <div className='pb-28'>
       <Navbar />
     </div>
      <main className='container mx-auto px-4'>
        <Outlet />
      </main>
      {/* You can add a Footer here */}
    </div>
  );
};

export default MainLayout;
