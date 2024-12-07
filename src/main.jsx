import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import Login from './components/signup.jsx';
import Signin from './components/login.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<App />} />
      <Route path="/login" element={<Signin/>} />
    </Routes>
  </BrowserRouter>
)
