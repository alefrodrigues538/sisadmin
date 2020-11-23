import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import Routes from './pages/Routes.jsx';

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
      </div>
      <div>
        <Routes />
      </div>
    </div>
  );
}

export default App;
