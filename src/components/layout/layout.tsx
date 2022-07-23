import React from 'react';
import { Outlet } from 'react-router-dom';
import './layout.scss';
import Footer from '../common/footer/footer';
import Header from '../common/header/header';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>

      <Footer></Footer>
    </>
  );
}

export default Layout;
