import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Tabs, Tab, Container } from '@mui/material';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Catalogue from './pages/Goods';
import CreateNewDB from './pages/CreateNewDB';
import DefaultFooter from './components/footer/DefaultFooter';
import DefaultHeader from './components/header/DefaultHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './AuthContext';
import Goods from './pages/Goods';

const defaultTheme = createTheme();

function App() {
  return (
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <CssBaseline />
          <Container maxWidth="lg">
            <DefaultHeader />
            <main>
              <div>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/createnewdb" element={<CreateNewDB />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/goods" element={<Goods />} />
                </Routes>
              </div>
            </main>
          </Container>
          <DefaultFooter />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;