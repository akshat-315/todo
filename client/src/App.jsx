import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import PrivateRoutes from './components/PrivateRoutes';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                //Only authenticated users can access the following private
                routes. //If not authenticated, they will be redirected to the
                landing page
                <Route element={<PrivateRoutes />}>
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
