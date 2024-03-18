import React from 'react';
import Quiz from './components/Quiz/Quiz'; 
import Header from "./containers/Header/Header";
import Apple from "./Apple.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
      <div className="App-content">
        <div className="App-column">
          <div className='App-column__image'>
          <img src={Apple} height="400px" width="700px"/>
          </div>
        </div>
        <div className="App-column">
          <Quiz/>
        </div>
      </div>
    </div>
  );
}

export default App;
