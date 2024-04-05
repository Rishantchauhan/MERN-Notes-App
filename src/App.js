import { useContext, useState } from 'react';
import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import SignUp from './Components/SignUp';
import NoteState from './Context/Notes/NoteState';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Alert from './Components/Alert';




function App() { 
   const [alert,setAlert]=useState(null);
   const showalert=(type,mess)=>{
      // console.log(type+mess);
      setAlert({type:type,mess:mess});
      setTimeout(() => {
        setAlert(null);
      }, 2000);
   } 
  return (
     <>
      <Alert alert={alert}/>
     <NoteState>
     <Router>
       <Navbar/>
       <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp showalert={showalert}/> } />
        <Route path="/login" element={<Login showalert={showalert} />} />
      </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
