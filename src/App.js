
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
// import Helmet from 'react-helmet';

function App() {
  return (
     <>
       {/* <Helmet bodyAttributes={{style: 'background-color : #fff'}}/> */}
       <Navbar></Navbar>
       <Home></Home>
     </>
  );
}

export default App;


// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// c315ec1225cad8093772c28b1149449f