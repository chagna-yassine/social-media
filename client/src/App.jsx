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
import Main from './Home/Main/Main';
import Search from './Home/Search/Search';
import AddPost from './Home/AddPost/AddPost';
import Messages from './Home/Messages/Messages';
import Profile from './Home/Profile/Profile';

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
          <Route path='/' element={<Home />}>
            <Route index element={<Main/>}/>
            <Route path='main' element={<Main/>}/>
            <Route path='search' element={<Search/>}/>
            <Route path='addPost' element={<AddPost/>}/>
            <Route path='messages' element={<Messages/>}/>
            <Route path='profile' element={<Profile/>}/>
          </Route>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
        </Routes>
      )}
    </Router>
  );
}

export default App;
