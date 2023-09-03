import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import SearchedProfile from './Home/SearchedProfile/SearchedProfile';
import DirectMessages from './Home/Messages/DirectMessages';
import DefaultOutlet from './Home/Messages/DefaultOutlet';
import { Provider } from 'react-redux'
import { store } from './DataStore/store';
import Recovery from './Auth/Recovery/Recovery';
import WebSocketService from './WebSocketService';

export const IMG_BASE = "http://localhost:5001/ImageBlob/";
export const VID_BASE = "http://localhost:5001/VideoBlob/";

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
      <WebSocketService />
      <TopMenu/>
      {isLoading ? (
        <LoadingScreen/>
      ) : (
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<Home />}>
              <Route index element={<Main/>}/>
              <Route path='main' element={<Main/>}/>
              <Route path='search' element={<Search/>}/>
              <Route path='addPost' element={<AddPost/>}/>
              <Route path='messages' element={<Messages/>}>
                <Route index element={<DefaultOutlet/>}/>
                <Route path=':username/:id' element={<DirectMessages/>}/>
              </Route>
              <Route path='profile' element={<Profile/>}/>
              <Route path=':username' element={<SearchedProfile/>}/>
            </Route>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/recovery' element={<Recovery />}/>
          </Routes>
        </Provider>
      )}
    </Router>
  );
}

export default App;
