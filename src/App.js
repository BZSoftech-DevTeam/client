import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import HeroContainer from './Pages/Home/HeroContainer';
import Footer from './Components/Footer';
import Login from './Components/Authentication/Login'
import SignUp from './Components/Authentication/SignUp'
import DemoContainer from './Pages/Demo/DemoContainer';

import ClientProtectedRoute from './Pages/Clients/ProtectedRoute'
import ClientLayout from './Pages/Clients/Layout'
import Dashboard from './Pages/Clients/pages/Dashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<HeroContainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/demo" element={<DemoContainer />} />

          <Route path='/dashboard' element={<ClientProtectedRoute Component={ClientLayout} />}>
            <Route index element={<Dashboard />} />
          </Route>

        </Routes>

        {/* <Footer></Footer> */}
      </BrowserRouter>
    </>
  );
}

export default App;
