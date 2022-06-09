import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/login';
import Singup from './pages/Singup';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import DrawingPage from './pages/DrawingPage';
import PrivateRoute from './Routes/PrivateRoute';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <div><Toaster position='top-right' /></div>
      <BrowserRouter >
        <Routes >
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/draw" element={<DrawingPage />} />
          </Route>


          <Route path="/signup" element={<Singup />} />
          {/* <Route path="/signup" element={Singup} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
