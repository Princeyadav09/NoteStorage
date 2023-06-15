
import React from 'react';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Weather from './components/Weather';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './Context/notesOperation/NoteState';
import UserName from './Context/userDetails/UserName';
import Alert from './components/Alert';
import ShowArt from './Context/alertContext/showAlert';

function App() {
  return (
     <>
     <ShowArt>
     <UserName>
      <NoteState>
         <Router>
            <Navbar></Navbar>
            <Alert></Alert>
            <Routes>
                <Route exact path="/" element={<Home></Home>}></Route>
                <Route exact path="/weather" element={<Weather></Weather>}></Route>
                <Route exact path="/login" element={<Login></Login>}></Route>
                <Route exact path="/signup" element={<Signup></Signup>}></Route>
            </Routes>
         </Router>
       </NoteState>
      </UserName>
      </ShowArt>
     </>
  );
}

export default App;


// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// c315ec1225cad8093772c28b1149449f