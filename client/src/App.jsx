import './App.css';
//import the react-router module 
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
//import Component
import Home from "./Home/Home";
import Login from './Auth/Login/Login';
import Signup from './Auth/Signup/Signup';
import TopMenu from './TopMenu/TopMenu';

function App() {
  return (
    <Router>
      <TopMenu/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </Router>
  );
}

export default App;
