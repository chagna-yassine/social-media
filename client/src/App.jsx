import './App.css';
//import the react-router module 
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
//import Component
import Home from "./Home/Home";
import Login from './Auth/Login/Login';
import Signup from './Auth/Signup/Signup';
import TopMenu from './TopMenu/TopMenu';
import LoadingScreen from './LoadingScreen/LoadingScreen';
import { useEffect , useState , useRef } from 'react';

function App() {
  const[isLoading,setIsLoading] = useState(true);
  const isCanceled = useRef(false);
  useEffect(()=>{
    if(!isCanceled.current){
      setTimeout(()=>{
        setIsLoading(false)
      },2000)
    }
    return ()=>{
      isCanceled.current = true;
    }
  })
  return (
    <Router>
      <TopMenu/>
      {isLoading ? (
        <LoadingScreen/>
      ) : (
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
        </Routes>
      )}
    </Router>
  );
}

export default App;
