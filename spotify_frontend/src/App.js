import logo from './logo.svg';
import './App.css';
import './output.css'
import { BrowserRouter,Router,Route, Routes, Navigate } from 'react-router-dom';
import LoginComponent from './routes/Login';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import LoggedInHomeComponent from './routes/LoggedInHome';
import Library from './routes/Library';
import UploadSong from './routes/UploadSong';
import MyMusic from "./routes/MyMusic"
import { useCookies } from 'react-cookie';
import songContext from './contexts/songContext';
import { useState } from 'react';
import SearchPage from './routes/SearchPage';
import SinglePlaylistView from './routes/SinglePlaylistView'


function App() {
  const [currentSong,setCurrenSong]=useState(null);
  const [cookie, setcookie]=useCookies(["token"]);
  const [soundPlayed,setSoundPlayed]=useState(null);
  const [isPaused, setIsPaused]=useState(true);
  const [isMuted,setIsMuted]=useState(null);


  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          //LoggedIn Routes
          <songContext.Provider value={{currentSong,setCurrenSong,soundPlayed,setSoundPlayed,isPaused,setIsPaused,isMuted,setIsMuted}}>
            <Routes>
              <Route path="/" element={<LoggedInHomeComponent />}/>
           
              <Route path='/home' element={<LoggedInHomeComponent />}/>
              <Route path="/uploadSong" element={<UploadSong/>} />
              <Route path='/myMusic' element={<MyMusic />} />
              <Route path='/search' element={<SearchPage />}></Route>
              <Route path='/library' element={<Library />} />
              <Route path='/playlist/:playlistId' element={<SinglePlaylistView />} />
              <Route path='*' element={<Navigate to="/home"/>}/>
            </Routes>
          </songContext.Provider>
          
          ):(
            //LoggedOut Routes
            <Routes>
              <Route path='/home' element={<HomeComponent />} />
              <Route path="/login" element={<LoginComponent/>}/>
              <Route path='/signup' element={<SignupComponent/>} />
              <Route path='*' element={<Navigate to="/login"/>}/>
            </Routes>
          )}
      </BrowserRouter>
    </div>
  );
}
const HelloComponent = () => {
  return <div>This is hello from component</div>;
};


export default App;
